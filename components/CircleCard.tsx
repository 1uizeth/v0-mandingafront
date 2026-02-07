"use client"

import { useState } from "react"

// Format number with commas
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Typography tokens from dashboard
const TYPOGRAPHY = {
  label: "text-xs font-bold text-[#666666]",
  caption: "text-xs font-bold text-[#999999]",
}

type EntryType = "early" | "middle" | "late" | null

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
  earlyEntry: {
    slotsLeft: number
    payoutPeriod: string
  }
  middleEntry: {
    slotsLeft: number
    payoutPeriod: string
  }
  lateEntry: {
    slotsLeft: number
    payoutPeriod: string
  }
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
  earlyEntry,
  middleEntry,
  lateEntry,
  onClick,
}: CircleCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [hoveredEntry, setHoveredEntry] = useState<EntryType>(null)

  const getEntryData = (entry: EntryType) => {
    switch (entry) {
      case "early":
        return {
          label: "Early entry",
          description: earlyEntry.payoutPeriod,
          slotsLeft: earlyEntry.slotsLeft,
          color: "#D4AF37"
        }
      case "middle":
        return {
          label: "Middle entry",
          description: middleEntry.payoutPeriod,
          slotsLeft: middleEntry.slotsLeft,
          color: "#5F9EA0"
        }
      case "late":
        return {
          label: "Late entry",
          description: lateEntry.payoutPeriod,
          slotsLeft: lateEntry.slotsLeft,
          color: "#6A5ACD"
        }
      default:
        return null
    }
  }

  const currentEntry = getEntryData(hoveredEntry)

  // Generate rings for visualization
  const getRings = () => {
    const rings = []
    const totalMonths = 24

    for (let i = 0; i < totalMonths; i++) {
      let color = "#E5E5E5" // Default gray

      // First ring is always black
      if (i === 0) {
        color = "#1A1A1A"
      }
      // Early entry: rings 1-7 (innermost)
      else if (hoveredEntry === "early" && i > 0 && i < 8) {
        color = "#D4AF37"
      }
      // Middle entry: rings 8-15
      else if (hoveredEntry === "middle" && i >= 8 && i < 16) {
        color = "#5F9EA0"
      }
      // Late entry: rings 16-23 (outermost)
      else if (hoveredEntry === "late" && i >= 16) {
        color = "#6A5ACD"
      }

      rings.push({
        index: i,
        color,
        opacity: (i === 0 || hoveredEntry) ? 1 : 0.3
      })
    }

    return rings
  }

  const rings = getRings()

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setHoveredEntry(null)
      }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-5 flex flex-col gap-4 cursor-pointer hover:border-[#333333] transition-colors"
    >
      {/* Header - Payment summary or Entry info when hovering */}
      <h2 className="text-base font-semibold text-[#1A1A1A] text-center min-h-[48px] flex flex-col justify-center transition-all duration-200">
        {currentEntry ? (
          <>
            <span>{currentEntry.label}</span>
            <span className="text-xs font-normal text-[#666666] mt-1">
              {currentEntry.description}
            </span>
          </>
        ) : (
          <span>Pay ${formatNumber(monthlyPayment)} /mo for {durationMonths} months</span>
        )}
      </h2>

      {/* Center Visual - Circle or Rings */}
      <div className="flex items-center justify-center py-4 -mx-5 px-5 relative">
        {isHovering ? (
          /* Rings visualization */
          <svg width="100%" height="auto" viewBox="0 0 240 240" className="w-full max-w-full">
            {rings.map((ring, i) => {
              const radius = 20 + (i * 4.2)
              const strokeWidth = 3

              return (
                <circle
                  key={i}
                  cx="120"
                  cy="120"
                  r={radius}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={strokeWidth}
                  opacity={ring.opacity}
                  className="transition-all duration-200"
                />
              )
            })}

            {/* Invisible hover zones for each entry group - layered from outermost to innermost */}
            
            {/* Late entry: rings 16-23 (outermost) - full circle to outer edge */}
            <circle
              cx="120"
              cy="120"
              r={120}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredEntry("late")}
            />

            {/* Middle entry: rings 8-15 - circle covering early + middle */}
            <circle
              cx="120"
              cy="120"
              r={20 + (15 * 4.2) + 2.1}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredEntry("middle")}
            />

            {/* Early entry: rings 1-7 (innermost) - on top, highest priority */}
            <circle
              cx="120"
              cy="120"
              r={20 + (7 * 4.2) + 2.1}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredEntry("early")}
            />
          </svg>
        ) : (
          /* Green circle with amount/title */
          <div
            className="relative flex items-center justify-center rounded-full border-4 w-full aspect-square max-w-full transition-all duration-200"
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
        )}
      </div>

      {/* Status and Slots - matching detail page */}
      <div className="flex items-center justify-between">
        {/* Left: Active/Joined badge */}
        <div className="flex items-center gap-2 rounded-2xl bg-[#E8F5E9] px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
          <span className="text-sm font-medium text-[#2E7D32]">{statusLabel}</span>
        </div>

        {/* Right: Slots left badge - shows entry-specific slots when hovering */}
        <div className="rounded-2xl bg-[#F5F5F5] px-3 py-1.5 transition-all duration-200">
          <span className="text-sm font-medium text-[#666666]">
            {currentEntry 
              ? `${currentEntry.slotsLeft} ${currentEntry.label.toLowerCase().split(' ')[0]} slots left`
              : `${slotsLeft} slots left`
            }
          </span>
        </div>
      </div>

      {/* ENS Domain Tag - styled like detail page */}
      <div className="rounded-full bg-[#E3F2FD] px-4 py-2 w-full text-center">
        <span className="text-xs font-semibold text-[#1976D2]">{ens}</span>
      </div>
    </div>
  )
}
