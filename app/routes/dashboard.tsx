import type { Route } from "./+types/dashboard";
import { ArrowRight, Flame, Play, Sparkles } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { ModuleCard } from "~/components/ModuleCard";
import { ProgressBar } from "~/components/ProgressBar";
import { useUserStore } from "~/stores/user.store";
import { useCourseStore } from "~/stores/course.store";
import { useAuthStore } from "~/stores/auth.store";
import { userService } from "~/services/user.service";
import { courseService } from "~/services/course.service";
import { getCourseImage } from "~/models/course.model";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LMS - Dashboard" },
    { name: "description", content: "LMS App." },
  ];
}

export async function clientLoader() {
  const authUser = useAuthStore.getState().user;

  if (!authUser?.user?.ID) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const userId = Number(authUser.user.ID);

  const [wpUser, courses, progress] = await Promise.all([
    userService.getMe(),
    courseService.getCourses({ per_page: 100 }),
    courseService.getUserCourseProgress(userId),
  ]);

  useUserStore.setState({
    user: { ...wpUser, streak: 7, points: 1240 },
  });
  useCourseStore.setState({ courses, progress });

  return null;
}




export default function DashboardPage() {
  useLoaderData<typeof clientLoader>();

  const user = useUserStore((s) => s.user);
  const { overallProgress, continueLearning, featuredCourses } = useCourseStore();

  const progress = overallProgress();
  const cont = continueLearning();
  const featured = featuredCourses(3);

  if (!user) return null;

  return (
    <div className="px-5 pt-4 space-y-6">
      <section>
        <p className="text-sm text-muted-foreground">Good morning,</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {user.name.split(" ")[0]} <span className="text-secondary">👋</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ready for today's lesson?
        </p>
      </section>

      <section className="relative rounded-3xl p-5 gradient-warm text-primary-foreground shadow-pop overflow-hidden">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/30 blur-2xl" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">
                Overall progress
              </p>
              <p className="font-display text-4xl font-bold mt-1">
                {progress.percent}%
              </p>
            </div>
            <Sparkles className="h-6 w-6 opacity-80" />
          </div>
          <ProgressBar value={progress.percent} tone="light" className="mt-4" />
          <div className="flex justify-between text-xs mt-2 opacity-90">
            <span>
              {progress.done} of {progress.total} lessons
            </span>
            <span>Keep going!</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl p-4 bg-accent-soft border border-accent/30">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center">
              <Flame className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Streak
            </span>
          </div>
          <p className="font-display text-2xl font-bold mt-3">
            {user.streak}
            <span className="text-sm font-medium text-muted-foreground ml-1">
              days
            </span>
          </p>
        </div>
        <div className="rounded-3xl p-4 bg-secondary text-secondary-foreground">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-secondary-foreground/15 flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium opacity-90">Points</span>
          </div>
          <p className="font-display text-2xl font-bold mt-3">
            {user.points.toLocaleString()}
          </p>
        </div>
      </section>

      {cont && cont.lesson && (
        <section>
          <h2 className="font-display text-lg font-semibold mb-3">
            Continue learning
          </h2>
          <Link
            to={`/modules/${cont.course.id}/lessons/${cont.lesson.id}`}
            className="block rounded-3xl bg-card border border-border/60 shadow-soft overflow-hidden"
          >
            <div className="flex">
              <div className="w-28 h-28 shrink-0 relative">
                <img
                  src={getCourseImage(cont.course) ?? "/placeholder.png"}
                  alt={cont.course.title.rendered}
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
                  {cont.course.title.rendered}
                </p>
                <h3 className="font-display font-semibold leading-tight mt-0.5">
                  {cont.lesson.title.rendered || "Continue lesson"}
                </h3>
                <div className="mt-2.5">
                  <ProgressBar
                    value={
                      cont.progress.steps_total > 0
                        ? Math.round(
                            (cont.progress.steps_completed /
                              cont.progress.steps_total) *
                              100
                          )
                        : 0
                    }
                  />
                  <p className="text-[10px] text-muted-foreground mt-1.5">
                    Lesson
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold">Modules</h2>
          <Link
            to="/modules"
            className="text-xs font-semibold text-secondary inline-flex items-center gap-1"
          >
            Show all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex flex-col space-y-3">
          {featured.map((course) => (
            <ModuleCard key={course.id} module={course} compact />
          ))}
        </div>
      </section>
    </div>
  );
}