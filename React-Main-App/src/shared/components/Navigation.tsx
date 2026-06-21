import { useBodyScrollLock } from "../hooks/useBodyScrollLock"
import { useContextData } from "../hooks/useContextData"
import useSelect from "../store/selectStore"
import Link from "@/shared/components/ui/Link"

const NavigationNavbar = () => {

    const { data: ContextData, isLoading, error } = useContextData()
    const { isActive, setIsActive } = useSelect()

    const dataLinks = ContextData?.heroSection.Navbar.links || []

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    useBodyScrollLock(!!isActive)

    return (
        <div className="w-full h-auto  relative z-40 p-6  max-w-350 mx-auto">
            <div className="w-full flex items-center justify-between z-40">
                <div className="w-auto h-auto ">
                    <img src={ContextData?.heroSection.logo} alt="Not Avaliable" />
                </div>
                <button className="w-auto h-auto md:hidden" type="button" onClick={() => setIsActive(!isActive)}>
                    {
                        !isActive ? (
                            <img src={ContextData?.heroSection.Navbar.icons.openIcon} alt="Not Avaliable" />
                        ) : (
                            <img src={ContextData?.heroSection.Navbar.icons.closeIcon} alt="Not Avaliable" />
                        )
                    }
                </button>

                <div className="w-auto h-auto hidden md:flex ">
                    {
                        dataLinks.map((link, index) => (
                            <Link
                                key={index}
                                name={link.name}
                                href={link.href}
                                className="w-auto text-white primary-font"
                            />
                        ))
                    }
                </div>
            </div>

            {isActive && (
                <div className="absolute p-6 w-full flex items-start pt-20 h-screen bg-black/50 inset-0 -z-10 ">
                    <div className="w-full bg-white rounded-xl flex flex-col ">
                        {dataLinks.map((link, index) => (
                            <Link
                                key={index}
                                name={link.name}
                                href={link.href}
                            />
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default NavigationNavbar