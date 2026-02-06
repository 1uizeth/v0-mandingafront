"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { circleData, getEntryData } from "@/lib/circle-data"
import Confetti from "react-confetti"

export default function PayoutPage() {
  const [selectedEntry, setSelectedEntry] = useState<string>("")
  const [hasWon, setHasWon] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  
  // Mock data - in real app this would come from blockchain
  const selectedWallet = "0x742d...4a8e"
  const userWallet = "0x1a2b...9f3c"
  const nextRoundDate = "April 2026"
  const currentRound = 1
  const isUserSelected = hasWon // User's wallet matches selected wallet
  
  useEffect(() => {
    // Load selected entry from localStorage
    const storedEntry = localStorage.getItem('selectedEntry')
    if (storedEntry) {
      setSelectedEntry(storedEntry)
    }
    
    // Simulate random selection - 12.5% chance to win (1 in 8 for early entry)
    const randomWin = Math.random() < 0.125
    setHasWon(randomWin)
    
    if (randomWin) {
      setShowConfetti(true)
      // Stop confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000)
    }
    
    // Set window size for confetti
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [])

  const entryData = getEntryData(selectedEntry)
  const entryColor = entryData.colorDefault

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Confetti for winners */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      {/* Header */}
      <header className="w-full border-b border-[#F0F0F0] py-6 md:py-8">
        <div className="mx-auto max-w-[1280px] w-full px-6 md:px-10">
          {/* Mobile: Two rows */}
          <div className="flex flex-col gap-6 lg:hidden">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm whitespace-nowrap">Back</span>
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-[#1A1A1A] text-center">
              Payout Round {currentRound}
            </h1>
          </div>

          {/* Desktop: Single row */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="whitespace-nowrap">Back</span>
            </Link>
            <h1 className="text-2xl font-semibold text-[#1A1A1A] text-center">
              Payout Round {currentRound}
            </h1>
            <div />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col mx-auto max-w-[760px] w-full px-6 md:px-10 py-8 md:py-12 gap-6">
        {/* Result card */}
        <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 md:p-8 flex flex-col gap-6">
          {/* Status indicator */}
          <div className="flex flex-col items-center gap-4 text-center">
            {isUserSelected ? (
              <>
                <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#4CAF50]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Congratulations!</h2>
                  <p className="text-[#666666]">You've been selected for this payout round</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#E0E0E0]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Not selected this round</h2>
                  <p className="text-[#666666]">Better luck in the next payout round</p>
                </div>
              </>
            )}
          </div>

          <div className="h-px bg-[#F0F0F0]" />

          {/* Selection details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#999999] uppercase tracking-wide">Selection Details</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#666666]">Selected wallet</span>
                <span className="font-mono font-medium text-[#1A1A1A]">{selectedWallet}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#666666]">Your wallet</span>
                <span className="font-mono font-medium text-[#1A1A1A]">{userWallet}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#666666]">Entry type</span>
                <span className="font-medium text-[#1A1A1A]" style={{ color: entryColor }}>
                  {entryData.label}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#666666]">Next round</span>
                <span className="font-medium text-[#1A1A1A]">{nextRoundDate}</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#F0F0F0]" />

          {/* How it works */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#999999] uppercase tracking-wide">How It Works</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#666666]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A] mb-1">Verifiable Randomness</p>
                  <p className="text-sm text-[#666666]">
                    Selection is powered by Chainlink VRF (Verifiable Random Function) for provably fair, tamper-proof randomness on Arc.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#666666]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A] mb-1">Entry-Based Selection</p>
                  <p className="text-sm text-[#666666]">
                    Each round randomly selects one member from the corresponding entry group (early, middle, or late).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#666666]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A] mb-1">Transparent Process</p>
                  <p className="text-sm text-[#666666]">
                    All selections are recorded on-chain and can be verified by anyone through Arc's block explorer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        {isUserSelected ? (
          <Button 
            className="w-full rounded-full bg-[#4CAF50] text-white hover:bg-[#45A049] py-6 text-base font-semibold"
            asChild
          >
            <Link href="/claim">Claim payout</Link>
          </Button>
        ) : (
          <Button 
            className="w-full rounded-full bg-[#1A1A1A] text-white hover:bg-[#333333] py-6 text-base font-semibold"
            asChild
          >
            <Link href="/">Back to circle</Link>
          </Button>
        )}

        {/* Additional info for winners */}
        {isUserSelected && (
          <p className="text-sm text-center text-[#666666]">
            You have until {nextRoundDate} to claim your payout of ${circleData.contributionPerMonth.toLocaleString()} USDC
          </p>
        )}
      </main>
    </div>
  )
}
