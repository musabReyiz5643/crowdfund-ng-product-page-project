import { cn } from "@/shared/utils/cn"
import { forwardRef } from "react"


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    type?: "text" | "number"
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <div className={cn("focus-within:border-(--color-primary-400) w-full h-auto px-4 py-3 border-2 border-neutral-500/50 rounded-full flex gap-3 items-center cursor-pointer", className)}>
            <p className="text-base primary-font text-neutral-500">$</p>
            <input
                type={type}
                ref={ref}
                className={"w-full h-auto outline-0  primary-font cursor-pointer"}
                {...props}
            />
        </div>
    )
}
)

Input.displayName = "Input"

export default Input

