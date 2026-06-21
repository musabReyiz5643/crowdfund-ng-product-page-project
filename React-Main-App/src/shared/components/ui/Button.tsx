import { cn } from "@/shared/utils/cn"

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    className?: string
}

const Button = ({ children, className, ...props }: IButtonProps) => {
    return (
        <button
            {...props}
            className={cn("w-auto h-auto text-white bg-(--color-primary-400) rounded-full py-3 px-5 cursor-pointer  transition-colors duration-300 text-base primary-font", className)}
        >
            {children}
        </button>
    )
}

export default Button