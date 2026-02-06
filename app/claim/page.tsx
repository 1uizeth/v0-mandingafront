"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ClaimPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-[#F0F0F0] py-6 md:py-8">
        <div className="mx-auto max-w-[1280px] w-full px-6 md:px-10">
          {/* Mobile: Two rows */}
          <div className="flex flex-col gap-6 lg:hidden">
            <div className="flex items-center justify-between">
              <Link
                href="/payout"
                className="inline-flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm whitespace-nowrap">Back</span>
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-[#1A1A1A] text-center">
              Claim Payout
            </h1>
          </div>

          {/* Desktop: Single row */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <Link
              href="/payout"
              className="inline-flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="whitespace-nowrap">Back</span>
            </Link>
            <h1 className="text-2xl font-semibold text-[#1A1A1A] text-center">
              Claim Payout
            </h1>
            <div />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center mx-auto max-w-[760px] w-full px-6 md:px-10 py-8 md:py-12">
        <div className="rounded-xl border border-[#E5E5E5] bg-white p-8 md:p-12 flex flex-col gap-6 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center mx-auto">
            <div className="text-3xl">🚧</div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Claim Flow Coming Soon</h2>
            <p className="text-[#666666]">
              The claim flow will allow you to receive your payout directly to your wallet.
            </p>
          </div>
          <Button 
            className="w-full rounded-full bg-[#1A1A1A] text-white hover:bg-[#333333]"
            asChild
          >
            <Link href="/">Back to circle</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
