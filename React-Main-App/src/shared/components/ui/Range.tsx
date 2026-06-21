import { cn } from "@/shared/utils/cn"


interface IRangeProps {
    className?: string
    value?: string
}

const Range = ({ className, value }: IRangeProps) => {
    return (
        <div className="w-full h-4 rounded-full relative bg-neutral-500/30">
            <div
                className={cn(` absolute left-0 h-4 bg-(--color-primary-400) rounded-full`, className)}
                style={{ width: `${value}%` }}
            ></div>
        </div>
    )
}

export default Range