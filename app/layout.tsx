import React from "react"
import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Patrick_Hand, Share_Tech_Mono } from 'next/font/google'

import './globals.css'

export const patrickHand = Patrick_Hand({ weight: '400', subsets: ['latin'], variable: '--font-patrick-hand' })
export const shareTechMono = Share_Tech_Mono({ weight: '400', subsets: ['latin'], variable: '--font-share-tech-mono' })

export const metadata: Metadata = {
  title: 'Funding Circle - Devcon 2026',
  description: 'Join a $20,000 funding circle for Devcon 2026 with early entry benefits',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${patrickHand.variable} ${shareTechMono.variable} bg-background`}>
      <body className={`${GeistSans.className} antialiased`}>{children}</body>
    </html>
  )
}
