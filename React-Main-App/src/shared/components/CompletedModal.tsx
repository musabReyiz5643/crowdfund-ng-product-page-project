import type { CompletedModalProps } from "../types/data/context"
import Button from "./ui/Button"
import { useActiveComplete } from "../store/activeCompleteStore"

const CompletedModal = ({ completeProduct }: { completeProduct: CompletedModalProps }) => {

    const setIsActiveComplete = useActiveComplete(state => state.setIsActiveComplete)

    return (
        <div className="fixed w-full min-h-screen h-full bg-black/40 flex items-center justify-center z-50 p-6">
            <div className="w-full max-w-120 p-6 md:p-10 md:py-12 bg-white rounded-xl flex flex-col items-center justify-center gap-5 text-center">

                <img src={completeProduct.logo} alt="" />
                <h1 className="primary-font text-xl">{completeProduct.title}</h1>
                <p className="tertiary-font md:text-sm text-neutral-500 text-base">{completeProduct.description}</p>
                <Button className="py-4 px-10 md:text-sm hover:bg-(--color-primary-700)" onClick={() => setIsActiveComplete(false)}>{completeProduct.button}</Button>
            </div>
        </div>
    )
}

export default CompletedModal