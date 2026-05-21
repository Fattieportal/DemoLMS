import type { Route } from "./+types/dashboard";
import { ArrowRight, Flame, GraduationCap, Play, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useMemo } from "react";
import { ModuleCard } from "~/components/ModuleCard";
import { ProgressBar } from "~/components/ProgressBar";
import { getCourseImage } from "~/models/course.model";
import { APP_NAME } from "~/constant";
import { useAuthStore } from "~/stores/auth.store";
import { useCourseStore } from "~/stores/course.store";
import { useGamificationStore } from "~/stores/gamification.store";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - Dashboard` },
    { name: "description", content: "LMS App." },
  ];
}

export default function DashboardPage() {
  const { user, access_token } = useAuthStore();
  const { courses, fetchCourses } = useCourseStore();
  const { streak, points, fetchAll } = useGamificationStore();
  useEffect(() => {
    if (!access_token) return;
    fetchCourses(access_token, 1, 100);
    fetchAll(access_token);
  }, [access_token]);

  const firstName = user?.display_name?.split(" ")[0] ?? "there";

  const overallProgress = useMemo(() => {
    const done = courses.reduce((a, c) => a + c.completed_steps, 0);
    const total = courses.reduce((a, c) => a + c.total_steps, 0);
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, percent };
  }, [courses]);

  const continueLearning = useMemo(() => {
    const course = courses.find((c) => c.enrolled && c.progress_percent < 100);
    if (!course) return null;
    return { course };
  }, [courses]);

  const featuredCourses = useMemo(() => courses.slice(0, 3), [courses]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="px-5 pt-4 space-y-6">
      <section>
        <p className="text-sm text-muted-foreground">{greeting},</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {firstName} <span className="text-secondary">👋</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Ready for today's lesson?</p>
      </section>

      <section className="relative rounded-3xl p-5 gradient-warm text-primary-foreground shadow-pop overflow-hidden">
        <Link to="/progress">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/30 blur-2xl" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">Overall progress</p>
              <p className="font-display text-4xl font-bold mt-1">{overallProgress.percent}%</p>
            </div>
            <Sparkles className="h-6 w-6 opacity-80" />
          </div>
          <ProgressBar value={overallProgress.percent} tone="light" className="mt-4" />
          <div className="flex justify-between text-xs mt-2 opacity-90">
            <span>{overallProgress.done} of {overallProgress.total} lessons</span>
            <span>Keep going!</span>
          </div>
        </div>
        </Link>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl p-4 bg-accent-soft border border-accent/30">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center">
              <Flame className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Streak</span>
          </div>
          <p className="font-display text-2xl font-bold mt-3">
            {streak?.current_streak ?? 0}
            <span className="text-sm font-medium text-muted-foreground ml-1">days</span>
          </p>
        </div>
        <div className="rounded-3xl p-4 bg-[#3A7BB8] text-secondary-foreground">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-secondary-foreground/15 flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium opacity-90">Points</span>
          </div>
          <p className="font-display text-2xl font-bold mt-3">
            {(points?.total ?? 0).toLocaleString()}
          </p>
        </div>
      </section>

      {continueLearning && (
        <section>
          <h2 className="font-display text-lg font-semibold mb-3">Continue learning</h2>
          <Link
            to={`/modules/${continueLearning.course.id}`}
            className="block rounded-3xl bg-card border border-border/60 shadow-soft overflow-hidden"
          >
            <div className="flex">
              <div className="w-28 h-28 shrink-0 relative">
                <img
                  src={getCourseImage(continueLearning.course) ?? "/placeholder.png"}
                  alt={continueLearning.course.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                  <div className="h-9 w-9 rounded-full bg-background/95 flex items-center justify-center">
                    <Play className="h-4 w-4 text-primary fill-primary ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="flex-1 p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-secondary font-semibold">
                  {continueLearning.course.title}
                </p>
                <div className="mt-2.5">
                  <ProgressBar value={continueLearning.course.progress_percent} />
                  <p className="text-[10px] text-muted-foreground mt-1.5">
                    {continueLearning.course.completed_steps} of {continueLearning.course.total_steps} lessons
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section>
        <Link
          className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-success/10 text-success font-semibold" to="/modules">
        <GraduationCap className="h-4 w-4" /> Practice Your Mistakes
      </Link>
        </section>

      {/* <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold">Modules</h2>
          <Link to="/modules" className="text-xs font-semibold text-secondary inline-flex items-center gap-1">
            Show all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex flex-col space-y-3">
          {featuredCourses.map((course) => (
            <ModuleCard key={course.id} module={course} compact />
          ))}
        </div>
      </section> */}
    </div>
  );
}