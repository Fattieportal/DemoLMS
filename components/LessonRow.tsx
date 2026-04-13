import Link from "next/link";
import { Lesson } from "@/lib/types";
import {
  CheckCircleIcon,
  LockClosedIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";

interface LessonRowProps {
  lesson: Lesson;
  moduleId: string;
  index: number;
}

export default function LessonRow({ lesson, moduleId, index }: LessonRowProps) {
  const href = `/dashboard/modules/${moduleId}/lessons/${lesson.id}`;

  const badge = lesson.completed ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
      <CheckCircleIcon className="w-3 h-3" />
      Afgerond
    </span>
  ) : lesson.locked ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
      <LockClosedIcon className="w-3 h-3" />
      Vergrendeld
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
      <PlayCircleIcon className="w-3 h-3" />
      Begin
    </span>
  );

  if (lesson.locked) {
    return (
      <div className="flex items-center gap-3 px-4 py-3.5 opacity-50 cursor-not-allowed">
        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-gray-400">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-500 truncate">{lesson.title}</p>
          <p className="text-xs text-gray-400">{lesson.duration}</p>
        </div>
        {badge}
      </div>
    );
  }

  return (
    <Link href={href}>
      <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-blue-50/50 active:bg-blue-50 transition-colors cursor-pointer">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
            lesson.completed
              ? "bg-green-100"
              : "bg-blue-100"
          }`}
        >
          {lesson.completed ? (
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
          ) : (
            <span className="text-xs font-bold text-blue-600">{index + 1}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-700 truncate">{lesson.title}</p>
          <p className="text-xs text-gray-400">{lesson.duration}</p>
        </div>
        {badge}
      </div>
    </Link>
  );
}