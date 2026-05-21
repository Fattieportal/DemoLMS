import { useEffect, useMemo } from "react";
import { ModuleCard } from "~/components/ModuleCard";
import { ProgressBar } from "~/components/ProgressBar";
import { APP_NAME } from "~/constant";
import { useAuthStore } from "~/stores/auth.store";
import { useCourseStore } from "~/stores/course.store";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - Modules` },
    { name: "description", content: "LMS App." },
  ];
}

export default function ModulesPage() {
  const { access_token } = useAuthStore();
  const { courses, fetchCourses, isLoading } = useCourseStore();

  useEffect(() => {
    if (!access_token) return;
    fetchCourses(access_token, 1, 100);
  }, [access_token]);

  const progress = useMemo(() => {
    const done = courses.reduce((a, c) => a + c.completed_steps, 0);
    const total = courses.reduce((a, c) => a + c.total_steps, 0);
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, percent };
  }, [courses]);

  return (
    <div className="px-5 pt-4 space-y-6">
      <section>
        <h1 className="font-display text-3xl font-bold tracking-tight">Modules</h1>
        <p className="text-sm text-muted-foreground mt-1">Your full learning path</p>
      </section>

      <section className="rounded-3xl p-5 bg-card border border-border/60 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Your journey</p>
            <p className="font-display text-3xl font-bold mt-1">{progress.percent}%</p>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-secondary-soft text-secondary text-xs font-semibold">
            {progress.done}/{progress.total} lessons
          </span>
        </div>
        <ProgressBar value={progress.percent} tone="secondary" className="mt-4" />
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold mb-3">All modules</h2>
        {isLoading ? (
          <div className="flex flex-col space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 rounded-3xl bg-card border border-border/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {courses.map((course) => (
              <ModuleCard key={course.id} module={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}