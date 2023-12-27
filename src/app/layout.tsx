import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import '@ionic/react/css/core.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Market Application',
  description: 'A market application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
