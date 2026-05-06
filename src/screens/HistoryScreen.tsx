import { type PeriodEntry } from "@/types/period"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { formatPrettyDate } from "@/lib/utils"

interface HistoryScreenProps {
  entries: PeriodEntry[]
  onDelete: (index: number) => void
}


function HistoryScreen({ entries, onDelete }: HistoryScreenProps) {


  return (
 
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-pink-700">
          Logged Periods
        </h1>

  

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
                    Start: {formatPrettyDate(entry.startDate)}
                  </p>

                  {entry.endDate && (
                    <p className="text-gray-600">
                      End: {formatPrettyDate(entry.endDate)}
                    </p>
                  )}

                  {entry.mood && (
                    <p className="text-xl mt-2">{entry.mood}</p>
                    )}

                     {entry.flow && (
                  <p className="text-sm text-gray-600 mt-1">
                    Flow: {entry.flow}
                  </p>)
                  }


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
      

      <Link to="/dashboard">
      <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white mt-4">
          View Insights
      </Button>
      </Link>


      </div>
    </div>
    
  )
}

export default HistoryScreen
