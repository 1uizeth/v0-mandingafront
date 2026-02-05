import { Info } from "lucide-react"

export function EarlyEntryCard() {
  return (
    <div className="flex items-start gap-3 rounded-3xl bg-purple-50 px-6 py-5">
      <Info className="mt-0.5 h-5 w-5 text-purple-500" />
      <div>
        <p className="font-semibold text-purple-500">Early entry</p>
        <p className="text-purple-500/80">Selected for initial payouts</p>
      </div>
    </div>
  )
}
