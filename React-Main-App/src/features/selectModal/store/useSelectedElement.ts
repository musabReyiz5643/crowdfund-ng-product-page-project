import { create } from "zustand";
import type { SelectedElementStore } from "../types/store/selected-element";

const useSelectedElement = create<SelectedElementStore>((set) => ({
    selectedElementTitle: "",
    setSelectedElementTitle: (selectedElementTitle: string) => set({ selectedElementTitle })
}));

export default useSelectedElement;