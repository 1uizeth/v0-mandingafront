"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { circles, Circle } from "@/lib/circles"
import { CircleCard } from "@/components/CircleCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SortOption = "closest" | "lowest" | "slots"
type StatusFilter = "all" | "active" | "joined"
type EntryFilter = "all" | "early" | "middle" | "late"

// Typography tokens from dashboard
const TYPOGRAPHY = {
  h1: "text-2xl font-bold",
  label: "text-xs font-bold text-[#666666]",
  body: "text-sm font-normal",
}

export default function CirclesIndexPage() {
  const router = useRouter()
  const [sortBy, setSortBy] = useState<SortOption>("closest")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [entryFilter, setEntryFilter] = useState<EntryFilter>("all")

  // Filter and sort circles
  const filteredAndSortedCircles = useMemo(() => {
    let filtered = [...circles]

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((circle) => {
        if (statusFilter === "active") return circle.statusLabel === "Active"
        if (statusFilter === "joined") return circle.statusLabel === "Joined"
        return true
      })
    }

    // Apply entry filter
    if (entryFilter !== "all") {
      filtered = filtered.filter((circle) => {
        if (entryFilter === "early") return circle.entryLabel === "Early entry"
        if (entryFilter === "middle") return circle.entryLabel === "Middle entry"
        if (entryFilter === "late") return circle.entryLabel === "Late entry"
        return true
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "closest") {
        return a.nextPayoutInDays - b.nextPayoutInDays
      }
      if (sortBy === "lowest") {
        return a.monthlyPayment - b.monthlyPayment
      }
      if (sortBy === "slots") {
        return b.slotsLeft - a.slotsLeft
      }
      return 0
    })

    return filtered
  }, [sortBy, statusFilter, entryFilter])

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1280px] w-full px-6 md:px-10 py-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`${TYPOGRAPHY.h1} text-[#1A1A1A] mb-2`}>Circles</h1>
          <p className={`${TYPOGRAPHY.body} text-[#666666]`}>Browse available funding circles below.</p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label className={TYPOGRAPHY.label}>Sort by:</label>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[160px] h-9 rounded-lg border-[#E5E5E5] text-sm font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="closest">Closest payout</SelectItem>
                <SelectItem value="lowest">Lowest monthly</SelectItem>
                <SelectItem value="slots">Most slots left</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label className={TYPOGRAPHY.label}>Status:</label>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
              <SelectTrigger className="w-[110px] h-9 rounded-lg border-[#E5E5E5] text-sm font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="joined">Joined</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Entry Filter */}
          <div className="flex items-center gap-2">
            <label className={TYPOGRAPHY.label}>Entry:</label>
            <Select value={entryFilter} onValueChange={(value) => setEntryFilter(value as EntryFilter)}>
              <SelectTrigger className="w-[110px] h-9 rounded-lg border-[#E5E5E5] text-sm font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="early">Early</SelectItem>
                <SelectItem value="middle">Middle</SelectItem>
                <SelectItem value="late">Late</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid of Circle Cards - using same gap as dashboard (gap-6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCircles.map((circle) => (
            <CircleCard
              key={circle.slug}
              amount={circle.amount}
              title={circle.title}
              ens={circle.ensDomain}
              monthlyPayment={circle.monthlyPayment}
              durationMonths={circle.durationMonths}
              durationLabel={circle.durationLabel}
              statusLabel={circle.statusLabel}
              statusColor={circle.statusColor}
              slotsLeft={circle.slotsLeft}
              onClick={() => router.push(`/${circle.slug}`)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedCircles.length === 0 && (
          <div className="text-center py-20">
            <p className={`${TYPOGRAPHY.body} text-[#999999]`}>No circles match your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
