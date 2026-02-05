"use client"

import { ArrowLeft, Loader2, Wallet } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

// Format number consistently (avoids hydration mismatch from toLocaleString)
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Mock data for the funding circle
const circleData = {
  status: "active" as const,
  amount: 20000,
  title: "for Devcon 2026",
  slotsLeft: 21,
  startDate: "February 1, 2026",
  endDate: "March 1, 2028",
  monthlyAmount: 892,
  totalMonths: 24,
  currentMonth: 1,
  earlyEntryMonths: [2, 3, 4, 5, 6, 7, 8],
  payoutProgress: 1,
  installmentProgress: 1,
  dueAmount: 892,
  payoutDueDate: "March 1",
  ensDomain: "housing.mandinga.eth",
  ensUrl: "https://app.ens.domains/housing.mandinga.eth",
  arcscanUrl: "https://arcscan.io",
  members: [
    { name: "sassai.eth", joinedDaysAgo: 1 },
    { name: "vitalik.eth", joinedDaysAgo: 2 },
    { name: "1uiz.eth", joinedDaysAgo: 3 },
  ],
}

// Mock connected wallet ENS name
const MOCK_WALLET_ENS = "user.eth"

// Join flow states
type JoinState = "review" | "signing"

function Header() {
  return (
    <header 
      className="mx-auto max-w-[1280px] w-full px-6 md:px-10"
      style={{ 
        paddingTop: 'clamp(32px, 6vh, 64px)', 
        paddingBottom: 'clamp(24px, 4vh, 48px)' 
      }}
    >
      {/* Mobile + Tablet Header (<1024px): 2-row layout */}
      <div className="flex lg:hidden flex-col gap-4">
        {/* Row 1: Back (left) + ENS (right) */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base whitespace-nowrap">Back</span>
          </Link>
          <div className="rounded-full border border-[#E5E5E5] px-4 py-1.5 text-sm font-medium text-[#1A1A1A]">
            {MOCK_WALLET_ENS}
          </div>
        </div>
        
        {/* Row 2: Title only - centered */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            ${formatNumber(circleData.amount)}
          </h1>
          <p className="text-sm md:text-base text-[#1A1A1A]">{circleData.title}</p>
        </div>
      </div>

      {/* Desktop Header (1024px+) - 5-column grid */}
      <div 
        className="hidden lg:grid items-center min-h-[72px]"
        style={{ gridTemplateColumns: 'auto 1fr max-content 1fr auto' }}
      >
        {/* Column 1: Back button */}
        <Link
          href="/"
          className="justify-self-start flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70 whitespace-nowrap min-w-0"
        >
          <ArrowLeft className="h-5 w-5 flex-shrink-0" />
          <span>Back</span>
        </Link>

        {/* Column 2: Flexible spacer */}
        <div />

        {/* Column 3: Title block */}
        <div className="justify-self-center text-center flex flex-col items-center gap-1 whitespace-nowrap">
          <h1 className="text-5xl font-bold text-[#1A1A1A]">
            ${formatNumber(circleData.amount)}
          </h1>
          <p className="text-lg text-[#1A1A1A]">{circleData.title}</p>
        </div>

        {/* Column 4: Flexible spacer */}
        <div />

        {/* Column 5: ENS name */}
        <div className="justify-self-end rounded-full border border-[#E5E5E5] px-6 py-2 text-sm font-medium text-[#1A1A1A] whitespace-nowrap min-w-0">
          {MOCK_WALLET_ENS}
        </div>
      </div>
    </header>
  )
}

// CONTAINER-MEASURED CIRCLE GRID (same as main page)
function CircleGrid({ 
  totalDots = 24, 
  filledDot = 1,
  earlyEntryDots = [2, 3, 4, 5, 6, 7, 8],
  dotSize = 32,
  baseGap = 10,
  minGap = 6,
  maxGap = 20
}: { 
  totalDots?: number
  filledDot?: number
  earlyEntryDots?: number[]
  dotSize?: number
  baseGap?: number
  minGap?: number
  maxGap?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [gridConfig, setGridConfig] = useState({ cols: 8, gap: baseGap })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const computeGrid = () => {
      const containerWidth = container.offsetWidth
      if (containerWidth <= 0) return

      const minCols = 3
      const maxCols = totalDots
      
      let cols = Math.floor((containerWidth + baseGap) / (dotSize + baseGap))
      cols = Math.max(minCols, Math.min(cols, maxCols))
      
      let gap = cols > 1 
        ? (containerWidth - cols * dotSize) / (cols - 1)
        : 0
      
      while (gap > maxGap && cols > minCols) {
        cols--
        gap = cols > 1 ? (containerWidth - cols * dotSize) / (cols - 1) : 0
      }
      
      while (gap < minGap && cols < maxCols) {
        cols++
        gap = cols > 1 ? (containerWidth - cols * dotSize) / (cols - 1) : 0
      }
      
      gap = Math.max(minGap, Math.min(maxGap, gap))
      
      setGridConfig({ cols, gap: Math.round(gap * 10) / 10 })
    }

    computeGrid()

    const resizeObserver = new ResizeObserver(() => {
      computeGrid()
    })
    
    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [totalDots, dotSize, baseGap, minGap, maxGap])

  const dots = Array.from({ length: totalDots }, (_, i) => i)

  return (
    <div ref={containerRef} className="w-full">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridConfig.cols}, ${dotSize}px)`,
          columnGap: `${gridConfig.gap}px`,
          rowGap: `${gridConfig.gap}px`,
          width: '100%',
          justifyContent: 'start',
          transition: 'gap 150ms ease-out'
        }}
      >
        {dots.map((i) => {
          const dotNumber = i + 1
          const isFilled = dotNumber === filledDot
          const isEarlyEntry = earlyEntryDots.includes(dotNumber)
          
          let bgColor = "#E5E5E5"
          if (isFilled) bgColor = "#1A1A1A"
          else if (isEarlyEntry) bgColor = "#C4B5FD"
          
          return (
            <div
              key={i}
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                borderRadius: '9999px',
                backgroundColor: bgColor
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

// Payment Visualization Card (same as main page)
function PaymentVisualizationCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">
        Pay ${formatNumber(circleData.monthlyAmount)} /mo for {circleData.totalMonths} months
      </h2>

      <p className="text-sm text-[#999999] mt-2">
        Early entry: priority access to payouts in the first 8 months.
      </p>

      <div className="flex-1 flex items-start mt-4">
        <CircleGrid 
          totalDots={circleData.totalMonths}
          filledDot={circleData.currentMonth}
          earlyEntryDots={circleData.earlyEntryMonths}
          dotSize={32}
          baseGap={10}
          minGap={6}
          maxGap={18}
        />
      </div>
    </div>
  )
}

// Review Card - shows transaction details before signing
function ReviewCard({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Review</h2>
      
      <p className="text-sm text-[#999999] mt-2">
        Confirm your first payment to join the circle.
      </p>

      {/* Transaction details */}
      <div className="mt-4 space-y-3 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#666666]">First payment</span>
          <span className="text-sm font-medium text-[#1A1A1A]">${formatNumber(circleData.dueAmount)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#666666]">Monthly amount</span>
          <span className="text-sm font-medium text-[#1A1A1A]">${formatNumber(circleData.monthlyAmount)}/mo</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#666666]">Duration</span>
          <span className="text-sm font-medium text-[#1A1A1A]">{circleData.totalMonths} months</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#666666]">Circle vault</span>
          <span className="text-sm font-medium text-[#1A1A1A]">{circleData.ensDomain}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-5">
        <Button 
          onClick={onJoin}
          className="w-full rounded-full bg-[#1A1A1A] px-8 py-6 text-base font-semibold text-white hover:bg-[#333333]"
        >
          Join
        </Button>
      </div>
    </div>
  )
}

// Signing Card - shows wallet confirmation state
function SigningCard({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Confirm in wallet</h2>
      
      <p className="text-sm text-[#999999] mt-2">
        Approve the transaction to reserve your slot.
      </p>

      {/* Main area - centered spinner and wallet icon */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
        <div className="relative">
          <Loader2 className="h-12 w-12 text-[#1A1A1A] animate-spin" />
        </div>
        <Wallet className="h-6 w-6 text-[#999999]" />
      </div>

      {/* Status line */}
      <p className="text-sm text-[#666666] text-center mb-4">
        Waiting for confirmation...
      </p>

      {/* CTA area */}
      <div className="flex flex-col gap-3 mt-auto">
        <Button 
          disabled
          className="w-full rounded-full bg-[#E5E5E5] px-8 py-6 text-base font-semibold text-[#999999] cursor-not-allowed"
        >
          Waiting...
        </Button>
        <Button 
          variant="outline"
          onClick={onCancel}
          className="w-full rounded-full border-[#E5E5E5] px-8 py-6 text-base font-medium text-[#1A1A1A] hover:bg-[#F5F5F5] bg-transparent"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

// Slots card
function SlotsCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white px-5 py-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 rounded-2xl bg-[#E8F5E9] px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
        <span className="text-sm font-medium text-[#2E7D32]">Active</span>
      </div>
      <span className="text-sm font-medium text-[#666666]">{circleData.slotsLeft} slots left</span>
    </div>
  )
}

export default function JoinCirclePage() {
  const [joinState, setJoinState] = useState<JoinState>("review")

  const handleJoin = () => {
    setJoinState("signing")
  }

  const handleCancel = () => {
    setJoinState("review")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col justify-center mx-auto max-w-[1280px] w-full px-6 md:px-10 pb-12 pt-4 box-border">
        {/* MOBILE (<768px): Single column stack */}
        <div className="flex flex-col gap-4 md:hidden">
          <SlotsCard />
          <PaymentVisualizationCard />
          {joinState === "review" ? (
            <ReviewCard onJoin={handleJoin} />
          ) : (
            <SigningCard onCancel={handleCancel} />
          )}
        </div>

        {/* TABLET (768px - 1023px): 2-column grid */}
        <div className="hidden md:grid lg:hidden gap-4" style={{
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto auto',
          gridTemplateAreas: `
            "slots slots"
            "payment review"
          `
        }}>
          <div style={{ gridArea: 'slots' }}><SlotsCard /></div>
          <div style={{ gridArea: 'payment' }}><PaymentVisualizationCard /></div>
          <div style={{ gridArea: 'review' }}>
            {joinState === "review" ? (
              <ReviewCard onJoin={handleJoin} />
            ) : (
              <SigningCard onCancel={handleCancel} />
            )}
          </div>
        </div>

        {/* DESKTOP (1024px+): 3-column layout */}
        <div className="hidden lg:grid gap-5 w-full" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          {/* Left column */}
          <div className="flex flex-col gap-5">
            <SlotsCard />
          </div>
          
          {/* Center column */}
          <div className="flex flex-col gap-5">
            <PaymentVisualizationCard />
          </div>
          
          {/* Right column - Review/Signing card */}
          <div className="flex flex-col gap-5">
            {joinState === "review" ? (
              <ReviewCard onJoin={handleJoin} />
            ) : (
              <SigningCard onCancel={handleCancel} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
