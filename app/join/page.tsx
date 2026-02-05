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

// Numeric milestone stepper with connecting lines
function NumericStepper({ currentStep }: { currentStep: Step }) {
  const steps = [
    { num: 1, label: "Agreement" },
    { num: 2, label: "Review" },
    { num: 3, label: "Confirm" },
  ]

  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center">
          {/* Step circle with number */}
          <div className="flex flex-col items-center">
            <div 
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                step.num < currentStep 
                  ? "bg-[#1A1A1A] text-white" // Completed
                  : step.num === currentStep 
                  ? "bg-[#1A1A1A] text-white" // Current
                  : "border-2 border-[#E5E5E5] text-[#999999]" // Upcoming
              }`}
            >
              {step.num < currentStep ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                step.num
              )}
            </div>
            {/* Label below */}
            <span 
              className={`text-[10px] mt-1.5 transition-colors whitespace-nowrap ${
                step.num <= currentStep 
                  ? "text-[#1A1A1A] font-medium" 
                  : "text-[#999999]"
              }`}
            >
              {step.label}
            </span>
          </div>
          
          {/* Connecting line (not after last step) */}
          {index < steps.length - 1 && (
            <div 
              className={`w-8 h-0.5 mx-1.5 -mt-5 transition-colors ${
                step.num < currentStep 
                  ? "bg-[#1A1A1A]" 
                  : "bg-[#E5E5E5]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// Mobile stepper - collapsed to "Step X of 3"
function MobileStepper({ currentStep }: { currentStep: Step }) {
  const labels = ["Agreement", "Review", "Confirm"]
  return (
    <span className="text-sm text-[#666666]">
      Step {currentStep} of 3 — <span className="font-medium text-[#1A1A1A]">{labels[currentStep - 1]}</span>
    </span>
  )
}

// Step 1: Terms & Participation Agreement - Compact 4 clauses
function TermsStep({ 
  onSign 
}: { 
  onSign: () => void
}) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 md:p-8">
      {/* Card header */}
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Terms and Participation Agreement</h2>
      <p className="text-sm text-[#666666] mt-1">
        Please review before joining this circle.
      </p>

      {/* Contract-style terms - compact 4 clauses only */}
      <div className="mt-6 p-5 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5] font-mono text-sm">
        <p className="text-[#1A1A1A] leading-relaxed mb-5">
          If you accept these terms, you agree that:
        </p>

        <ol className="space-y-4">
          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">01.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">Shared Financial Risk</span>
              <br />This is a collective financial system. {"Other members' behavior may affect outcomes. Delays or defaults may occur."}
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">02.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">Missed Payments & Enforcement</span>
              <br />If you miss payments, penalties may apply, your position may be reduced, and your benefits may be restricted. All rules are enforced automatically.
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">03.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">Blockchain Finality</span>
              <br />All transactions are irreversible. Payments, NFTs, and tokens cannot be reversed once confirmed.
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">04.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">Legal Responsibility</span>
              <br />You are responsible for any legal or tax obligations in your country related to participation.
            </div>
          </li>
        </ol>
      </div>

      {/* Checkbox - updated language */}
      <label className="flex items-start gap-3 mt-6 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-5 h-5 rounded border-[#E5E5E5] text-[#1A1A1A] focus:ring-[#1A1A1A]"
        />
        <div className="text-sm text-[#1A1A1A]">
          <span className="font-medium">I understand these terms and agree to be legally bound by them.</span>
          <br />
          <span className="text-[#666666]">I acknowledge the risks and that all rules are enforced automatically by smart contracts.</span>
        </div>
      </label>

      {/* CTA - no inline loader, just button */}
      <div className="mt-6">
        <Button 
          onClick={onSign}
          disabled={!agreed}
          className={`w-full rounded-full px-8 py-6 text-base font-semibold transition-colors ${
            agreed 
              ? "bg-[#1A1A1A] text-white hover:bg-[#333333]" 
              : "bg-[#E5E5E5] text-[#999999] cursor-not-allowed"
          }`}
        >
          Sign and Accept Terms
        </Button>
      </div>
    </div>
  )
}

