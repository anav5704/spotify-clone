"use client"

import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { FaUserAlt } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { useUser } from "@/hooks/useUser"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import { toast } from "react-hot-toast"
import useAuthModal from "@/hooks/useAuthModal"
import Button from "./Button"

interface HeaderProps {
    children: React.ReactNode,
    className? :string,
}

const Header = ({ children, className }: HeaderProps) => {
    const supabaseClient = useSupabaseClient()
    const {  onOpen } = useAuthModal()
    const { user } = useUser()
    const router = useRouter()

    const handleLogout = async () => {
       const { error } = await supabaseClient.auth.signOut()
       error ? toast.error(error.message) : toast.success("Successfully logged out!") 
       router.refresh()
    }

  return (
    <div className={twMerge("h-fit bg-gradient-to-b from-emerald-800 p-6", className)}>
        <div className="w-full mb-4 flex items-center justify-between">
            <div className="hidden md:flex gap-x-2 items-center">
                <button onClick={() => router.back()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                    <RxCaretLeft size={35} className="text-white"/>
                </button>
                <button onClick={() => router.forward()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                    <RxCaretRight size={35} className="text-white"/>
                </button>
            </div>
            <div className="flex md:hidden gap-x-2 items-center">
                <button onClick={() => router.push("/")} className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                    <HiHome size={20} className="text-black"/>
                </button>
                <button onClick={() => router.push("/search")} className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                    <BiSearch size={20} className="text-black"/>
                </button>
            </div>
            <div className="flex justify-between items-center gap-x-4">
                {user ? (
                    <div className="flex gap-x-4 items-center">
                         <Button onClick={handleLogout} className="bg-white px-6 py-2">
                                Logout
                            </Button>  
                            <Button className="bg-white">
                                <FaUserAlt />
                            </Button>  
                    </div>
                ) : (
                    <>
                        <div>
                            <Button onClick={onOpen} className="bg-transparent text-neutral-300 font-medium">
                                Sign Up
                            </Button>   
                        </div>
                        <div>
                            <Button onClick={onOpen} className="bg-white px-6 py-2">
                                Log In
                            </Button>   
                        </div>
                    </>
                )}
            </div>
        </div>
        { children }
    </div>
  )
}

export default Header
