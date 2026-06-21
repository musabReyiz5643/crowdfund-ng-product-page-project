# ============================================================
# SETUP-PROJECT.PS1
# Feature-Based Vite + React + TypeScript proje kurulum scripti
# --- Yapılandırma ---
# PowerShell'de build dosyasını çalıştırmak için:
# powershell -ExecutionPolicy Bypass -File .\setup-project.ps1 // Senin Powershell projenin yolunu alarak yaz
# ============================================================


# ── 1. KULLANICIDAN BİLGİ AL ────────────────────────────────

# Proje adını sor
$projectName = Read-Host "What is the name of your project?"

# Google Fonts'tan kullanılacak font adını sor (örn: Inter, Roboto)
$fontFamilyName = Read-Host "What is the name of your font family? (e.g., 'Inter')"

# Opsiyonel kütüphaneleri sor
$isInstallClsxCn = Read-Host "Do you want to install clsx and class-variance-authority? (yes/no)"
$isInstallReactHookForm = Read-Host "Do you want to install react-hook-form? (yes/no)"
$isInstallZustand = Read-Host "Do you want to install zustand? (yes/no)"
$isInstallTanstackQuery = Read-Host "Do you want to install Tanstack Query? (yes/no)"


# ── 2. VİTE PROJESİNİ OLUŞTUR ───────────────────────────────

# React + TypeScript şablonuyla yeni Vite projesi oluşturur
npm create vite@7 $projectName -- --template react-ts --yes

# Oluşturulan proje klasörüne gir
Set-Location -Path $projectName


# ── 3. BAĞIMLILIKLARI YÜKLE ─────────────────────────────────

# Temel paketler: Tailwind, seçilen font, path alias için @types/node
npm install
npm install tailwindcss @tailwindcss/vite @fontsource/$fontFamilyName @types/node

# Kullanıcı istediyse yükle: clsx (koşullu class birleştirme) + tailwind-merge (çakışan Tailwind classları birleştirme)
if ($isInstallClsxCn -eq "yes") {
    npm install clsx tailwind-merge
}

# Kullanıcı istediyse yükle: react-hook-form (form yönetimi)
if ($isInstallReactHookForm -eq "yes") {
    npm install react-hook-form @hookform/resolvers
}

# Kullanıcı istediyse yükle: zustand (global state yönetimi)
if ($isInstallZustand -eq "yes") {
    npm install zustand
}

# Kullanıcı istediyse yükle: TanStack Query (sunucu state yönetimi) + hookform resolvers (form validasyon entegrasyonu)
if ($isInstallTanstackQuery -eq "yes") {
    npm install @tanstack/react-query 
}


# ── 4. GEREKSİZ DOSYALARI TEMİZLE ──────────────────────────

# Vite'ın ürettiği varsayılan stil ve asset dosyalarını sil
# -ErrorAction SilentlyContinue → dosya yoksa hata vermez, devam eder
Remove-Item src/App.css, src/index.css, src/assets/react.svg , src/main.tsx, src/App.tsx -ErrorAction SilentlyContinue


# ── 5. FEATURE-BASED KLASÖR YAPISINI OLUŞTUR ────────────────

# Ana Feature-Based katmanlar:
# features/ → her özellik kendi klasöründe
# shared/   → birden fazla feature'ın kullandığı ortak şeyler
# pages/    → feature'ları bir araya getiren orkestra şefleri

New-Item -ItemType Directory -Force -Path @(

    # Uygulama giriş noktası (main.tsx + App.tsx burada)
    "src/app",

    # Sayfalar — feature'ları birleştiren orkestra şefleri
    "src/pages",

    # Feature-Based ana katman
    # Her feature kendi içinde components/, hooks/, services/ barındırır
    # Örnek: src/features/auth/components/LoginForm.tsx
    #        src/features/auth/hooks/useAuth.ts
    #        src/features/auth/services/authApi.ts
    "src/features",

    # Shared — birden fazla feature'ın kullandığı ortak katman
    "src/shared/components",   # Button, Card, Modal gibi evrensel UI parçaları
    "src/shared/hooks",        # useLocalStorage, useDebounce gibi evrensel hook'lar
    "src/shared/utils",        # formatDate, formatPrice gibi yardımcı fonksiyonlar
    "src/shared/types",        # Proje genelinde kullanılan TypeScript tipleri
    "src/shared/store",        # Zustand store'ları (birden fazla feature kullananlar)

    # Shared - FontSources için tip tanımları
    "src/shared/types"

    # Stiller
    "src/styles"

) | Out-Null  # Out-Null → klasör oluşturma çıktısını terminale yansıtmaz, temiz görünüm


# ── 6. DOSYALARI OLUŞTUR ────────────────────────────────────

# main.tsx — uygulamanın başlangıç noktası
# global.css'i import eder, App'i render eder
$mainContent = @"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/global.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
"@

# App.tsx — router ve global provider'ların yaşadığı yer
# Feature-Based'de App.tsx iş yapmaz, yönlendirir
$appContent = @"
function App() {
  return (
    <>
      <h1 className="text-3xl font-bold text-red-500 underline">
        Hello world!
      </h1>
    </>
  )
}

export default App
"@

# global.css — Tailwind direktiflerini ve tailwind.css'i içe aktarır
$globalCssContent = @"
@import "tailwindcss";
@import "./tailwind.css";
"@

