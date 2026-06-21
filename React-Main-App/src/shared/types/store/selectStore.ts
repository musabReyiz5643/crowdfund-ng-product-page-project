export interface SelectState {
    isActive: Boolean
    setIsActive: (isActive: Boolean) => void

    isSelectedActive: Boolean
    setIsSelectedActive: (isSelectedActive: Boolean) => void
}