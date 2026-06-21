import Button from "@/shared/components/ui/Button"
import type { IProduct } from "../types/donation-pledge"
import { useDonationPledgeStock } from "../utils/useDonationPledge"


const DonationPledge = ({ product, stock, onHandle }: IProduct) => {
    const { isInStock } = useDonationPledgeStock(stock)

    return (
        <div className={`w-full ${!isInStock && "opacity-60 "} p-7 md:p-10 h-auto flex flex-col gap-5 bg-white border border-neutral-500/50 rounded-xl`}>
            <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between">
                <h1 className="primary-font text-base">{product.title}</h1>
                <p className="tertiary-font text-base text-(--color-primary-400)">{product.price}</p>
            </div>
            <p className="text-neutral-500 text-base tertiary-font">{product.description}</p>
            <div className="w-full flex flex-col  md:flex-row md:justify-between items-start gap-5">
                <div className="flex items-center justify-start gap-2">
                    <span className="primary-font text-4xl">{stock}</span>
                    <span className="primary-font text-base text-neutral-500/70">left</span>
                </div>
                <Button
                    className={`w-fit h-auto px-7 py-4  hover:bg-(--color-primary-700) ${!isInStock && "bg-neutral-500"}`}
                    disabled={!isInStock}
                    onClick={() => onHandle}
                >
                    {isInStock ? product.button.active : product.button.inActive}
                </Button>
            </div>
        </div>
    )

}

export default DonationPledge