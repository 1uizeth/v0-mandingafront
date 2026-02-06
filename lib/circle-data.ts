// Shared circle data - single source of truth for all pages

export const circleData = {
  id: "circle-001",
  name: "Funding Circle #001",
  contributionPerMonth: 892,
  totalMonths: 24,
  totalMembers: 24,
  currentMembers: 12,
  startDate: "March 2026",
  totalCommitment: 21408,
  protocolFee: 1498,
  totalWithFees: 22906,
  payoutProgress: 0,
  payoutDueDate: "March 15, 2026",
}

// Entry type definitions with all associated data
export const entryTypes = {
  early: {
    id: "early",
    label: "Early entry",
    description: "Payout between March - October 2026",
    count: 8,
    colorDefault: "#B8860B",
    colorHover: "#DAA520",
    payoutStart: "March 2026",
    payoutEnd: "October 2026",
    payoutMonths: "1-8",
  },
  middle: {
    id: "middle",
    label: "Middle entry",
    description: "Payout between November 2026 - June 2027",
    count: 8,
    colorDefault: "#5F9EA0",
    colorHover: "#48D1CC",
    payoutStart: "November 2026",
    payoutEnd: "June 2027",
    payoutMonths: "9-16",
  },
  late: {
    id: "late",
    label: "Late entry",
    description: "Payout between July 2027 - February 2028",
    count: 8,
    colorDefault: "#6A5ACD",
    colorHover: "#836FFF",
    payoutStart: "July 2027",
    payoutEnd: "February 2028",
    payoutMonths: "17-24",
  },
}

// Helper function to get entry data by ID
export function getEntryData(entryId: string | null) {
  if (!entryId || !(entryId in entryTypes)) {
    return entryTypes.early // default fallback
  }
  return entryTypes[entryId as keyof typeof entryTypes]
}

// Helper function to format entry label for display
export function getEntryLabel(entryId: string | null): string {
  const entry = getEntryData(entryId)
  return entry.label
}
