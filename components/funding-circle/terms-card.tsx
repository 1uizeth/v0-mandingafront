import { Info } from "lucide-react"
import Link from "next/link"

export function TermsCard() {
  return (
    <div className="rounded-3xl bg-card px-6 py-5">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Read the{" "}
          <Link href="#" className="font-medium text-foreground underline underline-offset-2 hover:opacity-70">
            Terms and Conditions
          </Link>{" "}
          before joining a circle
        </p>
      </div>
    </div>
  )
}
