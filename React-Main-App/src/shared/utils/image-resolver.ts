/**
 * Asset mapping system.
 *
 * context.json stores image paths as plain strings (e.g. "src/assets/icons/logo.svg").
 * Those strings never pass through Vite's asset pipeline, so in a production build
 * (Vercel) they are not fingerprinted/copied and resolve to 404. This module eagerly
 * imports every asset via import.meta.glob so Vite emits hashed URLs, then maps each
 * JSON string key to its built URL.
 */

// Eager glob -> { "/src/assets/icons/logo.svg": "/assets/logo-<hash>.svg", ... }
const assetModules = import.meta.glob<string>("/src/assets/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const ASSET_PATH = /^\/?src\/assets\//;

/** Resolve a single JSON asset string to its Vite-built URL. */
export const resolveImage = (path?: string | null): string => {
  if (!path) return "";
  const key = path.startsWith("/") ? path : `/${path}`;
  return assetModules[key] ?? path;
};

/**
 * Recursively walk an arbitrary value and replace any "src/assets/..." string
 * with its resolved URL. Non-asset strings and other types pass through unchanged.
 */
export const resolveAssetPaths = <T>(value: T): T => {
  if (typeof value === "string") {
    return (ASSET_PATH.test(value) ? resolveImage(value) : value) as T;
  }
  if (Array.isArray(value)) {
    return value.map(resolveAssetPaths) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, resolveAssetPaths(v)])
    ) as T;
  }
  return value;
};
