import { useQuery } from "@tanstack/react-query"

import type { DataType } from "../types/data/data"
import { getData } from "../api/data"


export const useData = () => {
    const { data, isLoading, error } = useQuery<DataType>({
        queryKey: ['getData'],
        queryFn: () => getData(),
    })
    return { data, isLoading, error }
}