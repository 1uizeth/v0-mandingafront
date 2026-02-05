"use client"

import { ArrowLeft, ExternalLink, Info } from "lucide-react"
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

function Header() {
  return (
    <header className="mx-auto max-w-[1280px] px-6 md:px-10 py-6">
      {/* Mobile + Tablet Header (<1024px): Active LEFT, Title CENTER, Slots RIGHT - all same row */}
      <div className="flex lg:hidden flex-col gap-4">
        {/* Back button row */}
        <Link
          href="#"
          className="flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70 w-fit"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-sm md:text-base">Back</span>
        </Link>
        
        {/* Main header row: Active | Title | Slots */}
        <div className="flex items-center justify-between gap-4">
          {/* Active badge - LEFT */}
          <div className="flex items-center gap-2 rounded-2xl bg-[#E8F5E9] px-3 py-1.5 flex-shrink-0">
            <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
            <span className="text-sm font-medium text-[#2E7D32]">Active</span>
          </div>
          
          {/* Title - CENTER */}
          <div className="text-center flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              ${formatNumber(circleData.amount)}
            </h1>
            <p className="text-sm md:text-base text-[#1A1A1A]">{circleData.title}</p>
          </div>
          
          {/* Slots badge - RIGHT */}
          <div className="rounded-lg bg-[#F5F5F5] px-3 md:px-4 py-2 flex-shrink-0">
            <span className="text-xs md:text-sm font-medium text-[#666666]">{circleData.slotsLeft} slots left</span>
          </div>
        </div>
      </div>

      {/* Desktop Header (1024px+) - 3 column grid aligned with content */}
      <div className="hidden lg:grid grid-cols-3 gap-6 items-center">
        {/* Column 1: Back button left */}
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>

          <div className="flex items-center gap-2 rounded-2xl bg-[#E8F5E9] px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
            <span className="text-sm font-medium text-[#2E7D32]">Active</span>
          </div>
        </div>

        {/* Column 2: Centered title */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold text-[#1A1A1A]">
            ${formatNumber(circleData.amount)}
          </h1>
          <p className="text-lg text-[#1A1A1A]">{circleData.title}</p>
        </div>

        {/* Column 3: Slots badge aligned to LEFT edge of column 3 */}
        <div className="flex justify-start">
          <div className="rounded-lg bg-[#F5F5F5] px-4 py-2">
            <span className="text-sm font-medium text-[#666666]">{circleData.slotsLeft} slots left</span>
          </div>
        </div>
      </div>
    </header>
  )
}

// INFO TAG: Early Entry (compact, fixed height)
function EarlyEntryTag() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50 p-5 min-h-[80px]">
      <Info className="h-5 w-5 text-purple-600 stroke-[1.5] flex-shrink-0" />
      <div>
        <p className="font-semibold text-purple-600 text-base">Early entry</p>
        <p className="text-purple-500 text-sm">Selected for initial payouts</p>
      </div>
    </div>
  )
}

// FULL CARD: Timeline
function TimelineCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6">
      <div className="space-y-5">
        <div>
          <p className="text-sm text-[#666666]">Started on</p>
          <p className="text-base font-semibold text-[#1A1A1A]">{circleData.startDate}</p>
        </div>
        <div>
          <p className="text-sm text-[#666666]">Ends on</p>
          <p className="text-base font-semibold text-[#1A1A1A]">{circleData.endDate}</p>
        </div>
      </div>
    </div>
  )
}

// FULL CARD: Payout Progress
function PayoutCard() {
  const progressPercentage = (circleData.payoutProgress / circleData.totalMonths) * 100

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#666666]">Payout</span>
        <span className="text-sm text-[#666666]">
          {String(circleData.payoutProgress).padStart(2, "0")}/{circleData.totalMonths}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
        <div
          className="h-full rounded-full bg-[#1A1A1A] transition-all"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="mt-4">
        <p className="text-sm text-[#666666]">Due on</p>
        <p className="text-2xl font-semibold text-[#1A1A1A]">{circleData.payoutDueDate}</p>
      </div>
    </div>
  )
}

