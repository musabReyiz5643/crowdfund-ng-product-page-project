import Radio from "@/shared/components/ui/Radio"
import type { SelectedProduct } from "../types/components/selected-product"
import Button from "@/shared/components/ui/Button"
import Input from "@/shared/components/ui/Input"
import useSelectedPledge from "../utils/useSelectedPledge"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectPledgesSchema, type SelectPledgesSchemaType } from "../schema/select-pledges"
import { useUpdateData } from "../hooks/useUpdateData"
import { useActiveComplete } from "@/shared/store/activeCompleteStore"
import useSelect from "@/shared/store/selectStore"
import { useState } from "react"

interface SelectedPledgeProps {
    product: SelectedProduct
    stock?: number
    minAmount?: number
    name?: string,
}

const SelectedPledge = ({ product, stock, minAmount, name }: SelectedPledgeProps) => {

    const [isTitleHovered, setIsTıtleHovered] = useState<boolean>(false)
    const { setSelectedElementTitle, isNoReward, isStockOutOf, isSelected } = useSelectedPledge(product, stock!)
    const {
        mutationNoReward,
        mutationNoRewardPending,
        mutationOptions,
        mutationOptionsPending } = useUpdateData()
    const setIsActiveComplete = useActiveComplete(state => state.setIsActiveComplete)
    const setIsSelectedActive = useSelect(state => state.setIsSelectedActive)

    const schema = SelectPledgesSchema(minAmount ?? 0)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            pledgeAmount: minAmount ?? 0
        },
        resolver: zodResolver(schema),
        mode: "onChange",
    })

    const onSubmit = (data: SelectPledgesSchemaType) => {
        isNoReward ? (
            mutationNoReward.mutate({
                pledgeAmount: data.pledgeAmount
            }, {
                onSuccess: () => {
                    reset();
                    setIsActiveComplete(true)
                    setIsSelectedActive(false)
                }
            })
        ) : (
            mutationOptions.mutate({
                selectedPledge: name as "BambooStand" | "BlackEdition" | "MahoganyEdition",
                pledgeAmount: data.pledgeAmount
            }, {
                onSuccess: () => {
                    reset();
                    setIsActiveComplete(true)
                    setIsSelectedActive(false)
                }
            })
        )
    }
    return (
        <div className={`w-full h-auto p-5 py-7 border-2 md:py-10 rounded-lg flex items-center justify-start flex-col gap-5 md:gap-10  ${isStockOutOf && "opacity-60"} ${isSelected ? "border-(--color-primary-400)" : "border-neutral-500/50"} overflow-hidden`}>
            <div className="w-full flex items-start  justify-start gap-5 ">
                <Button
                    className={`bg-transparent p-0 border-2 `}
                    disabled={isStockOutOf}
                    type="button"
                    onClick={() => { setSelectedElementTitle(product.title) }}
                >
                    <Radio isSelected={isSelected} className={`${isTitleHovered && !isStockOutOf && "border-(--color-primary-400)"}`} />
                </Button>
                <div className="w-full h-full flex-col flex items-start md:gap-5">
                    <div className="w-full h-full flex items-center justify-between ">
                        <div className="flex items-start justify-center md:flex-row md:items-center md:gap-3 gap-1 md:justify-between flex-col ">
                            <h1
                                className="primary-font hover:text-(--color-primary-400) transition-colors duration-150 cursor-pointer"
                                onMouseEnter={() => setIsTıtleHovered(true)}
                                onMouseLeave={() => setIsTıtleHovered(false)}
                            >{product.title}
                            </h1>
                            <span className="text-(--color-primary-400) primary-font text-sm">{product.price}</span>
                        </div>
                        {!isNoReward && (
                            <div className="w-auto  items-center justify-end gap-2  hidden md:flex">
                                <span className="primary-font text-black text-xl">{stock}</span>
                                <span className="tertiary-font text-neutral-500 text-base">left</span>
                            </div>
                        )}
                    </div>
                    <p className="text-neutral-500  tertiary-font hidden md:block">{product.description}</p>
                </div>
            </div>
            <p className="text-neutral-500  tertiary-font block md:hidden">{product.description}</p>


            {!isNoReward && (
                <div className="w-full flex items-center justify-start gap-2 md:hidden">
                    <span className="primary-font text-black text-xl">{stock}</span>
                    <span className="tertiary-font text-neutral-500 text-base">left</span>
                </div>
            )}
            {isSelected && (

                <div className="w-full relative flex flex-col gap-5 items-center justify-center ">
                    <div className=" w-300 h-[0.1px] bg-neutral-500/50"></div>
                    <div className="pt-5 flex flex-col items-center justify-center md:justify-between w-full gap-5 md:flex-row ">
                        <h1 className="text-neutral-500 tertiary-font">{product.inform}</h1>
                        <div className="w-full md:w-auto grid grid-cols-2 md:flex-row md:flex gap-5 ">
                            <Input
                                type="number"
                                className={`pl-7 md:pl-5 w-full  md:max-w-30
                            ${errors.pledgeAmount && "border-red-400"}`}
                                {...register("pledgeAmount")}
                            />
                            <Button
                                type="button" onClick={handleSubmit(onSubmit)}

                                disabled={isNoReward ? mutationNoRewardPending : mutationOptionsPending}
                                className={`md:w-auto hover:bg-(--color-primary-700)
                                 ${isNoReward ? mutationNoRewardPending : mutationOptionsPending ?
                                        "bg-neutral-500" : ""}
                                `}
                            >
                                {product.button}
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )

}

export default SelectedPledge