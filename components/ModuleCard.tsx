import Link from "next/link";
import { Module } from "@/lib/types";
import ProgressBar from "./ProgressBar";
import { BookOpenIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const progress = Math.round(
    (module.completedLessons / module.lessonsCount) * 100
  );
  const isCompleted = progress === 100;

  return (
    <Link href={`/dashboard/modules/${module.id}`}>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-all duration-150 hover:shadow-md cursor-pointer">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center text-xl shadow-sm flex-shrink-0`}
          >
            {module.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
                {module.title}
              </h3>
              {isCompleted ? (
                <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-1 mb-2.5">
              <BookOpenIcon className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">
                {module.completedLessons}/{module.lessonsCount} lessons
              </span>
            </div>

            <ProgressBar value={progress} />
          </div>
        </div>
      </div>
    </Link>
  );
}
