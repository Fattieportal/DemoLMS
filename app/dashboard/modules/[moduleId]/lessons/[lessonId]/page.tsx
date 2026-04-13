"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { modules } from "@/lib/mockData";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { ClockIcon, BookOpenIcon } from "@heroicons/react/24/outline";

export default function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = use(params);
  const mod = modules.find((m) => m.id === moduleId);
  if (!mod) notFound();

  const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId);
  if (lessonIndex === -1) notFound();

  const lesson = mod.lessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null;

  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(lesson.completed);

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
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-widest truncate">
            {mod.title}
          </p>
          <p className="text-sm font-semibold text-gray-800 truncate">
            {lesson.title}
          </p>
        </div>
        {completed && (
          <CheckCircleIcon className="w-6 h-6 text-emerald-500 flex-shrink-0" />
        )}
      </div>

      {/* Video placeholder */}
      <div
        className="relative bg-gray-900 mx-4 mt-4 rounded-3xl overflow-hidden cursor-pointer group shadow-xl shadow-gray-200"
        style={{ aspectRatio: "16/9" }}
        onClick={() => setPlaying((v) => !v)}
      >
        {/* Fake thumbnail gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/80 via-purple-900/60 to-indigo-900/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div
            className={`w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-200 ${
              playing ? "scale-95" : "group-hover:scale-110"
            }`}
          >
            {playing ? (
              <div className="flex gap-1.5">
                <div className="w-1.5 h-5 bg-violet-700 rounded-full" />
                <div className="w-1.5 h-5 bg-violet-700 rounded-full" />
              </div>
            ) : (
              <PlayIcon className="w-7 h-7 text-violet-700 ml-1" />
            )}
          </div>
          <p className="text-white/70 text-xs font-medium">
            {playing ? "Playing…" : "Click to play"}
          </p>
        </div>

        {/* Progress bar on video */}
        {playing && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div className="h-full w-1/3 bg-white rounded-full animate-pulse" />
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
          <ClockIcon className="w-3 h-3" />
          {lesson.duration}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 flex-1">
        {/* Lesson number badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold text-violet-500 bg-violet-50 px-2.5 py-1 rounded-full uppercase tracking-wide">
            Lesson {lessonIndex + 1} of {mod.lessons.length}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <BookOpenIcon className="w-3 h-3" />
            {mod.title}
          </span>
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-3">{lesson.title}</h1>
        <p className="text-gray-500 text-sm leading-relaxed">{lesson.description}</p>

        {/* Key points */}
        <div className="mt-5 bg-violet-50 rounded-2xl p-4">
          <p className="text-xs font-bold text-violet-700 uppercase tracking-wider mb-2">
            Key Takeaways
          </p>
          <ul className="space-y-2">
            {[
              "Core concepts explained step-by-step",
              "Real-world examples and use cases",
              "Actionable exercises to practice",
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-violet-800">
                <CheckCircleIcon className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Mark complete */}
        {!completed && (
          <button
            onClick={() => setCompleted(true)}
            className="mt-5 w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-md shadow-emerald-100 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Mark as Complete
          </button>
        )}
        {completed && (
          <div className="mt-5 w-full py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-xl flex items-center justify-center gap-2 text-sm">
            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
            Completed!
          </div>
        )}
      </div>

      {/* Prev / Next navigation */}
      <div className="px-4 pb-6 flex gap-3">
        {prevLesson && !prevLesson.locked ? (
          <Link
            href={`/dashboard/modules/${moduleId}/lessons/${prevLesson.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all duration-150 shadow-sm"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Previous
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextLesson && !nextLesson.locked ? (
          <Link
            href={`/dashboard/modules/${moduleId}/lessons/${nextLesson.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-sm rounded-xl hover:shadow-md hover:shadow-violet-200 active:scale-[0.98] transition-all duration-150 shadow-sm"
          >
            Next
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        ) : nextLesson && nextLesson.locked ? (
          <div className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-400 font-semibold text-sm rounded-xl cursor-not-allowed">
            🔒 Locked
          </div>
        ) : (
          <Link
            href={`/dashboard/modules/${moduleId}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm rounded-xl active:scale-[0.98] transition-all duration-150 shadow-sm"
          >
            Finish Module 🎉
          </Link>
        )}
      </div>
    </div>
  );
}
