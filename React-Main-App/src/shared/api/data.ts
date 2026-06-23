import type { DataType } from "../types/data/data"

export const getData = async (): Promise<DataType> => {
    const res = await fetch("/data/data.json")
    if (!res.ok) throw new Error("Error Fetching Data")
    return res.json()
}