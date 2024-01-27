import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupaBaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/userProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'GListen to music',
}

export const revalidate=0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs=await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupaBaseProvider>
        <UserProvider>
        <ModalProvider/> 
        <Sidebar songs={userSongs}>
         
        {children}
        </Sidebar>
        <Player/>
        </UserProvider>
        </SupaBaseProvider>
      </body>
    </html>
  )
}
