"use client"

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { useEffect } from "react"
import useAuthModal from "@/hooks/useAuthModal"
import Modal from "./Modal"

const AuthModal = () => {
    const supabaseClient = useSupabaseClient()
    const { session } = useSessionContext()
    const {  onClose, isOpen } = useAuthModal()
    const router = useRouter()

    useEffect(() => {
        if(session){
            router.refresh()
            onClose()
        }
    }, [session, router, onClose])

    const handleChange = (open: boolean) => {
        if(!open){
            onClose()
        }
    }

  return (
    <Modal isOpen={isOpen} onChange={handleChange} title="Spotify by Anav">
        <Auth theme="dark" magicLink providers={["github"]} supabaseClient={supabaseClient}  appearance={{theme: ThemeSupa, variables: {default: {colors: {brand: "#404040", brandAccent: "#22c55e"}}}}}/>
    </Modal>
  )
}

export default AuthModal
