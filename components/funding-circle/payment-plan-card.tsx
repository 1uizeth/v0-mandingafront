"use client"

import { Button } from "@/components/ui/button"

interface PaymentPlanCardProps {
  monthlyAmount: number
  totalMonths: number
  currentMonth: number
  earlyEntryMonths: number[]
  installmentProgress: number
  dueAmount: number
  onJoin: () => void
}

export function PaymentPlanCard({
  monthlyAmount,
  totalMonths,
  currentMonth,
  earlyEntryMonths,
  installmentProgress,
  dueAmount,
  onJoin,
}: PaymentPlanCardProps) {
  const progressPercentage = (installmentProgress / totalMonths) * 100

  return (
    <div className="rounded-[40px] bg-card p-8">
      <h2 className="text-xl font-semibold text-foreground">
        Pay ${monthlyAmount.toLocaleString()} /mo for {totalMonths} months
      </h2>

      {/* Payment circles grid */}
      <div className="mt-6 grid grid-cols-12 gap-2">
        {Array.from({ length: totalMonths }, (_, i) => {
          const monthNumber = i + 1
          const isCurrent = monthNumber === currentMonth
          const isEarlyEntry = earlyEntryMonths.includes(monthNumber)
          const isPast = monthNumber < currentMonth

          let bgColor = "bg-muted" // Default gray for future months
          if (isCurrent) {
            bgColor = "bg-foreground"
          } else if (isPast || isEarlyEntry) {
            bgColor = "bg-purple-200"
          }

          return (
            <div
              key={i}
              className={`aspect-square rounded ${bgColor} transition-colors`}
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
            {String(installmentProgress).padStart(2, "0")}/{totalMonths}
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
            <p className="text-3xl font-bold text-foreground">${dueAmount.toLocaleString()}</p>
          </div>
          <Button
            onClick={onJoin}
            className="rounded-full bg-foreground px-8 py-6 text-lg font-semibold text-background hover:bg-foreground/90"
          >
            Join now
          </Button>
        </div>
      </div>
    </div>
  )
}
