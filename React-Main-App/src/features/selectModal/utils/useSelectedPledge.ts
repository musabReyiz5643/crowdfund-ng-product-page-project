import useSelectedElement from "../store/useSelectedElement"
import type { SelectedProduct } from "../types/components/selected-product"

const useSelectedPledge = (product: SelectedProduct, stock: number) => {

    const { selectedElementTitle, setSelectedElementTitle } = useSelectedElement()

    const isNoReward = product.price?.trim().length === 0
    const isStockOutOf = stock === 0
    const isSelected = selectedElementTitle === product.title

    return { selectedElementTitle, setSelectedElementTitle, isNoReward, isStockOutOf, isSelected }

}

export default useSelectedPledge