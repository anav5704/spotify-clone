import { IconType } from "react-icons"
import { twMerge } from "tailwind-merge"
import Link from "next/link"

interface SideBarItemProps {
    icon: IconType,
    label: string, 
    href: string, 
    active?: boolean
}

const SideBarItem = ({ icon: Icon, label, href, active }: SideBarItemProps) => {
  return (
    <Link href={href} className={twMerge("flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1", active && "text-white")}>
        <Icon size={26}/>
        <p className="w-full truncate">{label}</p>
    </Link>
  )
}

export default SideBarItem