# tailwind.css — projeye özel Tailwind ayarları ve custom class'lar buraya gelir
$tailwindCssContent = @"
@import "@fontsource/$fontFamilyName/400.css";
@import "@fontsource/$fontFamilyName/500.css";
@import "@fontsource/$fontFamilyName/700.css";

@layer base {
    body {
        font-family: '$fontFamilyName', sans-serif;
        font-size: 1rem;
    }
}
"@

# @fontsource paketleri tip tanımı içermez.
# TypeScript'e "bu modüller var, sorun çıkarma" diyoruz.
$typesFontContent = '@fontsource/*'

$tsconfigContent = @"
{
    "compilerOptions": {
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
        "target": "ES2022",
        "useDefineForClassFields": true,
        "lib": [
            "ES2022",
            "DOM",
            "DOM.Iterable"
        ],
        "module": "ESNext",
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "verbatimModuleSyntax": true,
        "moduleDetection": "force",
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "erasableSyntaxOnly": true,
        "noFallthroughCasesInSwitch": true,
        "noUncheckedSideEffectImports": true,
        // ✅ BUNLARI EKLE
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "./src/*"
            ]
        }
    },
    "include": [
        "src"
    ]
}
"@ 

# Dosyaları yaz
$mainContent      | Out-File -FilePath src/app/main.tsx    -Encoding utf8
$appContent       | Out-File -FilePath src/app/App.tsx     -Encoding utf8
$globalCssContent | Out-File -FilePath src/styles/global.css  -Encoding utf8
$tailwindCssContent | Out-File -FilePath src/styles/tailwind.css -Encoding utf8
$typesFontContent | Out-File -FilePath src/shared/types/fonts.d.ts -Encoding utf8
$tsconfigContent  | Out-File -FilePath tsconfig.app.json   -Encoding utf8


# ── 7. VİTE YAPILANDIRMASI ──────────────────────────────────

# vite.config.ts — Tailwind plugin + @ path alias tanımı
# @ işareti her zaman src/ klasörüne işaret eder
# Örnek: '@/shared/components/Button' → 'src/shared/components/Button'

$fontsTypeFileContext = @"
declare module '@fontsource/*';
"@

$viteConfigContent = @"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // main.tsx'in yeni konumunu Vite'a bildiriyoruz
  root: '.',
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
})
"@

# tsconfig.json — TypeScript @ path alias tanımı
# vite.config.ts ile aynı alias'ı TypeScript'e de tanıtmak gerekir
$tsconfigContent = @"
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
"@

# tsconfig.app.json — main.tsx'in yeni konumunu TypeScript'e bildir
# Varsayılan "src/main.tsx" yerine "src/app/main.tsx" kullanıyoruz
$tsconfigAppPatch = Get-Content tsconfig.app.json -Raw
$tsconfigAppPatch = $tsconfigAppPatch -replace '"include": \["src"\]', '"include": ["src"]'
$tsconfigAppPatch | Out-File -FilePath tsconfig.app.json -Encoding utf8

$fontsTypeFileContext | Out-File -FilePath src/shared/types/fonts.d.ts -Encoding utf8

$viteConfigContent | Out-File -FilePath vite.config.ts  -Encoding utf8
$tsconfigContent   | Out-File -FilePath tsconfig.json   -Encoding utf8


# ── 8. INDEX.HTML'İ GÜNCELLE ────────────────────────────────

# Vite varsayılan olarak src/main.tsx'i arar
# Biz main.tsx'i src/app/ altına taşıdık, index.html'i güncelliyoruz
$indexHtml = Get-Content index.html -Raw
$indexHtml = $indexHtml -replace 'src/main.tsx', 'src/app/main.tsx'
$indexHtml | Out-File -FilePath index.html -Encoding utf8


# ── 9. FONT'U MAIN.TSX'E EKLE ───────────────────────────────

# Seçilen font paketini main.tsx'in en üstüne import et
# @fontsource paketi bu import ile fontu otomatik yükler
# $fontImport → "import '@fontsource/inter'" gibi bir satır üretir
$fontImport = "import '@fontsource/$fontFamilyName'"

# Mevcut main.tsx içeriğini oku, $fontImport'u en üste ekleyerek geri yaz
$mainFile = Get-Content src/app/main.tsx -Raw
$fontImport + "`n" + $mainFile | Out-File -FilePath src/app/main.tsx -Encoding utf8


# ── 10. PUBLIC KLASÖRÜNE IMAGES TAŞI ────────────────────────

# Eğer script'in yanında bir images/ klasörü varsa public/ altına taşır
# public/ klasörü Vite tarafından doğrudan sunulur, import gerekmez
if (Test-Path -Path "../images") {
    Move-Item -Path "../images" -Destination "src/assets" -Force
}


# ── 11. BİTİŞ ───────────────────────────────────────────────

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  $projectName is ready!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Feature-Based klasor yapisi:" -ForegroundColor Yellow
Write-Host "  src/app/          -> main.tsx + App.tsx" -ForegroundColor White
Write-Host "  src/features/     -> her ozellik kendi klasorunde" -ForegroundColor White
Write-Host "  src/shared/       -> ortak component, hook, util" -ForegroundColor White
Write-Host "  src/pages/        -> sayfalari birlestiren katman" -ForegroundColor White
Write-Host "  src/styles/       -> global stiller" -ForegroundColor White
Write-Host ""

# Geliştirme sunucusunu başlat
npm run dev