import Button from "@/shared/components/ui/Button";
import { useContextData } from "@/shared/hooks/useContextData";
import SelectedPledge from "./selected-pledges";
import { useData } from "@/shared/hooks/useData";
import useSelect from "@/shared/store/selectStore";

const SelectedMain = () => {

    const { data: ContextData, isLoading: ContexIsLoading, error: ContextError } = useContextData()
    const { data, isLoading, error } = useData()
    const { isSelectedActive, setIsSelectedActive } = useSelect()

    if (ContexIsLoading || isLoading) return <div>Loading...</div>
    if (ContextError || error) return <div>Error...</div>

    const noRewards = ContextData?.heroSection.SelectSection
    const stocks = data?.stands

    if (!noRewards || !stocks) return

    const { NoRewards, BambooStand, BlackEdition, MahoganyEdition } = noRewards
    const { BambooStand: bambooStandStock, BlackEdition: blackEditionStock, MahoganyEdition: mahoganyEditionStock } = stocks


    return (
        <div className={`w-full h-full bg-black/50 items-start p-5  absolute z-40 ${isSelectedActive ? "flex" : "hidden"}`}>
            <div className="w-full h-auto max-w-200 mx-auto p-5 pt-10 md:p-10 bg-white rounded-lg flex flex-col gap-5 mt-25">
                <div className="w-full flex items-center justify-between ">
                    <h1 className="text-xl font-semibold md:text-2xl">{ContextData?.heroSection.SelectSection.title}</h1>
                    <Button className="bg-transparent p-0" onClick={() => setIsSelectedActive(false)}>
                        <svg
                            width="15"
                            height="15"
                            xmlns="http://www.w3.org/2000/svg"
                            className="closeIcon"
                        >
                            <path
                                d="M11.314 0l2.828 2.828L9.9 7.071l4.243 4.243-2.828 2.828L7.07 9.9l-4.243 4.243L0 11.314 4.242 7.07 0 2.828 2.828 0l4.243 4.242L11.314 0z"
                                fill="#000"
                                fillRule="evenodd"
                                opacity=".4"
                            />
                        </svg>
                    </Button>
                </div>
                <p className="text-neutral-500 tertiary-font text-sm md:text-base">{ContextData?.heroSection.SelectSection.description}</p>
                <div className="w-full h-auto flex flex-col gap-5">
                    <SelectedPledge
                        product={NoRewards}
                    />
                    <SelectedPledge
                        product={BambooStand}
                        stock={bambooStandStock.stock}
                        minAmount={data.mins.BambooStand}
                        name="BambooStand"
                    />
                    <SelectedPledge
                        product={BlackEdition}
                        stock={blackEditionStock.stock}
                        minAmount={data.mins.BlackEdition}
                        name="BlackEdition"
                    />
                    <SelectedPledge
                        product={MahoganyEdition}
                        stock={mahoganyEditionStock.stock}
                        minAmount={data.mins.MahoganyEdition}
                        name="MahoganyEdition"
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectedMain;