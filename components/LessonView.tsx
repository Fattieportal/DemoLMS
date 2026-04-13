"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lesson, Module } from "@/lib/types";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";

interface LessonViewProps {
  lesson: Lesson;
  module: Module;
  lessonIndex: number;
}

export default function LessonView({ lesson, module: mod, lessonIndex }: LessonViewProps) {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(lesson.completed);

  const prevLesson = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null;
  const isLastLesson = lessonIndex === mod.lessons.length - 1;

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
            Les {lessonIndex + 1} van {mod.lessons.length} — {mod.title}
          </p>
          <h1 className="text-white text-xl font-bold">{lesson.title}</h1>
          <p className="text-white/70 text-sm mt-1">{lesson.duration}</p>
        </div>
      </div>

      <div className="px-4 mt-5 space-y-4">
        {/* Video placeholder */}
        <div
          onClick={() => setPlaying(!playing)}
          className={`rounded-2xl overflow-hidden aspect-video flex items-center justify-center cursor-pointer relative transition-all duration-300 ${
            playing
              ? "bg-gradient-to-br from-blue-700 to-indigo-800"
              : "bg-gradient-to-br from-blue-100 to-indigo-100"
          }`}
        >
          {playing ? (
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
              <p className="text-white/80 text-sm font-medium">Wordt afgespeeld...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                <PlayIcon className="w-7 h-7 text-white ml-1" />
              </div>
              <p className="text-blue-700 text-sm font-semibold">Klik om af te spelen</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-2">Over deze les</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{lesson.description}</p>
        </div>

        {/* Key takeaways */}
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <h3 className="font-bold text-blue-800 text-sm mb-3 flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4" />
            Belangrijkste leerpunten
          </h3>
          <ul className="space-y-2">
            {(lesson.keyPoints ?? [lesson.description.split(".")[0]]).map(
              (point: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold text-blue-700">
                    {i + 1}
                  </span>
                  <span className="text-sm text-blue-700">{point}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Mark complete */}
        <button
          onClick={() => setCompleted(true)}
          className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            completed
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 active:scale-[0.98]"
          }`}
        >
          {completed ? (
            <>
              <CheckCircleSolid className="w-5 h-5" />
              Afgerond!
            </>
          ) : (
            <>
              <CheckCircleIcon className="w-5 h-5" />
              Markeer als afgerond
            </>
          )}
        </button>

        {/* Navigation */}
        <div className="flex gap-3">
          {prevLesson && !prevLesson.locked && (
            <button
              onClick={() =>
                router.push(
                  `/dashboard/modules/${mod.id}/lessons/${prevLesson.id}`
                )
              }
              className="flex-1 py-3 rounded-2xl border border-gray-200 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Vorige
            </button>
          )}

          {nextLesson && !nextLesson.locked ? (
            <button
              onClick={() =>
                router.push(
                  `/dashboard/modules/${mod.id}/lessons/${nextLesson.id}`
                )
              }
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center gap-2 text-sm font-bold text-white shadow-md shadow-blue-200 active:scale-[0.98] transition-all"
            >
              Volgende
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          ) : isLastLesson ? (
            <button
              onClick={() =>
                router.push(`/dashboard/modules/${mod.id}`)
              }
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center gap-2 text-sm font-bold text-white shadow-md shadow-blue-200 active:scale-[0.98] transition-all"
            >
              Module afronden
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}