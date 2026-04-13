import Link from "next/link";
import { modules } from "@/lib/mockData";
import ModuleCard from "@/components/ModuleCard";
import { FireIcon, BoltIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const totalLessons = modules.reduce((a, m) => a + m.lessonsCount, 0);
const completedLessons = modules.reduce((a, m) => a + m.completedLessons, 0);
const overallProgress = Math.round((completedLessons / totalLessons) * 100);

const streakDays = [
  { day: "Ma", active: true },
  { day: "Di", active: true },
  { day: "Wo", active: true },
  { day: "Do", active: true },
  { day: "Vr", active: false },
  { day: "Za", active: false },
  { day: "Zo", active: false },
];

const inProgressModule = modules.find(
  (m) => m.completedLessons > 0 && m.completedLessons < m.lessonsCount
);

export default function DashboardPage() {
  return (
    <div className="page-enter px-4 pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-0.5">
            Goedemorgen
          </p>
          <h1 className="text-2xl font-bold text-gray-800">Thomas de Vries</h1>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-200">
          T
        </div>
      </div>

      {/* Overall progress card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-5 mb-5 shadow-lg shadow-blue-200 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/10 rounded-full" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
            Jouw voortgang
          </p>
          <p className="text-white text-3xl font-bold mb-3">{overallProgress}%</p>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-white/70 text-xs">
              {completedLessons} van {totalLessons} lessen
            </span>
            <span className="text-white/70 text-xs">
              {modules.filter((m) => m.completedLessons === m.lessonsCount).length}/{modules.length} modules
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Streak */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <FireIcon className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Leerstreak
            </span>
          </div>
          <div className="flex gap-1 justify-between">
            {streakDays.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                    d.active ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-300"
                  }`}
                >
                  {d.active ? "🔥" : ""}
                </div>
                <span className="text-[9px] text-gray-400 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Score */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <BoltIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Punten
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">1.240</p>
          <p className="text-xs text-gray-400 mt-0.5">+80 deze week</p>
          <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">760 punten tot volgend niveau</p>
        </div>
      </div>

      {/* Doorgaan */}
      {inProgressModule && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800 text-base">Ga verder</h2>
          </div>
          <Link href={`/dashboard/modules/${inProgressModule.id}`}>
            <div
              className={`bg-gradient-to-br ${inProgressModule.color} rounded-2xl p-4 shadow-md active:scale-[0.98] transition-all duration-150 cursor-pointer relative overflow-hidden`}
            >
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
              <div className="relative">
                <span className="text-2xl">{inProgressModule.icon}</span>
                <h3 className="text-white font-bold text-base mt-2 mb-0.5">
                  {inProgressModule.title}
                </h3>
                <p className="text-white/70 text-xs mb-3">
                  {inProgressModule.completedLessons} van{" "}
                  {inProgressModule.lessonsCount} lessen afgerond
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden mr-3">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{
                        width: `${Math.round(
                          (inProgressModule.completedLessons / inProgressModule.lessonsCount) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1">
                    <span className="text-white text-xs font-bold">Verder</span>
                    <ArrowRightIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Alle modules */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-800 text-base">Modules</h2>
          <Link
            href="/dashboard/modules"
            className="text-xs text-blue-500 font-semibold hover:text-blue-700"
          >
            Alle modules
          </Link>
        </div>
        <div className="space-y-3">
          {modules.slice(0, 3).map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      </div>
    </div>
  );
}