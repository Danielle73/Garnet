import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import type { PeriodEntry } from "@/types/period"

function TrackerScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [periodEntries, setPeriodEntries] = useState<PeriodEntry[]>([])
  const [loggingStep, setLoggingStep] = useState<"start" | "end">("start")
  const [currentEntry, setCurrentEntry] = useState<PeriodEntry | null>(null)

  const handleSubmit = () => {
    if (!selectedDate) return

    if (loggingStep === "start") {
      // Log start date
      const newEntry: PeriodEntry = {
        startDate: selectedDate.toISOString(),
        endDate: ""
      }
      setCurrentEntry(newEntry)
      setLoggingStep("end")
      alert("Start date logged! Now select an end date.")
    } else if (loggingStep === "end" && currentEntry) {
      // Log end date
      const updatedEntry: PeriodEntry = {
        ...currentEntry,
        endDate: selectedDate.toISOString(),
      }
      setPeriodEntries([...periodEntries, updatedEntry])
      setCurrentEntry(null)
      setLoggingStep("start")
      alert("End date logged! Entry saved.")
    }

    setSelectedDate(undefined)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Period Tracker</h1>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
      />

      {selectedDate && <p>Selected: {selectedDate.toDateString()}</p>}

      <Button onClick={handleSubmit}>
        {loggingStep === "start" ? "Log Start Date" : "Log End Date"}
      </Button>

      <div>
        <h2 className="text-lg font-semibold">Logged Periods</h2>
        <ul className="list-disc pl-5">
          {periodEntries.map((entry, i) => (
            <li key={i}>
              Start: {new Date(entry.startDate).toDateString()}{" "}
              {entry.endDate && `→ End: ${new Date(entry.endDate).toDateString()}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TrackerScreen