// Step 2: Transaction Preview - with 7% fee, no purple cards
function PreviewStep({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 md:p-8">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Transaction Preview</h2>
      <p className="text-sm text-[#666666] mt-1">
        Review what will happen when you join.
      </p>

      {/* Section: Your Commitment */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">Your Commitment</h3>
        <div className="mt-3 space-y-0">
          <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">Monthly payment</span>
            <span className="text-sm font-medium text-[#1A1A1A]">${formatNumber(circleData.monthlyAmount)} USDC</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">Duration</span>
            <span className="text-sm font-medium text-[#1A1A1A]">{circleData.totalMonths} months</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">Total commitment</span>
            <span className="text-sm font-medium text-[#1A1A1A]">${formatNumber(circleData.totalCommitment)}</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">Protocol fee (7%)</span>
            <span className="text-sm font-medium text-[#1A1A1A]">${formatNumber(circleData.protocolFee)}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-sm text-[#1A1A1A] font-medium">Total incl. fees</span>
            <span className="text-sm font-semibold text-[#1A1A1A]">${formatNumber(circleData.totalWithFees)}</span>
          </div>
        </div>
      </div>

      {/* Section: What You Receive */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">What You Receive</h3>
        <div className="mt-3 space-y-0">
          <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">NFT Quota</span>
            <span className="text-sm font-medium text-[#1A1A1A]">1 position</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-sm text-[#666666]">DINGA Tokens</span>
            <span className="text-sm font-medium text-[#1A1A1A]">{formatNumber(circleData.dingaTokens)} DINGA</span>
          </div>
        </div>
        
        {/* Info text - neutral gray, not purple */}
        <p className="text-xs text-[#666666] mt-3 flex items-start gap-1.5">
          <span className="text-[#999999]">i</span>
          DINGA tokens track your contribution and payout rights.
        </p>
      </div>

      {/* Section: Smart Contract Actions */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">Smart Contract Actions</h3>
        <div className="mt-3 space-y-1.5">
          {[
            "Pay first installment",
            "Mint NFT quota",
            "Issue DINGA tokens",
            "Register participation",
            "Activate payout eligibility"
          ].map((action, i) => (
            <div key={i} className="flex items-center gap-2 py-1">
              <Check className="w-4 h-4 text-[#1A1A1A]" />
              <span className="text-sm text-[#666666]">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Network & Fees */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">Network & Fees</h3>
        <div className="mt-3 space-y-0">
          <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">Network</span>
            <span className="text-sm font-medium text-[#1A1A1A]">Arc</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">Currency</span>
            <span className="text-sm font-medium text-[#1A1A1A]">USDC (native)</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-sm text-[#666666]">Estimated gas</span>
            <span className="text-sm font-medium text-[#1A1A1A]">~${circleData.estimatedGas}</span>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex gap-3">
        <Button 
          variant="outline"
          onClick={onBack}
          className="flex-1 rounded-full border-[#E5E5E5] px-6 py-6 text-base font-medium text-[#1A1A1A] hover:bg-[#F5F5F5] bg-transparent"
        >
          Back
        </Button>
        <Button 
          onClick={onContinue}
          className="flex-1 rounded-full bg-[#1A1A1A] px-6 py-6 text-base font-semibold text-white hover:bg-[#333333]"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

// Step 3: Final Review - with agreement signed date
function ConfirmStep({ 
  onBack, 
  onConfirm,
  agreementSignedAt
}: { 
  onBack: () => void
  onConfirm: () => void
  agreementSignedAt: Date | null
}) {
  // Format the signed date
  const formattedDate = agreementSignedAt 
    ? agreementSignedAt.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      })
    : 'Just now'

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 md:p-8">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Final Review</h2>
      <p className="text-sm text-[#666666] mt-1">
        Confirm your transaction to join the circle.
      </p>

      {/* Summary */}
      <div className="mt-6 space-y-0">
        <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
          <span className="text-sm text-[#666666]">Circle</span>
          <span className="text-sm font-medium text-[#1A1A1A]">${formatNumber(circleData.amount)} {circleData.title}</span>
        </div>
        <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
          <span className="text-sm text-[#666666]">Monthly</span>
          <span className="text-sm font-medium text-[#1A1A1A]">${formatNumber(circleData.monthlyAmount)}</span>
        </div>
        <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
          <span className="text-sm text-[#666666]">Duration</span>
          <span className="text-sm font-medium text-[#1A1A1A]">{circleData.totalMonths} months</span>
        </div>
        <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
          <span className="text-sm text-[#666666]">NFT</span>
          <span className="text-sm font-medium text-[#1A1A1A]">1 quota</span>
        </div>
        <div className="flex items-center justify-between py-2.5 border-b border-[#F0F0F0]">
          <span className="text-sm text-[#666666]">DINGA</span>
          <span className="text-sm font-medium text-[#1A1A1A]">{formatNumber(circleData.dingaTokens)} tokens</span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-sm text-[#666666]">Agreement signed</span>
          <span className="text-sm font-medium text-[#1A1A1A]">Yes — {formattedDate}</span>
        </div>
      </div>

      {/* Reminder box - neutral gray, not orange */}
      <div className="mt-6 p-4 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5]">
        <p className="text-sm text-[#666666]">
          You signed the participation agreement on {formattedDate}. This transaction will register your membership and activate your obligations.
        </p>
      </div>

      {/* Transaction explanation */}
      <div className="mt-6">
        <p className="text-sm text-[#666666] mb-3">This transaction will:</p>
        <ul className="space-y-1.5 text-sm text-[#666666]">
          <li className="flex items-center gap-2">
            <span className="text-[#1A1A1A]">•</span>
            Charge your first installment
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#1A1A1A]">•</span>
            Mint your NFT quota
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#1A1A1A]">•</span>
            Issue DINGA tokens
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#1A1A1A]">•</span>
            Register your position
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#1A1A1A]">•</span>
            Activate payout eligibility
          </li>
        </ul>
        <p className="text-xs text-[#999999] mt-3">
          All actions depend on the signed agreement.
        </p>
      </div>

      {/* CTAs - no inline loader */}
      <div className="mt-8 flex gap-3">
        <Button 
          variant="outline"
          onClick={onBack}
          className="flex-1 rounded-full border-[#E5E5E5] px-6 py-6 text-base font-medium text-[#1A1A1A] hover:bg-[#F5F5F5] bg-transparent"
        >
          Back
        </Button>
        <Button 
          onClick={onConfirm}
          className="flex-1 rounded-full bg-[#1A1A1A] px-6 py-6 text-base font-semibold text-white hover:bg-[#333333]"
        >
          Confirm & Join
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

  // Step 3: Confirm transaction
  const handleConfirm = () => {
    showToast("Processing transaction...")
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  // Back navigation
  const handleBack = (toStep: Step) => {
    setCurrentStep(toStep)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Control bar header - single row: [Back] [Title] [Stepper] */}
      <header className="w-full pt-8 md:pt-10 pb-6">
        <div className="mx-auto max-w-[640px] px-6 md:px-10">
          {/* Single row with three zones */}
          <div className="flex items-center justify-between gap-4">
            {/* Left: Back button */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[#666666] transition-colors hover:text-[#1A1A1A] shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>

            {/* Middle: Title - left aligned within available space */}
            <h1 className="text-lg font-semibold text-[#1A1A1A] flex-1 min-w-0">
              {"Join $" + formatNumber(circleData.amount) + " Circle"}
            </h1>

            {/* Right: Stepper - desktop shows numeric, mobile shows collapsed */}
            <div className="hidden md:block shrink-0">
              <NumericStepper currentStep={currentStep} />
            </div>
            <div className="md:hidden shrink-0">
              <MobileStepper currentStep={currentStep} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col pb-12">
        {/* Content aligned with header (same max-width) */}
        <div className="mx-auto max-w-[640px] w-full px-6 md:px-10">
          {/* Step content */}
          {currentStep === 1 && (
            <TermsStep 
              onSign={handleSignAgreement}
            />
          )}
          {currentStep === 2 && (
            <PreviewStep 
              onBack={() => handleBack(1)} 
              onContinue={handlePreviewContinue} 
            />
          )}
          {currentStep === 3 && (
            <ConfirmStep 
              onBack={() => handleBack(2)} 
              onConfirm={handleConfirm}
              agreementSignedAt={agreementSignedAt}
            />
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
    </div>
  )
}
