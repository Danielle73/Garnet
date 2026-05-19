import { Droplets, CalendarDays, TrendingUp,} from "lucide-react"

type InstructionModalProps = {
    onClose: () => void
    onContinue: () => void
    actionLabel?: string
    showCancel?: boolean
}

function InstructionModal({ onClose, onContinue, actionLabel = "Start tracking", showCancel = true, }: InstructionModalProps){
    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4 text-left">
        <h2 className="text-2xl font-bold text-center text-pink-700">How to use Garnet</h2>

  <div className="bg-pink-50 rounded-xl p-4 space-y-5">

  <div className="flex items-start gap-3">
    <Droplets className = "h-5 w-5 text-pink-500 mt-0.5" /> 
     
    <p className="text-sm text-gray-700">
      Log your period start date to begin tracking your cycle.
    </p>
  </div>

  <div className="flex items-start gap-3">
    <CalendarDays className= "h-5 w-5 text-pink-500 mt-0.5"/>

    <p className="text-sm text-gray-700">
      Add your end date to calculate cycle insights and predictions.
    </p>
  </div>

  <div className="flex items-start gap-3">
<TrendingUp className= "h-5 w-5 text-pink-500 mt-0.5" />
    <p className="text-sm text-gray-700">
      View trends and learn more about your cycle patterns over time.
    </p>
  </div>

</div>

        <div className="flex justify-end gap-2 pt-4">
        {showCancel && (<button
            onClick={onClose}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>)}

          <button
            onClick={onContinue}
            className="bg-pink-600 text-white px-4 py-2 rounded-md"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
    )
}

export default InstructionModal