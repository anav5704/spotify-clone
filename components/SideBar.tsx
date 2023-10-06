"use client"

import { HiHome } from "react-icons/hi"  
import { BiSearch } from "react-icons/bi"  
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { twMerge } from "tailwind-merge"
import { Song } from "@/types"
import Box from "./Box"
import SideBarItem from "./SideBarItem"
import Library from "./Library"
import usePlayer from "@/hooks/usePlayer"

interface SideBarProps {
    children: React.ReactNode,
    songs: Song[], 
}

const SideBar = ({ children, songs }: SideBarProps) => {
    const pathname = usePathname()
    const routes = useMemo(() => [  
        {
            icon: HiHome,
            label: "Home", 
            active: pathname !== "/search",
            href: "/"
        },
        {
            icon: BiSearch, 
            label: "Search", 
            active: pathname === "/search",
            href: "/search"
        }
    ], [pathname])

    const player = usePlayer()

    return (
        <div className={twMerge("flex h-full", player.activeId && "h-[calc(100%-80px)]")}>
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map(route => <SideBarItem key={route.label} {...route}/>)}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto md:py-2 md:pr-2">
                { children }
            </main>
        </div>
    )
}

export default SideBar
