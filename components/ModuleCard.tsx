import Link from "next/link";
import { Module } from "@/lib/types";
import ProgressBar from "./ProgressBar";
import { LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module: mod }: ModuleCardProps) {
  const progress = Math.round((mod.completedLessons / mod.lessonsCount) * 100);
  const isLocked = mod.completedLessons === 0 && mod.lessons.every((l) => l.locked);
  const isDone = mod.completedLessons === mod.lessonsCount;

  return (
    <Link href={`/dashboard/modules/${mod.id}`}>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 active:bg-gray-50 hover:shadow-md hover:border-blue-100 transition-all duration-200 cursor-pointer">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center flex-shrink-0 shadow-sm`}
        >
          <span className="text-xl">{mod.icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h3 className="font-bold text-gray-800 text-sm truncate">{mod.title}</h3>
            {isDone && <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />}
            {isLocked && <LockClosedIcon className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />}
          </div>
          <p className="text-xs text-gray-400 mb-2">
            {mod.completedLessons} van {mod.lessonsCount} lessen
          </p>
          <ProgressBar progress={progress} color="bg-blue-500" height="h-1.5" />
        </div>

        {/* Progress % */}
        <div className="text-right flex-shrink-0">
          <span className={`text-sm font-bold ${isDone ? "text-green-500" : isLocked ? "text-gray-300" : "text-blue-600"}`}>
            {progress}%
          </span>
        </div>
      </div>
    </Link>
  );
}