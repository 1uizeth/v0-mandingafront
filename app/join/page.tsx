"use client"

import { ArrowLeft, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { circleData, getEntryLabel, getEntryData } from "@/lib/circle-data"

// Format number consistently (avoids hydration mismatch from toLocaleString)
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Mock connected wallet ENS name
const MOCK_WALLET_ENS = "1uiz.eth"

  // Step type
  type Step = 1 | 2

  // Stepper: clickable, only completed steps enabled
  function NumericStepper({ currentStep, onStepClick }: { currentStep: Step; onStepClick?: (step: Step) => void }) {
    const steps = [
      { num: 1, label: "Agreement" },
      { num: 2, label: "Review" },
    ]

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, index) => {
        const isCompleted = step.num < currentStep
        const isCurrent = step.num === currentStep
        const isClickable = isCompleted && onStepClick

        return (
          <div key={step.num} className="flex items-center">
            <button
              type="button"
              onClick={() => isClickable && onStepClick(step.num as Step)}
              disabled={!isClickable}
              className={`flex items-center gap-1.5 ${isClickable ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
            >
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  isCompleted || isCurrent
                    ? "bg-[#1A1A1A] text-white"
                    : "border border-[#E0E0E0] text-[#BDBDBD] bg-white"
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : step.num}
              </div>
              <span 
                className={`text-sm transition-colors whitespace-nowrap ${
                  step.num <= currentStep ? "text-[#1A1A1A] font-medium" : "text-[#BDBDBD]"
                }`}
              >
                {step.label}
              </span>
            </button>
            
            {index < steps.length - 1 && (
              <div className={`w-8 h-px mx-2 transition-colors ${isCompleted ? "bg-[#1A1A1A]" : "bg-[#E0E0E0]"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

  // Mobile stepper - compact inline
  function MobileStepper({ currentStep }: { currentStep: Step }) {
    const labels = ["Agreement", "Review"]
  return (
    <span className="text-sm text-[#666666]">
      {currentStep}/2 <span className="font-medium text-[#1A1A1A]">{labels[currentStep - 1]}</span>
    </span>
  )
}

// Step 1: Terms - flex column card anatomy with scrollable body
function TermsStep({ onSign }: { onSign: () => void }) {
  const [agreed, setAgreed] = useState(false)

  // Updated agreement terms
  const terms = [
    { num: "01", title: "Fixed Monthly Installment", desc: "You agree to pay $892 every month for 24 months. Early exit is not guaranteed." },
    { num: "02", title: "Missed Payments", desc: "Penalties may apply. Rules are enforced automatically." },
    { num: "03", title: "Shared Financial Risk", desc: "This is a collective system. Other members may affect outcomes." },
    { num: "04", title: "Legal Responsibility", desc: "You are responsible for handling legal and tax obligations in your country." },
    { num: "05", title: "Blockchain Finality", desc: "Transactions are irreversible once confirmed." }
  ]

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white">
      {/* Header */}
      <div className="px-5 lg:px-6 pt-5 lg:pt-6">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Terms and Participation Agreement</h2>
        <p className="text-sm text-[#666666] mt-1">Please review before joining.</p>
      </div>

      {/* Body */}
      <div className="px-5 lg:px-6 py-5">
        <div className="p-4 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5]">
          <p className="font-mono text-sm text-[#1A1A1A] mb-4">If you accept, you agree that:</p>
          <div className="flex flex-col gap-4">
            {terms.map((t) => (
              <div key={`term-${t.num}-${t.title}`} className="font-mono text-sm flex gap-3">
                <span className="text-[#1A1A1A] font-semibold shrink-0">{t.num}.</span>
                <div>
                  <span className="text-[#1A1A1A] font-medium">{t.title}</span>
                  <p className="text-[#666666] text-xs font-bold mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-4 border-t border-[#F0F0F0]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-[#E5E5E5] text-[#1A1A1A] focus:ring-[#1A1A1A]" />
            <span className="text-sm text-[#1A1A1A]">I understand and agree to these terms and accept all risks.</span>
          </label>
          <Button onClick={onSign} disabled={!agreed}
            className={`shrink-0 rounded-full px-6 py-4 text-sm font-semibold lg:w-auto w-full ${
              agreed ? "bg-[#1A1A1A] text-white hover:bg-[#333333]" : "bg-[#E5E5E5] text-[#999999] cursor-not-allowed"
            }`}>
            Sign and Accept Terms
          </Button>
        </div>
      </div>
    </div>
  )
}

// Step 2: Review & Confirm - merged from old steps 2 and 3
function ReviewAndConfirmStep({ 
  onConfirm,
  agreementSignedAt,
  executionStep,
  isExecuting,
  getEntryLabel
}: { 
  onConfirm: () => void
  agreementSignedAt: Date | null
  executionStep: number
  isExecuting: boolean
  getEntryLabel: () => string
}) {
  const formattedDate = agreementSignedAt 
    ? agreementSignedAt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
    : 'Just now'

  // All execution steps including agreement (step 0 is always complete)
  const txSteps = [
    { step: 0, label: "Agreement signed" },
    { step: 1, label: "Pay installment" },
    { step: 2, label: "Mint position & claim tokens" }
  ]

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white">
      {/* Header */}
      <div className="px-5 lg:px-6 pt-5 lg:pt-6">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Review</h2>
        <p className="text-sm text-[#666666] mt-1">Review your commitment and confirm the transaction to complete.</p>
      </div>

      {/* Body */}
      <div className="px-5 lg:px-6 py-5">
        {/* Your Commitment */}
        <div>
          <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-2">Your Commitment</h3>
          <div className="text-sm">
            <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
              <span className="text-[#666666]">Monthly installment</span>
              <span className="font-medium text-[#1A1A1A]">${formatNumber(circleData.contributionPerMonth)} USDC</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
              <span className="text-[#666666]">Duration</span>
              <span className="font-medium text-[#1A1A1A]">{circleData.totalMonths} months</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
              <span className="text-[#666666]">Position</span>
              <span className="font-medium text-[#1A1A1A]">{getEntryLabel()}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
              <span className="text-[#666666]">Subtotal</span>
              <span className="font-medium text-[#1A1A1A]">${formatNumber(circleData.totalCommitment)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
              <span className="text-[#666666]">Vault fee (7%)</span>
              <span className="font-medium text-[#1A1A1A]">${formatNumber(circleData.protocolFee)}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="font-medium text-[#1A1A1A]">Total</span>
              <span className="font-semibold text-[#1A1A1A]">${formatNumber(circleData.totalWithFees)}</span>
            </div>
          </div>
        </div>

        {/* Network & Fees */}
        <div className="mt-5">
          <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-2">Network & Fees</h3>
          <div className="text-sm">
            <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
              <span className="text-[#666666]">Chain</span>
              <span className="font-medium text-[#1A1A1A]">Arc</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
              <span className="text-[#666666]">Currency</span>
              <span className="font-medium text-[#1A1A1A]">USDC (native)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#666666]">Estimated gas</span>
              <span className="font-medium text-[#1A1A1A]">~$0.12</span>
            </div>
          </div>
        </div>

        {/* Transaction Execution */}
        <div className="mt-5">
          <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-3">Transaction Execution</h3>
          <div className="space-y-3 text-sm">
            {txSteps.map((item) => {
              // Step 0 (Agreement) is always complete
              const isComplete = item.step === 0 || executionStep > item.step
              const isActive = item.step !== 0 && executionStep === item.step && isExecuting

              return (
                <div key={item.step} className="flex items-center gap-2.5">
                  <div 
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                      isComplete 
                        ? "bg-[#1A1A1A] text-white" 
                        : isActive
                        ? "border-2 border-[#1A1A1A] text-[#1A1A1A]"
                        : "border border-[#E0E0E0] text-[#999999]"
                    }`}
                  >
                    {isComplete ? (
                      <Check className="w-3 h-3" strokeWidth={2.5} />
                    ) : isActive ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      item.step
                    )}
                  </div>
                  <span className={isComplete ? "text-[#1A1A1A]" : "text-[#666666]"}>{item.label}</span>
                </div>
              )
            })}
          </div>
          <p className="text-xs font-bold text-[#999999] mt-3">Each step requires wallet approval.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-4 border-t border-[#F0F0F0]">
        <Button 
          onClick={onConfirm}
          disabled={isExecuting}
          className="w-full rounded-full bg-[#1A1A1A] px-6 py-4 text-sm font-semibold text-white hover:bg-[#333333] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExecuting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </span>
          ) : (
            "Confirm"
          )}
        </Button>
      </div>
    </div>
  )
}

// Success Screen - shows after all transactions complete
function SuccessScreen() {
  const router = useRouter()

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white">
      {/* Body */}
      <div className="px-5 lg:px-6 py-8 lg:py-12 flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Successfully Joined!</h2>
        <p className="text-sm text-[#666666] max-w-md">
          You're now part of {circleData.name}. Your first payment has been processed.
        </p>

        {/* Details */}
        <div className="mt-8 w-full max-w-sm">
          <div className="bg-[#FAFAFA] rounded-lg border border-[#E5E5E5] p-4 text-sm">
            <div className="flex justify-between py-1.5">
              <span className="text-[#666666]">Claim tokens</span>
              <span className="font-semibold text-[#1A1A1A]">{formatNumber(circleData.contributionPerMonth)}</span>
            </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#666666]">Position</span>
            <span className="font-medium text-[#1A1A1A]">{getEntryLabel()}</span>
          </div>
        </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={() => router.push("/?joined=true")}
          className="w-full max-w-sm rounded-full bg-[#1A1A1A] px-6 py-4 text-sm font-semibold text-white hover:bg-[#333333] mt-8"
        >
          Go back to circle
        </Button>
      </div>
    </div>
  )
}

export default function JoinCirclePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [agreementSignedAt, setAgreementSignedAt] = useState<Date | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [executionStep, setExecutionStep] = useState(0)
  const [isExecuting, setIsExecuting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<string>("early")
  const [showCancelModal, setShowCancelModal] = useState(false)

  // Load selected entry from localStorage
  useEffect(() => {
    const entry = localStorage.getItem('selectedEntry') || 'early'
    setSelectedEntry(entry)
    console.log('[v0] Join page loaded with selected entry:', entry)
  }, [])

  // Instant page load with skeleton
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Show toast notification
  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Step 1: Sign agreement - moves directly to step 2 (review & confirm)
  const handleSignAgreement = () => {
    showToast("Signing agreement...")
    setTimeout(() => {
      setAgreementSignedAt(new Date())
      setCurrentStep(2)
    }, 800)
  }

  // Step 2: Confirm transaction with execution simulation
  const handleConfirm = () => {
    console.log('[v0] User confirmed join with entry:', selectedEntry)
    setIsExecuting(true)
    showToast("Processing transactions...")
    
    // Simulate execution cascade
    setExecutionStep(1)
    console.log('[v0] Execution step 1: Signing agreement')
    setTimeout(() => {
      setExecutionStep(2)
      console.log('[v0] Execution step 2: Processing payment')
      setTimeout(() => {
        setExecutionStep(3) // All done - show success
        setIsExecuting(false)
        localStorage.setItem('hasJoined', 'true')
        console.log('[v0] Join complete! Saved hasJoined to localStorage')
      }, 800)
    }, 800)
  }

  // Stepper click navigation (only to completed steps)
  const handleStepClick = (step: Step) => {
    if (step < currentStep) {
      setCurrentStep(step)
    }
  }

  // Back button handler - navigate within flow or exit
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    } else {
      router.push("/")
    }
  }

  // Skeleton loading screen for instant render
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header 
          className="w-full border-b border-[#F0F0F0]"
          style={{ paddingTop: 'clamp(32px, 6vh, 64px)', paddingBottom: 'clamp(16px, 2vh, 24px)' }}
        >
          <div className="mx-auto max-w-[760px] px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="h-7 w-32 bg-[#F0F0F0] rounded animate-pulse" />
              <div className="absolute left-1/2 -translate-x-1/2 h-10 w-40 bg-[#F0F0F0] rounded-full animate-pulse" />
              <div className="h-10 w-20 bg-[#F0F0F0] rounded-md animate-pulse" />
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col pb-8" style={{ paddingTop: 'clamp(16px, 3vh, 32px)' }}>
          <div className="mx-auto max-w-[760px] w-full px-6">
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-8">
              <div className="h-6 w-32 bg-[#F0F0F0] rounded animate-pulse mb-6" />
              <div className="space-y-4">
                <div className="h-20 bg-[#F0F0F0] rounded animate-pulse" />
                <div className="h-20 bg-[#F0F0F0] rounded animate-pulse" />
                <div className="h-20 bg-[#F0F0F0] rounded animate-pulse" />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Back + Title + Stepper - matching main page spacing - hidden on success */}
      {executionStep !== 3 && (
      <header 
        className="w-full border-b border-[#F0F0F0]"
        style={{ paddingTop: 'clamp(32px, 6vh, 64px)', paddingBottom: 'clamp(16px, 2vh, 24px)' }}
      >
        <div className="mx-auto max-w-[760px] px-6">
          {/* Mobile: Two rows - controls then title */}
          <div className="flex flex-col gap-6 lg:hidden">
            {/* Row 1: Stepper + Cancel */}
            <div className="flex items-center justify-between">
              <MobileStepper currentStep={currentStep} />
              <Button
                variant="outline"
                onClick={() => setShowCancelModal(true)}
                className="text-sm"
              >
                Cancel
              </Button>
            </div>
            {/* Row 2: Title - centered */}
            <h1 className="text-xl font-semibold text-[#1A1A1A] text-center">
              Join Circle
            </h1>
          </div>

          {/* Desktop: Single row with title, stepper, cancel */}
          <div className="hidden lg:flex items-center justify-between gap-4">
            <h1 className="text-lg font-semibold text-[#1A1A1A]">
              Join Circle
            </h1>
            <div className="absolute left-1/2 -translate-x-1/2">
              <NumericStepper currentStep={currentStep} onStepClick={handleStepClick} />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowCancelModal(true)}
              className="text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </header>
      )}

      <main className="flex-1 flex flex-col pb-8" style={{ paddingTop: 'clamp(16px, 3vh, 32px)' }}>
        <div className="mx-auto max-w-[760px] w-full px-6">
          {executionStep === 3 ? (
            <SuccessScreen />
          ) : (
            <>
  {currentStep === 1 && (
    <TermsStep onSign={handleSignAgreement} />
  )}
  {currentStep === 2 && (
    <ReviewAndConfirmStep
      onConfirm={handleConfirm}
      agreementSignedAt={agreementSignedAt}
      executionStep={executionStep}
      isExecuting={isExecuting}
      getEntryLabel={() => getEntryLabel(selectedEntry)}
    />
  )}
            </>
          )}
        </div>
      </main>

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Cancel confirmation modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">Cancel joining?</h2>
            <p className="text-sm text-[#666666] mb-6">
              Your progress will be lost and you'll need to start over if you want to join this circle later.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCancelModal(false)}
                className="flex-1"
              >
                Continue Joining
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="flex-1 bg-[#1A1A1A] text-white hover:bg-[#333333]"
              >
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
