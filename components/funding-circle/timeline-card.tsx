interface TimelineCardProps {
  startDate: string
  endDate: string
  payoutProgress: number
  totalPayouts: number
  dueDate: string
}

export function TimelineCard({
  startDate,
  endDate,
  payoutProgress,
  totalPayouts,
  dueDate,
}: TimelineCardProps) {
  const progressPercentage = (payoutProgress / totalPayouts) * 100

  return (
    <div className="rounded-[40px] bg-card p-8">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Started on</p>
          <p className="font-semibold text-foreground">{startDate}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground">Ends on</p>
          <p className="font-semibold text-foreground">{endDate}</p>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-muted-foreground">Payout</span>
          <span className="text-sm font-semibold text-muted-foreground">
            {String(payoutProgress).padStart(2, "0")}/{totalPayouts}
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
          <p className="text-2xl font-bold text-foreground">{dueDate}</p>
        </div>
      </div>
    </div>
  )
}
