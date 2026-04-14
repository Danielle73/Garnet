import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { PeriodEntry } from "@/types/period"

type Props = {
  periodEntries: PeriodEntry[]
  setPeriodEntries: React.Dispatch<React.SetStateAction<PeriodEntry[]>>
}

function EditPeriodScreen({ periodEntries, setPeriodEntries }: Props) {
  const { index } = useParams()
  const navigate = useNavigate()

  const entryIndex = Number(index)
  const entry = periodEntries[entryIndex]

  const [startDate, setStartDate] = useState(
    entry ? entry.startDate.slice(0, 10) : ""
  )
  const [endDate, setEndDate] = useState(
    entry?.endDate ? entry.endDate.slice(0, 10) : ""
  )

const originalStart = entry.startDate.slice(0, 10)
const originalEnd = entry.endDate?.slice(0, 10) || ""

const hasChanged =
  startDate !== originalStart || endDate !== originalEnd

const isValid =
  startDate !== "" &&
  (!endDate || new Date(endDate) >= new Date(startDate))

const canSave = hasChanged && isValid

  if (!entry) {
    return <p className="p-4">Entry not found.</p>
  }

  const handleSave = () => {
    const updatedEntry: PeriodEntry = {
      startDate: new Date(startDate).toISOString(),
      endDate: endDate ? new Date(endDate).toISOString() : ""
    }

    const updatedEntries = [...periodEntries]
    updatedEntries[entryIndex] = updatedEntry

    setPeriodEntries(updatedEntries)
    navigate("/history")
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Edit Period</h1>

      <div>
        <label className="block text-sm font-medium">Start date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">End date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {!hasChanged && (
  <p className="text-sm text-gray-500">
    No changes made yet
  </p>
)}

{hasChanged && !isValid && (
  <p className="text-sm text-red-500">
    End date must be after start date
  </p>
)}

      <Button onClick={handleSave} disabled={!canSave} className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-50">
        Save changes
      </Button>

      <Button
        variant="secondary"
        onClick={() => navigate("/history")}
        className="w-full"
      >
        Cancel
      </Button>
    </div>
  )
}

export default EditPeriodScreen
