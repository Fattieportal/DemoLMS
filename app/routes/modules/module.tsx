import { useEffect } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import { ProgressBar } from "~/components/ProgressBar";
import { Check, Lock, Play } from "lucide-react";
import { useAuthStore } from "~/stores/auth.store";
import { useCourseStore } from "~/stores/course.store";
import { courseService } from "~/services/course.service";
import { getCourseImage } from "~/models/course.model";
import useMainStore from "~/stores/main.store";
import type { Route } from "./+types/module";

export function meta({ params }: Route.MetaArgs) {
  const courses = useCourseStore.getState().courses;
  const course = courses.find((c) => c.id === Number(params.moduleId));
  return [
    { title: `LMS - ${course?.title.rendered || "Module"}` },
    { name: "description", content: "LMS App." },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const authUser = useAuthStore.getState().user;

  if (!authUser?.user?.ID) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const courseId = Number(params.moduleId);
  const userId = Number(authUser.user.ID);

  const [course, lessons, courseProgress] = await Promise.all([
    courseService.getCourse(courseId),
    courseService.getLessons(courseId),
    courseService.getUserCourseProgressById(userId, courseId),
  ]);

  useCourseStore.setState((state) => ({
    courses: state.courses.some((c) => c.id === courseId)
      ? state.courses.map((c) => (c.id === courseId ? course : c))
      : [...state.courses, course],
    progress: state.progress.some((p) => p.course === courseId)
      ? state.progress.map((p) => (p.course === courseId ? courseProgress : p))
      : [...state.progress, courseProgress],
  }));

  return { lessons };
}

export default function ModulePage() {
  const { lessons } = useLoaderData<typeof clientLoader>();
  const { moduleId } = useParams();
  const courseId = Number(moduleId);

  const courses = useCourseStore((s) => s.courses);
  const courseProgress = useCourseStore((s) => s.courseProgress);
  const lessonStatuses = useCourseStore((s) => s.lessonStatuses);
  const setShowBack = useMainStore((s) => s.setShowBack);

  const course = courses.find((c) => c.id === courseId);
  const p = courseProgress(courseId);
  const statuses = lessonStatuses(courseId, lessons);

  const done = p?.steps_completed ?? 0;
  const total = p?.steps_total ?? 0;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  useEffect(() => {
    setShowBack(true);
    return () => setShowBack(false);
  });

  if (!course) return <p>Module not found</p>;

  return (
    <div className="space-y-5">
      <div className="relative aspect-16/11 overflow-hidden">
        <img
          src={getCourseImage(course) ?? "/placeholder.png"}
          alt={course.title.rendered}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="px-5 -mt-2 space-y-5">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight mt-3">
            {course.title.rendered}
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
              const { completed, locked } = statuses[i];

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
                      {lesson.title.rendered}
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