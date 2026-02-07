"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { circles } from "@/lib/circles"

// Format number consistently
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export default function CirclesIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1280px] w-full px-6 md:px-10 py-20">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <h1 className="text-4xl font-bold text-[#1A1A1A]">Circles</h1>
          
          <p className="text-sm text-[#666666] max-w-md">
            Browse available funding circles below.
          </p>
          
          {/* Circles list */}
          <div className="flex flex-col gap-4 w-full max-w-2xl">
            {circles.map((circle) => (
              <Link
                key={circle.slug}
                href={`/${circle.slug}`}
                className="group"
              >
                <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 hover:border-[#1A1A1A] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <h2 className="text-xl font-semibold text-[#1A1A1A] group-hover:opacity-70 transition-opacity">
                        ${formatNumber(circle.amount)} {circle.title}
                      </h2>
                      <p className="text-sm text-[#666666] mt-1">
                        {circle.slotsLeft} slots left • {circle.ensDomain}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[#1A1A1A] group-hover:opacity-70 transition-opacity">
                      <span className="text-sm font-medium">View</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 12L10 8L6 4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
