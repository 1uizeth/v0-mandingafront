"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { getCircleBySlug, type Circle } from "@/lib/circles"
import { useParams } from "next/navigation"

// Format number consistently (avoids hydration mismatch from toLocaleString)
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// ===== DESIGN TOKENS: Typography System =====
// Global typography tokens for consistent sizing/spacing/weight across all components
const TYPOGRAPHY = {
  // Display: Large hero numbers like "$20,000"
  display: "text-5xl font-bold",
  
  // Headings: Card titles, section headers
  h1: "text-2xl font-bold",
  h2: "text-lg font-semibold", 
  h3: "text-base font-semibold",
  
  // Body text: Default paragraph content
  body: "text-sm font-normal",
  
  // Body muted: Secondary copy, descriptions
  bodyMuted: "text-xs font-bold text-[#999999]",
  
  // Labels: Small labels like "Started on", "Payout"
  label: "text-xs font-bold text-[#666666]",
  
  // Caption: Tiny metadata like "1d ago", "01/24"
  caption: "text-xs font-bold text-[#999999]",
  
  // Button: Button and link text
  button: "text-sm font-medium",
}

// ===== DESIGN TOKENS: Spacing & Padding System =====
// All cards use a unified token system for visual consistency
const PADDING_XS = "p-2"   // 8px
const PADDING_S = "p-3"    // 12px
const PADDING_M = "p-4"    // 16px
const PADDING_L = "p-5"    // 20px
const PADDING_XL = "p-6"   // 24px

const GAP_XS = "gap-1"     // 4px
const GAP_S = "gap-2"      // 8px
const GAP_M = "gap-4"      // 16px
const GAP_L = "gap-6"      // 24px
const GAP_XL = "gap-8"     // 32px

// Grid gap token (unified for all card-to-card spacing)
const GRID_GAP = "gap-6"     // 24px - consistent horizontal and vertical spacing

// Mock connected wallet ENS name
const MOCK_WALLET_ENS = "1uiz.eth"

// Wallet Button Component with disconnect on hover
function WalletButton({ onDisconnect }: { onDisconnect: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative rounded-full border border-[#E5E5E5] px-4 py-1.5 md:px-6 md:py-2 text-sm font-medium text-[#1A1A1A] whitespace-nowrap cursor-pointer transition-colors hover:bg-[#FAFAFA]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <button
          onClick={onDisconnect}
          className="text-[#1A1A1A] transition-colors hover:text-[#666666]"
        >
          Disconnect
        </button>
      ) : (
        <span>{MOCK_WALLET_ENS}</span>
      )}
    </div>
  )
}

function Header({ circle, isWalletConnected, onConnectWallet, onDisconnectWallet }: { circle: Circle; isWalletConnected: boolean; onConnectWallet: () => void; onDisconnectWallet: () => void }) {
  return (
    <header 
      className="mx-auto max-w-[1280px] w-full px-6 md:px-10 pt-6 pb-6"
    >
      {/* Mobile + Tablet Header (<1024px): Two rows - controls then title */}
      <div className="flex flex-col gap-6 lg:hidden">
        {/* Row 1: Back button + Connect wallet */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base whitespace-nowrap">Back</span>
          </Link>
          <div>
            {isWalletConnected ? (
              <WalletButton onDisconnect={onDisconnectWallet} />
            ) : (
              <Button 
                variant="outline" 
                className="rounded-full border-[#E5E5E5] px-4 py-1.5 text-sm font-medium text-[#1A1A1A] hover:bg-[#F5F5F5] bg-transparent"
                onClick={onConnectWallet}
              >
                Connect wallet
              </Button>
            )}
          </div>
        </div>

        {/* Row 2: Title - centered */}
        <h1 className="text-xl font-semibold text-[#1A1A1A] text-center">
          ${formatNumber(circle.amount)} {circle.title}
        </h1>
      </div>

      {/* Desktop Header (1024px+) - 3-column grid: left auto-center auto-right */}
      <div 
        className="hidden lg:grid items-center min-h-[72px]"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        {/* Column 1: Back button - start aligned */}
        <div className="justify-self-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70 whitespace-nowrap"
          >
            <ArrowLeft className="h-5 w-5 flex-shrink-0" />
            <span>Back</span>
          </Link>
        </div>

        {/* Column 2: Title - always centered */}
        <div className="justify-self-center text-center whitespace-nowrap">
          <h1 className="text-lg font-semibold text-[#1A1A1A]">
            ${formatNumber(circle.amount)} {circle.title}
          </h1>
        </div>

        {/* Column 3: Wallet - end aligned */}
        <div className="justify-self-end">
          {isWalletConnected ? (
            <WalletButton onDisconnect={onDisconnectWallet} />
          ) : (
            <Button 
              variant="outline" 
              className="rounded-full border-[#E5E5E5] px-6 py-2 text-sm font-medium text-[#1A1A1A] hover:bg-[#F5F5F5] bg-transparent whitespace-nowrap"
              onClick={onConnectWallet}
            >
              Connect wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

// FULL CARD: Timeline (Started on / Ends on)
// Compact, content-driven layout - no min-height or forced height
function TimelineCard({ circle }: { circle: Circle }) {
  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col ${GAP_M}`}>
      {/* Row 1: Started on */}
      <div className="flex items-center justify-between">
        <p className={TYPOGRAPHY.label}>Started on</p>
        <p className="font-semibold text-[#1A1A1A] whitespace-nowrap">{circle.startDate}</p>
      </div>
      {/* Row 2: Ends on */}
      <div className="flex items-center justify-between">
        <p className={TYPOGRAPHY.label}>Ends on</p>
        <p className="font-semibold text-[#1A1A1A] whitespace-nowrap">{circle.endDate}</p>
      </div>
      </div>
    )
  }

// Simple placeholder card for Payout Progress
function PayoutCard({ circle }: { circle: Circle }) {
  const progressPercentage = Math.max(1, (circle.payoutProgress / circle.durationMonths) * 100)
  
  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col gap-3`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={TYPOGRAPHY.label}>Payouts</span>
        <span className={TYPOGRAPHY.caption}>
          {String(circle.payoutProgress).padStart(2, "0")}/{circle.durationMonths}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5] relative">
        <div
          className="h-full bg-[#1A1A1A] rounded-full transition-all"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Round info */}
      <div className="flex items-start justify-between gap-1">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-[#1A1A1A]">Round {circle.payoutProgress}</span>
          <span className={TYPOGRAPHY.label}>Next round</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="font-semibold text-[#1A1A1A] whitespace-nowrap">{circle.payoutDueDate}</span>
          <span className={TYPOGRAPHY.label}>2026</span>
        </div>
      </div>
    </div>
  )
}

// Simple placeholder for CTA
function CTACard({ circle, hasJoined }: { circle: Circle; hasJoined: boolean }) {
  if (hasJoined) {
    return (
      <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L}`}>
        <div className="flex items-center justify-center gap-2 text-[#10B981]">
          <Check className="h-5 w-5" />
          <span className="font-semibold">You've joined this circle</span>
        </div>
      </div>
    )
  }
  
  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col ${GAP_M}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-[#1A1A1A]">${formatNumber(circle.monthlyPayment)}/mo</p>
          <p className={TYPOGRAPHY.label}>for {circle.durationMonths} months</p>
        </div>
        <Link href="/join">
          <Button className="rounded-full bg-[#1A1A1A] px-6 py-2 text-sm font-semibold text-white hover:bg-[#333333]">
            Join now
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Circle not found component
function CircleNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-4">Circle not found</h1>
        <p className="text-[#666666] mb-8">The circle you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button className="rounded-full bg-[#1A1A1A] px-6 py-2 text-sm font-semibold text-white hover:bg-[#333333]">
            Back to Circles
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function CircleDetailPage() {
  const params = useParams()
  const circleSlug = params.circleSlug as string
  const { toast } = useToast()
  
  // Get circle data from slug
  const circle = getCircleBySlug(circleSlug)
  
  // State for wallet connection
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  
  // State for join status - read from localStorage
  const [hasJoined, setHasJoined] = useState(false)
  
  // Load wallet and join state from localStorage on mount
  useEffect(() => {
    const walletConnected = localStorage.getItem('isWalletConnected') === 'true'
    const joined = localStorage.getItem('hasJoined') === 'true'
    
    setIsWalletConnected(walletConnected)
    setHasJoined(joined)
    
    console.log('[v0] Loaded state:', { walletConnected, joined, slug: circleSlug })
  }, [circleSlug])
  
  // Handle connect wallet
  const handleConnectWallet = () => {
    console.log('[v0] Connecting wallet...')
    setTimeout(() => {
      setIsWalletConnected(true)
      localStorage.setItem('isWalletConnected', 'true')
      toast({
        description: "Wallet connected successfully",
      })
      console.log('[v0] Wallet connected')
    }, 500)
  }
  
  // Handle disconnect wallet
  const handleDisconnectWallet = () => {
    console.log('[v0] Disconnecting wallet...')
    setIsWalletConnected(false)
    localStorage.removeItem('isWalletConnected')
    toast({
      description: "Wallet disconnected",
    })
    console.log('[v0] Wallet disconnected')
  }
  
  // If circle not found, show error state
  if (!circle) {
    return <CircleNotFound />
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header 
        circle={circle}
        isWalletConnected={isWalletConnected}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />
      
      {/* Main content */}
      <main className="mx-auto max-w-[1280px] w-full px-6 md:px-10 pb-20">
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${GRID_GAP}`}>
          <TimelineCard circle={circle} />
          <PayoutCard circle={circle} />
          <CTACard circle={circle} hasJoined={hasJoined} />
        </div>
      </main>
      
      <Toaster />
    </div>
  )
}
