import { create } from "zustand";
import type { ActiveCompleteStore } from "../types/store/activeCompleteStore";

export const useActiveComplete = create<ActiveCompleteStore>((set) => ({
    isActiveComplete: false,
    setIsActiveComplete: (isActiveComplete: boolean) => set(() => ({ isActiveComplete }))
}))