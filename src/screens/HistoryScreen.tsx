import { type PeriodEntry } from "@/types/period"

interface HistoryScreenProps {
  entries: PeriodEntry[]
}

function HistoryScreen({ entries }: HistoryScreenProps) {
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
            {entries.map((entry, i) => (
              <div
                key={i}
                className="bg-white border-l-4 border-pink-600 rounded-lg p-4 shadow-sm"
              >
                <p className="font-medium">
                  Start: {new Date(entry.startDate).toDateString()}
                </p>
                {entry.endDate && (
                  <p className="text-gray-600">
                    End: {new Date(entry.endDate).toDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryScreen
