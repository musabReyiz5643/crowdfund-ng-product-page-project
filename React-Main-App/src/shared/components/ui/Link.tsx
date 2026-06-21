import { cn } from "@/shared/utils/cn"

interface LinkProps {
    name: string,
    href: string,
    className?: string,
    onClick?: () => void
}

const Link = ({ name, href, className, onClick }: LinkProps) => {
    return (
        <>
            <div
                className={cn(`w-full py-5 px-7 tertiary-font text-black text-lg cursor-pointer`, className)}
                onClick={onClick}
            >
                <a href={href}>{name}</a>
            </div>
            <hr className="border-neutral-500/50" />
        </>
    )
}

export default Link