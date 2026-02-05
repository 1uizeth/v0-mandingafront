import { ArrowLeft, ExternalLink, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
      {/* Mobile Header (<768px) */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="rounded-lg bg-[#F5F5F5] px-4 py-2">
            <span className="text-sm font-medium text-[#666666]">{circleData.slotsLeft} slots left</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1A1A1A]">
            ${formatNumber(circleData.amount)}
          </h1>
          <p className="text-base text-[#1A1A1A]">{circleData.title}</p>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center gap-2 rounded-2xl bg-[#E8F5E9] px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
            <span className="text-sm font-medium text-[#2E7D32]">Active</span>
          </div>
        </div>
      </div>

      {/* Tablet Header (768px - 1023px) */}
      <div className="hidden md:flex lg:hidden flex-col gap-3">
        <div className="flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
          <div className="rounded-lg bg-[#F5F5F5] px-4 py-2">
            <span className="text-sm font-medium text-[#666666]">{circleData.slotsLeft} slots left</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#1A1A1A]">
            ${formatNumber(circleData.amount)}
          </h1>
          <p className="text-lg text-[#1A1A1A]">{circleData.title}</p>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center gap-2 rounded-2xl bg-[#E8F5E9] px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
            <span className="text-sm font-medium text-[#2E7D32]">Active</span>
          </div>
        </div>
      </div>

      {/* Desktop Header (1024px+) - 3 column grid */}
      <div className="hidden lg:grid grid-cols-3 gap-6 items-center">
        {/* Column 1: Back button left, Active badge right */}
        <div className="flex items-center justify-between">
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

        {/* Column 3: Slots badge far right */}
        <div className="flex justify-end">
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
    <div className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50 p-5 min-h-[80px] max-h-[100px]">
      <Info className="h-5 w-5 text-purple-600 stroke-[1.5] flex-shrink-0" />
      <div>
        <p className="font-semibold text-purple-600 text-base">Early entry</p>
        <p className="text-purple-500 text-sm">Selected for initial payouts</p>
      </div>
    </div>
  )
}

// INFO TAG: Terms Notice (compact, fixed height)
function TermsTag() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#E5E5E5] bg-white p-5 min-h-[80px]">
      <Info className="h-5 w-5 text-[#999999] stroke-[1.5] flex-shrink-0 mt-0.5" />
      <p className="text-sm text-[#666666]">
        Read the{" "}
        <Link href="#" className="font-medium text-[#1A1A1A] underline underline-offset-2 hover:opacity-70">
          Terms and Conditions
        </Link>{" "}
        before joining a circle
      </p>
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

// Helper function to render circle with proper color
function Circle({ index }: { index: number }) {
  const monthNumber = index + 1
  const isCurrent = monthNumber === circleData.currentMonth
  const isEarlyEntry = circleData.earlyEntryMonths.includes(monthNumber)
  
  let bgColor = "bg-[#E5E5E5]"
  if (isCurrent) bgColor = "bg-[#1A1A1A]"
  else if (isEarlyEntry) bgColor = "bg-[#C4B5FD]"
  
  return <div className={`w-full h-full rounded-full ${bgColor}`} />
}

// FULL CARD: Payment Visualization (circles + description)
function PaymentVisualizationCard() {
  const circles = Array.from({ length: circleData.totalMonths }, (_, i) => i)
  
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">
        Pay ${formatNumber(circleData.monthlyAmount)} /mo for {circleData.totalMonths} months
      </h2>

      {/* 
        RESPONSIVE CIRCLE GRID - Only ONE grid visible at a time:
        - Mobile (<768px): 6×4, 24px circles, 6px gap
        - Tablet (768px - 1023px): 6×4, 32px circles, 8px gap
        - Desktop (1024px+): 12×2, 32px circles, 8px gap
      */}
      
      {/* Mobile (<768px): 4 cols × 6 rows - fixed 24px circles, 6px gap */}
      <div 
        className="mt-6 grid md:hidden"
        style={{ gridTemplateColumns: 'repeat(4, 24px)', gap: '6px' }}
      >
        {circles.map((i) => (
          <div key={`mobile-${i}`} className="w-6 h-6">
            <Circle index={i} />
          </div>
        ))}
      </div>

      {/* Tablet (768px - 1023px): 6 cols × 4 rows - fixed 28px circles, 8px gap */}
      <div 
        className="mt-6 hidden md:grid lg:hidden"
        style={{ gridTemplateColumns: 'repeat(6, 28px)', gap: '8px' }}
      >
        {circles.map((i) => (
          <div key={`tablet-${i}`} className="w-7 h-7">
            <Circle index={i} />
          </div>
        ))}
      </div>

      {/* Desktop narrow (1024px - 1279px): 8 cols × 3 rows - fixed 32px circles, 8px gap */}
      <div 
        className="mt-6 hidden lg:grid xl:hidden"
        style={{ gridTemplateColumns: 'repeat(8, 32px)', gap: '8px' }}
      >
        {circles.map((i) => (
          <div key={`desktop-narrow-${i}`} className="w-8 h-8">
            <Circle index={i} />
          </div>
        ))}
      </div>

      {/* Desktop wide (1280px+): 12 cols × 2 rows - fixed 32px circles, 8px gap */}
      <div 
        className="mt-6 hidden xl:grid"
        style={{ gridTemplateColumns: 'repeat(12, 32px)', gap: '8px' }}
      >
        {circles.map((i) => (
          <div key={`desktop-wide-${i}`} className="w-8 h-8">
            <Circle index={i} />
          </div>
        ))}
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
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6">
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
          <TermsTag />
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
          
          {/* Terms spans full width */}
          <div className="col-span-2">
            <TermsTag />
          </div>
        </div>

        {/* DESKTOP (1024px+): 3 columns */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <EarlyEntryTag />
            <TimelineCard />
            <PayoutCard />
          </div>

          {/* Center Column - TWO separate cards */}
          <div className="space-y-6">
            <PaymentVisualizationCard />
            <InstallmentCard />
          </div>

          {/* Right Column - 3 cards */}
          <div className="space-y-6">
            <EnsCard />
            <MembersAndArcCard />
            <TermsTag />
          </div>
        </div>
      </main>
    </div>
  )
}
