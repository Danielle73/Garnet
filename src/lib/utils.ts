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

export const predictNextPeriod = (entries: PeriodEntry[]): Date | null => {
  if (entries.length < 2) return null

  const sorted = [...entries].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )


  const lastEntry = sorted[sorted.length - 1]
  const lastStart = new Date(lastEntry.startDate)


  const averageCycle = calculateAverageCycle(entries)
  if (!averageCycle) return null


  const predicted = new Date(lastStart)
  predicted.setDate(predicted.getDate() + averageCycle)

  return predicted
}

export const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th"

  switch (day % 10) {
    case 1: return "st"
    case 2: return "nd"
    case 3: return "rd"
    default: return "th"
  }
}

export const formatPrettyDate = (date: Date): string => {
  const day = date.getDate()
  const suffix = getOrdinalSuffix(day)

  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" })
  const month = date.toLocaleDateString("en-GB", { month: "long" })

  return `${weekday} ${day}${suffix} ${month}`
}


export const getLastCycleLength = (entries: PeriodEntry[]): number | null => {
  if (entries.length < 2) return null

  const sorted = [...entries].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  const last = new Date(sorted[sorted.length - 1].startDate)
  const prev = new Date(sorted[sorted.length - 2].startDate)

  const diffTime = last.getTime() - prev.getTime()
  return Math.round(diffTime / (1000 * 60 * 60 * 24))
}

export const getCycleConsistency = (entries: PeriodEntry[]): string | null => {
  if (entries.length < 3) return null 

  const sorted = [...entries].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  const cycleLengths: number[] = []

  for (let i = 1; i < sorted.length; i++) {
    const current = new Date(sorted[i].startDate)
    const prev = new Date(sorted[i - 1].startDate)

    const diff = Math.round(
      (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
    )

    cycleLengths.push(diff)
  }

  const max = Math.max(...cycleLengths)
  const min = Math.min(...cycleLengths)
  const variation = max - min

  if (variation <= 3) return "Very regular"
  if (variation <= 7) return "Fairly regular"
  return "Irregular"
}