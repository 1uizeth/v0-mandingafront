"use client"

import { ArrowLeft, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Format number consistently (avoids hydration mismatch from toLocaleString)
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Mock data for the funding circle
const circleData = {
  amount: 20000,
  title: "for Devcon 2026",
  monthlyAmount: 892,
  totalMonths: 24,
  totalCommitment: 21408,
  protocolFee: 1498, // 7% fee
  totalWithFees: 22906,
  ensDomain: "housing.mandinga.eth",
  dingaTokens: 21408,
  estimatedGas: 0.12,
}

// Mock connected wallet ENS name
const MOCK_WALLET_ENS = "user.eth"

// Step type
type Step = 1 | 2 | 3

// Stepper: clickable, only completed steps enabled
function NumericStepper({ currentStep, onStepClick }: { currentStep: Step; onStepClick?: (step: Step) => void }) {
  const steps = [
    { num: 1, label: "Agreement" },
    { num: 2, label: "Review" },
    { num: 3, label: "Confirm" },
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
  const labels = ["Agreement", "Review", "Confirm"]
  return (
    <span className="text-sm text-[#666666]">
      {currentStep}/3 <span className="font-medium text-[#1A1A1A]">{labels[currentStep - 1]}</span>
    </span>
  )
}

// Step 1: Terms - single column vertical list
function TermsStep({ onSign }: { onSign: () => void }) {
  const [agreed, setAgreed] = useState(false)

  const terms = [
    { num: "01", title: "Shared Financial Risk", desc: "Collective system. Other members may affect outcomes." },
    { num: "02", title: "Missed Payments", desc: "Penalties may apply. Rules enforced automatically." },
    { num: "03", title: "Blockchain Finality", desc: "Transactions irreversible once confirmed." },
    { num: "04", title: "Legal Responsibility", desc: "You handle legal/tax obligations in your country." }
  ]

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 lg:p-6">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Terms and Participation Agreement</h2>
      <p className="text-sm text-[#666666] mt-1">Please review before joining.</p>

      {/* Single column vertical list */}
      <div className="mt-4 p-4 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5]">
        <p className="font-mono text-sm text-[#1A1A1A] mb-4">If you accept, you agree that:</p>
        <div className="flex flex-col gap-4">
          {terms.map((t) => (
            <div key={t.num} className="font-mono text-sm flex gap-3">
              <span className="text-[#1A1A1A] font-semibold shrink-0">{t.num}.</span>
              <div>
                <span className="text-[#1A1A1A] font-medium">{t.title}</span>
                <p className="text-[#666666] text-xs mt-0.5">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: checkbox + CTA inline */}
      <div className="mt-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 rounded border-[#E5E5E5] text-[#1A1A1A] focus:ring-[#1A1A1A]" />
          <span className="text-sm text-[#1A1A1A] whitespace-nowrap">I understand and agree to these terms and accept all risks.</span>
        </label>
        <Button onClick={onSign} disabled={!agreed}
          className={`shrink-0 rounded-full px-8 py-5 text-sm font-semibold lg:w-auto w-full ${
            agreed ? "bg-[#1A1A1A] text-white hover:bg-[#333333]" : "bg-[#E5E5E5] text-[#999999] cursor-not-allowed"
          }`}>
          Sign and Accept Terms
        </Button>
      </div>
    </div>
  )
}

// Step 2: Review - Single column, no back button (per master prompt)
function PreviewStep({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 lg:p-6">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Review</h2>
      <p className="text-sm text-[#666666] mt-1">Verify your commitment before proceeding.</p>

      {/* Your Commitment - single column */}
      <div className="mt-4">
        <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-2">Your Commitment</h3>
        <div className="text-sm space-y-0">
          <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
            <span className="text-[#666666]">Monthly payment</span>
            <span className="font-medium text-[#1A1A1A]">${formatNumber(circleData.monthlyAmount)} USDC</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
            <span className="text-[#666666]">Duration</span>
            <span className="font-medium text-[#1A1A1A]">{circleData.totalMonths} months</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
            <span className="text-[#666666]">Subtotal</span>
            <span className="font-medium text-[#1A1A1A]">${formatNumber(circleData.totalCommitment)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
            <span className="text-[#666666]">Platform fee (7%)</span>
            <span className="font-medium text-[#1A1A1A]">${formatNumber(circleData.protocolFee)}</span>
          </div>
          <div className="flex justify-between py-2 mt-1">
            <span className="font-medium text-[#1A1A1A]">Total</span>
            <span className="font-semibold text-[#1A1A1A]">${formatNumber(circleData.totalWithFees)}</span>
          </div>
        </div>
      </div>

      {/* Network & Fees - single column */}
      <div className="mt-4">
        <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-2">Network & Fees</h3>
        <div className="text-sm space-y-0">
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
            <span className="font-medium text-[#1A1A1A]">~${circleData.estimatedGas}</span>
          </div>
        </div>
      </div>

      {/* Single CTA - no back button */}
      <div className="mt-5">
        <Button onClick={onContinue}
          className="w-full rounded-full bg-[#1A1A1A] px-6 py-5 text-sm font-semibold text-white hover:bg-[#333333]">
          Continue
        </Button>
      </div>
    </div>
  )
}

// Step 3: Confirm - with execution simulation
function ConfirmStep({ 
  onConfirm,
  agreementSignedAt,
  executionStep,
  isExecuting
}: { 
  onConfirm: () => void
  agreementSignedAt: Date | null
  executionStep: number
  isExecuting: boolean
}) {
  const formattedDate = agreementSignedAt 
    ? agreementSignedAt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
    : 'Just now'

  const txSteps = [
    { step: 1, label: "Pay installment" },
    { step: 2, label: "Mint position & claim tokens" }
  ]

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 lg:p-6">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Confirm</h2>
      <p className="text-sm text-[#666666] mt-1">Execute your membership transaction.</p>

      {/* Summary Section */}
      <div className="mt-4 text-sm space-y-0">
        <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
          <span className="text-[#666666]">Circle</span>
          <span className="font-medium text-[#1A1A1A]">${formatNumber(circleData.amount)} {circleData.title}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
          <span className="text-[#666666]">First payment</span>
          <span className="font-medium text-[#1A1A1A]">${formatNumber(circleData.monthlyAmount)} USDC</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-[#F0F0F0]">
          <span className="text-[#666666]">Duration</span>
          <span className="font-medium text-[#1A1A1A]">{circleData.totalMonths} months</span>
        </div>
        <div className="flex justify-between py-1.5">
          <span className="text-[#666666]">Total commitment</span>
          <span className="font-semibold text-[#1A1A1A]">${formatNumber(circleData.totalWithFees)}</span>
        </div>
      </div>

      {/* Agreement Status Card */}
      <div className="mt-4 p-3 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5]">
        <div className="flex items-center gap-2 text-sm">
          <Check className="w-4 h-4 text-[#1A1A1A]" />
          <span className="text-[#1A1A1A] font-medium">Agreement signed</span>
        </div>
        <p className="text-xs text-[#666666] mt-1">{formattedDate}</p>
        <p className="text-xs text-[#666666] mt-2">
          This transaction will register your membership and activate your obligations.
        </p>
      </div>

      {/* Transaction Execution Component */}
      <div className="mt-4">
        <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-2">Transaction Execution</h3>
        <div className="space-y-2 text-sm">
          {txSteps.map((item) => {
            const isComplete = executionStep > item.step
            const isActive = executionStep === item.step && isExecuting
            const isPending = executionStep < item.step

            return (
              <div key={item.step} className="flex items-center gap-2.5 py-1">
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
        <p className="text-xs text-[#999999] mt-2">Each step requires wallet approval.</p>
      </div>

      {/* Single CTA - no back button */}
      <div className="mt-5">
        <Button 
          onClick={onConfirm}
          disabled={isExecuting}
          className={`w-full rounded-full px-6 py-5 text-sm font-semibold ${
            isExecuting 
              ? "bg-[#E5E5E5] text-[#999999] cursor-not-allowed" 
              : "bg-[#1A1A1A] text-white hover:bg-[#333333]"
          }`}
        >
          {isExecuting ? "Processing..." : "Confirm & Join"}
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

  // Show toast notification
  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Step 1: Sign agreement
  const handleSignAgreement = () => {
    showToast("Signing agreement...")
    setTimeout(() => {
      setAgreementSignedAt(new Date())
      setCurrentStep(2)
    }, 1500)
  }

  // Step 2: Continue to confirm
  const handlePreviewContinue = () => {
    setCurrentStep(3)
  }

  // Step 3: Confirm transaction with execution simulation
  const handleConfirm = () => {
    setIsExecuting(true)
    showToast("Processing transactions...")
    
    // Simulate execution cascade
    setExecutionStep(1)
    setTimeout(() => {
      setExecutionStep(2)
      setTimeout(() => {
        setExecutionStep(3) // All done
        setTimeout(() => {
          router.push("/")
        }, 500)
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Full-width Back Area at top */}
      <div className="w-full border-b border-[#F0F0F0]">
        <div className="mx-auto max-w-[760px] px-6">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 py-3 text-[#666666] transition-colors hover:text-[#1A1A1A]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Header: Title + Stepper aligned to card */}
      <header className="w-full pt-5 pb-4">
        <div className="mx-auto max-w-[760px] px-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-lg font-semibold text-[#1A1A1A]">
              {"Join $" + formatNumber(circleData.amount) + " Circle"}
            </h1>

            {/* Stepper - desktop shows full, mobile shows compact */}
            <div className="hidden lg:block">
              <NumericStepper currentStep={currentStep} onStepClick={handleStepClick} />
            </div>
            <div className="lg:hidden">
              <MobileStepper currentStep={currentStep} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col pb-8">
        <div className="mx-auto max-w-[760px] w-full px-6">
          <div>
            {currentStep === 1 && (
              <TermsStep onSign={handleSignAgreement} />
            )}
            {currentStep === 2 && (
              <PreviewStep onContinue={handlePreviewContinue} />
            )}
            {currentStep === 3 && (
              <ConfirmStep 
                onConfirm={handleConfirm}
                agreementSignedAt={agreementSignedAt}
                executionStep={executionStep}
                isExecuting={isExecuting}
              />
            )}
          </div>
        </div>
      </main>

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
