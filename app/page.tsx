"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
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


// Mock data for the funding circle
const circleData = {
  status: "active" as const,
  amount: 20000,
  title: "for Devcon 2026",
  slotsLeft: 21,
  joinedDate: new Date(), // Used when hasJoined is true
  startDate: "February, 2026",
  endDate: "March, 2028",
  monthlyAmount: 892,
  totalMonths: 24,
  currentMonth: 1,
  earlyEntryMonths: [2, 3, 4, 5, 6, 7, 8],
  payoutProgress: 1,
  installmentProgress: 1,
  dueAmount: 892,
  payoutDueDate: "March",
  nextDueDate: new Date(2026, 2, 5), // March 5, 2026
  ensDomain: "devcon.mandinga.eth",
  ensUrl: "https://app.ens.domains/devcon.mandinga.eth",
  arcscanUrl: "https://arcscan.io",
  members: [
    { name: "sassai.eth", joinedDaysAgo: 1 },
    { name: "vitalik.eth", joinedDaysAgo: 2 },
    { name: "1uiz.eth", joinedDaysAgo: 3 },
  ],
}

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

function Header({ isWalletConnected, onConnectWallet, onDisconnectWallet }: { isWalletConnected: boolean; onConnectWallet: () => void; onDisconnectWallet: () => void }) {
  return (
    <header 
      className="mx-auto max-w-[1280px] w-full px-6 md:px-10 pt-6 pb-6"
    >
      {/* Mobile + Tablet Header (<1024px): Two rows - controls then title */}
      <div className="flex flex-col gap-6 lg:hidden">
        {/* Row 1: Back button + Connect wallet */}
        <div className="flex items-center justify-between">
          <Link
            href="#"
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
          ${formatNumber(circleData.amount)} {circleData.title}
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
            href="#"
            className="inline-flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70 whitespace-nowrap"
          >
            <ArrowLeft className="h-5 w-5 flex-shrink-0" />
            <span>Back</span>
          </Link>
        </div>

        {/* Column 2: Title - always centered */}
        <div className="justify-self-center text-center whitespace-nowrap">
          <h1 className="text-lg font-semibold text-[#1A1A1A]">
            ${formatNumber(circleData.amount)} {circleData.title}
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
// Round info and rings visualization
function PayoutCard({ isWalletConnected, hasJoined, selectedEntry, hoveredEntry, onHoverEntry, onSelectEntry, showJoinedToast }: { isWalletConnected: boolean; hasJoined: boolean; selectedEntry: string; hoveredEntry: string; onHoverEntry: (id: string) => void; onSelectEntry: (id: string) => void; showJoinedToast: () => void }) {
  const isPreJoin = !isWalletConnected || !hasJoined
  const progressPercentage = Math.max(1, (circleData.payoutProgress / circleData.totalMonths) * 100)
  
  // Use hovered entry if present, otherwise use selected entry
  const activeEntry = hoveredEntry || selectedEntry

  // Get simulation data based on active entry (hovered or selected)
  const getSimulationData = () => {
    if (activeEntry === "early") {
      return {
        start: 0,
        end: 8,
        counter: "01/08",
        nextRound: "Round 1",
        nextRoundLabel: "Next round - Early",
        nextRoundDate: "March",
        nextRoundYear: "2026",
        color: "hsl(var(--entry-early-default))",
        percentage: (1 / 24) * 100 // Round 1 of 24 total rounds
      }
    } else if (activeEntry === "middle") {
      return {
        start: 8,
        end: 16,
        counter: "09/16",
        nextRound: "Round 9",
        nextRoundLabel: "Next round - Middle",
        nextRoundDate: "November",
        nextRoundYear: "2026",
        color: "hsl(var(--entry-middle-default))",
        percentage: (9 / 24) * 100 // Round 9 of 24 total rounds
      }
    } else if (activeEntry === "late") {
      return {
        start: 16,
        end: 24,
        counter: "17/24",
        nextRound: "Round 17",
        nextRoundLabel: "Next round - Late",
        nextRoundDate: "July",
        nextRoundYear: "2027",
        color: "hsl(var(--entry-late-default))",
        percentage: (17 / 24) * 100 // Round 17 of 24 total rounds
      }
    }
    return null
  }

  const simulationData = activeEntry ? getSimulationData() : null

  const getRings = () => {
    const rings = []
    const totalMonths = 24
    
    for (let i = 0; i < totalMonths; i++) {
      let isActive = false
      let color = "#E5E5E5" // Default gray

      // First ring is always black (current position)
      if (i === 0) {
        isActive = true
        color = "#1A1A1A"
      }
      // Early entry: rings 1-7 (innermost)
      else if (activeEntry === "early" && i > 0 && i < 8) {
        isActive = true
        color = "hsl(var(--entry-early-default))"
      }
      // Middle entry: rings 8-15
      else if (activeEntry === "middle" && i >= 8 && i < 16) {
        isActive = true
        color = "hsl(var(--entry-middle-default))"
      }
      // Late entry: rings 16-23 (outermost)
      else if (activeEntry === "late" && i >= 16) {
        isActive = true
        color = "hsl(var(--entry-late-default))"
      }

      rings.push({
        index: i,
        isActive,
        color
      })
    }
    
    return rings
  }
  
  // Generate rings - show all in gray with first ring black when no wallet or no selection
  const getDefaultRings = () => {
    const rings = []
    const totalMonths = 24
    
    for (let i = 0; i < totalMonths; i++) {
      rings.push({
        index: i,
        isActive: i === 0, // Only first ring is "active" (black)
        color: i === 0 ? "#1A1A1A" : "#E5E5E5"
      })
    }
    
    return rings
  }
  
  const rings = activeEntry ? getRings() : getDefaultRings()

  if (isPreJoin) {
    return (
      <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col gap-3`}>
        {/* Header: Title | Counter (simulation counter when selected) */}
        <div className="flex items-center justify-between">
          <span className={TYPOGRAPHY.label}>Payouts</span>
          <span className={TYPOGRAPHY.caption}>
            {simulationData ? simulationData.counter : `00/${circleData.totalMonths}`}
          </span>
        </div>

        {/* Progress bar with simulation fill when entry selected */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5] relative">
          {simulationData ? (
            <div 
              className="h-full rounded-full transition-all absolute" 
              style={{ 
                left: activeEntry === "early" ? "0%" : activeEntry === "middle" ? "33.33%" : "66.66%",
                width: "33.33%",
                backgroundColor: simulationData.color
              }} 
            />
          ) : (
            <div className="h-full w-[1%] bg-[#1A1A1A] rounded-full" />
          )}
        </div>

        {/* Round info */}
        <div className="flex items-start justify-between gap-1">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-[#1A1A1A]">{simulationData?.nextRound || "Round 1"}</span>
            <span className={TYPOGRAPHY.label}>{simulationData?.nextRoundLabel || "Next round"}</span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <span className="font-semibold text-[#1A1A1A] whitespace-nowrap">{simulationData?.nextRoundDate || "March"}</span>
            <span className={TYPOGRAPHY.label}>{simulationData?.nextRoundYear || "2026"}</span>
          </div>
        </div>

        {/* Circular rings chart - always visible */}
        {rings.length > 0 && (
          <div className="flex justify-center mt-4">
            <svg width="240" height="240" viewBox="0 0 240 240">
              {rings.map((ring, i) => {
                const radius = 20 + (i * 4.2) // Spacing between rings
                const strokeWidth = 3
                
                return (
                  <circle
                    key={i}
                    cx="120"
                    cy="120"
                    r={radius}
                    fill="none"
                    stroke={ring.color}
                    strokeWidth={strokeWidth}
                    opacity={ring.isActive ? 1 : 0.3}
                  />
                )
              })}
              
              {/* Invisible hover zones for each entry group - layered from outermost to innermost */}
              
              {/* Late entry: rings 16-23 (outermost) - full circle to outer edge */}
              <circle
                cx="120"
                cy="120"
                r={120}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => onHoverEntry("late")}
                onMouseLeave={() => onHoverEntry("")}
                onClick={() => {
                  if (isWalletConnected) {
                    if (hasJoined) {
                      showJoinedToast()
                    } else {
                      console.log('[v0] Ring click - selecting late entry')
                      onSelectEntry("late")
                    }
                  }
                }}
              />
              
              {/* Middle entry: rings 8-15 - circle covering early + middle */}
              <circle
                cx="120"
                cy="120"
                r={20 + (15 * 4.2) + 2.1}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => onHoverEntry("middle")}
                onMouseLeave={() => onHoverEntry("")}
                onClick={() => {
                  if (isWalletConnected) {
                    if (hasJoined) {
                      showJoinedToast()
                    } else {
                      console.log('[v0] Ring click - selecting middle entry')
                      onSelectEntry("middle")
                    }
                  }
                }}
              />
              
              {/* Early entry: rings 1-7 (innermost) - on top, highest priority */}
              <circle
                cx="120"
                cy="120"
                r={20 + (7 * 4.2) + 2.1}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => onHoverEntry("early")}
                onMouseLeave={() => onHoverEntry("")}
                onClick={() => {
                  if (isWalletConnected) {
                    if (hasJoined) {
                      showJoinedToast()
                    } else {
                      console.log('[v0] Ring click - selecting early entry')
                      onSelectEntry("early")
                    }
                  }
                }}
              />
            </svg>
          </div>
        )}
      </div>
    )
  }
  
  // Joined state
  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex flex-col gap-3`}>
      {/* Header: Title | Counter (simulation counter when hovering) */}
      <div className="flex items-center justify-between">
        <span className={TYPOGRAPHY.label}>Payouts</span>
        <span className={TYPOGRAPHY.caption}>
          {simulationData ? simulationData.counter : `${String(circleData.payoutProgress).padStart(2, "0")}/${circleData.totalMonths}`}
        </span>
      </div>

      {/* Progress bar with simulation fill when hovering over entry */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5] relative">
        {simulationData ? (
          <div 
            className="h-full rounded-full transition-all absolute" 
            style={{ 
              left: activeEntry === "early" ? "0%" : activeEntry === "middle" ? "33.33%" : "66.66%",
              width: "33.33%",
              backgroundColor: simulationData.color
            }} 
          />
        ) : (
          <div
            className="h-full bg-[#1A1A1A] rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        )}
      </div>

      {/* Round info (updates when hovering) */}
      <div className="flex items-start justify-between gap-1">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-[#1A1A1A]">{simulationData?.nextRound || "Round 1"}</span>
          <span className={TYPOGRAPHY.label}>{simulationData?.nextRoundLabel || "Next round"}</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="font-semibold text-[#1A1A1A] whitespace-nowrap">{simulationData?.nextRoundDate || circleData.payoutDueDate}</span>
          <span className={TYPOGRAPHY.label}>{simulationData?.nextRoundYear || "2026"}</span>
        </div>
      </div>

      {/* Circular rings chart */}
      {rings.length > 0 && (
        <div className="flex justify-center mt-4">
          <svg width="240" height="240" viewBox="0 0 240 240">
            {rings.map((ring, i) => {
              const radius = 20 + (i * 4.2) // Spacing between rings
              const strokeWidth = 3
              
              return (
                <circle
                  key={i}
                  cx="120"
                  cy="120"
                  r={radius}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={strokeWidth}
                  opacity={ring.isActive ? 1 : 0.3}
                />
              )
            })}
            
            {/* Invisible hover zones for each entry group - layered from outermost to innermost */}
            
            {/* Late entry: rings 16-23 (outermost) - full circle to outer edge */}
            <circle
              cx="120"
              cy="120"
              r={120}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => onHoverEntry("late")}
              onMouseLeave={() => onHoverEntry("")}
              onClick={() => {
                if (isWalletConnected) {
                  if (hasJoined) {
                    showJoinedToast()
                  } else {
                    console.log('[v0] Ring click - selecting late entry')
                    onSelectEntry("late")
                  }
                }
              }}
            />
            
            {/* Middle entry: rings 8-15 - circle covering early + middle */}
            <circle
              cx="120"
              cy="120"
              r={20 + (15 * 4.2) + 2.1}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => onHoverEntry("middle")}
              onMouseLeave={() => onHoverEntry("")}
              onClick={() => {
                if (isWalletConnected) {
                  if (hasJoined) {
                    showJoinedToast()
                  } else {
                    console.log('[v0] Ring click - selecting middle entry')
                    onSelectEntry("middle")
                  }
                }
              }}
            />
            
            {/* Early entry: rings 1-7 (innermost) - on top, highest priority */}
            <circle
              cx="120"
              cy="120"
              r={20 + (7 * 4.2) + 2.1}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => onHoverEntry("early")}
              onMouseLeave={() => onHoverEntry("")}
              onClick={() => {
                if (isWalletConnected) {
                  if (hasJoined) {
                    showJoinedToast()
                  } else {
                    console.log('[v0] Ring click - selecting early entry')
                    onSelectEntry("early")
                  }
                }
              }}
            />
          </svg>
        </div>
      )}
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
function PaymentVisualizationCard({ isWalletConnected, hasJoined, selectedEntry }: { isWalletConnected: boolean; hasJoined: boolean; selectedEntry: string }) {
  const progressPercentage = Math.max(1, (circleData.installmentProgress / circleData.totalMonths) * 100)
  
  // Calculate days until next payment
  const getDaysUntilDue = () => {
    const now = new Date()
    const nextDue = new Date(circleData.nextDueDate)
    const diffTime = nextDue.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  
  const daysUntilDue = getDaysUntilDue()
  
  // Get button color based on selected entry
  const getButtonColor = () => {
    if (selectedEntry === "early") return "hsl(var(--entry-early-default))"
    if (selectedEntry === "middle") return "hsl(var(--entry-middle-default))"
    return "hsl(var(--entry-late-default))"
  }
  
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
          <span className="font-semibold text-[#1A1A1A]">
            {hasJoined 
              ? (daysUntilDue <= 0 ? "Due now" : `Due in ${daysUntilDue} day${daysUntilDue > 1 ? 's' : ''}`)
              : "Due now"
            }
          </span>
          <span className="font-semibold text-[#1A1A1A] whitespace-nowrap">${formatNumber(circleData.dueAmount)}</span>
        </div>
      </div>

      {/* Join/Pay button - shows when wallet is connected and entry is selected */}
      {isWalletConnected && selectedEntry && (
        <Button 
          className="w-full rounded-full text-white transition-colors"
          style={{ backgroundColor: getButtonColor() }}
          asChild
        >
          <Link href={hasJoined ? "/pay" : "/join"}>{hasJoined ? "Pay next installment" : "Join"}</Link>
        </Button>
      )}
    </div>
  )
}

// FULL CARD: Entry Status
// Interactive entry selection with hover states and wallet gating
function EntryStatusCard({ isWalletConnected, hasJoined, selectedEntry, hoveredEntry, onSelectEntry, onHoverEntry }: { isWalletConnected: boolean; hasJoined: boolean; selectedEntry: string; hoveredEntry: string; onSelectEntry: (id: string) => void; onHoverEntry: (id: string) => void }) {
  const { toast } = useToast()
  
  const entryGroups = [
    {
      id: "early",
      label: "Early entry",
      description: "Payout between March - October 2026",
      colorDefault: "hsl(var(--entry-early-default))",
      colorHover: "hsl(var(--entry-early-hover))",
      colorActive: "hsl(var(--entry-early-active))",
      count: 8
    },
    {
      id: "middle",
      label: "Middle entry",
      description: "Payout between November 2026 - June 2027",
      colorDefault: "hsl(var(--entry-middle-default))",
      colorHover: "hsl(var(--entry-middle-hover))",
      colorActive: "hsl(var(--entry-middle-active))",
      count: 8
    },
    {
      id: "late",
      label: "Late entry",
      description: "Payout between July 2027 - February 2028",
      colorDefault: "hsl(var(--entry-late-default))",
      colorHover: "hsl(var(--entry-late-hover))",
      colorActive: "hsl(var(--entry-late-active))",
      count: 8
    }
  ]

  const handleEntryClick = (entryId: string) => {
    if (!isWalletConnected) {
      toast({
        title: "Please, connect your wallet",
        duration: 2000,
        action: (
          <button 
            onClick={handleConnectWallet}
            className="absolute inset-0 w-full h-full cursor-pointer"
            aria-label="Connect wallet"
          />
        ),
      })
      return
    }
    
    // If user has already joined, show toast instead of changing selection
    if (hasJoined) {
      const entryLabel = entryGroups.find(g => g.id === selectedEntry)?.label || "this entry"
      toast({
        title: `You've joined this circle on ${entryLabel}`,
        duration: 2000,
      })
      return
    }
    
    // Start simulation for selected entry
    console.log("[v0] User selected entry:", entryId)
    onSelectEntry(entryId)
    localStorage.setItem('selectedEntry', entryId)
    console.log("[v0] Entry saved to localStorage:", localStorage.getItem('selectedEntry'))
  }

  // Filter to only show selected entry when joined
  const displayGroups = hasJoined && selectedEntry
    ? entryGroups.filter(group => group.id === selectedEntry)
    : entryGroups

  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L}`}>
      {/* Responsive: Column mode on desktop (xl), List mode on smaller screens */}
      <div className={`flex flex-col ${hasJoined && selectedEntry ? '' : 'xl:grid xl:grid-cols-3'}`}>
        {displayGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => handleEntryClick(group.id)}
            onMouseEnter={() => {
              console.log('[v0] Hover enter:', group.id)
              onHoverEntry(group.id)
            }}
            onMouseLeave={() => {
              console.log('[v0] Hover leave')
              onHoverEntry("")
            }}
            aria-label={`Select ${group.label}`}
            className={`
              group relative
              flex items-center gap-6 p-4 rounded-2xl
              ${!hasJoined ? 'xl:flex-col xl:items-center xl:gap-6 xl:py-4 xl:px-4' : ''}
              transition-all duration-200 ease-out
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              cursor-pointer
              ${selectedEntry === group.id && !hasJoined ? 'ring-2 ring-inset' : ''}
            `}
            style={{
              backgroundColor: hoveredEntry === group.id || (selectedEntry === group.id && !hasJoined) ? `color-mix(in srgb, ${group.colorDefault} 10%, transparent)` : 'transparent',
              '--tw-ring-color': group.colorDefault,
              '--focus-ring': group.colorDefault,
            } as React.CSSProperties}
          >
            {/* Dots grid - fixed width in list mode, full width in column mode */}
            <div className={`flex justify-center flex-shrink-0 ${!hasJoined ? 'xl:w-full xl:justify-center' : ''}`}>
              <div className="grid grid-cols-4 gap-x-1.5 gap-y-1.5">
                {Array.from({ length: group.count }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full w-4 h-4 border-[2.5px]"
                    style={{
                      borderColor: group.colorDefault
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Text block - left-aligned in list mode, centered in column mode */}
            <div className={`flex flex-col gap-0.5 items-start min-w-0 ${!hasJoined ? 'xl:items-center xl:text-center xl:gap-0.5' : ''}`}>
              <span className="font-semibold text-base xl:text-lg whitespace-nowrap leading-tight" style={{ color: group.colorDefault }}>{group.label}</span>
              <p className={`${TYPOGRAPHY.bodyMuted} text-sm leading-tight line-clamp-3 text-left ${!hasJoined ? 'xl:text-center xl:max-w-[220px]' : ''}`}>{group.description}</p>
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
          <span className="font-semibold text-[#1A1A1A]">Due on sign up</span>
          <span className="font-semibold text-[#1A1A1A] whitespace-nowrap">${formatNumber(circleData.monthlyAmount)}</span>
        </div>
      </div>
    )
  }

  // Calculate days until next payment
  const getDaysUntilDue = () => {
    const now = new Date()
    const nextDue = new Date(circleData.nextDueDate)
    const diffTime = nextDue.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilDue = getDaysUntilDue()

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

      {/* Content row: text left, amount right */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-[#1A1A1A]">
          {daysUntilDue <= 0 ? "Due now" : `Due in ${daysUntilDue} day${daysUntilDue > 1 ? 's' : ''}`}
        </span>
        <span className="font-semibold text-[#1A1A1A] whitespace-nowrap">${formatNumber(circleData.dueAmount)}</span>
      </div>

      {/* Pay now button */}
      <Button 
        className="w-full rounded-full bg-[#1A1A1A] text-white hover:bg-[#333333]"
        asChild
      >
        <Link href="/pay">Pay now</Link>
      </Button>
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

      {/* Full width centered rounded tag */}
      <div className="flex justify-center w-full">
        <div className="rounded-full bg-[#E3F2FD] px-4 py-2 w-full text-center">
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
      <h3 className={`${TYPOGRAPHY.h3} text-[#1A1A1A]`}>Members</h3>

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

// Slots card - Active/Joined badge + slots count or joined date
function SlotsCard({ hasJoined }: { hasJoined: boolean }) {
  const getJoinedText = () => {
    if (!hasJoined || !circleData.joinedDate) return ""
    
    const now = new Date()
    const joined = new Date(circleData.joinedDate)
    const diffTime = Math.abs(now.getTime() - joined.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "1 day ago"
    return `${diffDays} days ago`
  }

  return (
    <div className={`rounded-xl border border-[#E5E5E5] bg-white ${PADDING_L} flex items-center justify-between`}>
      {/* Active/Joined badge */}
      <div className="flex items-center gap-2 rounded-2xl bg-[#E8F5E9] px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
        <span className={`${TYPOGRAPHY.button} text-[#2E7D32]`}>{hasJoined ? "Joined" : "Active"}</span>
      </div>
      {/* Slots count or joined date */}
      <span className={`${TYPOGRAPHY.button} text-[#666666]`}>
        {hasJoined ? getJoinedText() : `${circleData.slotsLeft} slots left`}
      </span>
    </div>
  )
}

export default function FundingCirclePage() {
  const { toast } = useToast()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<string>("")
  const [hoveredEntry, setHoveredEntry] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)

  // Instant page load
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Load state from localStorage on mount (client-only, after hydration)
  useEffect(() => {
    const loadState = () => {
      const storedWallet = localStorage.getItem('walletConnected')
      const storedJoined = localStorage.getItem('hasJoined')
      const storedEntry = localStorage.getItem('selectedEntry')
      
      console.log('[v0] Loading state from localStorage:', { storedWallet, storedJoined, storedEntry })
      
      if (storedWallet === 'true') setIsWalletConnected(true)
      else setIsWalletConnected(false)
      
      if (storedJoined === 'true') setHasJoined(true)
      else setHasJoined(false)
      
      if (storedEntry) setSelectedEntry(storedEntry)
      else setSelectedEntry("")
    }
    
    loadState()
    
    // Refresh state when page becomes visible (user returns from join page)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('[v0] Page became visible - refreshing state')
        loadState()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const handleConnectWallet = () => {
    console.log('[v0] Connecting wallet...')
    toast({
      title: "Connecting wallet...",
      duration: 2000,
    })
    
    setTimeout(() => {
      localStorage.setItem('walletConnected', 'true')
      localStorage.setItem('selectedEntry', 'early')
      setIsWalletConnected(true)
      setSelectedEntry("early") // Auto-select early entry after wallet connects
      console.log('[v0] Wallet connected - auto-selected early entry')
    }, 1500)
  }

  const showJoinedToast = () => {
    const entryLabel = selectedEntry === "early" ? "Early entry" : selectedEntry === "middle" ? "Middle entry" : "Late entry"
    toast({
      title: `You've joined this circle on ${entryLabel}`,
      duration: 2000,
    })
  }

  const handleDisconnectWallet = () => {
    console.log('[v0] Disconnecting wallet - clearing all state')
    localStorage.removeItem('walletConnected')
    localStorage.removeItem('hasJoined')
    localStorage.removeItem('selectedEntry')
    setIsWalletConnected(false)
    setHasJoined(false)
    setSelectedEntry("")
    console.log('[v0] Wallet disconnected - reset to initial state')
  }

  // Skeleton loading screen for instant render
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header skeleton */}
        <header className="w-full border-b border-[#F0F0F0] py-6 md:py-8">
          <div className="mx-auto max-w-[1280px] w-full px-6 md:px-10">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
              <div className="h-6 w-24 bg-[#F0F0F0] rounded animate-pulse" />
              <div className="h-8 w-32 bg-[#F0F0F0] rounded animate-pulse" />
              <div className="justify-self-end h-10 w-28 bg-[#F0F0F0] rounded-full animate-pulse" />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center mx-auto max-w-[1280px] w-full px-6 md:px-10 pb-12 pt-4">
          {/* Mobile skeleton */}
          <div className="flex flex-col gap-4 md:hidden">
            {/* SlotsCard skeleton - short horizontal */}
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 flex items-center justify-between">
              <div className="h-7 w-20 bg-[#F0F0F0] rounded-2xl animate-pulse" />
              <div className="h-5 w-24 bg-[#F0F0F0] rounded animate-pulse" />
            </div>
            {/* TimelineCard skeleton - second on mobile */}
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="h-4 w-20 bg-[#F0F0F0] rounded animate-pulse" />
                <div className="h-6 w-36 bg-[#F0F0F0] rounded animate-pulse" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-16 bg-[#F0F0F0] rounded animate-pulse" />
                <div className="h-6 w-32 bg-[#F0F0F0] rounded animate-pulse" />
              </div>
            </div>
            {/* PaymentVisualizationCard skeleton - tall with nested card */}
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 flex flex-col gap-4">
              <div className="h-6 w-3/4 mx-auto bg-[#F0F0F0] rounded animate-pulse" />
              <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="h-5 w-16 bg-[#F0F0F0] rounded animate-pulse" />
                  <div className="h-5 w-12 bg-[#F0F0F0] rounded animate-pulse" />
                </div>
                <div className="h-3 bg-[#F0F0F0] rounded-full animate-pulse" />
                <div className="h-5 w-32 bg-[#F0F0F0] rounded animate-pulse" />
              </div>
              <div className="h-11 bg-[#F0F0F0] rounded-full animate-pulse" />
            </div>
            {/* EntryStatusCard skeleton - tall with 3 entry items */}
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 flex flex-col gap-4">
              <div className="h-5 w-32 bg-[#F0F0F0] rounded animate-pulse" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-[#E5E5E5] p-4 flex items-center gap-6">
                    <div className="grid grid-cols-4 gap-1.5">
                      {[...Array(8)].map((_, j) => (
                        <div key={j} className="h-4 w-4 rounded-full bg-[#F0F0F0] animate-pulse" />
                      ))}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="h-5 w-24 bg-[#F0F0F0] rounded animate-pulse" />
                      <div className="h-4 w-48 bg-[#F0F0F0] rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* PayoutCard skeleton */}
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 flex flex-col gap-4">
              <div className="h-5 w-32 bg-[#F0F0F0] rounded animate-pulse" />
              <div className="h-12 w-full bg-[#F0F0F0] rounded animate-pulse" />
              <div className="h-10 w-full bg-[#F0F0F0] rounded-full animate-pulse" />
            </div>
            {/* EnsCard skeleton */}
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 flex items-center justify-between">
              <div className="h-5 w-40 bg-[#F0F0F0] rounded animate-pulse" />
              <div className="h-4 w-4 rounded bg-[#F0F0F0] animate-pulse" />
            </div>
            {/* MembersCard skeleton */}
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 flex items-center justify-between">
              <div className="h-5 w-32 bg-[#F0F0F0] rounded animate-pulse" />
              <div className="h-4 w-4 rounded bg-[#F0F0F0] animate-pulse" />
            </div>
          </div>

          {/* Desktop skeleton - matches actual grid layouts */}
          <div className="hidden md:flex flex-col gap-4">
            {/* Same cards as mobile but in grid layout */}
            <div className="grid lg:grid-cols-3 gap-4">
              {/* SlotsCard */}
              <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 flex items-center justify-between">
                <div className="h-7 w-20 bg-[#F0F0F0] rounded-2xl animate-pulse" />
                <div className="h-5 w-24 bg-[#F0F0F0] rounded animate-pulse" />
              </div>
              {/* PaymentVisualizationCard - spans 2 cols on desktop */}
              <div className="lg:col-span-2 rounded-xl border border-[#E5E5E5] bg-white p-6 flex flex-col gap-4">
                <div className="h-6 w-3/4 mx-auto bg-[#F0F0F0] rounded animate-pulse" />
                <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="h-5 w-16 bg-[#F0F0F0] rounded animate-pulse" />
                    <div className="h-5 w-12 bg-[#F0F0F0] rounded animate-pulse" />
                  </div>
                  <div className="h-3 bg-[#F0F0F0] rounded-full animate-pulse" />
                </div>
                <div className="h-11 bg-[#F0F0F0] rounded-full animate-pulse" />
              </div>
            </div>
            {/* EntryStatusCard - full width */}
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 flex flex-col gap-4">
              <div className="h-5 w-32 bg-[#F0F0F0] rounded animate-pulse" />
              <div className="grid lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-[#E5E5E5] p-6 flex flex-col items-center gap-4">
                    <div className="grid grid-cols-4 gap-1.5">
                      {[...Array(8)].map((_, j) => (
                        <div key={j} className="h-4 w-4 rounded-full bg-[#F0F0F0] animate-pulse" />
                      ))}
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-5 w-24 bg-[#F0F0F0] rounded animate-pulse" />
                      <div className="h-4 w-48 bg-[#F0F0F0] rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Bottom row with TimelineCard, PayoutCard, EnsCard, MembersCard */}
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 h-64 bg-[#F0F0F0] animate-pulse" />
              <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 h-64 bg-[#F0F0F0] animate-pulse" />
              <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 h-64 bg-[#F0F0F0] animate-pulse" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-white flex flex-col">
      <Header isWalletConnected={isWalletConnected} onConnectWallet={handleConnectWallet} onDisconnectWallet={handleDisconnectWallet} />

      <main className="flex-1 flex flex-col justify-center mx-auto max-w-[1280px] w-full px-6 md:px-10 pb-12 pt-4 box-border">
        {/* MOBILE (<768px): Single column stack */}
        <div className="flex flex-col gap-4 md:hidden">
<SlotsCard hasJoined={hasJoined} />
<TimelineCard />
<PaymentVisualizationCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} selectedEntry={selectedEntry} />
<EntryStatusCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} selectedEntry={selectedEntry} hoveredEntry={hoveredEntry} onSelectEntry={setSelectedEntry} onHoverEntry={setHoveredEntry} />
<PayoutCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} selectedEntry={selectedEntry} hoveredEntry={hoveredEntry} onHoverEntry={setHoveredEntry} onSelectEntry={setSelectedEntry} showJoinedToast={showJoinedToast} />
<EnsCard />
<MembersCard />
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
          <div style={{ gridArea: 'slots' }}><SlotsCard hasJoined={hasJoined} /></div>
          <div style={{ gridArea: 'payment' }}><PaymentVisualizationCard isWalletConnected={isWalletConnected} selectedEntry={selectedEntry} /></div>
          <div style={{ gridArea: 'entry' }}><EntryStatusCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} selectedEntry={selectedEntry} hoveredEntry={hoveredEntry} onSelectEntry={setSelectedEntry} onHoverEntry={setHoveredEntry} /></div>
          <div style={{ gridArea: 'timeline' }}><TimelineCard /></div>
          <div style={{ gridArea: 'ens' }}><EnsCard /></div>
          <div style={{ gridArea: 'payout' }}><PayoutCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} selectedEntry={selectedEntry} hoveredEntry={hoveredEntry} onHoverEntry={setHoveredEntry} onSelectEntry={setSelectedEntry} showJoinedToast={showJoinedToast} /></div>
          <div style={{ gridArea: 'members' }}><MembersCard /></div>
          <div style={{ gridArea: 'arc' }}><ArcCard /></div>
        </div>

        {/* DESKTOP (1024px+): Redesigned 3-column layout */}
        {/* Column 1: Started/Ends, Payout | Column 2 (wider): Pay with embedded Installments, Entry Status | Column 3: Active slots, Active members, ENS, Arc */}
        <div 
          className={`hidden lg:grid ${GAP_M} w-full`}
          style={{
            gridTemplateColumns: '1fr 1.5fr 1fr',
            alignContent: 'start',
            alignItems: 'start'
          }}
        >
          {/* COLUMN 1: Left stack (Started/Ends, Payout) */}
          <div className={`flex flex-col ${GAP_M}`}>
            <TimelineCard />
            <PayoutCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} selectedEntry={selectedEntry} hoveredEntry={hoveredEntry} onHoverEntry={setHoveredEntry} onSelectEntry={setSelectedEntry} showJoinedToast={showJoinedToast} />
          </div>

          {/* COLUMN 2: Center stack - WIDER (Pay container with embedded Installments, Entry Status) */}
          <div className={`flex flex-col ${GAP_M}`}>
            <PaymentVisualizationCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} selectedEntry={selectedEntry} />
            <EntryStatusCard isWalletConnected={isWalletConnected} hasJoined={hasJoined} selectedEntry={selectedEntry} hoveredEntry={hoveredEntry} onSelectEntry={setSelectedEntry} onHoverEntry={setHoveredEntry} />
          </div>

          {/* COLUMN 3: Right stack (Open slots, ENS, Members, Arc) */}
          <div className={`flex flex-col ${GAP_M}`}>
            <SlotsCard hasJoined={hasJoined} />
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
