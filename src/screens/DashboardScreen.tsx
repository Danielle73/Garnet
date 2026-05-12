import type { PeriodEntry } from "@/types/period"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { calculateAverageCycle } from "@/lib/utils"
import { predictNextPeriod } from "@/lib/utils"
import { formatPrettyDate } from "@/lib/utils"
import { getLastCycleLength } from "@/lib/utils"
import { getCycleConsistency } from "@/lib/utils"
import { getConsistencyColor } from "@/lib/utils"
import { getCurrentPhase } from "@/lib/utils"
import { useMemo } from "react"
import {
  Droplets,
  CalendarDays,
  Activity,
  TrendingUp,
  Moon
} from "lucide-react"


type Props = {
  periodEntries: PeriodEntry[]
}

type DashboardCardProps = {
  title: string
  value: string
  valueClassName?: string
  icon?: React.ReactNode
}

function DashboardCard({
  title,
  value,
  valueClassName = "",
  icon,
}: DashboardCardProps) 
{
  return (
    <div
      className={`
        rounded-2xl 
        border 
        p-4 
        shadow-sm 
        bg-white
      `}
    >
      <div className="flex items-center gap-2">
  {icon}

  <p className="text-sm text-gray-500">
    {title}
  </p>
</div>

      <p
        className={`
          mt-2 
          text-lg 
          font-semibold 
          ${valueClassName}
        `}
      >
        {value}
      </p>
    </div>
  )
}

function DashboardScreen({ periodEntries }: Props) {
  const averageCycle = useMemo( () => calculateAverageCycle(periodEntries), [periodEntries])
  const predictedDate = useMemo( () => predictNextPeriod(periodEntries),[periodEntries])
  const lastCycle = getLastCycleLength(periodEntries)
  const consistency = getCycleConsistency(periodEntries)
  const colorClass = consistency ? getConsistencyColor(consistency) : ""
  const currentPhase = getCurrentPhase(periodEntries)


  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold text-center text-pink-700">
          Your Cycle Insights
        </h1>
{(averageCycle || lastCycle || predictedDate) && (
   
   <div className="grid grid-cols-2 gap-3">
    
   <DashboardCard
  title="Average Cycle"
  value={averageCycle ? `${averageCycle} days` : "Not enough data"}
  valueClassName="text-pink-600"
  icon={<Droplets className="h-4 w-4 text-pink-500" />}
  
  
/>

<DashboardCard
  title="Last Cycle"
  value={lastCycle ? `${lastCycle} days` : "Not enough data"}
  valueClassName="text-purple-600"
  icon={<Activity className="h-4 w-4 text-pink-500" />}

  
/>

<DashboardCard
  title="Next Period"
  value={
    predictedDate
      ? formatPrettyDate(predictedDate)
      : "Not enough data"
  }
  valueClassName="text-blue-600"
  icon={<CalendarDays className="h-4 w-4 text-pink-500" />}
  
/>

<DashboardCard
  title="Consistency"
  value={consistency ?? "Not enough data"}
  valueClassName={colorClass}
   icon={<TrendingUp className="h-4 w-4 text-pink-500" />}
/>

<DashboardCard
  title="Current Phase"
  value={currentPhase ?? "Not enough data"}
  valueClassName="text-pink-600"
  icon={<Moon className="h-4 w-4 text-pink-500" />}
/>

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