
import Button from "@/shared/components/ui/Button"
import { useContextData } from "@/shared/hooks/useContextData"
import useSelect from "@/shared/store/selectStore"
import { useState } from "react"

const DonationHeader = () => {

    const [isActiveBookmark, setIsActiveBookmark] = useState(false)

    const { data, isLoading, error } = useContextData()
    const { setIsSelectedActive } = useSelect()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="w-full h-auto bg-white text-white p-5 md:p-10  flex flex-col gap-5 border border-neutral-500/40 rounded-2xl relative">
            <img src={data?.heroSection.donateSection.logo} alt="Not Avaliable" width={60} height={60} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="text-black flex flex-col gap-5 text-center mt-10">
                <h1 className="primary-font text-2xl md:text-3xl">{data?.heroSection.donateSection.firstPart.title}</h1>
                <p className="tertiary-font text-base text-neutral-500 ">{data?.heroSection.donateSection.firstPart.description}</p>
                <div className="w-full grid grid-cols-[1fr_auto] gap-4 md:mt-5">
                    <Button type="button" className="w-full md:w-55 py-4 hover:bg-(--color-primary-700) " onClick={() => setIsSelectedActive(true)}>
                        {data?.heroSection.donateSection.firstPart.button.text}
                    </Button>
                    <div className="relative w-full flex justify-start items-center bg-neutral-500/20 rounded-full md:gap-3 md:pr-5 group  cursor-pointer" onClick={() => setIsActiveBookmark(prev => !prev)}>
                        <Button className="p-0 w-auto h-full ">
                            <svg
                                width="56"
                                height="56"
                                xmlns="http://www.w3.org/2000/svg"
                                className="bookMark"
                            >
                                <g
                                    fill="none"
                                    fill-rule="evenodd"
                                >
                                    <circle
                                        fill="#2F2F2F"
                                        cx="28"
                                        cy="28"
                                        r="28"
                                        className={`group-hover:fill-neutral-500 ${isActiveBookmark && "fill-(--color-primary-400)"}`} />
                                    <path fill="#B1B1B1" className={`${isActiveBookmark && "fill-white"}`} d="M23 19v18l5-5.058L33 37V19z" />
                                </g>
                            </svg>
                        </Button>
                        <span className={`${isActiveBookmark ? "text-(--color-primary-400)" : "text-neutral-500"} primary-font  hidden md:block`}>Bookmark</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonationHeader