type InstructionModalProps = {
    onClose: () => void
    onContinue: () => void
}

function InstructionModal({ onClose, onContinue }: InstructionModalProps){
    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
        <h2 className="text-xl font-bold">How to use Garnet</h2>

        <ul className="list-disc pl-5 text-sm space-y-2">
          <li>Select the first day of your period</li>
          <li>Click “Log Start Date”</li>
          <li>Select the last day</li>
          <li>Click “Log End Date”</li>
          <li>Your period duration will be highlighted</li>
        </ul>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>

          <button
            onClick={onContinue}
            className="bg-pink-600 text-white px-4 py-2 rounded-md"
          >
            Start Tracking
          </button>
        </div>
      </div>
    </div>
    )
}

export default InstructionModal