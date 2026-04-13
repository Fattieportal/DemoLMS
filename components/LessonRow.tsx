import Link from "next/link";
import { Lesson } from "@/lib/types";
import {
  CheckCircleIcon,
  LockClosedIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";

interface LessonRowProps {
  lesson: Lesson;
  moduleId: string;
  index: number;
}

export default function LessonRow({ lesson, moduleId, index }: LessonRowProps) {
  if (lesson.locked) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl opacity-50 cursor-not-allowed">
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
          <LockClosedIcon className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">
            {lesson.title}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <ClockIcon className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">{lesson.duration}</span>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          Locked
        </span>
      </div>
    );
  }

  return (
    <Link href={`/dashboard/modules/${moduleId}/lessons/${lesson.id}`}>
      <div className="flex items-center gap-3 p-3 rounded-xl active:bg-violet-50 transition-colors duration-150 group hover:bg-violet-50/50 cursor-pointer">
        {/* Step number / icon */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            lesson.completed
              ? "bg-emerald-50"
              : "bg-violet-50 group-hover:bg-violet-100"
          }`}
        >
          {lesson.completed ? (
            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
          ) : (
            <PlayCircleIcon className="w-5 h-5 text-violet-400" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium truncate ${
              lesson.completed ? "text-gray-500" : "text-gray-800"
            }`}
          >
            {index + 1}. {lesson.title}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <ClockIcon className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">{lesson.duration}</span>
          </div>
        </div>

        {/* Badge */}
        {lesson.completed ? (
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex-shrink-0">
            Done
          </span>
        ) : (
          <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full flex-shrink-0">
            Start
          </span>
        )}
      </div>
    </Link>
  );
}
