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
  earlyEntryMonths: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
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
    <header className="flex items-center justify-between px-6 py-6 md:px-10">
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="flex items-center gap-2 rounded-full bg-background px-4 py-2 font-semibold text-foreground transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>

        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">
          <span className="h-2 w-2 rounded-sm bg-emerald-400" />
          <span className="font-semibold text-emerald-500">Active</span>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground/80 md:text-5xl">
          ${circleData.amount.toLocaleString()}
        </h1>
        <p className="text-lg text-foreground/80">{circleData.title}</p>
      </div>

      <div className="rounded-full bg-muted px-4 py-2">
        <span className="font-semibold text-muted-foreground">{circleData.slotsLeft} slots left</span>
      </div>
    </header>
  )
}

function EarlyEntryCard() {
  return (
    <div className="flex items-start gap-3 rounded-3xl bg-purple-50 px-6 py-5">
      <Info className="mt-0.5 h-5 w-5 text-purple-500" />
      <div>
        <p className="font-semibold text-purple-500">Early entry</p>
        <p className="text-purple-500/80">Selected for initial payouts</p>
      </div>
    </div>
  )
}

function TimelineCard() {
  const progressPercentage = (circleData.payoutProgress / circleData.totalMonths) * 100

  return (
    <div className="rounded-[40px] bg-card p-8">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Started on</p>
          <p className="font-semibold text-foreground">{circleData.startDate}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground">Ends on</p>
          <p className="font-semibold text-foreground">{circleData.endDate}</p>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-muted-foreground">Payout</span>
          <span className="text-sm font-semibold text-muted-foreground">
            {String(circleData.payoutProgress).padStart(2, "0")}/{circleData.totalMonths}
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="mt-4">
          <p className="text-sm font-semibold text-foreground">Due on</p>
          <p className="text-2xl font-bold text-foreground">{circleData.payoutDueDate}</p>
        </div>
      </div>
    </div>
  )
}

function PaymentPlanCard() {
  const progressPercentage = (circleData.installmentProgress / circleData.totalMonths) * 100

  return (
    <div className="rounded-[40px] bg-card p-8">
      <h2 className="text-xl font-semibold text-foreground">
        Pay ${circleData.monthlyAmount.toLocaleString()} /mo for {circleData.totalMonths} months
      </h2>

      {/* Payment circles grid */}
      <div className="mt-6 grid grid-cols-12 gap-2">
        {Array.from({ length: circleData.totalMonths }, (_, i) => {
          const monthNumber = i + 1
          const isCurrent = monthNumber === circleData.currentMonth
          const isEarlyEntry = circleData.earlyEntryMonths.includes(monthNumber)
          const isPast = monthNumber < circleData.currentMonth

          let bgColor = "bg-muted"
          if (isCurrent) {
            bgColor = "bg-foreground"
          } else if (isPast || isEarlyEntry) {
            bgColor = "bg-purple-200"
          }

          return (
            <div
              key={monthNumber}
              className={`aspect-square rounded-full ${bgColor} transition-colors`}
              title={`Month ${monthNumber}`}
            />
          )
        })}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Join the first payout on an{" "}
        <span className="font-semibold text-purple-500">Early entry</span> window to most likely be
        selected to <span className="font-semibold text-foreground">get $20,000 within the first 8 months</span>.
      </p>

      <div className="mt-8 border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-muted-foreground">Installment</span>
          <span className="text-sm font-semibold text-muted-foreground">
            {String(circleData.installmentProgress).padStart(2, "0")}/{circleData.totalMonths}
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Due today</p>
            <p className="text-3xl font-bold text-foreground">${circleData.dueAmount.toLocaleString()}</p>
          </div>
          <Button className="rounded-full bg-foreground px-8 py-6 text-lg font-semibold text-background hover:bg-foreground/90">
            Join now
          </Button>
        </div>
      </div>
    </div>
  )
}

function EnsCard() {
  return (
    <div className="rounded-[40px] bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-sky-500">◇</span>
          <span className="text-xl font-bold text-foreground">ens</span>
        </div>
        <a
          href={circleData.ensUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium text-sky-600 transition-colors hover:text-sky-700"
        >
          View on ENS
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="mt-4">
        <div className="inline-block rounded-full bg-sky-100 px-6 py-2">
          <span className="font-semibold text-sky-500">{circleData.ensDomain}</span>
        </div>
      </div>
    </div>
  )
}

function MembersCard() {
  const formatJoinDate = (daysAgo: number) => {
    if (daysAgo === 1) return "Joined 1 day ago"
    return `Joined ${daysAgo} days ago`
  }

  return (
    <div className="rounded-[40px] bg-card p-6">
      <h3 className="font-semibold text-muted-foreground">Active members</h3>

      <div className="mt-4 space-y-3">
        {circleData.members.map((member) => (
          <div key={member.name} className="flex items-center justify-between">
            <span className="text-muted-foreground/70">{member.name}</span>
            <span className="text-xs text-muted-foreground/60">{formatJoinDate(member.joinedDaysAgo)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArcCard() {
  return (
    <div className="rounded-[40px] bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-foreground">◭</span>
          <span className="text-xl font-bold text-foreground">Arc</span>
        </div>
        <a
          href={circleData.arcscanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:opacity-70"
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
    <div className="rounded-3xl bg-card px-6 py-5">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Read the{" "}
          <Link href="#" className="font-medium text-foreground underline underline-offset-2 hover:opacity-70">
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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.8fr_1fr]">
          {/* Left Column */}
          <div className="space-y-6">
            <EarlyEntryCard />
            <TimelineCard />
          </div>

          {/* Center Column */}
          <div>
            <PaymentPlanCard />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <EnsCard />
            <MembersCard />
            <ArcCard />
            <TermsCard />
          </div>
        </div>
      </main>
    </div>
  )
}
