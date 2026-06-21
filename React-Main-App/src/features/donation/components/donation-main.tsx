import DonationAbout from "./donation-about"
import DonationBackers from "./donation-backers"
import DonationHeader from "./donation-header"

const DonationMain = () => {
    return (
        <div className="w-full h-full gap-10 flex flex-col -mt-20 max-w-200 mx-auto">
            <DonationHeader />
            <DonationBackers />
            <DonationAbout />
        </div>
    )
}

export default DonationMain