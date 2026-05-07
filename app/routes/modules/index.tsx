import { useLoaderData } from "react-router";
import { ModuleCard } from "~/components/ModuleCard";
import { ProgressBar } from "~/components/ProgressBar";
import { useAuthStore } from "~/stores/auth.store";
import { useCourseStore } from "~/stores/course.store";
import { courseService } from "~/services/course.service";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LMS - Modules" },
    { name: "description", content: "LMS App." },
  ];
}

export async function clientLoader() {
  const authUser = useAuthStore.getState().user;

  if (!authUser?.user?.ID) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const userId = Number(authUser.user.ID);

  const [courses, progress] = await Promise.all([
    courseService.getCourses({ per_page: 100 }),
    courseService.getUserCourseProgress(userId),
  ]);

  useCourseStore.setState({ courses, progress });

  return null;
}

export default function ModulesPage() {
  useLoaderData<typeof clientLoader>();

  const courses = useCourseStore((s) => s.courses);
  const overallProgress = useCourseStore((s) => s.overallProgress);
  const progress = overallProgress();

  return (
    <div className="px-5 pt-4 space-y-6">
      <section>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Modules
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your full learning path
        </p>
      </section>

      <section className="rounded-3xl p-5 bg-card border border-border/60 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Your journey
            </p>
            <p className="font-display text-3xl font-bold mt-1">
              {progress.percent}%
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-secondary-soft text-secondary text-xs font-semibold">
            {progress.done}/{progress.total} lessons
          </span>
        </div>
        <ProgressBar
          value={progress.percent}
          tone="secondary"
          className="mt-4"
        />
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold mb-3">All modules</h2>
        <div className="flex flex-col space-y-3">
          {courses.map((course) => (
            <ModuleCard key={course.id} module={course} />
          ))}
        </div>
      </section>
    </div>
  );
}