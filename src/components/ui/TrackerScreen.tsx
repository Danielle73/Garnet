import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import type { PeriodEntry } from "@/types/period"

// Helper function to get all dates between two dates
const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = []
  const current = new Date(startDate)
  
  while (current <= endDate) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  
  return dates
}

// Helper function to categorize all period dates for highlighting
const getAllPeriodDates = (entries: PeriodEntry[]) => {
  const startDates: Date[] = []
  const endDates: Date[] = []
  const rangeDates: Date[] = []
  
  entries.forEach(entry => {
    const start = new Date(entry.startDate)
    startDates.push(start)
    
    if (entry.endDate) {
      const end = new Date(entry.endDate)
      endDates.push(end)
      
      // Get all dates between start and end (excluding start and end)
      const range = getDatesInRange(start, end)
      rangeDates.push(...range.slice(1, -1)) // Remove first and last
    }
  })
  
  return { startDates, endDates, rangeDates }
}

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
      alert("Start date logged!")
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

  // Get all the dates to highlight for completed periods
  const { startDates, endDates, rangeDates } = getAllPeriodDates(periodEntries)
  
  // If currently logging end date, show the preview range
  const previewRangeDates = currentEntry && selectedDate 
    ? getDatesInRange(new Date(currentEntry.startDate), selectedDate).slice(1, -1)
    : []

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Period Tracker</h1>
      
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        modifiers={{
          // Completed periods
          startDate: startDates,
          endDate: endDates,
          rangeDate: rangeDates,
          // Current period being logged
          previewStart: currentEntry ? [new Date(currentEntry.startDate)] : [],
          previewRange: previewRangeDates,
          previewEnd: currentEntry && selectedDate ? [selectedDate] : []
        }}
        modifiersStyles={{
          // Completed period colors (red theme)
          startDate: { backgroundColor: '#ef4444', color: 'white', fontWeight: 'bold' },
          endDate: { backgroundColor: '#dc2626', color: 'white', fontWeight: 'bold' },
          rangeDate: { backgroundColor: '#fecaca', color: '#7f1d1d' },
          // Current period preview colors (blue theme)
          previewStart: { backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold' },
          //previewStart: { border: '2px solid green', fontWeight: 'bold' },
          previewRange: { backgroundColor: '#dbeafe', color: '#1e40af' },
          previewEnd: { backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold' }
        }}
      />
      
      {selectedDate && (
        <p>Selected: {selectedDate.toDateString()}</p>
      )}
      
      {currentEntry && (
        <p className="text-sm text-gray-600">
          Current start date: {new Date(currentEntry.startDate).toDateString()}
        </p>
      )}
      
      <Button onClick={handleSubmit}>
        {loggingStep === "start" ? "Log Start Date" : "Log End Date"}
      </Button>
      
      <div>
        <h2 className="text-lg font-semibold">Logged Periods</h2>
        {periodEntries.length === 0 ? (
          <p className="text-gray-500">No periods logged yet.</p>
        ) : (
          <ul className="list-disc pl-5">
            {periodEntries.map((entry, i) => (
              <li key={i}>
                Start: {new Date(entry.startDate).toDateString()}{" "}
                {entry.endDate && `→ End: ${new Date(entry.endDate).toDateString()}`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default TrackerScreen