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

// Stepper matching reference: large circles with connecting lines
function NumericStepper({ currentStep }: { currentStep: Step }) {
  const steps = [
    { num: 1, label: "Agreement" },
    { num: 2, label: "Review" },
    { num: 3, label: "Confirm" },
  ]

  return (
    <div className="flex items-start gap-0">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-start">
          {/* Step with circle and label */}
          <div className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                step.num < currentStep 
                  ? "bg-[#1A1A1A] text-white" // Completed - checkmark
                  : step.num === currentStep 
                  ? "bg-[#1A1A1A] text-white" // Current - number
                  : "border-2 border-[#E0E0E0] text-[#BDBDBD] bg-white" // Upcoming - outlined
              }`}
            >
              {step.num < currentStep ? (
                <Check className="w-5 h-5" strokeWidth={2.5} />
              ) : (
                step.num
              )}
            </div>
            <span 
              className={`text-xs mt-2 transition-colors whitespace-nowrap ${
                step.num <= currentStep 
                  ? "text-[#1A1A1A] font-medium" 
                  : "text-[#BDBDBD]"
              }`}
            >
              {step.label}
            </span>
          </div>
          
          {/* Connecting line (not after last step) */}
          {index < steps.length - 1 && (
            <div 
              className={`w-10 h-0.5 mt-5 transition-colors ${
                step.num < currentStep 
                  ? "bg-[#1A1A1A]" 
                  : "bg-[#E0E0E0]"
              }`}
            />
          )}
        </div>
      ))}
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

// Step 1: Terms - 2x2 grid layout for desktop to avoid scroll
function TermsStep({ 
  onSign 
}: { 
  onSign: () => void
}) {
  const [agreed, setAgreed] = useState(false)

  const terms = [
    {
      num: "01",
      title: "Shared Financial Risk",
      desc: "This is a collective financial system. Other members' behavior may affect outcomes."
    },
    {
      num: "02", 
      title: "Missed Payments",
      desc: "If you miss payments, penalties may apply and your benefits may be restricted."
    },
    {
      num: "03",
      title: "Blockchain Finality", 
      desc: "All transactions are irreversible. Payments and tokens cannot be reversed."
    },
    {
      num: "04",
      title: "Legal Responsibility",
      desc: "You are responsible for any legal or tax obligations in your country."
    }
  ]

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 lg:p-8">
      {/* Card header */}
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Terms and Participation Agreement</h2>
      <p className="text-sm text-[#666666] mt-1">
        Please review before joining this circle.
      </p>

      {/* Terms in 2x2 grid on desktop */}
      <div className="mt-6 p-4 lg:p-5 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5]">
        <p className="font-mono text-sm text-[#1A1A1A] mb-4">
          If you accept these terms, you agree that:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {terms.map((term) => (
            <div key={term.num} className="font-mono text-sm">
              <div className="flex items-baseline gap-2">
                <span className="text-[#1A1A1A] font-semibold">{term.num}.</span>
                <span className="text-[#1A1A1A] font-medium">{term.title}</span>
              </div>
              <p className="text-[#666666] mt-1 ml-7 text-xs leading-relaxed">
                {term.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Checkbox */}
      <label className="flex items-start gap-3 mt-5 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-5 h-5 rounded border-[#E5E5E5] text-[#1A1A1A] focus:ring-[#1A1A1A]"
        />
        <span className="text-sm text-[#1A1A1A]">
          I understand and agree to these terms.
        </span>
      </label>

      {/* CTA */}
      <div className="mt-5">
        <Button 
          onClick={onSign}
          disabled={!agreed}
          className={`w-full rounded-full px-8 py-5 text-base font-semibold transition-colors ${
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

// Step 2: Transaction Preview - 2-column layout for desktop
function PreviewStep({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 lg:p-8">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Transaction Preview</h2>
      <p className="text-sm text-[#666666] mt-1">
        Review what will happen when you join.
      </p>

      {/* 2-column grid on desktop */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-5">
          {/* Your Commitment */}
          <div>
            <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-2">Your Commitment</h3>
            <div className="space-y-0 text-sm">
              <div className="flex justify-between py-1.5">
                <span className="text-[#666666]">Monthly</span>
                <span className="font-medium text-[#1A1A1A]">${formatNumber(circleData.monthlyAmount)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#666666]">Duration</span>
                <span className="font-medium text-[#1A1A1A]">{circleData.totalMonths} mo</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#666666]">Total</span>
                <span className="font-medium text-[#1A1A1A]">${formatNumber(circleData.totalCommitment)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#666666]">Fee (7%)</span>
                <span className="font-medium text-[#1A1A1A]">${formatNumber(circleData.protocolFee)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-t border-[#F0F0F0] mt-1 pt-2">
                <span className="font-medium text-[#1A1A1A]">Total</span>
                <span className="font-semibold text-[#1A1A1A]">${formatNumber(circleData.totalWithFees)}</span>
              </div>
            </div>
          </div>

          {/* Network */}
          <div>
            <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-2">Network</h3>
            <div className="space-y-0 text-sm">
              <div className="flex justify-between py-1.5">
                <span className="text-[#666666]">Chain</span>
                <span className="font-medium text-[#1A1A1A]">Arc</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#666666]">Currency</span>
                <span className="font-medium text-[#1A1A1A]">USDC</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#666666]">Gas</span>
                <span className="font-medium text-[#1A1A1A]">~${circleData.estimatedGas}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* What You Receive */}
          <div>
            <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-2">You Receive</h3>
            <div className="space-y-0 text-sm">
              <div className="flex justify-between py-1.5">
                <span className="text-[#666666]">NFT Quota</span>
                <span className="font-medium text-[#1A1A1A]">1 position</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#666666]">DINGA</span>
                <span className="font-medium text-[#1A1A1A]">{formatNumber(circleData.dingaTokens)}</span>
              </div>
            </div>
          </div>

          {/* Contract Actions */}
          <div>
            <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-2">Contract Actions</h3>
            <div className="space-y-1 text-sm">
              {[
                "Pay first installment",
                "Mint NFT quota",
                "Issue DINGA tokens",
                "Register position",
                "Activate eligibility"
              ].map((action, i) => (
                <div key={i} className="flex items-center gap-2 py-0.5">
                  <Check className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  <span className="text-[#666666]">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-6 flex gap-3">
        <Button 
          variant="outline"
          onClick={onBack}
          className="flex-1 rounded-full border-[#E5E5E5] px-6 py-5 text-base font-medium text-[#1A1A1A] hover:bg-[#F5F5F5] bg-transparent"
        >
          Back
        </Button>
        <Button 
          onClick={onContinue}
          className="flex-1 rounded-full bg-[#1A1A1A] px-6 py-5 text-base font-semibold text-white hover:bg-[#333333]"
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
      {/* Header: Back in left margin, Title + Stepper in content area */}
      <header className="w-full pt-8 lg:pt-10 pb-6">
        <div className="mx-auto max-w-[960px] px-6 lg:px-10">
          {/* Grid: [Left margin for Back] [Content: Title + Stepper] */}
          <div className="grid items-center" style={{ gridTemplateColumns: 'minmax(60px, 140px) 1fr' }}>
            {/* Left margin: Back button centered in margin area */}
            <div className="flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[#666666] transition-colors hover:text-[#1A1A1A]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
              </Link>
            </div>

            {/* Content area: Title left, Stepper right */}
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-lg font-semibold text-[#1A1A1A]">
                {"Join $" + formatNumber(circleData.amount) + " Circle"}
              </h1>

              {/* Stepper - desktop shows full, mobile shows compact */}
              <div className="hidden lg:block">
                <NumericStepper currentStep={currentStep} />
              </div>
              <div className="lg:hidden">
                <MobileStepper currentStep={currentStep} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col pb-12">
        {/* Same grid for content alignment */}
        <div className="mx-auto max-w-[960px] w-full px-6 lg:px-10">
          <div className="grid" style={{ gridTemplateColumns: 'minmax(60px, 140px) 1fr' }}>
            {/* Empty left margin */}
            <div />
            
            {/* Content column */}
            <div>
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
