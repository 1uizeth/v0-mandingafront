"use client"

import { ArrowLeft } from "lucide-react"
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

// FULL CARD: Timeline
// Dates use whitespace-nowrap to prevent year from wrapping to new line
function TimelineCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5">
      <div>
        <p className="text-sm text-[#666666]">Started on</p>
        <p className="text-base font-semibold text-[#1A1A1A] whitespace-nowrap">{circleData.startDate}</p>
      </div>
      <div className="mt-4">
        <p className="text-sm text-[#666666]">Ends on</p>
        <p className="text-base font-semibold text-[#1A1A1A] whitespace-nowrap">{circleData.endDate}</p>
      </div>
    </div>
  )
}

// FULL CARD: Payout Progress
function PayoutCard() {
  const progressPercentage = (circleData.payoutProgress / circleData.totalMonths) * 100

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#666666]">Payout</span>
        <span className="text-sm text-[#666666]">
          {String(circleData.payoutProgress).padStart(2, "0")}/{circleData.totalMonths}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
        <div
          className="h-full rounded-full bg-[#1A1A1A] transition-all"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div>
        <p className="text-sm text-[#666666]">Due on</p>
        <p className="text-2xl font-semibold text-[#1A1A1A] whitespace-nowrap">{circleData.payoutDueDate}</p>
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

// FULL CARD: Payment Visualization
// Layout: Title → Description → Dots Grid
function PaymentVisualizationCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">
        Pay ${formatNumber(circleData.monthlyAmount)} /mo for {circleData.totalMonths} months
      </h2>

      {/* Description - same style as ENS/Arc descriptions */}
      <p className="text-sm text-[#999999]">
        Early entry: priority access to payouts in the first 8 months.
      </p>

      {/* Dots grid */}
      <div>
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

// FULL CARD: Installment Progress
// Pre-join state: Simple preview layout showing monthly amount and start date
// Post-join state: Full progress bar with due date and amount
function InstallmentCard({ isWalletConnected, hasJoined }: { isWalletConnected: boolean; hasJoined: boolean }) {
  const progressPercentage = (circleData.installmentProgress / circleData.totalMonths) * 100
  const isPreJoin = !isWalletConnected || !hasJoined

  if (isPreJoin) {
    // Preview layout - matches joined state structure: header + thin bar + content row
    return (
      <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 flex flex-col gap-4">
        {/* Header row with empty right side */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#666666]">Installments</span>
          <span></span>
        </div>

        {/* Neutral thin bar (no progress, no indicator) */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5E5E5]" />

        {/* Content row: text left, amount right - single line layout */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-semibold text-[#1A1A1A]">Always due on the 5th, every month</span>
          <span className="text-lg font-semibold text-[#1A1A1A] whitespace-nowrap">${formatNumber(circleData.monthlyAmount)}</span>
        </div>
      </div>
    )
  }

  // Full installment view after joining
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#666666]">Installment</span>
        <span className="text-sm text-[#666666]">
          {String(circleData.installmentProgress).padStart(2, "0")}/{circleData.totalMonths}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
        <div
          className="h-full rounded-full bg-[#1A1A1A] transition-all"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-sm text-[#666666]">Due today</p>
          <p className="text-3xl font-semibold text-[#1A1A1A]">${formatNumber(circleData.dueAmount)}</p>
        </div>
        {isWalletConnected && !hasJoined && (
          <Link href="/join">
            <Button className="w-full sm:w-auto rounded-full bg-[#1A1A1A] px-8 py-6 text-base font-semibold text-white hover:bg-[#333333]">
              Join now
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

// INFRA CARD: ENS Integration
// Pattern: Header → Description → Primary Object (pill)
function EnsCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Official ENS logo */}
          <svg width="20" height="20" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M42.4734 1.5491C42.1294 1.02598 42.7618 0.413402 43.2749 0.772602L64.7575 15.8095C78.2972 25.2867 84.5315 42.208 80.2388 58.1544C79.8987 59.4177 79.5339 60.5235 79.1912 61.45C78.9787 62.0244 78.134 61.9004 78.0914 61.2895C77.7292 56.0972 73.9905 50.1611 71.2769 45.8527C70.7925 45.0835 70.3408 44.3663 69.9467 43.7144C67.3093 39.3512 48.2169 10.2849 42.4734 1.5491ZM14.0286 43.8411L39.7425 1.53062C40.0411 1.03949 39.5038 0.466613 38.9939 0.732504C34.4986 3.07609 22.3693 9.85687 12.8466 19.3674C2.41081 29.7898 10.8445 41.225 13.1082 43.9128C13.3584 44.2098 13.8269 44.1729 14.0286 43.8411ZM39.1069 92.8848C39.4509 93.4079 38.8185 94.0205 38.3054 93.6614L16.8228 78.6244C3.28314 69.1472 -2.95117 52.2259 1.34153 36.2795C1.68156 35.0162 2.04642 33.9104 2.38911 32.9839C2.6016 32.4095 3.44632 32.5335 3.48892 33.1444C3.85109 38.3366 7.58981 44.2728 10.3034 48.5812C10.7878 49.3503 11.2395 50.0676 11.6336 50.7195C14.271 55.0827 33.3634 84.149 39.1069 92.8848ZM41.8398 92.8988L67.5538 50.5883C67.7555 50.2566 68.224 50.2196 68.4742 50.5166C70.7379 53.2044 79.1716 64.6396 68.7358 75.062C59.2131 84.5725 47.0838 91.3533 42.5886 93.6969C42.0786 93.9628 41.5413 93.3899 41.8398 92.8988Z" fill="#5298FF"/>
          </svg>
          <span className="text-lg font-bold text-[#5298FF]">ens</span>
        </div>
        <a
          href={circleData.ensUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[#5298FF] transition-colors hover:opacity-70"
        >
          View on ENS →
        </a>
      </div>

      {/* Description - muted, below header */}
      <p className="text-sm text-[#999999]">
        Public ENS name for this circle's vault.
      </p>

      {/* Primary Object - ENS pill */}
      <div className="rounded-full bg-[#E3F2FD] px-5 py-3 text-center">
        <span className="text-sm font-medium text-[#1976D2]">{circleData.ensDomain}</span>
      </div>
    </div>
  )
}

// FULL CARD: Active Members
// Height-capped list to prevent row stretching in grid
// Max 4 visible rows (~176px), scrollable if more members exist
function MembersCard() {
  const formatJoinDate = (daysAgo: number) => `${daysAgo}d ago`
  const maxVisibleMembers = 4
  const hasMoreMembers = circleData.members.length > maxVisibleMembers

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 flex flex-col gap-2">
      <h3 className="text-base font-semibold text-[#1A1A1A]">Active members</h3>

      {/* Member list - same text-sm sizing as description text in other cards */}
      <div>
        {circleData.members.slice(0, maxVisibleMembers).map((member, index) => (
          <div 
            key={member.name} 
            className={`flex items-center justify-between gap-3 py-2 min-w-0 ${index < Math.min(circleData.members.length, maxVisibleMembers) - 1 ? 'border-b border-[#F5F5F5]' : ''}`}
          >
            <span className="text-sm text-[#1A1A1A] truncate min-w-0">{member.name}</span>
            <span className="text-sm text-[#999999] whitespace-nowrap flex-shrink-0">{formatJoinDate(member.joinedDaysAgo)}</span>
          </div>
        ))}
      </div>

      {/* Overflow indicator if more members exist */}
      {hasMoreMembers && (
        <p className="text-sm text-[#999999]">
          + {circleData.members.length - maxVisibleMembers} more members
        </p>
      )}
    </div>
  )
}

// INFRA CARD: Arc Integration
// Pattern: Header → Description → Primary Object (link button)
function ArcCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Official Arc logo */}
          <svg width="20" height="20" viewBox="0 0 298 312" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,311.98c2.53-76.38,15.48-147.66,37.13-203.09C64.54,38.67,104.23,0,148.86,0s84.32,38.67,111.74,108.9c14.26,36.52,24.75,79.92,30.97,127.13.56,4.22,1.03,8.5,1.51,12.78.16.26.25.51.22.71,0,0,3.65,22.82,4.43,62.47h-.41c-5.42-4.45-69.33-54.66-175.27-40.12,1.6-17.93,3.8-35.37,6.64-52.09.15-.85.31-1.68.46-2.53,41.55-1.25,77.92,3.57,105.81,9.9-.1-.66-.19-1.34-.3-2-5.73-35.7-14.19-68.38-25.1-96.31-17.83-45.67-41.1-74.04-60.71-74.04s-42.88,28.37-60.71,74.04c-4.32,11.05-8.25,22.83-11.77,35.25-4.95,17.41-9.11,36.08-12.44,55.69-4.92,28.97-7.99,60.03-9.12,92.22H0Z" fill="#1A1A1A"/>
          </svg>
          <span className="text-lg font-bold text-[#1A1A1A]">Arc</span>
        </div>
        <a
          href={circleData.arcscanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[#1A1A1A] transition-colors hover:opacity-70"
        >
          View on Arcscan →
        </a>
      </div>

      {/* Description - muted, below header */}
      <p className="text-sm text-[#999999]">
        Public on-chain record of this circle's vault.
      </p>

      {/* Primary Object - Arcscan link button */}
      <a
        href={circleData.arcscanUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#F5F5F5] px-5 py-3 text-center text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#EBEBEB]"
      >
        View contract on Arcscan
      </a>
    </div>
  )
}

// Slots card - includes Active badge + slots count
function SlotsCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white px-5 py-4 flex items-center justify-between gap-3">
      {/* Active badge */}
      <div className="flex items-center gap-2 rounded-2xl bg-[#E8F5E9] px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
        <span className="text-sm font-medium text-[#2E7D32]">Active</span>
      </div>
      {/* Slots count */}
      <span className="text-sm font-medium text-[#666666]">{circleData.slotsLeft} slots left</span>
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
    <div className="min-h-screen bg-white flex flex-col">
      <Header isWalletConnected={isWalletConnected} onConnectWallet={handleConnectWallet} />

      <main className="flex-1 flex flex-col justify-center mx-auto max-w-[1280px] w-full px-6 md:px-10 pb-12 pt-4 box-border">
        {/* MOBILE (<768px): Single column stack */}
        <div className="flex flex-col gap-4 md:hidden">
          <SlotsCard />
          <PaymentVisualizationCard />
          <TimelineCard />
          <PayoutCard />
          <InstallmentCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} />
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
            "timeline ens"
            "payout installment"
            "members arc"
          `
        }}>
          <div style={{ gridArea: 'slots' }}><SlotsCard /></div>
          <div style={{ gridArea: 'payment' }}><PaymentVisualizationCard /></div>
          <div style={{ gridArea: 'timeline' }}><TimelineCard /></div>
          <div style={{ gridArea: 'ens' }}><EnsCard /></div>
          <div style={{ gridArea: 'payout' }}><PayoutCard /></div>
          <div style={{ gridArea: 'installment' }}><InstallmentCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} /></div>
          <div style={{ gridArea: 'members' }}><MembersCard /></div>
          <div style={{ gridArea: 'arc' }}><ArcCard /></div>
        </div>

        {/* DESKTOP (1024px+): 3-column CSS grid with explicit row tracks */}
        <div 
          className="hidden lg:grid gap-5 w-full"
          style={{
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: 'auto auto var(--compact-card-height, 200px)',
            alignContent: 'start',
            alignItems: 'stretch'
          }}
        >
          {/* Left Column */}
          {/* Slots card - col 1, row 1 */}
          <div style={{ gridColumn: 1, gridRow: 1 }}>
            <SlotsCard />
          </div>
          
          {/* Started/Ends card - col 1, row 2 (stretches to fill row height) */}
          <div style={{ gridColumn: 1, gridRow: 2 }}>
            <TimelineCard />
          </div>
          
          {/* Payout card - col 1, row 3 (compact height) */}
          <div style={{ gridColumn: 1, gridRow: 3 }}>
            <PayoutCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} />
          </div>

          {/* Center Column */}
          {/* Pay $892/mo card - col 2, rows 1-2 (spans 2 rows, ends at Active members bottom) */}
          <div style={{ gridColumn: 2, gridRow: '1 / span 2' }} className="flex flex-col justify-start">
            <PaymentVisualizationCard />
          </div>
          
          {/* Installments card - col 2, row 3 (compact height) */}
          <div style={{ gridColumn: 2, gridRow: 3 }}>
            <InstallmentCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} />
          </div>

          {/* Right Column */}
          {/* ENS card - col 3, row 1 */}
          <div style={{ gridColumn: 3, gridRow: 1 }}>
            <EnsCard />
          </div>
          
          {/* Active members card - col 3, row 2 */}
          <div style={{ gridColumn: 3, gridRow: 2 }}>
            <MembersCard />
          </div>
          
          {/* Arc card - col 3, row 3 (compact height, same as Payout/Installments) */}
          <div style={{ gridColumn: 3, gridRow: 3 }}>
            <ArcCard />
          </div>
        </div>
      </main>
    </div>
  )
}
