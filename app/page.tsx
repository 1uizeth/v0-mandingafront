"use client"

import { ArrowLeft, ExternalLink, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    { name: "sassal.eth", joinedDaysAgo: 1 },
    { name: "vitalik.eth", joinedDaysAgo: 2 },
    { name: "1uiz.eth", joinedDaysAgo: 3 },
  ],
}

function Header() {
  return (
    <header className="mx-auto max-w-[1280px] xl:max-w-[1440px] px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-4 md:py-6">
      {/* Mobile Header */}
      <div className="flex flex-col gap-4 lg:hidden">
        <div className="flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Back</span>
          </Link>
          <div className="rounded-lg border border-[#E5E5E5] px-3 py-1.5 md:px-4 md:py-2">
            <span className="text-xs md:text-sm font-medium text-[#666666]">{circleData.slotsLeft} slots left</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-medium text-emerald-500 text-sm">Active</span>
        </div>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            ${circleData.amount.toLocaleString()}
          </h1>
          <p className="text-sm md:text-base text-[#1A1A1A]">{circleData.title}</p>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:grid grid-cols-3 gap-6 lg:gap-8 items-center">
        {/* Column 1: Back button left, Active badge right */}
        <div className="flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-medium text-emerald-500">Active</span>
          </div>
        </div>

        {/* Column 2: Centered title */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-[56px] font-bold text-[#1A1A1A]">
            ${circleData.amount.toLocaleString()}
          </h1>
          <p className="text-lg xl:text-xl text-[#1A1A1A]">{circleData.title}</p>
        </div>

        {/* Column 3: Slots badge far right */}
        <div className="flex justify-end">
          <div className="rounded-lg border border-[#E5E5E5] px-4 py-2">
            <span className="font-medium text-[#666666]">{circleData.slotsLeft} slots left</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function EarlyEntryCard() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#E9E3FF] bg-[#F3F0FF] p-4 md:p-5 lg:p-6 min-h-[120px] md:min-h-[140px]">
      <Info className="mt-0.5 h-5 w-5 text-[#7C3AED] stroke-[1.5] flex-shrink-0" />
      <div>
        <p className="font-semibold text-[#7C3AED]">Early entry</p>
        <p className="text-[#9333EA]">Selected for initial payouts</p>
      </div>
    </div>
  )
}

function TimelineDatesCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-4 md:p-5 lg:p-6 min-h-[140px] md:min-h-[160px]">
      <div className="space-y-4 md:space-y-5">
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

function PayoutProgressCard() {
  const progressPercentage = (circleData.payoutProgress / circleData.totalMonths) * 100

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-4 md:p-5 lg:p-6 min-h-[140px] md:min-h-[160px]">
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
        <p className="text-xl md:text-2xl font-semibold text-[#1A1A1A]">{circleData.payoutDueDate}</p>
      </div>
    </div>
  )
}

function PaymentVisualizationCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-4 md:p-5 lg:p-6">
      <h2 className="text-base md:text-lg font-semibold text-[#1A1A1A]">
        Pay ${circleData.monthlyAmount.toLocaleString()} /mo for {circleData.totalMonths} months
      </h2>

      {/* Mobile Payment circles grid - 8 columns x 3 rows */}
      <div className="mt-4 md:mt-6 grid grid-cols-8 gap-1.5 lg:hidden">
        {Array.from({ length: circleData.totalMonths }, (_, i) => {
          const monthNumber = i + 1
          const isCurrent = monthNumber === circleData.currentMonth
          const isEarlyEntry = circleData.earlyEntryMonths.includes(monthNumber)

          let bgColor = "bg-[#E5E5E5]"
          if (isCurrent) {
            bgColor = "bg-[#1A1A1A]"
          } else if (isEarlyEntry) {
            bgColor = "bg-[#C4B5FD]"
          }

          return (
            <div
              key={monthNumber}
              className={`aspect-square rounded-full ${bgColor}`}
              title={`Month ${monthNumber}`}
            />
          )
        })}
      </div>

      {/* Desktop Payment circles grid - 12 columns x 2 rows */}
      <div className="mt-6 hidden lg:grid grid-cols-12 gap-2">
        {Array.from({ length: circleData.totalMonths }, (_, i) => {
          const monthNumber = i + 1
          const isCurrent = monthNumber === circleData.currentMonth
          const isEarlyEntry = circleData.earlyEntryMonths.includes(monthNumber)

          let bgColor = "bg-[#E5E5E5]"
          if (isCurrent) {
            bgColor = "bg-[#1A1A1A]"
          } else if (isEarlyEntry) {
            bgColor = "bg-[#C4B5FD]"
          }

          return (
            <div
              key={monthNumber}
              className={`aspect-square rounded-full ${bgColor}`}
              title={`Month ${monthNumber}`}
            />
          )
        })}
      </div>

      <p className="mt-4 md:mt-6 text-sm text-[#666666]">
        Join the first payout on an{" "}
        <span className="font-semibold text-[#7C3AED]">Early entry</span> window to most likely be
        selected to <span className="font-semibold text-[#1A1A1A]">get $20,000 within the first 8 months</span>.
      </p>
    </div>
  )
}