// WIDTH-DRIVEN CIRCLE GRID COMPONENT
// Uses ResizeObserver to measure available width and calculates optimal columns
function ResponsiveCircleGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [gridConfig, setGridConfig] = useState({ cols: 12, size: 32, gap: 8 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const calculateGrid = () => {
      const availableWidth = container.offsetWidth
      const gap = availableWidth < 420 ? 6 : 8
      
      // Try column candidates from highest to lowest
      const candidates = [12, 10, 8, 6, 5, 4]
      
      for (const cols of candidates) {
        const sizeCandidate = Math.floor((availableWidth - gap * (cols - 1)) / cols)
        
        // Accept first candidate where size is between 22 and 32
        if (sizeCandidate >= 22 && sizeCandidate <= 32) {
          setGridConfig({
            cols,
            size: Math.min(32, Math.max(22, sizeCandidate)),
            gap
          })
          return
        }
      }
      
      // Fallback: use 4 columns with calculated size
      const fallbackSize = Math.floor((availableWidth - gap * 3) / 4)
      setGridConfig({
        cols: 4,
        size: Math.min(32, Math.max(18, fallbackSize)),
        gap
      })
    }

    // Initial calculation
    calculateGrid()

    // Setup ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      calculateGrid()
    })
    
    resizeObserver.observe(container)
    
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const circles = Array.from({ length: circleData.totalMonths }, (_, i) => i)

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridConfig.cols}, ${gridConfig.size}px)`,
          gap: `${gridConfig.gap}px`,
          justifyContent: 'start',
          width: 'max-content'
        }}
      >
        {circles.map((i) => {
          const monthNumber = i + 1
          const isCurrent = monthNumber === circleData.currentMonth
          const isEarlyEntry = circleData.earlyEntryMonths.includes(monthNumber)
          
          let bgColor = "#E5E5E5" // Default gray
          if (isCurrent) bgColor = "#1A1A1A" // Circle 1: black
          else if (isEarlyEntry) bgColor = "#C4B5FD" // Circles 2-8: purple
          
          return (
            <div
              key={i}
              style={{
                width: `${gridConfig.size}px`,
                height: `${gridConfig.size}px`,
                borderRadius: '50%',
                backgroundColor: bgColor
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

// FULL CARD: Payment Visualization (circles + description)
function PaymentVisualizationCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">
        Pay ${formatNumber(circleData.monthlyAmount)} /mo for {circleData.totalMonths} months
      </h2>

      <div className="mt-6">
        <ResponsiveCircleGrid />
      </div>

      <p className="mt-6 text-sm text-[#666666] leading-relaxed">
        Join the first payout on an{" "}
        <span className="font-semibold text-purple-600">Early entry</span> window to most likely be
        selected to <span className="font-semibold text-[#1A1A1A]">get $20,000 within the first 8 months</span>.
      </p>
    </div>
  )
}

// FULL CARD: Installment Progress
function InstallmentCard() {
  const progressPercentage = (circleData.installmentProgress / circleData.totalMonths) * 100

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#666666]">Installment</span>
        <span className="text-sm text-[#666666]">
          {String(circleData.installmentProgress).padStart(2, "0")}/{circleData.totalMonths}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
        <div
          className="h-full rounded-full bg-[#1A1A1A] transition-all"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-sm text-[#666666]">Due today</p>
          <p className="text-3xl font-semibold text-[#1A1A1A]">${formatNumber(circleData.dueAmount)}</p>
        </div>
        <Button className="w-full sm:w-auto rounded-full bg-[#1A1A1A] px-8 py-6 text-base font-semibold text-white hover:bg-[#333333]">
          Join now
        </Button>
      </div>
    </div>
  )
}

// FULL CARD: ENS Integration
function EnsCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 min-h-[120px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2L2 10L10 18L18 10L10 2Z" stroke="#5298FF" strokeWidth="2" fill="none"/>
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

      <div className="mt-4">
        <div className="inline-block rounded-lg bg-[#E3F2FD] px-4 py-2">
          <span className="text-sm font-medium text-[#1976D2]">{circleData.ensDomain}</span>
        </div>
      </div>
    </div>
  )
}

// FULL CARD: Active Members + Arc
function MembersAndArcCard() {
  const formatJoinDate = (daysAgo: number) => {
    if (daysAgo === 1) return "Joined 1 day ago"
    return `Joined ${daysAgo} days ago`
  }

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6">
      <h3 className="text-lg font-semibold text-[#1A1A1A]">Active members</h3>

      <div className="mt-4">
        {circleData.members.map((member, index) => (
          <div 
            key={member.name} 
            className={`flex items-center justify-between py-4 ${index < circleData.members.length - 1 ? 'border-b border-[#F5F5F5]' : ''}`}
          >
            <span className="font-medium text-[#1A1A1A]">{member.name}</span>
            <span className="text-sm text-[#999999]">{formatJoinDate(member.joinedDaysAgo)}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-[#E5E5E5]" />

      {/* Arc Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2L18 18H2L10 2Z" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
          </svg>
          <span className="text-lg font-bold text-[#1A1A1A]">Arc</span>
        </div>
        <a
          href={circleData.arcscanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium text-[#1A1A1A] transition-colors hover:opacity-70"
        >
          View on Arcscan
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}

export default function FundingCirclePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-[1280px] px-6 md:px-10 pb-12 pt-6">
        {/* MOBILE (<768px): Single column */}
        <div className="flex flex-col gap-4 md:hidden">
          <EarlyEntryTag />
          <PaymentVisualizationCard />
          <TimelineCard />
          <PayoutCard />
          <InstallmentCard />
          <EnsCard />
          <MembersAndArcCard />
        </div>

        {/* TABLET (768px - 1023px): 2 columns with spanning */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
          {/* Early Entry spans full width */}
          <div className="col-span-2">
            <EarlyEntryTag />
          </div>
          
          {/* Payment Visualization spans full width */}
          <div className="col-span-2">
            <PaymentVisualizationCard />
          </div>
          
          {/* Timeline - Left */}
          <TimelineCard />
          
          {/* ENS - Right */}
          <EnsCard />
          
          {/* Payout - Left */}
          <PayoutCard />
          
          {/* Installment - Right */}
          <InstallmentCard />
          
          {/* Members + Arc spans full width */}
          <div className="col-span-2">
            <MembersAndArcCard />
          </div>
        </div>

        {/* DESKTOP (1024px+): 3 columns - balanced rectangular block */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <EarlyEntryTag />
            <TimelineCard />
            <PayoutCard />
          </div>

          {/* Center Column */}
          <div className="space-y-6">
            <PaymentVisualizationCard />
            <InstallmentCard />
          </div>

          {/* Right Column - ends with Members+Arc */}
          <div className="space-y-6">
            <EnsCard />
            <MembersAndArcCard />
          </div>
        </div>
      </main>
    </div>
  )
}
