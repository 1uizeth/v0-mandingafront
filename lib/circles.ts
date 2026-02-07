// Single source of mock data for circles
// Used by both index page (list) and circle page (detail lookup by slug)

export interface Circle {
  // Identification
  slug: string // Format: "{amount}-{ensSlug}"
  amount: number // e.g. 20000
  title: string // e.g. "for Devcon 2026"
  ensDomain: string // e.g. "devcon.mandinga.eth"
  ensUrl: string
  
  // Financial details
  monthlyPayment: number
  durationMonths: number
  durationLabel: string // e.g. "2 years"
  
  // Status
  status: "active" | "upcoming" | "completed"
  statusLabel: string
  statusColor: string
  
  // Slots
  slotsTotal: number
  slotsLeft: number
  
  // Entry
  entryLabel: string
  entryColor: string
  
  // Dates
  startDate: string
  endDate: string
  nextPayoutInDays: number // Used for sorting
  payoutDueDate: string
  nextDueDate: Date
  
  // Progress
  currentMonth: number
  payoutProgress: number
  installmentProgress: number
  dueAmount: number
  
  // Additional data
  earlyEntryMonths: number[]
  members: Array<{ name: string; joinedDaysAgo: number }>
  arcscanUrl: string
}

// Slugify helper: converts "devcon.mandinga.eth" to "devcon-mandinga-eth"
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\./g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

// Create slug from amount and ENS domain
function createSlug(amount: number, ensDomain: string): string {
  const ensSlug = slugify(ensDomain)
  return `${amount}-${ensSlug}`
}

// Mock circles data
export const circles: Circle[] = [
  {
    // Short slug version for main devcon circle
    slug: "20000-devcon",
    amount: 20000,
    title: "for Devcon 2026",
    ensDomain: "devcon.mandinga.eth",
    ensUrl: "https://app.ens.domains/devcon.mandinga.eth",
    monthlyPayment: 892,
    durationMonths: 24,
    durationLabel: "2 years",
    status: "active",
    statusLabel: "Active",
    statusColor: "#10B981",
    slotsTotal: 24,
    slotsLeft: 21,
    entryLabel: "Early entry",
    entryColor: "#B8860B",
    startDate: "February, 2026",
    endDate: "March, 2028",
    nextPayoutInDays: 30,
    payoutDueDate: "March",
    nextDueDate: new Date(2026, 2, 5),
    currentMonth: 1,
    payoutProgress: 1,
    installmentProgress: 1,
    dueAmount: 892,
    earlyEntryMonths: [2, 3, 4, 5, 6, 7, 8],
    members: [
      { name: "sassai.eth", joinedDaysAgo: 1 },
      { name: "vitalik.eth", joinedDaysAgo: 2 },
      { name: "1uiz.eth", joinedDaysAgo: 3 },
    ],
    arcscanUrl: "https://arcscan.io",
  },
  {
    slug: createSlug(15000, "ethberlin.mandinga.eth"),
    amount: 15000,
    title: "for ETHBerlin 2026",
    ensDomain: "ethberlin.mandinga.eth",
    ensUrl: "https://app.ens.domains/ethberlin.mandinga.eth",
    monthlyPayment: 669,
    durationMonths: 24,
    durationLabel: "2 years",
    status: "active",
    statusLabel: "Active",
    statusColor: "#10B981",
    slotsTotal: 24,
    slotsLeft: 18,
    entryLabel: "Middle entry",
    entryColor: "#5F9EA0",
    startDate: "March, 2026",
    endDate: "April, 2028",
    nextPayoutInDays: 45,
    payoutDueDate: "April",
    nextDueDate: new Date(2026, 3, 10),
    currentMonth: 2,
    payoutProgress: 2,
    installmentProgress: 2,
    dueAmount: 669,
    earlyEntryMonths: [2, 3, 4, 5, 6, 7, 8],
    members: [
      { name: "andreas.eth", joinedDaysAgo: 5 },
      { name: "laura.eth", joinedDaysAgo: 7 },
    ],
    arcscanUrl: "https://arcscan.io",
  },
  {
    slug: createSlug(10000, "ethcc.mandinga.eth"),
    amount: 10000,
    title: "for EthCC 2026",
    ensDomain: "ethcc.mandinga.eth",
    ensUrl: "https://app.ens.domains/ethcc.mandinga.eth",
    monthlyPayment: 446,
    durationMonths: 24,
    durationLabel: "2 years",
    status: "active",
    statusLabel: "Active",
    statusColor: "#10B981",
    slotsTotal: 24,
    slotsLeft: 12,
    entryLabel: "Late entry",
    entryColor: "#6A5ACD",
    startDate: "April, 2026",
    endDate: "May, 2028",
    nextPayoutInDays: 60,
    payoutDueDate: "May",
    nextDueDate: new Date(2026, 4, 15),
    currentMonth: 3,
    payoutProgress: 3,
    installmentProgress: 3,
    dueAmount: 446,
    earlyEntryMonths: [2, 3, 4, 5, 6, 7, 8],
    members: [
      { name: "claire.eth", joinedDaysAgo: 10 },
    ],
    arcscanUrl: "https://arcscan.io",
  },
]

// Lookup circle by slug
export function getCircleBySlug(slug: string): Circle | undefined {
  return circles.find((circle) => circle.slug === slug)
}

// Parse slug to extract amount and ENS slug
export function parseSlug(slug: string): { amount: number; ensSlug: string } | null {
  const match = slug.match(/^(\d+)-(.+)$/)
  if (!match) return null
  
  return {
    amount: parseInt(match[1], 10),
    ensSlug: match[2],
  }
}
