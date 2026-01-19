import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

function EditPeriodScreen() {
  const { index } = useParams<{ index: string }>()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-pink-700">
          Edit Period
        </h1>

        <p className="text-center text-gray-600">
          Editing entry #{index}
        </p>

        <Link to="/history">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Cancel & Return
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default EditPeriodScreen
