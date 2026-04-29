import { type PeriodEntry } from "@/types/period"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { calculateAverageCycle } from "@/lib/utils"
import { predictNextPeriod } from "@/lib/utils"
import { formatPrettyDate } from "@/lib/utils"
import { getLastCycleLength } from "@/lib/utils"
import { getCycleConsistency } from "@/lib/utils"

interface HistoryScreenProps {
  entries: PeriodEntry[]
  onDelete: (index: number) => void
}


function HistoryScreen({ entries, onDelete }: HistoryScreenProps) {
  const averageCycle = calculateAverageCycle(entries)
  const predictedDate = predictNextPeriod(entries)
  const lastCycle = getLastCycleLength(entries)
  const consistency = getCycleConsistency(entries)

  return (
 
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-pink-700">
          Logged Periods
        </h1>

        {(averageCycle || lastCycle || predictedDate) && (
  <div className="grid grid-cols-2 gap-3">
    
    {averageCycle !== null && (
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <p className="text-xs text-gray-500">Average Cycle</p>
        <p className="text-lg font-bold text-pink-600">
          {averageCycle} days
        </p>
      </div>
    )}

    {lastCycle !== null && (
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <p className="text-xs text-gray-500">Last Cycle</p>
        <p className="text-lg font-bold text-purple-600">
          {lastCycle} days
        </p>
      </div>
    )}

    {predictedDate && (
      <div className="col-span-2 bg-white p-4 rounded-xl shadow-sm text-center">
        <p className="text-xs text-gray-500">'Your Next Period is likely:</p>
        <p className="text-lg font-bold text-indigo-600">
          {formatPrettyDate(predictedDate)}
        </p>
      </div>
    )}
  </div>
)}       

{consistency && (
  <div className="bg-white p-4 rounded-xl shadow-sm text-center col-span-2">
    <p className="text-xs text-gray-500">Cycle Consistency</p>
    <p className="text-lg font-bold text-green-600">
      {consistency}
    </p>
  </div>
)}

       {entries.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">No periods logged yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="bg-white border-l-4 border-pink-600 rounded-lg p-4 shadow-sm flex justify-between items-start"
              >
                <div>
                  <p className="font-medium">
                    Start: {new Date(entry.startDate).toDateString()}
                  </p>

                  {entry.endDate && (
                    <p className="text-gray-600">
                      End: {new Date(entry.endDate).toDateString()}
                    </p>
                  )}
                </div>

                 <Link to={`/edit/${index}`}>
                   <Button size="sm" variant="secondary">
                      Edit
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}

        <Link to="/tracker">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4">
            Back to Calendar
          </Button>
        </Link>
      </div>
    </div>
    
  )
}

export default HistoryScreen
