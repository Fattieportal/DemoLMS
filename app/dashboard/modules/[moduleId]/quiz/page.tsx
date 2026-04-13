"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { quizzes } from "@/lib/mockData";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";

export default function QuizPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = use(params);
  const quiz = quizzes.find((q) => q.moduleId === moduleId);
  if (!quiz) notFound();

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(quiz.questions.length).fill(null)
  );

  const question = quiz.questions[currentQ];
  const isCorrect = selectedIndex === question.correctIndex;

  const handleSelect = (idx: number) => {
    if (confirmed) return;
    setSelectedIndex(idx);
  };

  const handleConfirm = () => {
    if (selectedIndex === null) return;
    setConfirmed(true);
    const newAnswers = [...answers];
    newAnswers[currentQ] = selectedIndex;
    setAnswers(newAnswers);
    if (selectedIndex === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelectedIndex(null);
      setConfirmed(false);
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelectedIndex(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
    setAnswers(Array(quiz.questions.length).fill(null));
  };

  const percentage = Math.round((score / quiz.questions.length) * 100);

  // ─── Finished screen ───────────────────────────────────────────────────────
  if (finished) {
    const isPerfect = score === quiz.questions.length;
    const isGood = percentage >= 60;

    return (
      <div className="page-enter min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3 shadow-sm">
          <Link
            href={`/dashboard/modules/${moduleId}`}
            className="p-2 -ml-1 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <p className="text-sm font-bold text-gray-800">{quiz.title}</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
          {/* Trophy / emoji */}
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-5 shadow-lg ${
              isPerfect
                ? "bg-gradient-to-br from-yellow-400 to-orange-400"
                : isGood
                ? "bg-gradient-to-br from-emerald-400 to-teal-500"
                : "bg-gradient-to-br from-gray-200 to-gray-300"
            }`}
          >
            {isPerfect ? "🏆" : isGood ? "🎉" : "😅"}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {isPerfect ? "Perfect Score!" : isGood ? "Great Job!" : "Keep Practicing!"}
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            {isPerfect
              ? "You nailed every question!"
              : isGood
              ? "You're on the right track."
              : "Review the material and try again."}
          </p>

          {/* Score ring */}
          <div className="relative w-36 h-36 mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="42"
                fill="none" stroke="#f3f4f6" strokeWidth="8"
              />
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke={isPerfect ? "#f59e0b" : isGood ? "#10b981" : "#e5e7eb"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
              <span className="text-xs text-gray-400 font-medium">
                {score}/{quiz.questions.length}
              </span>
            </div>
          </div>

          {/* Answer review */}
          <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 text-left">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Review
            </p>
            <div className="space-y-2">
              {quiz.questions.map((q, i) => {
                const userAnswer = answers[i];
                const correct = userAnswer === q.correctIndex;
                return (
                  <div key={q.id} className="flex items-start gap-2">
                    {correct ? (
                      <CheckCircleIcon className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircleIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-xs text-gray-600 leading-snug line-clamp-2">
                      {q.question}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={handleRetry}
            className="w-full py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-md shadow-violet-200 active:scale-[0.98] transition-all duration-150 mb-3"
          >
            Try Again
          </button>
          <Link
            href={`/dashboard/modules/${moduleId}`}
            className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl text-center block hover:bg-gray-50 active:scale-[0.98] transition-all duration-150"
          >
            Back to Module
          </Link>
        </div>
      </div>
    );
  }

  // ─── Question screen ────────────────────────────────────────────────────────
  return (
    <div className="page-enter min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3 shadow-sm">
        <Link
          href={`/dashboard/modules/${moduleId}`}
          className="p-2 -ml-1 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </Link>
        <div className="flex-1">
          <p className="text-xs text-gray-400 font-medium mb-1">
            Question {currentQ + 1} of {quiz.questions.length}
          </p>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-bold text-gray-700 flex items-center gap-1">
          <TrophyIcon className="w-4 h-4 text-yellow-400" />
          {score}
        </span>
      </div>

      <div className="flex-1 px-4 py-6 flex flex-col">
        {/* Question */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-5">
          <span className="inline-block text-[10px] font-bold text-violet-500 bg-violet-50 px-2.5 py-1 rounded-full uppercase tracking-wide mb-3">
            Multiple Choice
          </span>
          <h2 className="text-base font-bold text-gray-800 leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3 flex-1">
          {question.options.map((option, idx) => {
            let style =
              "border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:bg-violet-50/50";

            if (confirmed) {
              if (idx === question.correctIndex) {
                style = "border-emerald-400 bg-emerald-50 text-emerald-800";
              } else if (idx === selectedIndex) {
                style = "border-red-400 bg-red-50 text-red-800";
              } else {
                style = "border-gray-100 bg-gray-50 text-gray-400";
              }
            } else if (selectedIndex === idx) {
              style = "border-violet-500 bg-violet-50 text-violet-800";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={confirmed}
                className={`w-full px-4 py-3.5 rounded-2xl border-2 text-left text-sm font-medium transition-all duration-150 flex items-center gap-3 ${style} ${
                  !confirmed ? "active:scale-[0.98] cursor-pointer" : "cursor-default"
                }`}
              >
                {/* Option letter */}
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                    confirmed
                      ? idx === question.correctIndex
                        ? "bg-emerald-500 text-white"
                        : idx === selectedIndex
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-400"
                      : selectedIndex === idx
                      ? "bg-violet-500 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {["A", "B", "C", "D"][idx]}
                </span>
                <span className="flex-1">{option}</span>
                {confirmed && idx === question.correctIndex && (
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                )}
                {confirmed && idx === selectedIndex && idx !== question.correctIndex && (
                  <XCircleIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation (after confirming) */}
        {confirmed && (
          <div
            className={`mt-4 rounded-2xl p-4 border ${
              isCorrect
                ? "bg-emerald-50 border-emerald-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              {isCorrect ? (
                <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
              <p
                className={`text-sm font-bold ${
                  isCorrect ? "text-emerald-700" : "text-red-700"
                }`}
              >
                {isCorrect ? "Correct! 🎉" : "Not quite"}
              </p>
            </div>
            <p
              className={`text-xs leading-relaxed ${
                isCorrect ? "text-emerald-700" : "text-red-700"
              }`}
            >
              {question.explanation}
            </p>
          </div>
        )}

        {/* Bottom action */}
        <div className="mt-5">
          {!confirmed ? (
            <button
              onClick={handleConfirm}
              disabled={selectedIndex === null}
              className="w-full py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-md shadow-violet-200 active:scale-[0.98] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Confirm Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-md shadow-violet-200 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
            >
              {currentQ < quiz.questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              ) : (
                <>
                  See Results
                  <TrophyIcon className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
