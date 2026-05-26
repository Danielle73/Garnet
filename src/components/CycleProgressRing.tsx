type Props = {
  currentDay: number
  cycleLength: number
  label?: string
}

export default function CycleProgressRing({
  currentDay,
  cycleLength,
  label,
}: Props) {
  const radius = 50
  const stroke = 8
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI

  const progress = Math.min(currentDay / cycleLength, 1)
  const strokeDashoffset = circumference - progress * circumference

  return (
    <div className="flex flex-col items-center justify-center">
      <svg height={120} width={120}>
        {/* Background circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={60}
          cy={60}
        />

        {/* Progress circle */}
        <circle
          stroke="#ec4899"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={60}
          cy={60}
        />
      </svg>

      {/* Center text */}
      <div className="text-center -mt-20">
        <p className="text-sm font-semibold">Day {currentDay}</p>
        {label && <p className="text-xs text-gray-500">{label}</p>}
      </div>
    </div>
  )
}