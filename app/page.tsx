"use client"

import { Header } from "@/components/funding-circle/header"
import { EarlyEntryCard } from "@/components/funding-circle/early-entry-card"
import { TimelineCard } from "@/components/funding-circle/timeline-card"
import { PaymentPlanCard } from "@/components/funding-circle/payment-plan-card"
import { EnsCard } from "@/components/funding-circle/ens-card"
import { MembersCard } from "@/components/funding-circle/members-card"
import { ArcCard } from "@/components/funding-circle/arc-card"
import { TermsCard } from "@/components/funding-circle/terms-card"

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
  earlyEntryMonths: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], // Alternating purple circles
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

export default function FundingCirclePage() {
  const handleJoin = () => {
    // Handle join action
    console.log("Join circle clicked")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        status={circleData.status}
        amount={circleData.amount}
        title={circleData.title}
        slotsLeft={circleData.slotsLeft}
      />

      <main className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.8fr_1fr]">
          {/* Left Column */}
          <div className="space-y-6">
            <EarlyEntryCard />
            <TimelineCard
              startDate={circleData.startDate}
              endDate={circleData.endDate}
              payoutProgress={circleData.payoutProgress}
              totalPayouts={circleData.totalMonths}
              dueDate={circleData.payoutDueDate}
            />
          </div>

          {/* Center Column */}
          <div>
            <PaymentPlanCard
              monthlyAmount={circleData.monthlyAmount}
              totalMonths={circleData.totalMonths}
              currentMonth={circleData.currentMonth}
              earlyEntryMonths={circleData.earlyEntryMonths}
              installmentProgress={circleData.installmentProgress}
              dueAmount={circleData.dueAmount}
              onJoin={handleJoin}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <EnsCard ensDomain={circleData.ensDomain} ensUrl={circleData.ensUrl} />
            <MembersCard members={circleData.members} />
            <ArcCard arcscanUrl={circleData.arcscanUrl} />
            <TermsCard />
          </div>
        </div>
      </main>
    </div>
  )
}
