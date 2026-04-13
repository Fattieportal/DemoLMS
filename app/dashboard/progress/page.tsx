import { modules } from "@/lib/mockData";
import ProgressBar from "@/components/ProgressBar";
import { TrophyIcon, FireIcon, BoltIcon, AcademicCapIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const totalLessons = modules.reduce((a, m) => a + m.lessonsCount, 0);
const completedLessons = modules.reduce((a, m) => a + m.completedLessons, 0);
const overallProgress = Math.round((completedLessons / totalLessons) * 100);
const completedModules = modules.filter(
  (m) => m.completedLessons === m.lessonsCount
).length;

const achievements = [
  {
    icon: "🚀",
    title: "First Step",
    desc: "Completed your first lesson",
    earned: true,
  },
  {
    icon: "🔥",
    title: "On Fire",
    desc: "4-day learning streak",
    earned: true,
  },
  {
    icon: "🏆",
    title: "Module Master",
    desc: "Finished an entire module",
    earned: true,
  },
  {
    icon: "⚡",
    title: "Speed Learner",
    desc: "Complete 3 lessons in one day",
    earned: false,
  },
  {
    icon: "💎",
    title: "Quiz Expert",
    desc: "Score 100% on a quiz",
    earned: false,
  },
  {
    icon: "🎓",
    title: "Graduate",
    desc: "Complete all 5 modules",
    earned: false,
  },
];

export default function ProgressPage() {
  return (
    <div className="page-enter px-4 pt-12">
      <div className="mb-6">
        <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-0.5">
          Your journey
        </p>
        <h1 className="text-2xl font-bold text-gray-800">Progress</h1>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
          <div className="flex justify-center mb-1">
            <BoltIcon className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-xl font-bold text-gray-800">{completedLessons}</p>
          <p className="text-[10px] text-gray-400 font-medium">Lessons</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
          <div className="flex justify-center mb-1">
            <AcademicCapIcon className="w-5 h-5 text-violet-400" />
          </div>
          <p className="text-xl font-bold text-gray-800">{completedModules}</p>
          <p className="text-[10px] text-gray-400 font-medium">Modules</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
          <div className="flex justify-center mb-1">
            <FireIcon className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-xl font-bold text-gray-800">4</p>
          <p className="text-[10px] text-gray-400 font-medium">Day streak</p>
        </div>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-700">Course Completion</p>
          <span className="text-sm font-bold text-violet-600">{overallProgress}%</span>
        </div>
        <ProgressBar value={overallProgress} color="bg-violet-500" height="md" />
        <p className="text-xs text-gray-400 mt-2">
          {completedLessons} of {totalLessons} lessons completed
        </p>
      </div>

      {/* Module breakdown */}
      <div className="mb-5">
        <h2 className="text-sm font-bold text-gray-700 mb-3">Module Breakdown</h2>
        <div className="space-y-3">
          {modules.map((mod) => {
            const pct = Math.round(
              (mod.completedLessons / mod.lessonsCount) * 100
            );
            const done = pct === 100;
            return (
              <div
                key={mod.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-base flex-shrink-0`}
                  >
                    {mod.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800 truncate pr-2">
                        {mod.title}
                      </p>
                      {done && (
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {mod.completedLessons}/{mod.lessonsCount} lessons
                    </p>
                  </div>
                  <span className="text-xs font-bold text-gray-600 flex-shrink-0">
                    {pct}%
                  </span>
                </div>
                <ProgressBar
                  value={pct}
                  color={done ? "bg-emerald-500" : "bg-violet-500"}
                  height="sm"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrophyIcon className="w-4 h-4 text-yellow-400" />
          <h2 className="text-sm font-bold text-gray-700">Achievements</h2>
          <span className="text-xs text-gray-400 font-medium ml-auto">
            {achievements.filter((a) => a.earned).length}/{achievements.length} earned
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((a, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-3 shadow-sm border text-center transition-all ${
                a.earned ? "border-violet-100" : "border-gray-100 opacity-50"
              }`}
            >
              <div
                className={`text-2xl mb-1.5 ${
                  a.earned ? "" : "grayscale"
                }`}
              >
                {a.icon}
              </div>
              <p className="text-[10px] font-bold text-gray-700 leading-tight">
                {a.title}
              </p>
              <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
