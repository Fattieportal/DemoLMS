import { Lock } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { Link } from "react-router";
import { useCourseStore } from "~/stores/course.store";
import type { Course } from "~/models/course.model";
import { getCourseImage } from "~/models/course.model";

export function ModuleCard({
  module,
  compact = false,
}: {
  module: Course;
  compact?: boolean;
}) {
  const courseProgress = useCourseStore((s) => s.courseProgress);
  const p = courseProgress(module.id);

  const done = p?.steps_completed ?? 0;
  const total = p?.steps_total ?? 0;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const locked = module.price_type === "closed" || module.price_type === "paynow";
  const image = getCourseImage(module);

  const content = (
    <div
      className={`relative bg-card rounded-3xl overflow-hidden shadow-soft border border-border/60 ${compact ? "" : "h-full"}`}
    >
      <div className="relative aspect-16/10 bg-surface overflow-hidden">
        <img
          src={image ?? "/placeholder.png"}
          alt={module.title.rendered}
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
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold leading-tight">
          {module.title.rendered}
        </h3>
        {done > 0 && !locked && (
          <div className="mt-3">
            <ProgressBar value={percent} />
            <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
              <span>
                {done} of {total} lessons
              </span>
              <span className="font-semibold text-primary">{percent}%</span>
            </div>
          </div>
        )}
        {done === 0 && !locked && (
          <p className="mt-3 text-xs text-muted-foreground">
            {total > 0 ? `${total} lessons` : "No lessons yet"}
          </p>
        )}
        {locked && (
          <p className="mt-3 text-xs text-muted-foreground">Pro members only</p>
        )}
      </div>
    </div>
  );

  if (locked) {
    return <Link to="/paywall">{content}</Link>;
  }

  return <Link to={`/modules/${module.id}`}>{content}</Link>;
}