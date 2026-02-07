"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { circles, Circle } from "@/lib/circles"
import { CircleCard } from "@/components/CircleCard"

type SortOption = "closest" | "lowest" | "slots"
type StatusFilter = "all" | "active" | "joined"
type EntryFilter = "all" | "early" | "middle" | "late"

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
      <div className="mx-auto max-w-[1280px] w-full px-6 md:px-10 py-12 lg:py-20">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-3">Circles</h1>
          <p className="text-base text-[#666666]">Browse available funding circles below.</p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-8 lg:mb-10">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-[#666666]">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 rounded-lg border border-[#E5E5E5] bg-white text-sm font-medium text-[#1A1A1A] hover:border-[#333333] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-colors cursor-pointer"
            >
              <option value="closest">Closest payout</option>
              <option value="lowest">Lowest monthly</option>
              <option value="slots">Most slots left</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-[#666666]">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-4 py-2 rounded-lg border border-[#E5E5E5] bg-white text-sm font-medium text-[#1A1A1A] hover:border-[#333333] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-colors cursor-pointer"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="joined">Joined</option>
            </select>
          </div>

          {/* Entry Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-[#666666]">Entry:</label>
            <select
              value={entryFilter}
              onChange={(e) => setEntryFilter(e.target.value as EntryFilter)}
              className="px-4 py-2 rounded-lg border border-[#E5E5E5] bg-white text-sm font-medium text-[#1A1A1A] hover:border-[#333333] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-colors cursor-pointer"
            >
              <option value="all">All</option>
              <option value="early">Early</option>
              <option value="middle">Middle</option>
              <option value="late">Late</option>
            </select>
          </div>
        </div>

        {/* Grid of Circle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
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
              entryLabel={circle.entryLabel}
              entryColor={circle.entryColor}
              onJoin={() => router.push(`/join?circle=${encodeURIComponent(circle.slug)}`)}
              onClick={() => router.push(`/${circle.slug}`)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedCircles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-[#999999]">No circles match your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
