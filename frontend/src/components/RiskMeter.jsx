import { motion } from "framer-motion";

export default function RiskMeter({ score, disabled = false }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.max(score, 5);
  const progress = circumference - (safeScore / 100) * circumference;


  const color =
    score < 30
      ? "stroke-green-500"
      : score < 60
      ? "stroke-yellow-500"
      : "stroke-red-500";

  // 🔒 Disabled state (not enough data)
  if (disabled) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px]">
        <svg width="160" height="160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="10"
            fill="none"
          />
        </svg>
        <p className="text-sm text-gray-400 mt-2">
          Not enough data yet
        </p>
        <p className="text-xs text-gray-500">
          Log at least 3 days
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="10"
          fill="none"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          className={color}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1 }}
        />
      </svg>

      <p className="text-2xl font-bold mt-2">{score}%</p>
      <p className="text-sm text-gray-400">Risk Score</p>
    </div>
  );
}
