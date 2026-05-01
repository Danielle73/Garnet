export interface PeriodEntry {
  startDate: string
  endDate: string // optional, until user logs it
  mood?: string
  flow?: "light" | "medium" | "heavy"
}
