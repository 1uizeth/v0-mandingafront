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
  onClick,
}: CircleCardProps) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl border border-[#E5E5E5] bg-white p-5 flex flex-col gap-4 cursor-pointer hover:border-[#333333] transition-colors"
    >
      {/* Top Row - Monthly payment and duration */}
      <div className="flex items-start justify-between">
        {/* Left: Monthly payment */}
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-[#1A1A1A] leading-none whitespace-nowrap">
            ${formatNumber(monthlyPayment)}
          </span>
          <span className={TYPOGRAPHY.caption}>per month</span>
        </div>

        {/* Right: Duration */}
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-xl font-semibold text-[#1A1A1A] leading-none whitespace-nowrap">
            {durationMonths} mo
          </span>
          <span className={TYPOGRAPHY.caption}>{durationLabel}</span>
        </div>
      </div>

      {/* Center Visual - Large Circle with Amount - expanded to full width */}
      <div className="flex items-center justify-center py-4 -mx-5 px-5">
        <div
          className="relative flex items-center justify-center rounded-full border-4 w-full aspect-square max-w-full"
          style={{
            backgroundColor: "#F0FDF4",
            borderColor: "#86EFAC",
          }}
        >
          <div className="flex flex-col items-center justify-center text-center px-6">
            <span className="text-3xl font-bold text-[#1A1A1A] leading-none whitespace-nowrap">
              ${formatNumber(amount)}
            </span>
            <span className="text-base font-semibold text-[#1A1A1A] mt-1.5 whitespace-nowrap">
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Meta Row - Status, Slots, Entry */}
      <div className="flex items-center justify-between text-xs">
        {/* Left: Status with colored dot */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: statusColor }}
          />
          <span className="font-medium text-[#1A1A1A] whitespace-nowrap">{statusLabel}</span>
        </div>

        {/* Center: Slots left */}
        <span className={`${TYPOGRAPHY.caption} whitespace-nowrap`}>{slotsLeft} slots</span>

        {/* Right: Entry label */}
        <span className="text-xs font-bold whitespace-nowrap" style={{ color: entryColor }}>
          {entryLabel}
        </span>
      </div>

      {/* ENS Domain Tag - styled like detail page */}
      <div className="rounded-full bg-[#E3F2FD] px-4 py-2 w-full text-center">
        <span className="text-xs font-semibold text-[#1976D2]">{ens}</span>
      </div>
    </div>
  )
}
