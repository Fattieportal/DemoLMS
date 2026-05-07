export function ProgressBar({
  value,
  className = "",
  tone = "primary",
}: {
  value: number;
  className?: string;
  tone?: "primary" | "secondary" | "accent" | "light";
}) {
  const bg =
    tone === "light"
      ? "bg-primary-foreground/20"
      : tone === "secondary"
      ? "bg-secondary-soft"
      : tone === "accent"
      ? "bg-accent-soft"
      : "bg-muted";
  const fg =
    tone === "light"
      ? "bg-accent"
      : tone === "secondary"
      ? "bg-secondary"
      : tone === "accent"
      ? "bg-accent"
      : "bg-primary";
  return (
    <div className={`h-2 w-full rounded-full overflow-hidden ${bg} ${className}`}>
      <div
        className={`h-full ${fg} rounded-full transition-all`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
