"use client"

import { Button } from "@/components/ui/button"

// Format number with commas
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Typography tokens from dashboard
const TYPOGRAPHY = {
  label: "text-xs font-bold text-[#666666]",
  caption: "text-xs font-bold text-[#999999]",
}

interface CircleCardProps {
  amount: number
  title: string
  ens: string
  monthlyPayment: number
  durationMonths: number
  durationLabel: string
  statusLabel: string
  statusColor: string
  slotsLeft: number
  entryLabel: string
  entryColor: string
  onJoin: () => void
  onClick: () => void
}

export function CircleCard({
  amount,
  title,
  ens,
  monthlyPayment,
  durationMonths,
  durationLabel,
  statusLabel,
  statusColor,
  slotsLeft,
  entryLabel,
  entryColor,
  onJoin,
  onClick,
}: CircleCardProps) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl border border-[#E5E5E5] bg-white p-5 flex flex-col gap-5 cursor-pointer hover:border-[#333333] transition-colors"
    >
      {/* Top Row - Monthly payment and duration */}
      <div className="flex items-start justify-between">
        {/* Left: Monthly payment */}
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-bold text-[#1A1A1A] leading-none">
            ${formatNumber(monthlyPayment)}
          </span>
          <span className={TYPOGRAPHY.caption}>per month</span>
        </div>

        {/* Right: Duration */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-2xl font-semibold text-[#1A1A1A] leading-none">
            {durationMonths} mo
          </span>
          <span className={TYPOGRAPHY.caption}>{durationLabel}</span>
        </div>
      </div>

      {/* Center Visual - Large Circle with Amount */}
      <div className="flex items-center justify-center py-6">
        <div
          className="relative flex items-center justify-center rounded-full border-4"
          style={{
            width: "clamp(180px, 60%, 220px)",
            height: "clamp(180px, 60%, 220px)",
            backgroundColor: "#F0FDF4",
            borderColor: "#86EFAC",
          }}
        >
          <div className="flex flex-col items-center justify-center text-center px-4">
            <span className="text-4xl font-bold text-[#1A1A1A] leading-none">
              ${formatNumber(amount)}
            </span>
            <span className="text-lg font-semibold text-[#1A1A1A] mt-2">
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* ENS Domain */}
      <div>
        <span className={TYPOGRAPHY.caption}>{ens}</span>
      </div>

      {/* Bottom Meta Row - Status, Slots, Entry */}
      <div className="flex items-center justify-between text-sm">
        {/* Left: Status with colored dot */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColor }}
          />
          <span className="font-medium text-[#1A1A1A]">{statusLabel}</span>
        </div>

        {/* Center: Slots left */}
        <span className={TYPOGRAPHY.caption}>{slotsLeft} slots left</span>

        {/* Right: Entry label */}
        <span className="text-xs font-bold" style={{ color: entryColor }}>
          {entryLabel}
        </span>
      </div>

      {/* CTA Button */}
      <Button
        onClick={(e) => {
          e.stopPropagation()
          onJoin()
        }}
        className="w-full rounded-full bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-[#333333] transition-colors py-2.5"
      >
        Join now
      </Button>
    </div>
  )
}
