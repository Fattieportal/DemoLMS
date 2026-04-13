interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: string;
}

export default function ProgressBar({
  progress,
  color = "bg-blue-500",
  height = "h-2",
}: ProgressBarProps) {
  return (
    <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${height}`}>
      <div
        className={`${color} ${height} rounded-full transition-all duration-500`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}