import { useEffect } from "react";
import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";
import { Link, useLoaderData, useParams } from "react-router";
import { ProgressBar } from "~/components/ProgressBar";
import { useAuthStore } from "~/stores/auth.store";
import { useCourseStore } from "~/stores/course.store";
import { courseService } from "~/services/course.service";
import { getCourseImage } from "~/models/course.model";
import useMainStore from "~/stores/main.store";
import type { Route } from "./+types/lesson";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LMS - Lesson" },
    { name: "description", content: "LMS App." },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const authUser = useAuthStore.getState().user;

  if (!authUser?.user?.ID) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const courseId = Number(params.moduleId);
  const lessonId = Number(params.lessonId);
  const userId = Number(authUser.user.ID);

  const storeState = useCourseStore.getState();
  const hasCourse = storeState.courses.some((c) => c.id === courseId);
  const hasProgress = storeState.progress.some((p) => p.course === courseId);

  const [lesson, course, courseProgress] = await Promise.all([
    courseService.getLesson(lessonId),
    hasCourse
      ? Promise.resolve(storeState.courses.find((c) => c.id === courseId)!)
      : courseService.getCourse(courseId),
    hasProgress
      ? Promise.resolve(storeState.progress.find((p) => p.course === courseId)!)
      : courseService.getUserCourseProgressById(userId, courseId),
  ]);

  if (!hasCourse || !hasProgress) {
    useCourseStore.setState((state) => ({
      courses: hasCourse ? state.courses : [...state.courses, course],
      progress: hasProgress ? state.progress : [...state.progress, courseProgress],
    }));
  }

  return { lesson };
}

export default function LessonPage() {
  const { lesson } = useLoaderData<typeof clientLoader>();
  const { moduleId, lessonId } = useParams();

  const courseId = Number(moduleId);
  const lessonIdNum = Number(lessonId);

  const courses = useCourseStore((s) => s.courses);
  const lessonStatus = useCourseStore((s) => s.lessonStatus);
  const lessonQuizSteps = useCourseStore((s) => s.lessonQuizSteps);
  const nextLesson = useCourseStore((s) => s.nextLesson);
  const courseProgress = useCourseStore((s) => s.courseProgress);
  const setShowBack = useMainStore((s) => s.setShowBack);

  const course = courses.find((c) => c.id === courseId);
  const status = lessonStatus(courseId, lessonIdNum);
  const quizzes = lessonQuizSteps(courseId, lessonIdNum);
  const next = nextLesson(courseId, lessonIdNum);

  const progress = courseProgress(courseId);
  const steps = progress?._embedded?.steps?.[0] ?? [];
  const lessonSteps = steps.filter((s) => s.post_type === "sfwd-lessons");
  const lessonIndex = lessonSteps.findIndex((s) => s.step === lessonIdNum);
  const lessonNumber = lessonIndex + 1;
  const totalLessons = lessonSteps.length;
  const lessonProgress =
    totalLessons > 0 ? Math.round((lessonNumber / totalLessons) * 100) : 0;

  useEffect(() => {
    setShowBack(true);
    return () => setShowBack(false);
  });

  return (
    <div className="space-y-5">
      <div className="relative aspect-video bg-primary overflow-hidden">
        {course && (
          <img
            src={getCourseImage(course) ?? "/placeholder.png"}
            alt={lesson.title.rendered}
            className="h-full w-full object-cover opacity-90"
          />
        )}
      </div>

      <div className="px-5 space-y-5">
        <div>
          {course && (
            <Link
              to={`/modules/${courseId}`}
              className="text-[10px] uppercase tracking-wider text-secondary font-semibold"
            >
              {course.title.rendered}
            </Link>
          )}
          <h1
            className="font-display text-2xl font-bold tracking-tight mt-1.5"
            dangerouslySetInnerHTML={{ __html: lesson.title.rendered }}
          />
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2
                className={`h-3.5 w-3.5 ${status.completed ? "text-success" : ""}`}
              />
              {status.completed
                ? "Completed"
                : status.inProgress
                  ? "In progress"
                  : "Not started"}
            </span>
          </div>
        </div>

        {totalLessons > 0 && (
          <div className="rounded-2xl p-4 bg-card border border-border/60">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">
                Lesson {lessonNumber} of {totalLessons}
              </p>
              <p className="text-xs font-semibold text-primary">
                {lessonProgress}%
              </p>
            </div>
            <ProgressBar value={lessonProgress} />
          </div>
        )}

        <article
          className="prose prose-sm max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-foreground/85 prose-li:text-foreground/85 prose-iframe:w-full prose-iframe:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: lesson.content.rendered }}
        />

        {lesson.materials_enabled && lesson.materials.rendered && (
          <div className="rounded-2xl p-4 bg-card border border-border/60">
            <p className="text-sm font-semibold mb-2">Materials</p>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.materials.rendered }}
            />
          </div>
        )}

        {quizzes.length > 0 && (
          <div className="flex flex-col space-y-2.5">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.step}
                to={`/modules/${courseId}/lessons/${lessonIdNum}/quiz/${quiz.step}`}
                className="block w-full rounded-2xl gradient-cool text-secondary-foreground p-4 shadow-pop"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary-foreground/15 flex items-center justify-center">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display font-semibold">
                        {quiz.step_name}
                      </p>
                      <p className="text-xs opacity-90">
                        {quiz.step_status === "completed"
                          ? "Completed"
                          : "Take the quiz"}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {next && (
          <Link
            to={`/modules/${courseId}/lessons/${next.step}`}
            className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border/60 shadow-soft"
          >
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Next lesson
              </p>
              <p
                className="font-semibold text-sm mt-0.5"
                dangerouslySetInnerHTML={{ __html: next.step_name }}
              />
            </div>
            <ArrowRight className="h-5 w-5 text-secondary shrink-0" />
          </Link>
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}