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
  ensDomain: "housing.mandinga.eth",
  dingaTokens: 21408,
  estimatedGas: 0.12,
}

// Mock connected wallet ENS name
const MOCK_WALLET_ENS = "user.eth"

// Step type
type Step = 1 | 2 | 3

// Signing state for step 1 and step 3
type SigningState = "idle" | "signing" | "success"

// Progress bar with labels
function ProgressBar({ currentStep }: { currentStep: Step }) {
  const steps = [
    { num: 1, label: "Agreement" },
    { num: 2, label: "Review" },
    { num: 3, label: "Confirm" },
  ]

  return (
    <div className="w-full">
      {/* Segments */}
      <div className="flex items-center gap-1">
        {steps.map((step) => (
          <div key={step.num} className="flex-1">
            <div 
              className={`h-1 w-full rounded-full transition-colors ${
                step.num <= currentStep 
                  ? "bg-[#1A1A1A]" 
                  : "bg-[#E5E5E5]"
              }`}
            />
          </div>
        ))}
      </div>
      {/* Labels */}
      <div className="flex items-center justify-between mt-2">
        {steps.map((step) => (
          <span 
            key={step.num}
            className={`text-xs transition-colors ${
              step.num <= currentStep 
                ? "text-[#1A1A1A] font-medium" 
                : "text-[#999999]"
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  )
}

// Header with Back button and title on same row
function Header() {
  return (
    <header className="w-full px-6 md:px-10 pt-8 md:pt-10 pb-6">
      <div className="max-w-[640px] mx-auto flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[#666666] transition-colors hover:text-[#1A1A1A] shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <h1 className="text-lg font-semibold text-[#1A1A1A] whitespace-nowrap">
          {"You're joining a $" + formatNumber(circleData.amount) + " circle " + circleData.title}
        </h1>
      </div>
    </header>
  )
}

// Step 1: Terms & Participation Agreement
function TermsStep({ 
  onContinue, 
  signingState, 
  onSign 
}: { 
  onContinue: () => void
  signingState: SigningState
  onSign: () => void
}) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 md:p-8">
      {/* Card header with clear hierarchy */}
      <div className="pb-5 border-b border-[#F0F0F0]">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Terms and Participation Agreement</h2>
        <p className="text-sm text-[#666666] mt-1">
          By joining this circle, you enter a binding on-chain agreement.
        </p>
      </div>

      {/* Contract-style terms document with two-digit numbering */}
      <div className="mt-6 p-5 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5] font-mono text-sm">
        <p className="text-[#1A1A1A] leading-relaxed mb-5">
          If you accept these terms, you agree that:
        </p>

        <ol className="space-y-3">
          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">01.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">You will pay ${formatNumber(circleData.monthlyAmount)} USDC every month for {circleData.totalMonths} months.</span>
              <br />Missing payments may reduce your benefits or remove you from the circle.
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">02.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">You will receive 1 NFT that represents your position.</span>
              <br />If you lose it, you lose your position.
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">03.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">You will receive DINGA tokens that track your contributions and payout rights.</span>
              <br />These are used for settlement and rewards.
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">04.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">Each month, one member receives ${formatNumber(circleData.amount)} USDC.</span>
              <br />Payout order is determined by rules and randomness. Early payout is not guaranteed.
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">05.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">If you miss payments:</span>
              <br />Your priority may drop, penalties may apply, and buyback value may be reduced.
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">06.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">All rules are enforced automatically by smart contracts.</span>
              <br />No human can override execution.
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">07.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">All blockchain transactions are final.</span>
              <br />Payments, NFTs, and tokens cannot be reversed.
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">08.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">This is a shared financial system.</span>
              <br />{"Other members' behavior affects outcomes. Delays or defaults may occur."}
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">09.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">You are responsible for any legal or tax obligations in your country.</span>
            </div>
          </li>

          <li className="flex">
            <span className="w-9 shrink-0 text-[#1A1A1A] font-semibold">10.</span>
            <div className="text-[#666666]">
              <span className="text-[#1A1A1A] font-medium">By continuing, you confirm that you understand the risks.</span>
              <br />All rules are enforced automatically by smart contracts. No human can override execution.
            </div>
          </li>
        </ol>
      </div>

      {/* Checkbox */}
      <label className="flex items-start gap-3 mt-6 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-5 h-5 rounded border-[#E5E5E5] text-[#1A1A1A] focus:ring-[#1A1A1A]"
        />
        <span className="text-sm text-[#1A1A1A] font-medium">
          I understand these terms and agree to be legally bound by them
        </span>
      </label>

      {/* CTA */}
      <div className="mt-6">
        {signingState === "signing" ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <Loader2 className="h-8 w-8 text-[#1A1A1A] animate-spin" />
            <p className="text-sm text-[#666666]">Waiting for signature...</p>
            <Button 
              disabled
              className="w-full rounded-full bg-[#E5E5E5] px-8 py-6 text-base font-semibold text-[#999999] cursor-not-allowed"
            >
              Signing...
            </Button>
          </div>
        ) : (
          <>
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
            <p className="text-xs text-[#999999] text-center mt-3">
              This signature does not move funds. It confirms your agreement.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

// Step 2: Transaction Preview
function PreviewStep({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 md:p-8">
      <h2 className="text-xl font-semibold text-[#1A1A1A]">Transaction Preview</h2>
      
      <p className="text-sm text-[#666666] mt-2">
        Review what will happen when you join.
      </p>

      {/* Section: Your Commitment */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">Your Commitment</h3>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">Monthly payment</span>
            <span className="text-sm font-medium text-[#1A1A1A]">${formatNumber(circleData.monthlyAmount)} USDC</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">Duration</span>
            <span className="text-sm font-medium text-[#1A1A1A]">{circleData.totalMonths} months</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">Total commitment</span>
            <span className="text-sm font-medium text-[#1A1A1A]">${formatNumber(circleData.totalCommitment)}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-[#666666]">Admin fee</span>
            <span className="text-sm font-medium text-[#1A1A1A]">Included</span>
          </div>
        </div>
      </div>

      {/* Section: What You Receive */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">What You Receive</h3>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">NFT Quota</span>
            <span className="text-sm font-medium text-[#1A1A1A]">1 position</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-[#666666]">DINGA tokens</span>
            <span className="text-sm font-medium text-[#7C3AED]">{formatNumber(circleData.dingaTokens)} DINGA</span>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-[#F5F3FF] rounded-lg border border-[#E9E5FF]">
          <p className="text-xs text-[#7C3AED]">
            DINGA tokens represent your economic claim in this circle. They track your contribution and are used for payouts and settlement.
          </p>
        </div>
      </div>

      {/* Section: Smart Contract Actions */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">Smart Contract Actions</h3>
        <div className="mt-3 space-y-2">
          {[
            `Pay first installment ($${formatNumber(circleData.monthlyAmount)} USDC)`,
            "Mint NFT quota",
            "Issue DINGA ERC20 tokens",
            "Register participation",
            "Activate payout eligibility"
          ].map((action, i) => (
            <div key={i} className="flex items-center gap-2 py-1">
              <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                <Check className="w-3 h-3 text-[#2E7D32]" />
              </div>
              <span className="text-sm text-[#666666]">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Network & Fees */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">Network & Fees</h3>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">Network</span>
            <span className="text-sm font-medium text-[#1A1A1A]">Arc</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#666666]">Currency</span>
            <span className="text-sm font-medium text-[#1A1A1A]">USDC (native)</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-[#666666]">Estimated gas</span>
            <span className="text-sm font-medium text-[#1A1A1A]">~${circleData.estimatedGas} USDC</span>
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

// Step 3: Confirm & Execute
function ConfirmStep({ 
  onBack, 
  signingState, 
  onConfirm 
}: { 
  onBack: () => void
  signingState: SigningState
  onConfirm: () => void
}) {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 md:p-8">
      <h2 className="text-xl font-semibold text-[#1A1A1A]">Final Review</h2>
      
      <p className="text-sm text-[#666666] mt-2">
        Confirm your transaction to join the circle.
      </p>

      {/* Summary */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between py-2 border-b border-[#F0F0F0]">
          <span className="text-sm text-[#666666]">Circle</span>
          <span className="text-sm font-medium text-[#1A1A1A]">${formatNumber(circleData.amount)} {circleData.title}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-[#F0F0F0]">
          <span className="text-sm text-[#666666]">Monthly</span>
          <span className="text-sm font-medium text-[#1A1A1A]">${formatNumber(circleData.monthlyAmount)}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-[#F0F0F0]">
          <span className="text-sm text-[#666666]">Duration</span>
          <span className="text-sm font-medium text-[#1A1A1A]">{circleData.totalMonths} months</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-[#F0F0F0]">
          <span className="text-sm text-[#666666]">NFT</span>
          <span className="text-sm font-medium text-[#1A1A1A]">1 quota</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-[#666666]">DINGA</span>
          <span className="text-sm font-medium text-[#7C3AED]">{formatNumber(circleData.dingaTokens)} tokens</span>
        </div>
      </div>

      {/* Important notice */}
      <div className="mt-6 p-4 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5]">
        <p className="text-sm text-[#666666]">
          This transaction will permanently register you in the circle.
        </p>
      </div>

      {/* Warning */}
      <div className="mt-4 p-4 bg-[#FFF7ED] rounded-lg border border-[#FFEDD5]">
        <p className="text-sm text-[#C2410C]">
          <strong>Important:</strong> Payments are mandatory. Failure to pay may result in penalties and loss of position.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6">
        {signingState === "signing" ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <Loader2 className="h-8 w-8 text-[#1A1A1A] animate-spin" />
            <p className="text-sm text-[#666666]">Processing transaction...</p>
            <Button 
              disabled
              className="w-full rounded-full bg-[#E5E5E5] px-8 py-6 text-base font-semibold text-[#999999] cursor-not-allowed"
            >
              Processing...
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
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
        )}
      </div>
    </div>
  )
}

export default function JoinCirclePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [step1SigningState, setStep1SigningState] = useState<SigningState>("idle")
  const [step3SigningState, setStep3SigningState] = useState<SigningState>("idle")

  // Step 1: Sign agreement
  const handleSignAgreement = () => {
    setStep1SigningState("signing")
    // Simulate wallet signature
    setTimeout(() => {
      setStep1SigningState("success")
      setCurrentStep(2)
    }, 2000)
  }

  // Step 2: Continue to confirm
  const handlePreviewContinue = () => {
    setCurrentStep(3)
  }

  // Step 3: Confirm transaction
  const handleConfirm = () => {
    setStep3SigningState("signing")
    // Simulate transaction
    setTimeout(() => {
      setStep3SigningState("success")
      // Redirect to dashboard
      router.push("/")
    }, 3000)
  }

  // Back navigation
  const handleBack = (toStep: Step) => {
    setCurrentStep(toStep)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col mx-auto max-w-[640px] w-full px-6 md:px-10 pb-12">
        {/* Progress bar - same width as card */}
        <div className="mb-6">
          <ProgressBar currentStep={currentStep} />
        </div>

        {/* Step content */}
        {currentStep === 1 && (
          <TermsStep 
            onContinue={() => setCurrentStep(2)} 
            signingState={step1SigningState}
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
            signingState={step3SigningState}
            onConfirm={handleConfirm}
          />
        )}
      </main>
    </div>
  )
}
