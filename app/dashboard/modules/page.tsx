import Link from "next/link";
import { modules } from "@/lib/mockData";
import ModuleCard from "@/components/ModuleCard";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

const totalLessons = modules.reduce((a, m) => a + m.lessonsCount, 0);
const completedLessons = modules.reduce((a, m) => a + m.completedLessons, 0);

export default function ModulesPage() {
  return (
    <div className="page-enter px-4 pt-12 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200">
          <AcademicCapIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Jouw leerpad</h1>
          <p className="text-xs text-gray-400">
            {completedLessons} van {totalLessons} lessen afgerond
          </p>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5 mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Totale voortgang
          </span>
          <span className="text-xs font-bold text-blue-600">
            {Math.round((completedLessons / totalLessons) * 100)}%
          </span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700"
            style={{ width: `${Math.round((completedLessons / totalLessons) * 100)}%` }}
          />
        </div>
      </div>

      {/* Module list */}
      <div className="mb-3">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
          Alle modules
        </h2>
        <div className="space-y-3">
          {modules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      </div>
    </div>
  );
}