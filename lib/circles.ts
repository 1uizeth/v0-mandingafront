// Helper to create URL-safe slugs
function createSlug(amount: number, ensDomain: string): string {
  const ensSlug = ensDomain
    .replace('.eth', '')
    .replace('.mandinga', '')
    .replace(/\./g, '-')
    .toLowerCase()
  return `${amount}-${ensSlug}`
}

export interface Circle {
  slug: string
  status: "active" | "inactive"
  amount: number
  title: string
  slotsLeft: number
  joinedDate?: Date
  startDate: string
  endDate: string
  monthlyAmount: number
  totalMonths: number
  currentMonth: number
  earlyEntryMonths: number[]
  payoutProgress: number
  installmentProgress: number
  dueAmount: number
  payoutDueDate: string
  nextDueDate: Date
  ensDomain: string
  ensUrl: string
  arcscanUrl: string
  members: Array<{
    name: string
    joinedDaysAgo: number
  }>
  // Card display fields
  monthlyPayment: number
  durationMonths: number
  durationLabel: string
  statusLabel: "Active" | "Joined"
  statusColor: string
  entryLabel: "Early entry" | "Middle entry" | "Late entry"
  entryColor: string
  nextPayoutInDays: number
}

// Mock circles data
export const circles: Circle[] = [
  {
    slug: "20000-devcon",
    status: "active" as const,
    amount: 20000,
    title: "for Devcon 2026",
    slotsLeft: 21,
    startDate: "February, 2026",
    endDate: "March, 2028",
    monthlyAmount: 892,
    totalMonths: 24,
    currentMonth: 1,
    earlyEntryMonths: [2, 3, 4, 5, 6, 7, 8],
    payoutProgress: 1,
    installmentProgress: 1,
    dueAmount: 892,
    payoutDueDate: "March",
    nextDueDate: new Date(2026, 2, 5), // March 5, 2026
    ensDomain: "devcon.mandinga.eth",
    ensUrl: "https://app.ens.domains/devcon.mandinga.eth",
    arcscanUrl: "https://arcscan.io",
    members: [
      { name: "sassai.eth", joinedDaysAgo: 1 },
      { name: "vitalik.eth", joinedDaysAgo: 2 },
      { name: "1uiz.eth", joinedDaysAgo: 3 },
    ],
    monthlyPayment: 892,
    durationMonths: 24,
    durationLabel: "2 years",
    statusLabel: "Active",
    statusColor: "#10B981",
    entryLabel: "Early entry",
    entryColor: "#D4AF37",
    nextPayoutInDays: 26,
  },
  {
    slug: createSlug(15000, "ethberlin.mandinga.eth"),
    status: "active" as const,
    amount: 15000,
    title: "for ETHBerlin 2026",
    slotsLeft: 15,
    startDate: "March, 2026",
    endDate: "April, 2028",
    monthlyAmount: 670,
    totalMonths: 24,
    currentMonth: 1,
    earlyEntryMonths: [2, 3, 4, 5, 6, 7, 8],
    payoutProgress: 1,
    installmentProgress: 1,
    dueAmount: 670,
    payoutDueDate: "April",
    nextDueDate: new Date(2026, 3, 5), // April 5, 2026
    ensDomain: "ethberlin.mandinga.eth",
    ensUrl: "https://app.ens.domains/ethberlin.mandinga.eth",
    arcscanUrl: "https://arcscan.io",
    members: [
      { name: "alice.eth", joinedDaysAgo: 2 },
      { name: "bob.eth", joinedDaysAgo: 4 },
    ],
    monthlyPayment: 670,
    durationMonths: 24,
    durationLabel: "2 years",
    statusLabel: "Active",
    statusColor: "#10B981",
    entryLabel: "Middle entry",
    entryColor: "#5F9EA0",
    nextPayoutInDays: 56,
  },
  {
    slug: createSlug(10000, "ethglobal.mandinga.eth"),
    status: "active" as const,
    amount: 10000,
    title: "for ETHGlobal 2026",
    slotsLeft: 18,
    startDate: "April, 2026",
    endDate: "May, 2028",
    monthlyAmount: 447,
    totalMonths: 24,
    currentMonth: 1,
    earlyEntryMonths: [2, 3, 4, 5, 6, 7, 8],
    payoutProgress: 1,
    installmentProgress: 1,
    dueAmount: 447,
    payoutDueDate: "May",
    nextDueDate: new Date(2026, 4, 5), // May 5, 2026
    ensDomain: "ethglobal.mandinga.eth",
    ensUrl: "https://app.ens.domains/ethglobal.mandinga.eth",
    arcscanUrl: "https://arcscan.io",
    members: [
      { name: "charlie.eth", joinedDaysAgo: 1 },
      { name: "diana.eth", joinedDaysAgo: 3 },
      { name: "eve.eth", joinedDaysAgo: 5 },
    ],
    monthlyPayment: 447,
    durationMonths: 24,
    durationLabel: "2 years",
    statusLabel: "Joined",
    statusColor: "#6366F1",
    entryLabel: "Early entry",
    entryColor: "#D4AF37",
    nextPayoutInDays: 86,
  },
  {
    slug: createSlug(25000, "ethcc.mandinga.eth"),
    status: "active" as const,
    amount: 25000,
    title: "for EthCC 2026",
    slotsLeft: 10,
    startDate: "January, 2026",
    endDate: "February, 2028",
    monthlyAmount: 1115,
    totalMonths: 24,
    currentMonth: 1,
    earlyEntryMonths: [2, 3, 4, 5, 6, 7, 8],
    payoutProgress: 1,
    installmentProgress: 1,
    dueAmount: 1115,
    payoutDueDate: "February",
    nextDueDate: new Date(2026, 1, 5), // February 5, 2026
    ensDomain: "ethcc.mandinga.eth",
    ensUrl: "https://app.ens.domains/ethcc.mandinga.eth",
    arcscanUrl: "https://arcscan.io",
    members: [
      { name: "frank.eth", joinedDaysAgo: 1 },
    ],
    monthlyPayment: 1115,
    durationMonths: 24,
    durationLabel: "2 years",
    statusLabel: "Active",
    statusColor: "#10B981",
    entryLabel: "Late entry",
    entryColor: "#6A5ACD",
    nextPayoutInDays: 5,
  },
  {
    slug: createSlug(8000, "ethdenver.mandinga.eth"),
    status: "active" as const,
    amount: 8000,
    title: "for ETHDenver 2026",
    slotsLeft: 30,
    startDate: "May, 2026",
    endDate: "June, 2028",
    monthlyAmount: 358,
    totalMonths: 24,
    currentMonth: 1,
    earlyEntryMonths: [2, 3, 4, 5, 6, 7, 8],
    payoutProgress: 1,
    installmentProgress: 1,
    dueAmount: 358,
    payoutDueDate: "June",
    nextDueDate: new Date(2026, 5, 5), // June 5, 2026
    ensDomain: "ethdenver.mandinga.eth",
    ensUrl: "https://app.ens.domains/ethdenver.mandinga.eth",
    arcscanUrl: "https://arcscan.io",
    members: [
      { name: "grace.eth", joinedDaysAgo: 2 },
      { name: "henry.eth", joinedDaysAgo: 5 },
    ],
    monthlyPayment: 358,
    durationMonths: 24,
    durationLabel: "2 years",
    statusLabel: "Active",
    statusColor: "#10B981",
    entryLabel: "Middle entry",
    entryColor: "#5F9EA0",
    nextPayoutInDays: 116,
  },
  {
    slug: createSlug(12000, "ethwaterloo.mandinga.eth"),
    status: "active" as const,
    amount: 12000,
    title: "for ETHWaterloo 2026",
    slotsLeft: 25,
    startDate: "June, 2026",
    endDate: "July, 2028",
    monthlyAmount: 536,
    totalMonths: 24,
    currentMonth: 1,
    earlyEntryMonths: [2, 3, 4, 5, 6, 7, 8],
    payoutProgress: 1,
    installmentProgress: 1,
    dueAmount: 536,
    payoutDueDate: "July",
    nextDueDate: new Date(2026, 6, 5), // July 5, 2026
    ensDomain: "ethwaterloo.mandinga.eth",
    ensUrl: "https://app.ens.domains/ethwaterloo.mandinga.eth",
    arcscanUrl: "https://arcscan.io",
    members: [
      { name: "isabel.eth", joinedDaysAgo: 1 },
      { name: "jack.eth", joinedDaysAgo: 4 },
    ],
    monthlyPayment: 536,
    durationMonths: 24,
    durationLabel: "2 years",
    statusLabel: "Active",
    statusColor: "#10B981",
    entryLabel: "Late entry",
    entryColor: "#6A5ACD",
    nextPayoutInDays: 146,
  },
]

export function getCircleBySlug(slug: string): Circle | undefined {
  return circles.find((circle) => circle.slug === slug)
}
