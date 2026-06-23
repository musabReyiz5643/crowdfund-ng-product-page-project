import { contextData } from "@/shared/api/contextData"
import { useQuery } from "@tanstack/react-query"
import type { ContextType } from "../types/data/context"
import { resolveAssetPaths } from "@/shared/utils/image-resolver"

export const useContextData = () => {
    const { data, isLoading, error } = useQuery<ContextType>({
        queryKey: ['contextData'],
        queryFn: async () => resolveAssetPaths(await contextData()),
    })
    return { data, isLoading, error }
}