import { modules } from "@/lib/mockData";
import ProgressBar from "@/components/ProgressBar";
import {
  FireIcon,
  BoltIcon,
  TrophyIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/outline";

const totalLessons = modules.reduce((a, m) => a + m.lessonsCount, 0);
const completedLessons = modules.reduce((a, m) => a + m.completedLessons, 0);
const completedModules = modules.filter(
  (m) => m.completedLessons === m.lessonsCount
).length;
const overallProgress = Math.round((completedLessons / totalLessons) * 100);

const stats = [
  {
    icon: BookOpenIcon,
    label: "Lessen",
    value: completedLessons,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: CheckCircleIcon,
    label: "Modules",
    value: completedModules,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: FireIcon,
    label: "Dagreeks",
    value: 4,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: BoltIcon,
    label: "Punten",
    value: "1.240",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
];

const achievements = [
  {
    icon: "🎯",
    title: "Eerste Stap",
    desc: "Eerste les afgerond",
    earned: true,
  },
  {
    icon: "🔥",
    title: "Dagelijkse Routine",
    desc: "4 dagen op rij geleerd",
    earned: true,
  },
  {
    icon: "⚡",
    title: "Snelle Leerling",
    desc: "5 lessen op een dag",
    earned: true,
  },
  {
    icon: "🏆",
    title: "Modulemeester",
    desc: "Eerste module voltooid",
    earned: true,
  },
  {
    icon: "📚",
    title: "Halverwege",
    desc: "Helft van alle lessen",
    earned: false,
  },
  {
    icon: "🎓",
    title: "Theorie Expert",
    desc: "Alle modules voltooid",
    earned: false,
  },
];

export default function ProgressPage() {
  return (
    <div className="page-enter px-4 pt-12 pb-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-0.5">
          Jouw statistieken
        </p>
        <h1 className="text-2xl font-bold text-gray-800">Voortgang</h1>
      </div>

      {/* Overall progress */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-5 mb-5 shadow-lg shadow-blue-200 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-end gap-3 mb-3">
            <p className="text-white text-5xl font-black">{overallProgress}%</p>
            <p className="text-white/60 text-sm mb-2">totale voortgang</p>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-2">
            {completedLessons} van {totalLessons} lessen afgerond
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3"
          >
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Per module */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Per module
        </h2>
        <div className="space-y-4">
          {modules.map((mod) => {
            const pct = Math.round(
              (mod.completedLessons / mod.lessonsCount) * 100
            );
            return (
              <div key={mod.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{mod.icon}</span>
                    <span className="text-sm font-semibold text-gray-700 truncate max-w-[160px]">
                      {mod.title}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-500">{pct}%</span>
                </div>
                <ProgressBar progress={pct} color="bg-blue-500" height="h-2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Prestaties */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Prestaties
        </h2>
        <div className="grid grid-cols-3 gap-2.5">
          {achievements.map((ach, i) => (
            <div
              key={i}
              className={`rounded-2xl p-3 text-center transition-all ${
                ach.earned
                  ? "bg-white shadow-sm border border-gray-100"
                  : "bg-gray-50 border border-gray-100 opacity-40"
              }`}
            >
              <span className={`text-2xl ${!ach.earned ? "grayscale" : ""}`}>
                {ach.icon}
              </span>
              <p
                className={`text-[11px] font-bold mt-1 ${
                  ach.earned ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {ach.title}
              </p>
              <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">
                {ach.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}