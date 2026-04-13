interface ProgressBarProps {
  value: number; // 0–100
  color?: string;
  height?: "sm" | "md";
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  color = "bg-violet-500",
  height = "sm",
  showLabel = false,
}: ProgressBarProps) {
  const h = height === "sm" ? "h-1.5" : "h-2.5";
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex-1 ${h} bg-gray-100 rounded-full overflow-hidden`}
      >
        <div
          className={`${h} ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-gray-500 w-8 text-right">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}
