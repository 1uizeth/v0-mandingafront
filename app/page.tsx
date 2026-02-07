"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { circles } from "@/lib/circles"

export default function CirclesIndexPage() {
  // For now, just show a simple button to navigate to /20000-devcon
  const devconCircle = circles.find(c => c.slug === "20000-devcon")
  
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1280px] w-full px-6 md:px-10 py-20">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <h1 className="text-4xl font-bold text-[#1A1A1A]">Circles</h1>
          
          {devconCircle && (
            <Link href={`/${devconCircle.slug}`}>
              <Button className="rounded-full bg-[#1A1A1A] px-8 py-6 text-lg font-semibold text-white hover:bg-[#333333]">
                ${devconCircle.amount.toLocaleString()} for Devcon 2026
              </Button>
            </Link>
          )}
          
          <p className="text-sm text-[#666666] max-w-md">
            Temporary index page. Click the button above to access the circle at /{devconCircle?.slug}
          </p>
          
          {/* Debug info */}
          <div className="text-xs text-[#999999] max-w-md space-y-1">
            <p>Available circles:</p>
            <ul className="list-disc list-inside">
              {circles.map(c => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="hover:underline">
                    /{c.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
