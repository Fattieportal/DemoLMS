import { useEffect, useState } from "react";
import { ArrowRight, Frown, Trophy } from "lucide-react";
import { Link, useParams, useLoaderData } from "react-router";
import { ProgressBar } from "~/components/ProgressBar";
import { useAuthStore } from "~/stores/auth.store";
import { useLessonStore } from "~/stores/lesson.store";
import { useQuizStore } from "~/stores/quiz.store";
import useMainStore from "~/stores/main.store";
import { APP_NAME } from "~/constant";
import type { QuizDetail } from "~/models/quiz.model";
import type { Route } from "./+types/quiz";

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
  const quizId = Number(params.quizId);

  if (access_token) {
    await useQuizStore.getState().fetchQuiz(access_token, quizId);
  }

  const quiz = useQuizStore.getState().quiz;
  return { title: quiz?.title ?? "Quiz", quiz };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - ${loaderData?.title ?? "Quiz"}` },
    { name: "description", content: "LMS App." },
  ];
}

export default function QuizPage() {
  const { moduleId, lessonId, quizId } = useParams();
  const { access_token } = useAuthStore();
  const {
    quiz: quizFromStore,
    result,
    isSubmitting,
    error,
    submitQuiz,
  } = useQuizStore();
  const { lesson, completeLesson } = useLessonStore();
  const setShowBack = useMainStore((x) => x.setShowBack);
  const loaderData = useLoaderData() as {
    title: string;
    quiz: QuizDetail | null;
  } | null;

  const quiz: QuizDetail | null = quizFromStore ?? loaderData?.quiz ?? null;

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const questions = quiz?.questions ?? [];
  const total = questions.length;
  const q = questions[step];
  const progress = total > 0 ? Math.round(((step + 1) / total) * 100) : 0;

  useEffect(() => {
    setShowBack(!done);
    return () => setShowBack(false);
  }, [done]);

  useEffect(() => {
    if (!result || !access_token) return;
    completeLesson(access_token, Number(lessonId));
  }, [result]);

  const handleCheck = () => {
    if (selected === null) return;
    setSubmitted(true);
  };

  const handleNext = async () => {
    if (selected === null || !q) return;

    const updatedAnswers = { ...answers, [q.id]: q.answers[selected].id };
    setAnswers(updatedAnswers);

    if (step + 1 >= total) {
      if (!access_token) return;
      await submitQuiz(access_token, Number(quizId), updatedAnswers);
      if (useQuizStore.getState().result) setDone(true);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
      setSubmitted(false);
    }
  };

  if (!quiz) {
    return (
      <div className="px-5 pt-4 space-y-4 animate-pulse">
        <div className="h-3 bg-muted rounded-full" />
        <div className="h-8 w-3/4 bg-muted rounded-xl" />
        <div className="space-y-2.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 bg-muted rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (done && result) {
    const percent = Math.round(result.score);
    const nextLessonId = lesson?.next?.id;

    return (
      <div className="px-5 pt-8 flex flex-col items-center text-center space-y-5">
        <div
          className={`h-24 w-24 rounded-full flex items-center justify-center shadow-pop ${
            result.passed ? "gradient-warm" : "bg-destructive/20"
          }`}
        >
          {result.passed ? (
            <Trophy className="h-10 w-10 text-primary-foreground" />
          ) : (
            <Frown className="h-10 w-10 text-destructive" />
          )}
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold">
            {result.passed ? "Nice work!" : "Not quite!"}
          </h1>
          <p className="text-muted-foreground mt-1">You scored</p>
          <p className="font-display text-5xl font-bold mt-2 text-secondary">
            {result.correct}/{result.total}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {percent}% correct
          </p>
        </div>

        <div className="w-full pt-4 space-y-2.5">
          {result.passed && nextLessonId ? (
            <Link
              to={`/modules/${moduleId}/lessons/${nextLessonId}`}
              replace
              className="block w-full rounded-2xl bg-primary text-primary-foreground py-3.5 font-semibold text-center"
            >
              Next lesson <ArrowRight className="inline h-4 w-4 ml-1" />
            </Link>
          ) : result.passed ? (
            <Link
              to={`/modules/${moduleId}`}
              replace
              className="block w-full rounded-2xl bg-primary text-primary-foreground py-3.5 font-semibold text-center"
            >
              Continue module
            </Link>
          ) : (
            <Link
              to={`/modules/${moduleId}/lessons/${lessonId}`}
              replace
              className="block w-full rounded-2xl bg-primary text-primary-foreground py-3.5 font-semibold text-center"
            >
              Retry lesson
            </Link>
          )}
          <Link
            to={`/modules/${moduleId}/lessons/${lessonId}`}
            className="block w-full rounded-2xl bg-card border border-border py-3.5 font-semibold text-center"
          >
            Review lesson
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-4 space-y-6 pb-8">
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
          <span>
            Question {step + 1} of {total}
          </span>
          <span className="text-primary">{progress}%</span>
        </div>
        <ProgressBar value={progress} tone="secondary" />
      </div>

      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div>
        <p className="text-[10px] uppercase tracking-wider text-secondary font-semibold">
          {lesson?.title ?? quiz.title}
        </p>
        <h1 className="font-display text-2xl font-bold tracking-tight mt-2 leading-snug">
          {q.title}
        </h1>
      </div>

      <div className="space-y-2.5">
        {q.answers.map((answer, i) => {
          const isSel = selected === i;
          let cls = "bg-card border-border";
          if (submitted) {
            cls = "bg-card border-border opacity-70";
          } else if (isSel) {
            cls = "bg-secondary-soft border-secondary";
          }
          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition flex items-center justify-between gap-3 ${cls}`}
            >
              <span className="text-sm font-medium">{answer.text}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-2">
        {!submitted ? (
          <button
            onClick={handleCheck}
            disabled={selected === null}
            className="w-full rounded-2xl bg-primary text-primary-foreground py-3.5 font-semibold disabled:opacity-40"
          >
            Check answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-secondary text-secondary-foreground py-3.5 font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-40"
          >
            {step + 1 >= total
              ? isSubmitting
                ? "Submitting…"
                : "See results"
              : "Next question"}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
