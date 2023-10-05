import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SupabaseProvider from "@/providers/SupabaseProvider"
import ToasterProvider from '@/providers/ToasterProvider'
import ModalProvider from '@/providers/ModalProvider'
import UserProvider from '@/providers/UserProvider'
import SideBar from '@/components/SideBar'
import './globals.css'

const figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Spotify',
    description: 'Listen to music!',
}   

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={figtree.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <SideBar>
                            { children }
                        </SideBar>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    )
}