function InstallmentCard() {
  const progressPercentage = (circleData.installmentProgress / circleData.totalMonths) * 100

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-4 md:p-5 lg:p-6">
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

      <div className="mt-4 md:mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-sm text-[#666666]">Due today</p>
          <p className="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">${circleData.dueAmount.toLocaleString()}</p>
        </div>
        <Button className="w-full sm:w-auto rounded-full bg-[#1A1A1A] px-6 md:px-8 py-3 md:py-6 text-base font-semibold text-white hover:bg-[#333333]">
          Join now
        </Button>
      </div>
    </div>
  )
}

function EnsCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-4 md:p-5 lg:p-6 min-h-[120px] md:min-h-[140px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2L2 10L10 18L18 10L10 2Z" stroke="#0EA5E9" strokeWidth="2" fill="none"/>
          </svg>
          <span className="text-lg font-bold text-[#1A1A1A]">ens</span>
        </div>
        <a
          href={circleData.ensUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium text-sky-500 transition-colors hover:text-sky-600"
        >
          View on ENS
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="mt-4">
        <div className="inline-block rounded-full border border-sky-400 bg-sky-50 px-4 md:px-5 py-2">
          <span className="font-medium text-sky-500 text-sm md:text-base">{circleData.ensDomain}</span>
        </div>
      </div>
    </div>
  )
}

function MembersAndArcCard() {
  const formatJoinDate = (daysAgo: number) => {
    if (daysAgo === 1) return "Joined 1 day ago"
    return `Joined ${daysAgo} days ago`
  }

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-4 md:p-5 lg:p-6">
      {/* Active Members Section */}
      <h3 className="text-base md:text-lg font-semibold text-[#1A1A1A]">Active members</h3>

      <div className="mt-3 md:mt-4">
        {circleData.members.map((member) => (
          <div key={member.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 py-3 md:py-4 border-b border-[#F5F5F5] last:border-0">
            <span className="font-medium text-[#1A1A1A] text-sm md:text-base">{member.name}</span>
            <span className="text-xs md:text-sm text-[#999999]">{formatJoinDate(member.joinedDaysAgo)}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-4 md:my-5 h-px bg-[#E5E5E5]" />

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

function TermsCard() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-4 md:p-5 lg:p-6">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 text-[#666666] stroke-[1.5] flex-shrink-0" />
        <p className="text-sm text-[#666666]">
          Read the{" "}
          <Link href="#" className="font-medium text-[#1A1A1A] underline underline-offset-2 hover:opacity-70">
            Terms and Conditions
          </Link>{" "}
          before joining a circle
        </p>
      </div>
    </div>
  )
}

export default function FundingCirclePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-[1280px] xl:max-w-[1440px] px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 pb-8 md:pb-12 pt-4 md:pt-8">
        {/* Mobile/Tablet: Single/Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4 md:gap-5">
          <EarlyEntryCard />
          <PaymentVisualizationCard />
          <TimelineDatesCard />
          <EnsCard />
          <PayoutProgressCard />
          <InstallmentCard />
          <div className="md:col-span-2">
            <MembersAndArcCard />
          </div>
          <TermsCard />
        </div>

        {/* Desktop: Three column layout */}
        <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8">
          {/* Left Column */}
          <div className="space-y-6 xl:space-y-8">
            <EarlyEntryCard />
            <TimelineDatesCard />
            <PayoutProgressCard />
          </div>

          {/* Center Column - TWO separate cards */}
          <div className="space-y-6 xl:space-y-8">
            <PaymentVisualizationCard />
            <InstallmentCard />
          </div>

          {/* Right Column - 3 cards */}
          <div className="space-y-6 xl:space-y-8">
            <EnsCard />
            <MembersAndArcCard />
            <TermsCard />
          </div>
        </div>
      </main>
    </div>
  )
}
