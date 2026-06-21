import { useContextData } from "@/shared/hooks/useContextData"
import DonationPledge from "./donation-pledges"
import { useData } from "@/shared/hooks/useData"


const DonationAbout = () => {

    const { data: ContextData, isLoading: ContextIsLoading, error: ContextError } = useContextData()
    const { data, isLoading, error } = useData()

    if (ContextIsLoading || isLoading) return <div>Loading...</div>
    if (ContextError) return <div>Error {ContextError.message}</div>
    if (error) return <div>Error {error.message}</div>

    const pledges = ContextData?.heroSection.donateSection.pledgeSection
    const stock = data?.stands

    if (!pledges || !stock) return

    const { bambooStand, blackEdition, MahoganyEdition: mahoganyEdition } = pledges
    const { BambooStand, BlackEdition, MahoganyEdition } = stock

    return (
        <div className="w-full h-auto p-5 bg-white border border-neutral-500/40 rounded-xl py-10 flex flex-col gap-10">
            <h1 className="text-2xl primary-font">{ContextData?.heroSection.donateSection.thirdPart.title}</h1>
            <p className="text-base text-neutral-500">{ContextData?.heroSection.donateSection.thirdPart.description1}</p>
            <p className="text-base text-neutral-500">{ContextData?.heroSection.donateSection.thirdPart.description2}</p>
            <div className="flex flex-col gap-10">
                <DonationPledge product={bambooStand} stock={BambooStand.stock} />
                <DonationPledge product={blackEdition} stock={BlackEdition.stock} />
                <DonationPledge product={mahoganyEdition} stock={MahoganyEdition.stock} />
            </div>
        </div>
    )

}

export default DonationAbout