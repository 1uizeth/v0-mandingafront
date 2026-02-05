import { ExternalLink } from "lucide-react"

interface EnsCardProps {
  ensDomain: string
  ensUrl: string
}

export function EnsCard({ ensDomain, ensUrl }: EnsCardProps) {
  return (
    <div className="rounded-[40px] bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-sky-500">◇</span>
          <span className="text-xl font-bold text-foreground">ens</span>
        </div>
        <a
          href={ensUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium text-sky-600 transition-colors hover:text-sky-700"
        >
          View on ENS
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="mt-4">
        <div className="inline-block rounded-full bg-sky-100 px-6 py-2">
          <span className="font-semibold text-sky-500">{ensDomain}</span>
        </div>
      </div>
    </div>
  )
}
