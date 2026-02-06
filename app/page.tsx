"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

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
  bodyMuted: "text-xs text-[#999999]",
  
  // Labels: Small labels like "Started on", "Payout"
  label: "text-xs text-[#666666]",
  
  // Caption: Tiny metadata like "1d ago", "01/24"
  caption: "text-xs text-[#999999]",
  
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

function Header({ isWalletConnected, onConnectWallet }: { isWalletConnected: boolean; onConnectWallet: () => void }) {
  return (
    <header 
      className="mx-auto max-w-[1280px] w-full px-6 md:px-10"
      style={{ 
        paddingTop: 'clamp(32px, 6vh, 64px)', 
        paddingBottom: 'clamp(24px, 4vh, 48px)' 
      }}
    >
      {/* Mobile + Tablet Header (<1024px): 3-column grid for stable centering */}
      <div 
        className="grid lg:hidden items-center"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        {/* Column 1: Back button - start aligned */}
        <div className="justify-self-start">
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base whitespace-nowrap">Back</span>
          </Link>
        </div>

        {/* Column 2: Title - always centered */}
        <div className="justify-self-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            ${formatNumber(circleData.amount)}
          </h1>
          <p className="text-sm md:text-base text-[#1A1A1A]">{circleData.title}</p>
        </div>

        {/* Column 3: Wallet - end aligned */}
        <div className="justify-self-end">
          {isWalletConnected ? (
            <div className="rounded-full border border-[#E5E5E5] px-4 py-1.5 text-sm font-medium text-[#1A1A1A]">
              {MOCK_WALLET_ENS}
            </div>
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

      {/* Desktop Header (1024px+) - 3-column grid: left auto-center auto-right */}
      <div 
        className="hidden lg:grid items-center min-h-[72px]"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        {/* Column 1: Back button - start aligned */}
        <div className="justify-self-start">
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70 whitespace-nowrap"
          >
            <ArrowLeft className="h-5 w-5 flex-shrink-0" />
            <span>Back</span>
          </Link>
        </div>

        {/* Column 2: Title - always centered */}
        <div className="justify-self-center text-center flex flex-col items-center gap-1 whitespace-nowrap">
          <h1 className="text-5xl font-bold text-[#1A1A1A]">
            ${formatNumber(circleData.amount)}
          </h1>
          <p className="text-lg text-[#1A1A1A]">{circleData.title}</p>
        </div>

        {/* Column 3: Wallet - end aligned */}
        <div className="justify-self-end">
          {isWalletConnected ? (
            <div className="rounded-full border border-[#E5E5E5] px-6 py-2 text-sm font-medium text-[#1A1A1A] whitespace-nowrap">
              {MOCK_WALLET_ENS}
            </div>
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
function TimelineCard() {
  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col ${GAP_M}`}>
      {/* Row 1: Started on */}
      <div className="flex items-center justify-between">
        <p className={TYPOGRAPHY.label}>Started on</p>
        <p className="font-semibold text-[#1A1A1A] whitespace-nowrap">{circleData.startDate}</p>
      </div>
      {/* Row 2: Ends on */}
      <div className="flex items-center justify-between">
        <p className={TYPOGRAPHY.label}>Ends on</p>
        <p className="font-semibold text-[#1A1A1A] whitespace-nowrap">{circleData.endDate}</p>
      </div>
    </div>
  )
}

// FULL CARD: Payout Progress
// Header: Title | Counter ("01/24")
// Progress bar with minimum 1% visible fill indicator
function PayoutCard({ isWalletConnected, hasJoined }: { isWalletConnected: boolean; hasJoined: boolean }) {
  const isPreJoin = !isWalletConnected || !hasJoined
  const progressPercentage = Math.max(1, (circleData.payoutProgress / circleData.totalMonths) * 100)

  if (isPreJoin) {
    return (
      <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col gap-3`}>
        {/* Header: Title | Counter (empty pre-join) */}
        <div className="flex items-center justify-between">
          <span className={TYPOGRAPHY.label}>Payouts</span>
          <span className={TYPOGRAPHY.caption}>00/{circleData.totalMonths}</span>
        </div>

        {/* Progress bar with 1% initial fill */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
          <div className="h-full w-[1%] bg-[#1A1A1A] rounded-full" />
        </div>

        {/* Due info row: label left, date right */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#1A1A1A]">Next due on</span>
          <span className="font-semibold text-[#1A1A1A]">March 1</span>
        </div>

        {/* Large centered amount pill - primary focus */}
        <div className="flex justify-center mt-2">
          <div className="rounded-full bg-[#F5F5F5] px-8 py-4">
            <span className="font-handwriting text-4xl text-[#1A1A1A]">${formatNumber(circleData.amount)}</span>
          </div>
        </div>
      </div>
    )
  }

  // Joined state
  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col gap-3`}>
      {/* Header: Title | Counter */}
      <div className="flex items-center justify-between">
        <span className={TYPOGRAPHY.label}>Payouts</span>
        <span className={TYPOGRAPHY.caption}>
          {String(circleData.payoutProgress).padStart(2, "0")}/{circleData.totalMonths}
        </span>
      </div>

      {/* Progress bar with fill indicator */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
        <div
          className="h-full bg-[#1A1A1A] rounded-full transition-all"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Due info row: label left, date right */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-[#1A1A1A]">Next due on</span>
        <span className="font-semibold text-[#1A1A1A]">{circleData.payoutDueDate}</span>
      </div>

      {/* Large centered amount pill - primary focus */}
      <div className="flex justify-center mt-2">
        <div className="rounded-full bg-[#F5F5F5] px-8 py-4">
          <span className="font-handwriting text-4xl text-[#1A1A1A]">${formatNumber(circleData.amount)}</span>
        </div>
      </div>
    </div>
  )
}

// CONTAINER-MEASURED CIRCLE GRID
// Key behavior (per master prompt):
// - FIXED dot size (constant across all breakpoints)
// - VARIABLE gap to fill container width on full rows
// - Columns change one-by-one as width changes (no 2-step jumps)
// - Only the last row may have empty space
// - Desktop behaves exactly like tablet/mobile (same algorithm)
function CircleGrid({ 
  totalDots = 24, 
  filledDot = 1,
  earlyEntryDots = [2, 3, 4, 5, 6, 7, 8],
  dotSize = 32,  // FIXED dot size token
  baseGap = 10,  // Base gap for calculations
  minGap = 6,    // Minimum gap
  maxGap = 20    // Maximum gap
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

      // Step 1: Calculate columns based on container width
      // cols = clamp(minCols, floor((containerWidth + baseGap) / (dotSize + baseGap)), maxCols)
      const minCols = 3
      const maxCols = totalDots
      
      let cols = Math.floor((containerWidth + baseGap) / (dotSize + baseGap))
      cols = Math.max(minCols, Math.min(cols, maxCols))
      
      // Step 2: Compute gap to fill container width for full rows
      // gap = (containerWidth - cols * dotSize) / (cols - 1)
      let gap = cols > 1 
        ? (containerWidth - cols * dotSize) / (cols - 1)
        : 0
      
      // Step 3: If gap is out of bounds, adjust cols
      // If gap > maxGap, we have too many columns - reduce by one
      while (gap > maxGap && cols > minCols) {
        cols--
        gap = cols > 1 ? (containerWidth - cols * dotSize) / (cols - 1) : 0
      }
      
      // If gap < minGap, we have too few columns - add one
      while (gap < minGap && cols < maxCols) {
        cols++
        gap = cols > 1 ? (containerWidth - cols * dotSize) / (cols - 1) : 0
      }
      
      // Final clamp on gap
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

// FULL CARD: Payment Container
// Container card with title and embedded Installments sub-card
function PaymentVisualizationCard() {
  const progressPercentage = Math.max(1, (circleData.installmentProgress / circleData.totalMonths) * 100)
  
  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col ${GAP_M}`}>
      {/* Centered title */}
      <h2 className={`${TYPOGRAPHY.h3} text-[#1A1A1A] text-center`}>
        Pay ${formatNumber(circleData.monthlyAmount)} /mo for {circleData.totalMonths} months
      </h2>
      
      {/* Embedded Installments sub-card */}
      <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col ${GAP_M}`}>
        {/* Header: Title | Counter */}
        <div className="flex items-center justify-between">
          <span className={TYPOGRAPHY.label}>Installments</span>
          <span className={TYPOGRAPHY.caption}>
            {String(circleData.installmentProgress).padStart(2, "0")}/{circleData.totalMonths}
          </span>
        </div>

        {/* Progress bar with fill indicator */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
          <div
            className="h-full bg-[#1A1A1A] rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Footer row: label left, amount right */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#1A1A1A]">Always due on the 5th, every month</span>
          <span className="font-semibold text-[#1A1A1A] whitespace-nowrap">${formatNumber(circleData.dueAmount)}</span>
        </div>
      </div>
    </div>
  )
}

// FULL CARD: Entry Status
// Interactive entry selection with hover states and wallet gating
function EntryStatusCard({ isWalletConnected }: { isWalletConnected: boolean }) {
  const { toast } = useToast()
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)
  
  const entryGroups = [
    {
      id: "early",
      label: "Early entry",
      description: "Priority access to payout in the first 8 months.",
      colorDefault: "hsl(var(--entry-early-default))",
      colorHover: "hsl(var(--entry-early-hover))",
      colorActive: "hsl(var(--entry-early-active))",
      count: 8
    },
    {
      id: "middle",
      label: "Middle entry",
      description: "Payout in 8 to 16 months.",
      colorDefault: "hsl(var(--entry-middle-default))",
      colorHover: "hsl(var(--entry-middle-hover))",
      colorActive: "hsl(var(--entry-middle-active))",
      count: 8
    },
    {
      id: "late",
      label: "Late entry",
      description: "Up to 8 months before end of circle anticipation.",
      colorDefault: "hsl(var(--entry-late-default))",
      colorHover: "hsl(var(--entry-late-hover))",
      colorActive: "hsl(var(--entry-late-active))",
      count: 8
    }
  ]

  const handleEntryClick = (entryId: string) => {
    if (!isWalletConnected) {
      toast({
        title: "Connect your wallet to simulate entry",
        description: "You need to connect your wallet first",
        action: {
          altText: "Connect wallet",
          onClick: () => {
            // Trigger wallet connection
            console.log("[v0] Connect wallet action triggered")
          },
        },
        duration: 4000,
      })
      return
    }
    
    // Start simulation for selected entry
    setSelectedEntry(entryId)
    console.log("[v0] Starting simulation for:", entryId)
  }

  return (
    <div className={`rounded-3xl border border-[#E5E5E5] bg-white ${PADDING_L}`}>
      {/* Responsive: Column mode on desktop (xl), List mode on smaller screens */}
      <div className="flex flex-col gap-3 xl:grid xl:grid-cols-3 xl:gap-4">
        {entryGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => handleEntryClick(group.id)}
            aria-label={`Select ${group.label}`}
            className={`
              group relative
              flex items-center gap-6 p-4 rounded-2xl
              xl:flex-col xl:items-center xl:gap-3 xl:py-4 xl:px-4
              transition-all duration-200 ease-out
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              cursor-pointer
              hover:ring-2 hover:ring-inset
              ${selectedEntry === group.id ? 'ring-2 ring-inset' : ''}
            `}
            style={{
              backgroundColor: selectedEntry === group.id ? `${group.colorDefault}15` : 'transparent',
              '--tw-ring-color': group.colorDefault,
              '--focus-ring': group.colorDefault,
            } as React.CSSProperties}
          >
            {/* Dots grid - fixed width in list mode, full width in column mode */}
            <div className="flex justify-center flex-shrink-0 xl:w-full">
              <div className="grid grid-cols-4 gap-x-3 gap-y-3 xl:w-full xl:gap-x-6 xl:gap-y-4 xl:place-items-center">
                {Array.from({ length: group.count }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full w-5 h-5 xl:w-6 xl:h-6"
                    style={{
                      backgroundColor: group.colorDefault
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Text block - left-aligned in list mode, centered in column mode */}
            <div className="flex flex-col gap-0.5 items-start min-w-0 xl:items-center xl:text-center xl:gap-1">
              <span className="font-semibold text-base xl:text-lg whitespace-nowrap leading-tight" style={{ color: group.colorDefault }}>{group.label}</span>
              <p className={`${TYPOGRAPHY.bodyMuted} text-sm leading-tight line-clamp-3 text-left xl:text-center xl:max-w-[220px]`}>{group.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// FULL CARD: Installment Progress
// Header: Title | Counter ("01/24")
// Progress bar with minimum 1% visible fill indicator
function InstallmentCard({ isWalletConnected, hasJoined }: { isWalletConnected: boolean; hasJoined: boolean }) {
  const progressPercentage = Math.max(1, (circleData.installmentProgress / circleData.totalMonths) * 100)
  const isPreJoin = !isWalletConnected || !hasJoined

  if (isPreJoin) {
    return (
      <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col ${GAP_M}`}>
        {/* Header: Title | Counter (empty pre-join) */}
        <div className="flex items-center justify-between">
          <span className={TYPOGRAPHY.label}>Installments</span>
          <span></span>
        </div>

        {/* Progress bar with 1% initial fill */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
          <div className="h-full w-[1%] bg-[#1A1A1A] rounded-full" />
        </div>

        {/* Content row: text left, amount right */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#1A1A1A]">Always due on the 5th, every month</span>
          <span className="font-semibold text-[#1A1A1A] whitespace-nowrap">${formatNumber(circleData.monthlyAmount)}</span>
        </div>
      </div>
    )
  }

  // Joined state
  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col ${GAP_M}`}>
      {/* Header: Title | Counter */}
      <div className="flex items-center justify-between">
        <span className={TYPOGRAPHY.label}>Installments</span>
        <span className={TYPOGRAPHY.caption}>
          {String(circleData.installmentProgress).padStart(2, "0")}/{circleData.totalMonths}
        </span>
      </div>

      {/* Progress bar with fill indicator */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
        <div
          className="h-full bg-[#1A1A1A] rounded-full transition-all"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Footer row: label left, date right */}
      <div className="flex items-center justify-between">
        <span className={TYPOGRAPHY.label}>Next due on</span>
        <span className="font-semibold text-[#1A1A1A]">March 5</span>
      </div>

      {/* Amount display */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-[#1A1A1A]">Amount</span>
        <span className="text-2xl font-bold text-[#1A1A1A]">${formatNumber(circleData.dueAmount)}</span>
      </div>
    </div>
  )
}

// INFRA CARD: ENS Integration
// Header (two-column: logo+name | link) → Compact tag (matches Arc card style)
function EnsCard() {
  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col ${GAP_M}`}>
      {/* Header row: two-column layout (logo+name | link) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Official ENS logo */}
          <svg width="20" height="20" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M42.4734 1.5491C42.1294 1.02598 42.7618 0.413402 43.2749 0.772602L64.7575 15.8095C78.2972 25.2867 84.5315 42.208 80.2388 58.1544C79.8987 59.4177 79.5339 60.5235 79.1912 61.45C78.9787 62.0244 78.134 61.9004 78.0914 61.2895C77.7292 56.0972 73.9905 50.1611 71.2769 45.8527C70.7925 45.0835 70.3408 44.3663 69.9467 43.7144C67.3093 39.3512 48.2169 10.2849 42.4734 1.5491ZM14.0286 43.8411L39.7425 1.53062C40.0411 1.03949 39.5038 0.466613 38.9939 0.732504C34.4986 3.07609 22.3693 9.85687 12.8466 19.3674C2.41081 29.7898 10.8445 41.225 13.1082 43.9128C13.3584 44.2098 13.8269 44.1729 14.0286 43.8411ZM39.1069 92.8848C39.4509 93.4079 38.8185 94.0205 38.3054 93.6614L16.8228 78.6244C3.28314 69.1472 -2.95117 52.2259 1.34153 36.2795C1.68156 35.0162 2.04642 33.9104 2.38911 32.9839C2.6016 32.4095 3.44632 32.5335 3.48892 33.1444C3.85109 38.3366 7.58981 44.2728 10.3034 48.5812C10.7878 49.3503 11.2395 50.0676 11.6336 50.7195C14.271 55.0827 33.3634 84.149 39.1069 92.8848ZM41.8398 92.8988L67.5538 50.5883C67.7555 50.2566 68.224 50.2196 68.4742 50.5166C70.7379 53.2044 79.1716 64.6396 68.7358 75.062C59.2131 84.5725 47.0838 91.3533 42.5886 93.6969C42.0786 93.9628 41.5413 93.3899 41.8398 92.8988Z" fill="#5298FF"/>
          </svg>
          <span className={`${TYPOGRAPHY.h3} text-[#5298FF]`}>ens</span>
        </div>
        <a
          href={circleData.ensUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${TYPOGRAPHY.button} text-[#5298FF] transition-colors hover:opacity-70 whitespace-nowrap`}
        >
          View on ENS →
        </a>
      </div>

      {/* Compact rounded tag */}
      <div className="inline-flex self-start">
        <div className="rounded-full bg-[#E3F2FD] px-3 py-1.5">
          <span className={`${TYPOGRAPHY.button} text-[#1976D2]`}>{circleData.ensDomain}</span>
        </div>
      </div>
    </div>
  )
}

// FULL CARD: Active Members
// Compact member list with consistent typography
function MembersCard() {
  const formatJoinDate = (daysAgo: number) => `${daysAgo}d ago`
  const maxVisibleMembers = 4
  const hasMoreMembers = circleData.members.length > maxVisibleMembers

  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col ${GAP_M}`}>
      <h3 className={`${TYPOGRAPHY.h3} text-[#1A1A1A]`}>Active members</h3>

      {/* Member list */}
      <div>
        {circleData.members.slice(0, maxVisibleMembers).map((member, index) => (
          <div 
            key={member.name} 
            className={`flex items-center justify-between gap-3 py-2 min-w-0 ${index < Math.min(circleData.members.length, maxVisibleMembers) - 1 ? 'border-b border-[#F5F5F5]' : ''}`}
          >
            <span className="text-[#1A1A1A] truncate min-w-0">{member.name}</span>
            <span className={TYPOGRAPHY.caption}>{formatJoinDate(member.joinedDaysAgo)}</span>
          </div>
        ))}
      </div>

      {/* Overflow indicator if more members exist */}
      {hasMoreMembers && (
        <p className={TYPOGRAPHY.caption}>
          + {circleData.members.length - maxVisibleMembers} more members
        </p>
      )}
    </div>
  )
}

// INFRA CARD: Arc Integration
// Header (two-column: logo+name | link)
function ArcCard() {
  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col ${GAP_M}`}>
      {/* Header row: two-column layout (logo+name | link) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Official Arc logo */}
          <svg width="20" height="20" viewBox="0 0 298 312" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,311.98c2.53-76.38,15.48-147.66,37.13-203.09C64.54,38.67,104.23,0,148.86,0s84.32,38.67,111.74,108.9c14.26,36.52,24.75,79.92,30.97,127.13.56,4.22,1.03,8.5,1.51,12.78.16.26.25.51.22.71,0,0,3.65,22.82,4.43,62.47h-.41c-5.42-4.45-69.33-54.66-175.27-40.12,1.6-17.93,3.8-35.37,6.64-52.09.15-.85.31-1.68.46-2.53,41.55-1.25,77.92,3.57,105.81,9.9-.1-.66-.19-1.34-.3-2-5.73-35.7-14.19-68.38-25.1-96.31-17.83-45.67-41.1-74.04-60.71-74.04s-42.88,28.37-60.71,74.04c-4.32,11.05-8.25,22.83-11.77,35.25-4.95,17.41-9.11,36.08-12.44,55.69-4.92,28.97-7.99,60.03-9.12,92.22H0Z" fill="#1A1A1A"/>
          </svg>
          <span className={`${TYPOGRAPHY.h3} text-[#1A1A1A]`}>Arc</span>
        </div>
        <a
          href={circleData.arcscanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${TYPOGRAPHY.button} text-[#1A1A1A] transition-colors hover:opacity-70 whitespace-nowrap`}
        >
          View on Arcscan →
        </a>
      </div>
    </div>
  )
}

// Slots card - Active badge + slots count
function SlotsCard() {
  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex items-center justify-between`}>
      {/* Active badge */}
      <div className="flex items-center gap-2 rounded-2xl bg-[#E8F5E9] px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
        <span className={`${TYPOGRAPHY.button} text-[#2E7D32]`}>Active</span>
      </div>
      {/* Slots count */}
      <span className={`${TYPOGRAPHY.button} text-[#666666]`}>{circleData.slotsLeft} slots left</span>
    </div>
  )
}

export default function FundingCirclePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  const handleConnectWallet = () => {
    setIsWalletConnected(true)
  }

  return (
    <>
    <div className="min-h-screen bg-white flex flex-col">
      <Header isWalletConnected={isWalletConnected} onConnectWallet={handleConnectWallet} />

      <main className="flex-1 flex flex-col justify-center mx-auto max-w-[1280px] w-full px-6 md:px-10 pb-12 pt-4 box-border">
        {/* MOBILE (<768px): Single column stack */}
        <div className="flex flex-col gap-4 md:hidden">
          <SlotsCard />
          <PaymentVisualizationCard />
          <EntryStatusCard isWalletConnected={isWalletConnected} />
          <TimelineCard />
          <PayoutCard />
          <EnsCard />
          <MembersCard />
          <ArcCard />
        </div>

        {/* TABLET (768px - 1023px): 2-column grid with row-based areas */}
        <div className="hidden md:grid lg:hidden gap-4" style={{
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto auto auto auto auto',
          gridTemplateAreas: `
            "slots slots"
            "payment payment"
            "entry entry"
            "timeline ens"
            "payout members"
            "arc arc"
          `
        }}>
          <div style={{ gridArea: 'slots' }}><SlotsCard /></div>
          <div style={{ gridArea: 'payment' }}><PaymentVisualizationCard /></div>
          <div style={{ gridArea: 'entry' }}><EntryStatusCard isWalletConnected={isWalletConnected} /></div>
          <div style={{ gridArea: 'timeline' }}><TimelineCard /></div>
          <div style={{ gridArea: 'ens' }}><EnsCard /></div>
          <div style={{ gridArea: 'payout' }}><PayoutCard /></div>
          <div style={{ gridArea: 'members' }}><MembersCard /></div>
          <div style={{ gridArea: 'arc' }}><ArcCard /></div>
        </div>

        {/* DESKTOP (1024px+): Redesigned 3-column layout */}
        {/* Column 1: Active, Started/Ends, Payout | Column 2 (wider): Pay with embedded Installments, Entry Status | Column 3: Active members, ENS, Arc */}
        <div 
          className={`hidden lg:grid ${GAP_M} w-full`}
          style={{
            gridTemplateColumns: '1fr 1.5fr 1fr',
            alignContent: 'start',
            alignItems: 'start'
          }}
        >
          {/* COLUMN 1: Left stack (Active, Started/Ends, Payout) */}
          <div className={`flex flex-col ${GAP_M}`}>
            <SlotsCard />
            <TimelineCard />
            <PayoutCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} />
          </div>

          {/* COLUMN 2: Center stack - WIDER (Pay container with embedded Installments, Entry Status) */}
          <div className={`flex flex-col ${GAP_M}`}>
            <PaymentVisualizationCard />
            <EntryStatusCard isWalletConnected={isWalletConnected} />
          </div>

          {/* COLUMN 3: Right stack (Active members, ENS, Arc) */}
          <div className={`flex flex-col ${GAP_M}`}>
            <MembersCard />
            <EnsCard />
            <ArcCard />
          </div>
        </div>
      </main>
    </div>
    <Toaster />
    </>
  )
}
