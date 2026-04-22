import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { PeriodEntry } from "@/types/period"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateAverageCycle = (entries: PeriodEntry[]): number | null => {
  if (entries.length < 2) return null

  const sorted = [...entries].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  const cycleLengths: number[] = []

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].startDate)
    const current = new Date(sorted[i].startDate)

    const diffTime = current.getTime() - prev.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)

    cycleLengths.push(diffDays)
  }

  const total = cycleLengths.reduce((sum, val) => sum + val, 0)
  return Math.round(total / cycleLengths.length)
}