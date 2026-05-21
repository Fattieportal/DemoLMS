import { BookOpen, Flame, GraduationCap, Sparkles } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router";
import { ProgressBar } from "~/components/ProgressBar";
import { APP_NAME } from "~/constant";
import { getCourseImage } from "~/models/course.model";
import { useAuthStore } from "~/stores/auth.store";
import { useCourseStore } from "~/stores/course.store";
import { useGamificationStore } from "~/stores/gamification.store";
import type { Route } from "./+types/progress";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - Progress` },
    { name: "description", content: "LMS App." },
  ];
}

const ProgressPage = () => {
  const { access_token } = useAuthStore();
  const { courses, fetchCourses } = useCourseStore();
  const { streak, points, achievements, fetchAll } = useGamificationStore();

  useEffect(() => {
    if (!access_token) return;
    fetchCourses(access_token, 1, 100);
    fetchAll(access_token);
  }, [access_token]);

  const overall = useMemo(() => {
    const done = courses.reduce((a, c) => a + c.completed_steps, 0);
    const total = courses.reduce((a, c) => a + c.total_steps, 0);
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, percent };
  }, [courses]);

  const completedModules = courses.filter(
    (c) => c.progress_percent === 100,
  ).length;

  const stats = [
    {
      label: "Lessons",
      value: overall.done,
      icon: BookOpen,
      tone: "bg-secondary-soft text-secondary",
    },
    {
      label: "Modules",
      value: completedModules,
      icon: GraduationCap,
      tone: "bg-primary-soft text-primary",
    },
    {
      label: "Streak",
      value: `${streak?.current_streak ?? 0}d`,
      icon: Flame,
      tone: "bg-accent-soft text-accent-foreground",
    },
    {
      label: "Points",
      value: (points?.total ?? 0).toLocaleString(),
      icon: Sparkles,
      tone: "bg-warning/20 text-warning-foreground",
    },
  ];

  const topBadges = useMemo(() => {
    return achievements.map((achievement) => {
      const levelOrder = ["gold", "silver", "bronze"];
      const highestUnlocked = levelOrder.find(
        (l) =>
          achievement.levels[l as keyof typeof achievement.levels]?.unlocked,
      );
      const displayLevel = highestUnlocked ?? "bronze";
      const data =
        achievement.levels[displayLevel as keyof typeof achievement.levels];
      return { achievement, level: displayLevel, data };
    });
  }, [achievements]);

  return (
    <div className="px-5 pt-4 space-y-6">
      <section>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Your Progress
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your learning journey
        </p>
      </section>

      <section className="rounded-3xl p-5 gradient-cool text-secondary-foreground shadow-pop relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-primary-foreground/10 blur-2xl" />
        <p className="text-xs uppercase tracking-wider opacity-80">
          Overall completion
        </p>
        <p className="font-display text-5xl font-bold mt-1">
          {overall.percent}%
        </p>
        <ProgressBar value={overall.percent} tone="light" className="mt-4" />
        <p className="text-xs mt-2 opacity-90">
          {overall.done} of {overall.total} lessons across all modules
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 bg-card border border-border/60"
          >
            <div
              className={`h-9 w-9 rounded-full ${s.tone} flex items-center justify-center`}
            >
              <s.icon className="h-4 w-4" />
            </div>
            <p className="font-display text-2xl font-bold mt-3">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold mb-3">Modules</h2>
        <div className="flex flex-col space-y-2.5">
          {courses.map((course) => (
            <Link key={course.id} to={`/modules/${course.id}`}>
              <div className="rounded-2xl p-4 bg-card border border-border/60 flex items-center gap-3">
                <img
                  src={getCourseImage(course) ?? "/placeholder.png"}
                  alt={course.title}
                  className="h-12 w-12 rounded-xl object-cover shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm truncate">
                      {course.title}
                    </p>
                    <p className="text-xs font-bold text-primary">
                      {Math.round(course.progress_percent)}%
                    </p>
                  </div>
                  <ProgressBar
                    value={Math.round(course.progress_percent)}
                    className="mt-2"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold mb-3">Badges</h2>
        <div className="grid grid-cols-3 gap-3">
          {topBadges.map(({ achievement, level, data }) => (
            <div
              key={achievement.id}
              className={`rounded-2xl p-3 text-center border ${
                data.unlocked
                  ? "bg-card border-accent/40 shadow-soft"
                  : "bg-muted/40 border-border opacity-60"
              }`}
            >
              {data.image_url ? (
                <img
                  src={data.image_url}
                  alt={data.label}
                  className="h-10 w-10 mx-auto object-contain"
                />
              ) : (
                <div className="h-10 w-10 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <p className="text-xs font-semibold mt-2 leading-tight">
                {achievement.name}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                {data.label}
              </p>
              {data.unlocked && (
                <span
                  className={`inline-block mt-1.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                    level === "gold"
                      ? "bg-yellow-100 text-yellow-700"
                      : level === "silver"
                        ? "bg-gray-100 text-gray-600"
                        : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {level}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProgressPage;