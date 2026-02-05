import { ExternalLink } from "lucide-react"

interface ArcCardProps {
  arcscanUrl: string
}

export function ArcCard({ arcscanUrl }: ArcCardProps) {
  return (
    <div className="rounded-[40px] bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-foreground">◭</span>
          <span className="text-xl font-bold text-foreground">Arc</span>
        </div>
        <a
          href={arcscanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:opacity-70"
        >
          View on Arcscan
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}
