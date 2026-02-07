"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getCircleBySlug } from "@/lib/circles"
import CircleDashboardPage from "@/components/pages/CircleDashboardPage"

export default function CircleDetailPage() {
  const params = useParams()
  const circleSlug = params.circleSlug as string

  // Lookup circle by slug
  const circle = getCircleBySlug(circleSlug)

  // If circle not found, show empty state
  if (!circle) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Circle not found</h1>
          <p className="text-sm text-[#666666]">
            The circle you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to circles</span>
          </Link>
        </div>
      </div>
    )
  }

  // Render the circle dashboard
  return <CircleDashboardPage circle={circle} />
}
