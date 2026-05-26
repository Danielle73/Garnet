import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import type { PeriodEntry } from "@/types/period";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import InstructionModal from "@/components/ui/instructionModal";
import { predictNextPeriod } from "@/lib/utils";
import { Smile, Meh, Frown, Bed, Annoyed } from "lucide-react";

// Helper function to get all dates between two dates
const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

// Helper function to categorize all period dates for highlighting
const getAllPeriodDates = (entries: PeriodEntry[]) => {
  const startDates: Date[] = [];
  const endDates: Date[] = [];
  const rangeDates: Date[] = [];

  entries.forEach((entry) => {
    const start = new Date(entry.startDate);
    startDates.push(start);

    if (entry.endDate) {
      const end = new Date(entry.endDate);
      endDates.push(end);

      // Get all dates between start and end (excluding start and end)
      const range = getDatesInRange(start, end);
      rangeDates.push(...range.slice(1, -1)); // Remove first and last
    }
  });

  return { startDates, endDates, rangeDates };
};

function TrackerScreen({
  periodEntries,
  setPeriodEntries,
}: {
  periodEntries: PeriodEntry[];
  setPeriodEntries: React.Dispatch<React.SetStateAction<PeriodEntry[]>>;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [loggingStep, setLoggingStep] = useState<"start" | "end">("start");
  const [hasJustLogged, setHasJustLogged] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<PeriodEntry | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const predictedDate = predictNextPeriod(periodEntries);
  // const moods = ["😊", "😐", "😢", "😡", "😴"]
  const moods = [
    {
      label: "Happy",
      value: "happy",
      icon: Smile,
    },
    {
      label: "Neutral",
      value: "neutral",
      icon: Meh,
    },
    { label: "Sad", value: "sad", icon: Frown },
    {
      label: "Tired",
      value: "tired",
      icon: Bed,
    },
    {
      label: "Annoyed",
      value: "annoyed",
      icon: Annoyed,
    },
  ];
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<
    "light" | "medium" | "heavy" | null
  >(null);
  const flows: { label: string; value: "light" | "medium" | "heavy" }[] = [
    { label: "Light", value: "light" },
    { label: "Medium", value: "medium" },
    { label: "Heavy", value: "heavy" },
  ];

  const handleSubmit = () => {
    if (!selectedDate) return;

    if (loggingStep === "start") {
      const newEntry: PeriodEntry = {
        startDate: selectedDate.toISOString(),
        endDate: "",
      };

      setCurrentEntry(newEntry);
      setLoggingStep("end");
      setMessage("Start date logged!");
      setTimeout(() => setMessage(null), 2000);
    } else if (loggingStep === "end" && currentEntry) {
      const updatedEntry: PeriodEntry = {
        ...currentEntry,
        endDate: selectedDate.toISOString(),
        mood: selectedMood || undefined,
        flow: selectedFlow || undefined,
      };

      setPeriodEntries([...periodEntries, updatedEntry]);

      setCurrentEntry(null);
      setLoggingStep("start");
      setHasJustLogged(true);
      setMessage("End date logged! Entry saved.");
      setTimeout(() => setMessage(null), 2000);
    }

    setSelectedDate(undefined);
  };

  // Get all the dates to highlight for completed periods
  const { startDates, endDates, rangeDates } = getAllPeriodDates(periodEntries);

  // If currently logging end date, show the preview range
  const previewRangeDates =
    currentEntry && selectedDate
      ? getDatesInRange(new Date(currentEntry.startDate), selectedDate).slice(
          1,
          -1,
        )
      : [];

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header with optional help icon */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-center sm:text-3xl text-red-700">
            Garnet Period Tracker
          </h1>
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-2 hover:bg-gray-200 rounded-full"
            aria-label="Help"
          >
            <HelpCircle className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {message && (
          <div className="bg-green-100 text-green-800 text-sm p-3 rounded-md">
            {message}
          </div>
        )}

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
              previewStart: currentEntry
                ? [new Date(currentEntry.startDate)]
                : [],
              previewRange: previewRangeDates,
              previewEnd: currentEntry && selectedDate ? [selectedDate] : [],
              // Predicted date
              predicted: predictedDate ? [predictedDate] : [],
            }}
            modifiersStyles={{
              // Completed period colors (red theme)
              startDate: {
                backgroundColor: "#ef4444",
                color: "white",
                fontWeight: "bold",
              },
              endDate: {
                backgroundColor: "#dc2626",
                color: "white",
                fontWeight: "bold",
              },
              rangeDate: { backgroundColor: "#fecaca", color: "#7f1d1d" },
              // Current period preview colors (blue theme)
              previewStart: {
                backgroundColor: "#3b82f6",
                color: "white",
                fontWeight: "bold",
              },
              //previewStart: { border: '2px solid green', fontWeight: 'bold' },
              previewRange: { backgroundColor: "#dbeafe", color: "#1e40af" },
              previewEnd: {
                backgroundColor: "#2563eb",
                color: "white",
                fontWeight: "bold",
              },
              // predicted date styles
              predicted: {
                border: "2px dashed #7c3aed",
                color: "#7c3aed",
                fontWeight: "bold",
              },
            }}
            className="w-full"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3">
          <p className="text-sm font-medium text-gray-600 text-center">
            How’s are you feeling?
          </p>
          <div className="flex justify-center gap-2">
            {moods.map((mood) => {
              const Icon = mood.icon;

              return (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`
    p-3 rounded-xl transition-all
    flex flex-col items-center gap-1
    min-w-17.5
    ${
      selectedMood === mood.value
        ? "bg-pink-100 text-pink-700"
        : "bg-white border"
    }
  `}
                >
                  <Icon className="h-5 w-5 text-pink-500" />

                  <span className="text-xs">{mood.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3">
          <p className="text-sm font-medium text-gray-600 text-center">
            How is your flow?
          </p>

          <div className="flex justify-center gap-2">
            {flows.map((flow) => (
              <button
                key={flow.value}
                onClick={() => setSelectedFlow(flow.value)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  selectedFlow === flow.value
                    ? "bg-pink-200 text-pink-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {flow.label}
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-900">
              Selected: {selectedDate.toDateString()}
            </p>
          </div>
        )}

        {currentEntry && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm font-medium text-green-900">
              Start date: {new Date(currentEntry.startDate).toDateString()}
            </p>
          </div>
        )}

        <div className="space-y-2">
          {!hasJustLogged && (
            <Button
              onClick={handleSubmit}
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white"
            >
              {loggingStep === "start" ? "Log Start Date" : "Log End Date"}
            </Button>
          )}

          {hasJustLogged && (
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setHasJustLogged(false)}
            >
              Log Another Period
            </Button>
          )}

          <Link to="/history">
            <Button className="w-full py-3 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-white mt-4">
              View Logged Dates
            </Button>
          </Link>
        </div>

        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
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
</div> */}

        {/* Help modal */}
        {showHelpModal && (
          <InstructionModal
            onClose={() => setShowHelpModal(false)}
            onContinue={() => setShowHelpModal(false)}
            actionLabel="Close"
            showCancel={false}
          />
        )}
      </div>
    </div>
  );
}

export default TrackerScreen;
