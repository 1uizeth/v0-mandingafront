interface Member {
  name: string
  joinedDaysAgo: number
}

interface MembersCardProps {
  members: Member[]
}

export function MembersCard({ members }: MembersCardProps) {
  const formatJoinDate = (daysAgo: number) => {
    if (daysAgo === 1) return "Joined 1 day ago"
    return `Joined ${daysAgo} days ago`
  }

  return (
    <div className="rounded-[40px] bg-card p-6">
      <h3 className="font-semibold text-muted-foreground">Active members</h3>

      <div className="mt-4 space-y-3">
        {members.map((member) => (
          <div key={member.name} className="flex items-center justify-between">
            <span className="text-muted-foreground/70">{member.name}</span>
            <span className="text-xs text-muted-foreground/60">{formatJoinDate(member.joinedDaysAgo)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
