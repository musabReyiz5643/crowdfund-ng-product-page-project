import { cn } from "@/shared/utils/cn"

const Radio = ({ isSelected, className }: { isSelected?: boolean, className?: string }) => {
    return (
        <div className={cn("w-[24px] h-[24px] rounded-full border-2 border-neutral-500/50 flex items-center justify-center ", className)}>
            <div className={`w-[12px] h-[12px] rounded-full ${isSelected && "bg-(--color-primary-400)"}`}></div>
        </div>
    )
}

export default Radio