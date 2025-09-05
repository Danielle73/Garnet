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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-6 sm:px-6 lg:px-8">
  <div className="max-w-md mx-auto space-y-6">
<h1 className="text-2xl font-bold text-center sm:text-3xl text-red-700">Garnet Period Tracker</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
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
            className="w-full"
      />
      </div>
      
      {selectedDate && (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
    <p className="text-sm font-medium text-blue-900">
      Selected: {selectedDate.toDateString()}
    </p>
  </div>      )}
      
      {currentEntry && (
     <div className="bg-green-50 border border-green-200 rounded-lg p-3">
    <p className="text-sm font-medium text-green-900">
      Start date: {new Date(currentEntry.startDate).toDateString()}
    </p>
  </div>
 )}
      
<Button 
  onClick={handleSubmit}
  className="w-full py-3 text-base font-medium bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 sm:w-auto sm:px-8"
>
  {loggingStep === "start" ? "Log Start Date" : "Log End Date"}
</Button> 


<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-4">
    Logged Periods
  </h2>
  {periodEntries.length === 0 ? (
    <div className="text-center py-8">
      <p className="text-gray-500 text-sm">No periods logged yet.</p>
      <p className="text-gray-400 text-xs mt-1">Start by selecting a date above</p>
    </div>
  ) : (
    <div className="space-y-3">
      {periodEntries.map((entry, i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-3 border-l-4 border-pink-400">
          <p className="text-sm font-medium text-gray-900">
            Start: {new Date(entry.startDate).toDateString()}
          </p>
          {entry.endDate && (
            <p className="text-sm text-gray-600 mt-1">
              End: {new Date(entry.endDate).toDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  )}
</div>
    </div>
    </div>
  )
}

export default TrackerScreen