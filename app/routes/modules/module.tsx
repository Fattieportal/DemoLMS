import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { ProgressBar } from "~/components/ProgressBar";
import { Check, Lock, Play } from "lucide-react";
import { useAuthStore } from "~/stores/auth.store";
import { useCourseStore } from "~/stores/course.store";
import useMainStore from "~/stores/main.store";
import { getCourseImage } from "~/models/course.model";
import { APP_NAME } from "~/constant";
import type { Route } from "./+types/module";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  if (!useAuthStore.persist.hasHydrated()) {
    await new Promise<void>((resolve) => {
      const unsub = useAuthStore.persist.onFinishHydration(() => {
        unsub();
        resolve();
      });
    });
  }
  const courseId = Number(params.moduleId);
  const { access_token } = useAuthStore.getState();

  if (access_token) {
    await useCourseStore.getState().fetchCourseDetail(access_token, courseId);
  }

  const course = useCourseStore.getState().courseDetails[courseId] ?? null;
  return { title: course?.title ?? "Module" };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - ${loaderData?.title ?? "Module"}` },
    { name: "description", content: "LMS App." },
  ];
}

export default function ModulePage() {
  const { moduleId } = useParams();
  const courseId = Number(moduleId);

  const { courseDetails } = useCourseStore();
  const setShowBack = useMainStore((x) => x.setShowBack);

  const course = courseDetails[courseId] ?? null;
  const lessons = course?.lessons ?? [];

  useEffect(() => {
    setShowBack(true);
    return () => setShowBack(false);
  }, []);

  const done = lessons.filter((l) => l.completed).length;
  const total = lessons.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  if (!course)
    return (
      <p className="px-5 pt-4 text-sm text-muted-foreground">
        Module not found.
      </p>
    );

  return (
    <div className="space-y-5">
      <div className="relative aspect-16/11 overflow-hidden">
        <img
          src={getCourseImage(course) ?? "/placeholder.png"}
          alt={course.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="px-5 -mt-2 space-y-5">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight mt-3">
            {course.title}
          </h1>
        </div>

        <div className="rounded-3xl p-4 bg-card border border-border/60">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Progress</p>
            <p className="text-sm font-bold text-primary">{percent}%</p>
          </div>
          <ProgressBar value={percent} />
          <p className="text-xs text-muted-foreground mt-2">
            {done} of {total} lessons completed
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold mb-3">Lessons</h2>
          <div className="flex flex-col space-y-2.5">
            {lessons.map((lesson, i) => {
              const completed = lesson.completed;
              const locked = !lesson.accessible;

              const inner = (
                <div
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border ${
                    completed
                      ? "bg-success/10 border-success/30"
                      : locked
                        ? "bg-muted/40 border-border/60 opacity-70"
                        : "bg-card border-border/60 hover:border-secondary/50"
                  } transition`}
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                      completed
                        ? "bg-success text-success-foreground"
                        : locked
                          ? "bg-muted text-muted-foreground"
                          : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {completed ? (
                      <Check className="h-4 w-4" />
                    ) : locked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4 ml-0.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Lesson {i + 1}
                    </p>
                    <p className="font-semibold text-sm leading-tight truncate">
                      {lesson.title}
                    </p>
                  </div>
                </div>
              );

              if (locked) return <div key={lesson.id}>{inner}</div>;
              return (
                <Link
                  key={lesson.id}
                  to={`/modules/${courseId}/lessons/${lesson.id}`}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
