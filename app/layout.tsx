import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Patrick_Hand, Share_Tech_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
export const patrickHand = Patrick_Hand({ weight: '400', subsets: ['latin'], variable: '--font-patrick-hand' })
export const shareTechMono = Share_Tech_Mono({ weight: '400', subsets: ['latin'], variable: '--font-share-tech-mono' })

export const metadata: Metadata = {
  title: 'Funding Circle - Devcon 2026',
  description: 'Join a $20,000 funding circle for Devcon 2026 with early entry benefits',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${patrickHand.variable} ${shareTechMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
