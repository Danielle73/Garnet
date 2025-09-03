import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
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
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Garnet</h1>
          <p className="text-muted-foreground text-sm mt-1">Period Tracker</p>
        </div>

        {/* Calendar Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Select Date</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
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
                // Completed period styles (using CSS variables for theme consistency)
                startDate: { border: '2px solid hsl(var(--destructive))', fontWeight: 'bold' },
                endDate: { border: '2px solid hsl(var(--destructive))', fontWeight: 'bold', backgroundColor: 'hsl(var(--destructive))', color: 'hsl(var(--destructive-foreground))' },
                rangeDate: { backgroundColor: 'hsl(var(--destructive) / 0.1)' },
                // Current period preview styles
                previewStart: { border: '2px solid hsl(var(--primary))', fontWeight: 'bold' },
                previewRange: { backgroundColor: 'hsl(var(--primary) / 0.1)' },
                previewEnd: { border: '2px solid hsl(var(--primary))', fontWeight: 'bold' }
              }}
            />
            
            {/* Date Selection Status */}
            {selectedDate && (
              <Alert>
                <AlertDescription>
                  Selected: <strong>{selectedDate.toDateString()}</strong>
                </AlertDescription>
              </Alert>
            )}
            
            {/* Current Entry Status */}
            {currentEntry && (
              <Alert>
                <AlertDescription className="flex items-center justify-between">
                  <span>Start: <strong>{new Date(currentEntry.startDate).toDateString()}</strong></span>
                  <Badge variant="secondary">Step 2</Badge>
                </AlertDescription>
              </Alert>
            )}
            
            {/* Submit Button */}
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedDate}
              className="w-full"
              size="lg"
            >
              {loggingStep === "start" ? "Log Start Date" : "Log End Date"}
            </Button>
          </CardContent>
        </Card>

        {/* Logged Periods Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Period History</CardTitle>
              {periodEntries.length > 0 && (
                <Badge variant="outline">{periodEntries.length}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {periodEntries.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <p className="text-sm">No periods logged yet</p>
                <p className="text-xs mt-1">Select a start date above to begin</p>
              </div>
            ) : (
              <div className="space-y-3">
                {periodEntries.map((entry, i) => (
                  <Card key={i} className="border-l-4 border-l-primary/50">
                    <CardContent className="pt-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          Start: {new Date(entry.startDate).toDateString()}
                        </p>
                        {entry.endDate && (
                          <p className="text-sm text-muted-foreground">
                            End: {new Date(entry.endDate).toDateString()}
                          </p>
                        )}
                        {entry.endDate && (
                          <Badge variant="secondary" className="text-xs">
                            {Math.ceil((new Date(entry.endDate).getTime() - new Date(entry.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TrackerScreen