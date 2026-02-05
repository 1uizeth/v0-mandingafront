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

// Step 1: Terms - compact 2x2 grid, checkbox+button inline on desktop
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

      {/* 2x2 grid on lg */}
      <div className="mt-4 p-4 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5]">
        <p className="font-mono text-sm text-[#1A1A1A] mb-3">If you accept, you agree that:</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {terms.map((t) => (
            <div key={t.num} className="font-mono text-sm flex gap-2">
              <span className="text-[#1A1A1A] font-semibold shrink-0">{t.num}.</span>
              <div>
                <span className="text-[#1A1A1A] font-medium">{t.title}</span>
                <p className="text-[#666666] text-xs mt-0.5">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: checkbox + CTA inline on lg */}
      <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 rounded border-[#E5E5E5] text-[#1A1A1A] focus:ring-[#1A1A1A]" />
          <span className="text-sm text-[#1A1A1A]">I understand and agree to these terms.</span>
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

// Step 2: Review - Financial summary only (per master prompt)
function PreviewStep({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 lg:p-6">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Review</h2>
      <p className="text-sm text-[#666666] mt-1">Verify your commitment before proceeding.</p>

      {/* 2-column: Commitment left, Network right */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Your Commitment */}
        <div>
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
              <span className="text-[#666666]">Subtotal ({circleData.totalMonths} x ${circleData.monthlyAmount})</span>
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

        {/* Right: Network & Fees */}
        <div>
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
      </div>

      {/* CTAs */}
      <div className="mt-5 flex gap-3">
        <Button variant="outline" onClick={onBack}
          className="flex-1 rounded-full border-[#E5E5E5] px-6 py-5 text-sm font-medium text-[#1A1A1A] hover:bg-[#F5F5F5] bg-transparent">
          Back
        </Button>
        <Button onClick={onContinue}
          className="flex-1 rounded-full bg-[#1A1A1A] px-6 py-5 text-sm font-semibold text-white hover:bg-[#333333]">
          Continue
        </Button>
      </div>
    </div>
  )
}

// Step 3: Final Review - 2-column layout for no-scroll
function ConfirmStep({ 
  onBack, 
  onConfirm,
  agreementSignedAt
}: { 
  onBack: () => void
  onConfirm: () => void
  agreementSignedAt: Date | null
}) {
  const formattedDate = agreementSignedAt 
    ? agreementSignedAt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
    : 'Just now'

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 lg:p-6">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">Final Review</h2>
      <p className="text-sm text-[#666666] mt-1">Confirm and execute your membership.</p>

      {/* 2-column layout on lg */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Agreement proof + Summary */}
        <div className="space-y-4">
          {/* Agreement signed block */}
          <div className="p-3 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5]">
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-[#1A1A1A]" />
              <span className="text-[#1A1A1A] font-medium">Agreement signed</span>
              <span className="text-[#666666]">{formattedDate}</span>
            </div>
            <p className="text-xs text-[#666666] mt-1.5">
              This transaction will register your membership and activate your obligations.
            </p>
          </div>

          {/* Summary */}
          <div className="text-sm space-y-0">
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
        </div>

        {/* Right: Transaction Execution steps */}
        <div>
          <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-2">Transaction Execution</h3>
          <div className="space-y-2 text-sm">
            {[
              { step: 1, label: `Pay first installment ($${formatNumber(circleData.monthlyAmount)} USDC)` },
              { step: 2, label: "Mint NFT position" },
              { step: 3, label: "Claim tokens" },
              { step: 4, label: "Activate position" }
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-2.5 py-1">
                <div className="w-5 h-5 rounded-full border border-[#E0E0E0] flex items-center justify-center text-xs text-[#999999]">
                  {item.step}
                </div>
                <span className="text-[#666666]">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#999999] mt-3">Each step will require a wallet signature.</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-5 flex gap-3">
        <Button variant="outline" onClick={onBack}
          className="flex-1 rounded-full border-[#E5E5E5] px-6 py-5 text-sm font-medium text-[#1A1A1A] hover:bg-[#F5F5F5] bg-transparent">
          Back
        </Button>
        <Button onClick={onConfirm}
          className="flex-1 rounded-full bg-[#1A1A1A] px-6 py-5 text-sm font-semibold text-white hover:bg-[#333333]">
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
      <header className="w-full pt-6 lg:pt-8 pb-4">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          {/* Grid: [Left margin for Back] [Content: Title + Stepper] */}
          <div className="grid items-center" style={{ gridTemplateColumns: 'minmax(60px, 120px) 1fr' }}>
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

      <main className="flex-1 flex flex-col pb-8">
        {/* Same grid for content alignment */}
        <div className="mx-auto max-w-[1100px] w-full px-6 lg:px-10">
          <div className="grid" style={{ gridTemplateColumns: 'minmax(60px, 120px) 1fr' }}>
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
