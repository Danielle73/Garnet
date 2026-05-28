type Props = {
  currentDay: number;
  cycleLength: number;
  label?: string;
};

export default function CycleProgressRing({
  currentDay,
  cycleLength,
  label,
}: Props) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const progress = Math.min(currentDay / cycleLength, 1);
  const progressPercent = Math.round(progress * 100);
  const strokeDashoffset = circumference - progress * circumference;

  const phaseColors: Record<string, string> = {
    menstrual: "#ef4444",
    follicular: "#ec4899",
    ovulation: "#8b5cf6",
    luteal: "#f59e0b",
  };

  const progressColor = label
    ? phaseColors[label.toLowerCase()] || "#ec4899"
    : "#ec4899";

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <svg height={160} width={160}>
          {/* Background circle */}
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={80}
            cy={80}
          />

          {/* Progress circle */}
          <circle
            className="transition-all duration-700 ease-out"
            stroke={progressColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={80}
            cy={80}
          />
        </svg>

        {/* Center text */}
        <div className="absolute text-center">
          <p className="text-sm font-semibold">Day {currentDay}</p>
          {label && <p className="text-xs text-gray-500">{label}</p>}
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-500 text-center max-w-xs">
        You are {progressPercent}% through your cycle
      </p>
    </div>
  );
}
