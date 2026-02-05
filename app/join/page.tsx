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

// Stepper component
function Stepper({ currentStep }: { currentStep: Step }) {
  const steps = [
    { num: 1, label: "Terms" },
    { num: 2, label: "Preview" },
    { num: 3, label: "Confirm" },
  ]

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center gap-2 md:gap-4">
          {/* Step indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                step.num < currentStep
                  ? "bg-[#1A1A1A] text-white"
                  : step.num === currentStep
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-[#E5E5E5] text-[#999999]"
              }`}
            >
              {step.num < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                step.num
              )}
            </div>
            <span
              className={`text-sm font-medium transition-colors ${
                step.num <= currentStep ? "text-[#1A1A1A]" : "text-[#999999]"
              }`}
            >
              {step.label}
            </span>
          </div>
          
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`w-8 md:w-16 h-0.5 transition-colors ${
                step.num < currentStep ? "bg-[#1A1A1A]" : "bg-[#E5E5E5]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// Header component
function Header() {
  return (
    <header 
      className="mx-auto max-w-[1280px] w-full px-6 md:px-10"
      style={{ 
        paddingTop: 'clamp(24px, 4vh, 48px)', 
        paddingBottom: 'clamp(16px, 3vh, 32px)' 
      }}
    >
      {/* Mobile + Tablet Header (<1024px) */}
      <div className="flex lg:hidden flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base whitespace-nowrap">Back</span>
          </Link>
          <div className="rounded-full border border-[#E5E5E5] px-4 py-1.5 text-sm font-medium text-[#1A1A1A]">
            {MOCK_WALLET_ENS}
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            ${formatNumber(circleData.amount)}
          </h1>
          <p className="text-sm md:text-base text-[#1A1A1A]">{circleData.title}</p>
        </div>
      </div>

      {/* Desktop Header (1024px+) */}
      <div 
        className="hidden lg:grid items-center min-h-[72px]"
        style={{ gridTemplateColumns: 'auto 1fr max-content 1fr auto' }}
      >
        <Link
          href="/"
          className="justify-self-start flex items-center gap-2 text-[#1A1A1A] font-medium transition-opacity hover:opacity-70 whitespace-nowrap min-w-0"
        >
          <ArrowLeft className="h-5 w-5 flex-shrink-0" />
          <span>Back</span>
        </Link>

        <div />

        <div className="justify-self-center text-center flex flex-col items-center gap-1 whitespace-nowrap">
          <h1 className="text-5xl font-bold text-[#1A1A1A]">
            ${formatNumber(circleData.amount)}
          </h1>
          <p className="text-lg text-[#1A1A1A]">{circleData.title}</p>
        </div>

        <div />

        <div className="justify-self-end rounded-full border border-[#E5E5E5] px-6 py-2 text-sm font-medium text-[#1A1A1A] whitespace-nowrap min-w-0">
          {MOCK_WALLET_ENS}
        </div>
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
      <h2 className="text-xl font-semibold text-[#1A1A1A]">Terms and Participation Agreement</h2>
      
      <p className="text-sm text-[#666666] mt-2">
        By joining this circle, you are entering a legally binding, on-chain financial agreement.
      </p>

      {/* Contract-style terms document */}
      <div className="mt-6 p-5 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5] max-h-[400px] overflow-y-auto">
        <p className="font-mono text-sm text-[#1A1A1A] leading-relaxed mb-4">
          If you accept these terms, you agree that:
        </p>

        {/* Section 1 */}
        <div className="mb-5 pb-4 border-b border-[#E5E5E5]">
          <h4 className="font-mono text-sm font-semibold text-[#1A1A1A] mb-2">1. Monthly Payments</h4>
          <p className="font-mono text-sm text-[#666666] leading-relaxed">
            You will pay ${formatNumber(circleData.monthlyAmount)} USDC every month for {circleData.totalMonths} months, starting on your first due date.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            This payment is mandatory.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            If you stop paying, you may lose your position and benefits in this circle.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-5 pb-4 border-b border-[#E5E5E5]">
          <h4 className="font-mono text-sm font-semibold text-[#1A1A1A] mb-2">2. Your Position (NFT Quota)</h4>
          <p className="font-mono text-sm text-[#666666] leading-relaxed">
            You will receive 1 NFT that represents your position in this circle.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            This NFT is your membership record and cannot be duplicated.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            If you lose this NFT, you lose your position.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-5 pb-4 border-b border-[#E5E5E5]">
          <h4 className="font-mono text-sm font-semibold text-[#1A1A1A] mb-2">3. Your Economic Rights (DINGA Tokens)</h4>
          <p className="font-mono text-sm text-[#666666] leading-relaxed">
            You will receive DINGA ERC20 tokens.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            These tokens represent:
          </p>
          <ul className="font-mono text-sm text-[#666666] leading-relaxed mt-1 ml-4 list-disc">
            <li>Your financial contribution</li>
            <li>Your claim to payouts</li>
            <li>Your share of the pool</li>
          </ul>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            They are used by the system to calculate settlements and rewards.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-5 pb-4 border-b border-[#E5E5E5]">
          <h4 className="font-mono text-sm font-semibold text-[#1A1A1A] mb-2">4. Payout Timing</h4>
          <p className="font-mono text-sm text-[#666666] leading-relaxed">
            Each month, one member receives ${formatNumber(circleData.amount)} USDC.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            The order is determined by the circle rules and randomness.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            Payout dates are not guaranteed. Joining does not guarantee early payout.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-5 pb-4 border-b border-[#E5E5E5]">
          <h4 className="font-mono text-sm font-semibold text-[#1A1A1A] mb-2">5. Missed Payments and Penalties</h4>
          <p className="font-mono text-sm text-[#666666] leading-relaxed">
            If you miss a payment:
          </p>
          <ul className="font-mono text-sm text-[#666666] leading-relaxed mt-1 ml-4 list-disc">
            <li>Your payout priority may be reduced</li>
            <li>Penalties may apply</li>
            <li>Your buyback value may be discounted</li>
            <li>Your participation rights may be restricted</li>
          </ul>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            Repeated failures may result in removal from the circle.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-5 pb-4 border-b border-[#E5E5E5]">
          <h4 className="font-mono text-sm font-semibold text-[#1A1A1A] mb-2">6. Smart Contract Authority</h4>
          <p className="font-mono text-sm text-[#666666] leading-relaxed">
            All payments, rules, and settlements are controlled by smart contracts.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            These contracts execute automatically.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            No individual, company, or admin can override them.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-5 pb-4 border-b border-[#E5E5E5]">
          <h4 className="font-mono text-sm font-semibold text-[#1A1A1A] mb-2">7. Irreversible Transactions</h4>
          <p className="font-mono text-sm text-[#666666] leading-relaxed">
            Blockchain transactions cannot be reversed.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            Once you confirm:
          </p>
          <ul className="font-mono text-sm text-[#666666] leading-relaxed mt-1 ml-4 list-disc">
            <li>Payments cannot be refunded</li>
            <li>NFTs cannot be revoked</li>
            <li>Token issuance cannot be undone</li>
          </ul>
        </div>

        {/* Section 8 */}
        <div className="mb-5 pb-4 border-b border-[#E5E5E5]">
          <h4 className="font-mono text-sm font-semibold text-[#1A1A1A] mb-2">8. Risk Disclosure</h4>
          <p className="font-mono text-sm text-[#666666] leading-relaxed">
            You understand that:
          </p>
          <ul className="font-mono text-sm text-[#666666] leading-relaxed mt-1 ml-4 list-disc">
            <li>This is a shared financial system</li>
            <li>Other members affect outcomes</li>
            <li>Delays or defaults may occur</li>
            <li>Market conditions may change</li>
          </ul>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            You participate at your own risk.
          </p>
        </div>

        {/* Section 9 */}
        <div className="mb-5 pb-4 border-b border-[#E5E5E5]">
          <h4 className="font-mono text-sm font-semibold text-[#1A1A1A] mb-2">9. Legal and Regulatory Status</h4>
          <p className="font-mono text-sm text-[#666666] leading-relaxed">
            This system is designed as financial infrastructure.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            In some jurisdictions, participation may have legal or tax implications.
          </p>
          <p className="font-mono text-sm text-[#666666] leading-relaxed mt-2">
            You are responsible for compliance with local laws.
          </p>
        </div>

        {/* Section 10 */}
        <div>
          <h4 className="font-mono text-sm font-semibold text-[#1A1A1A] mb-2">10. Agreement Confirmation</h4>
          <p className="font-mono text-sm text-[#666666] leading-relaxed">
            By signing, you confirm that:
          </p>
          <ul className="font-mono text-sm text-[#666666] leading-relaxed mt-1 ml-4 list-disc">
            <li>You have read all terms</li>
            <li>You understand your obligations</li>
            <li>You accept all risks</li>
            <li>You authorize the smart contract to act on your behalf</li>
          </ul>
        </div>
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
        {/* Step indicator */}
        <div className="mb-6 text-center">
          <p className="text-sm text-[#666666]">Join Circle — Step {currentStep} of 3</p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <Stepper currentStep={currentStep} />
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
