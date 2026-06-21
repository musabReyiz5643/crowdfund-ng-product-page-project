import Range from "@/shared/components/ui/Range";
import { useContextData } from "@/shared/hooks/useContextData";
import { useData } from "@/shared/hooks/useData";
import { formatPrice } from "@/shared/utils/format-price";
import { useProgressValue } from "../utils/useProgressValue";

const DonationBackers = () => {
  const { data, isLoading, error } = useData();
  const {
    data: contextData,
    isLoading: isLoadingContext,
    error: ContextError,
  } = useContextData();

  if (isLoading || isLoadingContext) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (ContextError) return <div>Error : {ContextError.message}</div>;

  const result = useProgressValue(100000, data?.header.totalBacked!);

  return (
    <div className="w-full h-auto p-5 bg-white border border-neutral-500/40 rounded-xl md:p-10 md:py-15 py-10">
      <div className="w-full flex flex-col items-center justify-center md:justify-start gap-5 md:gap-20 mb-5 md:flex-row h-full">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-4xl primary-font ">
            {formatPrice(data?.header.totalBacked)}
          </h1>
          <p className="text-sm text-neutral-500 tertiary-font">
            {contextData?.heroSection.donateSection.secondPart.totalPrice}
          </p>
        </div>
        <div className="w-1/3 h-[0.1px] md:w-[0.1px] md:h-20 bg-neutral-500/50 "></div>
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-4xl primary-font ">
            {data?.header.totalBackers.toLocaleString()}
          </h1>
          <p className="text-sm text-neutral-500 tertiary-font">
            {contextData?.heroSection.donateSection.secondPart.totalBackers}
          </p>
        </div>
        <div className="w-1/3 h-[0.1px] md:w-[0.1px] md:h-20 bg-neutral-500/50 "></div>
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-4xl primary-font ">{data?.header.daysLeft}</h1>
          <p className="text-sm text-neutral-500 tertiary-font">
            {contextData?.heroSection.donateSection.secondPart.leftDays}
          </p>
        </div>
      </div>
      <Range value={result.toFixed(2)} />
    </div>
  );
};

export default DonationBackers;
