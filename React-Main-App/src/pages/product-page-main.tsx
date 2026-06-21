import DonationMain from "@/features/donation/components/donation-main"
import SelectedMain from "@/features/selectModal/components/selected-main"
import CompletedModal from "@/shared/components/CompletedModal"
import NavigationNavbar from "@/shared/components/Navigation"
import { useContextData } from "@/shared/hooks/useContextData"
import { useActiveComplete } from "@/shared/store/activeCompleteStore"

const ProductPageMain = () => {

    const { data, isLoading, error } = useContextData()
    const isActiveComplete = useActiveComplete(state => state.isActiveComplete)

    const completeProduct = data?.heroSection.modelComplete || {
        logo: "",
        title: "",
        description: "",
        button: ""
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="w-full min-h-screen bg-gray-100/50 flex flex-col z-50 relative">
            <div className="relative w-full">

                <picture>
                    <source srcSet={data?.heroSection.backgroundImages.desktop} media="(min-width:769px)" />
                    <img src={data?.heroSection.backgroundImages.mobile} alt="Not Avaliable" className=" w-full h-auto block " />
                </picture>
                <div className={`w-full absolute top-0 left-0`}>
                    <NavigationNavbar />
                </div>
            </div>
            <div className={`w-full h-full flex flex-col z-20  p-6`}>
                <DonationMain />
            </div>
            <SelectedMain />
            {isActiveComplete && <CompletedModal completeProduct={completeProduct} />}
        </div>
    )
}

export default ProductPageMain