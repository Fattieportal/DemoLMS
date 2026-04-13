"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Quiz } from "@/lib/types";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import {
  CheckCircleIcon as CheckCircleSolid,
  XCircleIcon as XCircleSolid,
} from "@heroicons/react/24/solid";

interface QuizViewProps {
  quiz: Quiz;
  moduleId: string;
}

export default function QuizView({ quiz, moduleId }: QuizViewProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const question = quiz.questions[currentIndex];
  const isCorrect = selectedAnswer === question.correctIndex;
  const score = answers.filter(Boolean).length;
  const total = quiz.questions.length;
  const percentage = Math.round((score / total) * 100);

  const handleConfirm = () => {
    if (selectedAnswer === null) return;
    setConfirmed(true);
  };

  const handleNext = () => {
    setAnswers((prev) => [...prev, isCorrect]);
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setConfirmed(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const resultConfig =
      percentage === 100
        ? {
            emoji: "trophy",
            title: "Perfecte score!",
            msg: "Uitstekend! Je hebt alle vragen goed!",
            bg: "from-yellow-400 to-orange-400",
          }
        : percentage >= 60
        ? {
            emoji: "party",
            title: "Goed gedaan!",
            msg: `Je hebt ${score} van de ${total} vragen goed.`,
            bg: "from-blue-500 to-indigo-600",
          }
        : {
            emoji: "books",
            title: "Blijf oefenen!",
            msg: "Herhaal de stof en probeer het opnieuw.",
            bg: "from-orange-400 to-red-500",
          };

    return (
      <div className="page-enter px-4 pt-12 pb-8 flex flex-col items-center">
        <div
          className={`w-full bg-gradient-to-br ${resultConfig.bg} rounded-3xl p-8 text-center shadow-lg mb-6 relative overflow-hidden`}
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="relative">
            <TrophyIcon className="w-16 h-16 text-white/80 mx-auto mb-3" />
            <h2 className="text-white text-2xl font-black mb-1">{resultConfig.title}</h2>
            <p className="text-white/80 text-sm mb-4">{resultConfig.msg}</p>
            <div className="bg-white/20 rounded-2xl p-4">
              <p className="text-white text-4xl font-black">{percentage}%</p>
              <p className="text-white/70 text-sm">
                {score}/{total} correct
              </p>
            </div>
          </div>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedAnswer(null);
              setConfirmed(false);
              setAnswers([]);
              setFinished(false);
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-200 flex items-center justify-center gap-2"
          >
            <ArrowRightIcon className="w-4 h-4" />
            Opnieuw proberen
          </button>
          <button
            onClick={() => router.push(`/dashboard/modules/${moduleId}`)}
            className="w-full py-3.5 rounded-2xl border border-gray-200 text-gray-600 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Terug naar module
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-4 pt-12 pb-6 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="relative">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-white/80 text-sm font-medium hover:text-white mb-3 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Terug
          </button>
          <p className="text-white/60 text-xs mb-1">
            Vraag {currentIndex + 1} van {total}
          </p>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-4 mt-5 space-y-4">
        {/* Question */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
              Meerkeuze
            </span>
          </div>
          <p className="text-gray-800 font-semibold text-base leading-snug">
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {question.options.map((opt, i) => {
            let style = "bg-white border border-gray-200 text-gray-700";
            if (confirmed) {
              if (i === question.correctIndex) {
                style = "bg-green-50 border-2 border-green-400 text-green-800";
              } else if (i === selectedAnswer && i !== question.correctIndex) {
                style = "bg-red-50 border-2 border-red-400 text-red-800";
              }
            } else if (selectedAnswer === i) {
              style = "bg-blue-50 border-2 border-blue-400 text-blue-800";
            }

            return (
              <button
                key={i}
                disabled={confirmed}
                onClick={() => setSelectedAnswer(i)}
                className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-200 flex items-center gap-3 ${style} ${
                  !confirmed ? "active:scale-[0.98] hover:shadow-sm" : ""
                }`}
              >
                <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 border-current">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm font-medium">{opt}</span>
                {confirmed && i === question.correctIndex && (
                  <CheckCircleSolid className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
                )}
                {confirmed && i === selectedAnswer && i !== question.correctIndex && (
                  <XCircleSolid className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {confirmed && (
          <div
            className={`rounded-2xl p-4 border ${
              isCorrect
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {isCorrect ? (
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-500" />
              )}
              <p className={`font-bold text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                {isCorrect ? "Goed gedaan!" : "Helaas, niet juist."}
              </p>
            </div>
            <p className="text-xs text-gray-600">{question.explanation}</p>
          </div>
        )}

        {/* Buttons */}
        {!confirmed ? (
          <button
            disabled={selectedAnswer === null}
            onClick={handleConfirm}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
              selectedAnswer !== null
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 active:scale-[0.98]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Bevestig antwoord
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            {currentIndex + 1 < total ? (
              <>
                Volgende vraag
                <ArrowRightIcon className="w-4 h-4" />
              </>
            ) : (
              <>
                Bekijk resultaat
                <TrophyIcon className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}