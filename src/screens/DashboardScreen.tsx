import type { PeriodEntry } from "@/types/period";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { calculateAverageCycle } from "@/lib/utils";
import { predictNextPeriod } from "@/lib/utils";
import { formatPrettyDate } from "@/lib/utils";
import { getLastCycleLength } from "@/lib/utils";
import { getCycleConsistency } from "@/lib/utils";
import { getConsistencyColor } from "@/lib/utils";
import { getCurrentPhase } from "@/lib/utils";
import { getPhaseDescription } from "@/lib/utils";
import { useMemo } from "react";
import {
  Droplets,
  CalendarDays,
  Activity,
  TrendingUp,
  Moon,
  BarChart3,
} from "lucide-react";
import CycleProgressRing from "@/components/CycleProgressRing";

type Props = {
  periodEntries: PeriodEntry[];
};

type DashboardCardProps = {
  title: string;
  value: string;
  valueClassName?: string;
  icon?: React.ReactNode;
};

function DashboardCard({
  title,
  value,
  valueClassName = "",
  icon,
}: DashboardCardProps) {
  return (
    // <div
    //   className={`
    //     rounded-2xl
    //     border
    //     p-4
    //     shadow-sm
    //     bg-white
    //   `}
    // >

    <div
      className="
  rounded-2xl
  border
  p-4
  shadow-sm
  bg-white
  group
  transition-all
  duration-300
  hover:border-pink-200
  hover:shadow-md
"
    >
      <div className="flex items-center gap-2">
        {icon}

        <p className="text-sm text-gray-500">{title}</p>
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
  );
}

function DashboardScreen({ periodEntries }: Props) {
  const averageCycle = useMemo(
    () => calculateAverageCycle(periodEntries),
    [periodEntries],
  );
  const predictedDate = useMemo(
    () => predictNextPeriod(periodEntries),
    [periodEntries],
  );

  if (periodEntries.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <BarChart3 className="w-12 h-12 text-pink-500 mb-4" />
        <h1 className="text-2xl font-bold text-pink-700">
          No insights available yet
        </h1>

        <p className="mt-3 text-gray-600 max-w-sm">
          Log your first period to start viewing cycle insights and predictions.
        </p>

        <Link to="/tracker">
          <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white mt-4">
            Log First Period
          </Button>
        </Link>
      </div>
    );
  }

  const lastCycle = getLastCycleLength(periodEntries);
  const consistency = getCycleConsistency(periodEntries);
  const colorClass = consistency ? getConsistencyColor(consistency) : "";
  const currentPhase = getCurrentPhase(periodEntries);
  const phaseDescription = getPhaseDescription(currentPhase);
  const today = new Date();

  const latestEntry = periodEntries[periodEntries.length - 1];
  const cycleStart = new Date(latestEntry.startDate);

  const currentDayInCycle =
    Math.floor(
      (today.getTime() - cycleStart.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;

  const cycleLength = calculateAverageCycle(periodEntries);
  const safeCycleLength = cycleLength ?? 28;
  const safeLabel = currentPhase ?? "Unknown phase";

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center text-pink-700">
        Your Cycle Insights
      </h1>

      <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center">
        <CycleProgressRing
          currentDay={currentDayInCycle}
          cycleLength={safeCycleLength}
          label={safeLabel}
        />
      </div>

      {(averageCycle || lastCycle || predictedDate) && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <DashboardCard
              title="Average Cycle"
              value={averageCycle ? `${averageCycle} days` : "Not enough data"}
              valueClassName="text-pink-600"
              // icon={<Droplets className="h-4 w-4 text-pink-500" />}
              icon={
                <Droplets
                  className="
    h-4
    w-4
    text-pink-500
    transition-all
    duration-300
    group-hover:text-pink-700
    group-hover:scale-115
  "
                />
              }
            />

            <DashboardCard
              title="Last Cycle"
              value={lastCycle ? `${lastCycle} days` : "Not enough data"}
              valueClassName="text-purple-600"
              icon={
                <Activity
                  className="
    h-4
    w-4
    text-pink-500
    transition-all
    duration-300
    group-hover:text-pink-700
    group-hover:scale-115
  "
                />
              }
            />

            <DashboardCard
              title="Next Predicted Period"
              value={
                predictedDate
                  ? formatPrettyDate(predictedDate)
                  : "Not enough data"
              }
              valueClassName="text-blue-600"
              icon={
                <CalendarDays
                  className="
    h-4
    w-4
    text-pink-500
    transition-all
    duration-300
    group-hover:text-pink-700
    group-hover:scale-115
  "
                />
              }
            />

            <DashboardCard
              title="Consistency"
              value={consistency ?? "Not enough data"}
              valueClassName={colorClass}
              icon={
                <TrendingUp
                  className="
    h-4
    w-4
    text-pink-500
    transition-all
    duration-300
    group-hover:text-pink-700
    group-hover:scale-115
  "
                />
              }
            />
          </div>

          {/* <div className="rounded-2xl border p-5 shadow-md bg-white space-y-2"> */}
          <div
            className="
  rounded-2xl
  border
  p-5
  shadow-sm
  bg-white
  space-y-2
  group
  transition-all
  duration-300
  hover:border-pink-200
  hover:shadow-md
"
          >
            <div className="flex items-start gap-3">
              {/* <Moon className="h-6 w-6 text-pink-500 mt-0.5" /> */}
              <Moon
                className="
    h-6
    w-6
    text-pink-500
    mt-1
    transition-all
    duration-300
    group-hover:text-pink-700
    group-hover:scale-110
  "
              />
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Current Phase</p>

                <h2 className="text-lg font-semibold text-pink-700">
                  {currentPhase ?? "Not enough data"}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {phaseDescription}
                </p>
              </div>
            </div>
          </div>
        </>
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
  );
}

export default DashboardScreen;
