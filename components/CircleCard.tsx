"use client"

import { Button } from "@/components/ui/button"

// Format number with commas
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
      className="rounded-[32px] border border-[#E5E5E5] bg-white p-7 lg:p-8 flex flex-col cursor-pointer hover:border-[#333333] transition-colors"
    >
      {/* Top Row - Monthly payment and duration */}
      <div className="flex items-start justify-between mb-5">
        {/* Left: Monthly payment */}
        <div className="flex flex-col">
          <span className="text-[30px] lg:text-[32px] font-bold text-[#1A1A1A] leading-none">
            ${formatNumber(monthlyPayment)}
          </span>
          <span className="text-sm text-[#999999] mt-1.5 font-medium">per month</span>
        </div>

        {/* Right: Duration */}
        <div className="flex flex-col items-end">
          <span className="text-[26px] lg:text-[28px] font-semibold text-[#1A1A1A] leading-none">
            {durationMonths} mo
          </span>
          <span className="text-sm text-[#999999] mt-1.5 font-medium">{durationLabel}</span>
        </div>
      </div>

      {/* Center Visual - Large Circle with Amount */}
      <div className="flex items-center justify-center my-6 lg:my-8">
        <div
          className="relative flex items-center justify-center rounded-full border-4"
          style={{
            width: "clamp(200px, 65%, 280px)",
            height: "clamp(200px, 65%, 280px)",
            backgroundColor: "#F0FDF4",
            borderColor: "#86EFAC",
          }}
        >
          <div className="flex flex-col items-center justify-center text-center px-6">
            <span className="text-[44px] lg:text-[52px] font-bold text-[#1A1A1A] leading-none">
              ${formatNumber(amount)}
            </span>
            <span className="text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mt-2">
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* ENS Domain - small line above meta row */}
      <div className="mb-3">
        <span className="text-sm text-[#999999]">{ens}</span>
      </div>

      {/* Bottom Meta Row - Status, Slots, Entry */}
      <div className="flex items-center justify-between mb-5 text-[19px] lg:text-[20px]">
        {/* Left: Status with colored dot */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColor }}
          />
          <span className="font-medium text-[#1A1A1A]">{statusLabel}</span>
        </div>

        {/* Center: Slots left */}
        <span className="text-[#999999] font-medium">{slotsLeft} slots left</span>

        {/* Right: Entry label */}
        <span className="font-medium" style={{ color: entryColor }}>
          {entryLabel}
        </span>
      </div>

      {/* CTA Button */}
      <Button
        onClick={(e) => {
          e.stopPropagation()
          onJoin()
        }}
        className="w-full h-14 lg:h-16 rounded-full bg-[#1A1A1A] text-white text-[20px] lg:text-[22px] font-semibold hover:bg-[#333333] transition-colors"
      >
        Join now
      </Button>
    </div>
  )
}
