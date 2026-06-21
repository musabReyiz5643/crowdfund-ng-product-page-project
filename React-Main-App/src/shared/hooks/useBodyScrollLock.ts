import { useEffect } from "react"

export const useBodyScrollLock = (isActive: boolean) => {
    useEffect(() => {
        document.body.style.overflow = isActive ? 'hidden' : 'auto'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isActive])
}