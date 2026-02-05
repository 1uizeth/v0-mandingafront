"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  status: "active" | "inactive" | "completed"
  amount: number
  title: string
  slotsLeft: number
}

export function Header({ status, amount, title, slotsLeft }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-10">
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="flex items-center gap-2 rounded-full bg-background px-4 py-2 font-semibold text-foreground transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>

        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">
          <span className="h-2 w-2 rounded-sm bg-emerald-400" />
          <span className="font-semibold text-emerald-500">
            {status === "active" ? "Active" : status === "completed" ? "Completed" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground/80 md:text-5xl">
          ${amount.toLocaleString()}
        </h1>
        <p className="text-lg text-foreground/80">{title}</p>
      </div>

      <div className="rounded-full bg-muted px-4 py-2">
        <span className="font-semibold text-muted-foreground">{slotsLeft} slots left</span>
      </div>
    </header>
  )
}
