import type { PeriodEntry } from "@/types/period"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { calculateAverageCycle } from "@/lib/utils"
import { predictNextPeriod } from "@/lib/utils"
import { formatPrettyDate } from "@/lib/utils"
import { getLastCycleLength } from "@/lib/utils"
import { getCycleConsistency } from "@/lib/utils"
import { getConsistencyColor } from "@/lib/utils"
import { useMemo } from "react"

type Props = {
  periodEntries: PeriodEntry[]
}



function DashboardScreen({ periodEntries }: Props) {
  const averageCycle = useMemo( () => calculateAverageCycle(periodEntries), [periodEntries])
  const predictedDate = useMemo( () => predictNextPeriod(periodEntries),[periodEntries])
  const lastCycle = getLastCycleLength(periodEntries)
  const consistency = getCycleConsistency(periodEntries)
  const colorClass = consistency ? getConsistencyColor(consistency) : ""

  


  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold text-center text-pink-700">
          Your Cycle Insights
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
    <p className="text-xs text-gray-500">Cycle Consistency:</p>
    <p className={`text-lg font-bold ${colorClass}`}>
      {consistency}
    </p>
  </div>
)}

        <Link to="/tracker">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4">
            Back to Calendar
          </Button>
        </Link>
      
      <Link to="/history">
<Button className="w-full py-3 bg-pink-600 hover:bg-pink-700 focus:ring-purple-500 text-white mt-4">
  Back to Logged Dates
</Button>
</Link>



</div>
    
    
 
)

  
}

export default DashboardScreen