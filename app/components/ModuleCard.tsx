import { Lock } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { Link } from "react-router";
import type { Course } from "~/models/course.model";

export function ModuleCard({
  module,
  compact = false,
}: {
  module: Course;
  compact?: boolean;
}) {
  const image = module.thumbnail;
  const locked = false;
  const total = module.total_steps;
  const percent = module.progress_percent;
  const done = total > 0 ? Math.round((percent / 100) * total) : 0;

  const content = (
    <div
      className={`relative bg-card rounded-3xl overflow-hidden shadow-soft border border-border/60 ${compact ? "" : "h-full"}`}
    >
      {/* Image — more square */}
      <div className="relative aspect-4/3 bg-surface overflow-hidden">
        <img
          src={image ?? "/placeholder.png"}
          alt={module.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {locked && (
          <div className="absolute inset-0 bg-primary/65 backdrop-blur-[2px] flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-background/95 flex items-center justify-center shadow-pop">
              <Lock className="h-5 w-5 text-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Text — smaller padding, pushed slightly lower */}
      <div className="px-4 pt-3 pb-3">
        <h3 className="font-display text-base font-semibold leading-tight">
          {module.title}
        </h3>
        {done > 0 && !locked && (
          <div className="mt-2.5">
            <ProgressBar value={percent} />
            <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
              <span>{done} of {total} lessons</span>
              <span className="font-semibold text-primary">{percent}%</span>
            </div>
          </div>
        )}
        {done === 0 && !locked && (
          <p className="mt-2 text-xs text-muted-foreground">
            {total > 0 ? `${total} lessons` : "No lessons yet"}
          </p>
        )}
        {locked && (
          <p className="mt-2 text-xs text-muted-foreground">Pro members only</p>
        )}
      </div>
    </div>
  );

  if (locked) {
    return <Link to="/paywall">{content}</Link>;
  }

  return <Link to={`/modules/${module.id}`}>{content}</Link>;
}