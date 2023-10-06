import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import getSongsByUserId from '@/actions/getSongsByUserId'
import SupabaseProvider from "@/providers/SupabaseProvider"
import ToasterProvider from '@/providers/ToasterProvider'
import ModalProvider from '@/providers/ModalProvider'
import UserProvider from '@/providers/UserProvider'
import SideBar from '@/components/SideBar'
import Player from '@/components/Player'
import './globals.css'

const figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Definitely Not Spotify',
    description: 'Listen to music!',
}

export const revalidate = 0

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const userSongs = await getSongsByUserId()

    return (
        <html lang="en">
            <body className={figtree.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <SideBar songs={userSongs}>
                            {children}
                        </SideBar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    )
}
