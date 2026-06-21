import { contextData } from "@/shared/api/contextData"
import { useQuery } from "@tanstack/react-query"
import type { ContextType } from "../types/data/context"

export const useContextData = () => {
    const { data, isLoading, error } = useQuery<ContextType>({
        queryKey: ['contextData'],
        queryFn: () => contextData(),
    })
    return { data, isLoading, error }
}