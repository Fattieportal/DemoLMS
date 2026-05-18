import { useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router";
import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";
import { useAuthStore } from "~/stores/auth.store";
import { useCourseStore } from "~/stores/course.store";
import { useLessonStore } from "~/stores/lesson.store";
import useMainStore from "~/stores/main.store";
import { APP_NAME } from "~/constant";
import type { Route } from "./+types/lesson";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  if (!useAuthStore.persist.hasHydrated()) {
    await new Promise<void>((resolve) => {
      const unsub = useAuthStore.persist.onFinishHydration(() => {
        unsub();
        resolve();
      });
    });
  }

  const { access_token } = useAuthStore.getState();
  const lessonId = Number(params.lessonId);

  if (access_token) {
    await useLessonStore.getState().fetchLesson(access_token, lessonId);
    const lesson = useLessonStore.getState().lesson;
    const topicStep = lesson?.steps.find((s) => s.type === "topic");
    if (topicStep) {
      await useLessonStore.getState().fetchTopic(access_token, topicStep.id);
    }
  }

  const lesson = useLessonStore.getState().lesson;
  return { title: lesson?.title ?? "Lesson" };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - ${loaderData?.title ?? "Lesson"}` },
    { name: "description", content: "LMS App." },
  ];
}

declare global {
  interface Window {
    playerjs: any;
  }
}

function getIframeSrc(content: string): string | null {
  const match = content.match(
    /src=["']([^"']+player\.mediadelivery\.net[^"']+)["']/,
  );
  return match ? match[1] : null;
}

export default function LessonPage() {
  const { moduleId, lessonId } = useParams();
  const { access_token } = useAuthStore();
  const { courses } = useCourseStore();
  const { lesson, topic, topicCompleted, completeTopic } = useLessonStore();
  const setShowBack = useMainStore((x) => x.setShowBack);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const course = courses.find((c) => c.id === Number(moduleId));
  const topicStep = lesson?.steps.find((s) => s.type === "topic") ?? null;
  const quizStep = lesson?.steps.find((s) => s.type === "quiz") ?? null;
  const iframeSrc = topic?.content ? getIframeSrc(topic.content) : null;

  const stableSrc = useMemo(
    () =>
      iframeSrc
        ? `${iframeSrc}${iframeSrc.includes("?") ? "&" : "?"}t=${Date.now()}`
        : null,
    [iframeSrc],
  );

  useEffect(() => {
    setShowBack(true);
    return () => setShowBack(false);
  }, []);

  // Player.js attachment
  useEffect(() => {
    if (!stableSrc || topicCompleted) return;

    let player: any = null;

    const init = () => {
      if (!iframeRef.current) return;
      player = new window.playerjs.Player(iframeRef.current);
      player.on("ready", () => {
        player.on("ended", async () => {
          if (!access_token || !topicStep) return;
          await completeTopic(access_token, topicStep.id);
        });
      });
    };

    if (window.playerjs) {
      init();
      return () => {
        if (player) player.off("ended");
      };
    }

    const existing = document.querySelector('script[src*="playerjs"]');
    if (existing) {
      existing.addEventListener("load", init);
      return () => existing.removeEventListener("load", init);
    }

    const script = document.createElement("script");
    script.src = "//assets.mediadelivery.net/playerjs/playerjs-latest.min.js";
    script.async = true;
    script.onload = () => init();
    document.head.appendChild(script);

    return () => {
      if (player) player.off("ended");
    };
  }, [stableSrc, topicCompleted]);

  if (!lesson) {
    return (
      <div className="space-y-5 animate-pulse px-5 pt-4">
        <div className="aspect-video bg-muted rounded-2xl" />
        <div className="h-6 w-2/3 bg-muted rounded-xl" />
        <div className="h-20 bg-muted rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-8">
      {/* Video player */}
      {stableSrc  && (
        <div
          style={{ position: "relative", paddingTop: "56.25%" }}
          className="bg-black"
        >
          <iframe
            ref={iframeRef}
            src={stableSrc}
            loading="lazy"
            style={{
              border: "none",
              position: "absolute",
              top: 0,
              height: "100%",
              width: "100%",
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          />
        </div>
      )}

      <div className="px-5 space-y-5">
        {/* Breadcrumb + title */}
        <div>
          {course && (
            <Link
              to={`/modules/${moduleId}`}
              className="text-[10px] uppercase tracking-wider text-secondary font-semibold"
            >
              {course.title}
            </Link>
          )}
          <h1 className="font-display text-2xl font-bold tracking-tight mt-1.5">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle2
              className={`h-4 w-4 ${topicCompleted ? "text-success" : "text-muted-foreground"}`}
            />
            <span className="text-xs text-muted-foreground">
              {topicCompleted
                ? "Video completed"
                : "Watch the video to continue"}
            </span>
          </div>
        </div>

        {/* Topic card */}
        {topicStep && (
          <div className="rounded-2xl p-4 bg-card border border-border/60">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Topic
            </p>
            <p className="font-semibold text-sm">{topicStep.title}</p>
          </div>
        )}

        {/* Quiz — revealed after topic complete */}
        {quizStep && topicCompleted && (
          <Link
            to={`/modules/${moduleId}/lessons/${lessonId}/quiz/${quizStep.id}`}
            className="block w-full rounded-2xl gradient-cool text-secondary-foreground p-4 shadow-pop"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary-foreground/15 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display font-semibold">{quizStep.title}</p>
                  <p className="text-xs opacity-90">
                    {quizStep.completed ? "Completed" : "Take the quiz"}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        )}

        {/* No quiz — next lesson after topic complete */}
        {!quizStep && topicCompleted && lesson.next && (
          <Link
            to={`/modules/${moduleId}/lessons/${lesson.next.id}`}
            className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border/60 shadow-soft"
          >
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Next lesson
              </p>
              <p className="font-semibold text-sm mt-0.5">
                {lesson.next.title}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-secondary shrink-0" />
          </Link>
        )}
      </div>
    </div>
  );
}
