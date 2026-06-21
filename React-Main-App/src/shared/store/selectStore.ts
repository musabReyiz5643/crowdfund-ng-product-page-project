import { create } from "zustand"
import type { SelectState } from "../types/store/selectStore"

const useSelect = create<SelectState>()((set) => ({
    isActive: false,
    setIsActive: (isActive: Boolean) => set({ isActive }),

    isSelectedActive: false,
    setIsSelectedActive: (isSelectedActive: Boolean) => set({ isSelectedActive }),
}))

export default useSelect