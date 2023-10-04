import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from '@/providers/userProvider'
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
                <SupabaseProvider>
                    <UserProvider>
                        <SideBar>
                            {children}
                        </SideBar>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    )
}
