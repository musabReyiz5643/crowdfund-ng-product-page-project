import type { ContextType } from "../types/data/context";

export const contextData = async (): Promise<ContextType> => {
    const response = await fetch("/data/context.json");
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
}