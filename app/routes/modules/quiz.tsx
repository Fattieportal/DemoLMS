import { ArrowRight, Check, Trophy, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ProgressBar } from "~/components/ProgressBar";
import { getLesson, getModule } from "~/data/data";
import useMainStore from "~/stores/main.store";
import type { Route } from "./+types";



export function meta({}: Route.MetaArgs) {
  return [{ title: "LMS - Quiz" }, { name: "description", content: "LMS App." }];
}

const QuizPage = () => {
  const { moduleId, lessonId, quizId } = useParams<{
    moduleId: string;
    lessonId: string;
    quizId: string;
  }>();

  const module = getModule(moduleId!);
  if (!module) return <p>Module not found</p>;
  const lessonData = getLesson(moduleId!, lessonId!);
  if (!lessonData) return <p>Lesson not found</p>;
  const lesson = lessonData.lesson;
  if (!lesson) return <p>Lesson not found</p>;

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const total = lesson.quiz.length;
  const q = lesson.quiz[step];
  const progress = Math.round(((step + (submitted ? 1 : 0)) / total) * 100);

  const submit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (step + 1 >= total) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
    setSelected(null);
    setSubmitted(false);
  };

  const setShowBack = useMainStore((x) => x.setShowBack);
  useEffect(() => {
    setShowBack(true);
    return () => setShowBack(false);
  });

  useEffect(() => {
    if (done) {
      setShowBack(false);
    } else {
      setShowBack(true);
    }
  }, [done]);

  if (done) {
    const percent = Math.round((score / total) * 100);
    return (
      <div className="px-5 pt-8 flex flex-col items-center text-center space-y-5">
        <div className="h-24 w-24 rounded-full gradient-warm flex items-center justify-center shadow-pop">
          <Trophy className="h-10 w-10 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">Nice work!</h1>
          <p className="text-muted-foreground mt-1">You scored</p>
          <p className="font-display text-5xl font-bold mt-2 text-secondary">
            {score}/{total}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {percent}% correct
          </p>
        </div>
        <div className="w-full pt-4 space-y-2.5">
          <Link
            to={`/modules/${module.id}`}
            replace
            className="block w-full rounded-2xl bg-primary text-primary-foreground py-3.5 font-semibold"
          >
            Continue module
          </Link>
          <Link
            to={`/modules/${module.id}/lessons/${lesson.id}`}
            className="block w-full rounded-2xl bg-card border border-border py-3.5 font-semibold text-center"
          >
            Review lesson
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-4 space-y-6">
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
          <span>
            Question {step + 1} of {total}
          </span>
          <span className="text-primary">{progress}%</span>
        </div>
        <ProgressBar value={progress} tone="secondary" />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-wider text-secondary font-semibold">
          {lesson.title}
        </p>
        <h1 className="font-display text-2xl font-bold tracking-tight mt-2 leading-snug">
          {q.question}
        </h1>
      </div>

      <div className="space-y-2.5">
        {q.options.map((opt, i) => {
          const isSel = selected === i;
          const isCorrect = i === q.correctIndex;
          let cls = "bg-card border-border";
          if (submitted) {
            if (isCorrect) cls = "bg-success/15 border-success text-foreground";
            else if (isSel)
              cls = "bg-destructive/10 border-destructive text-foreground";
            else cls = "bg-card border-border opacity-70";
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
              <span className="text-sm font-medium">{opt}</span>
              {submitted && isCorrect && (
                <Check className="h-5 w-5 text-success shrink-0" />
              )}
              {submitted && !isCorrect && isSel && (
                <X className="h-5 w-5 text-destructive shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-2">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={selected === null}
            className="w-full rounded-2xl bg-primary text-primary-foreground py-3.5 font-semibold disabled:opacity-40"
          >
            Check answer
          </button>
        ) : (
          <button
            onClick={next}
            className="w-full rounded-2xl bg-secondary text-secondary-foreground py-3.5 font-semibold inline-flex items-center justify-center gap-2"
          >
            {step + 1 >= total ? "See results" : "Next question"}{" "}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
