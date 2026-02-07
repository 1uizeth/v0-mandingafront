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
  },
]

export function getCircleBySlug(slug: string): Circle | undefined {
  return circles.find((circle) => circle.slug === slug)
}
