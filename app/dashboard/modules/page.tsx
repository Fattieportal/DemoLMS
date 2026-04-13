import { modules } from "@/lib/mockData";
import ModuleCard from "@/components/ModuleCard";

export default function ModulesPage() {
  const totalLessons = modules.reduce((a, m) => a + m.lessonsCount, 0);
  const completedLessons = modules.reduce((a, m) => a + m.completedLessons, 0);

  return (
    <div className="page-enter px-4 pt-12">
      <div className="mb-6">
        <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-0.5">
          Your learning path
        </p>
        <h1 className="text-2xl font-bold text-gray-800">All Courses</h1>
        <p className="text-gray-400 text-sm mt-1">
          {completedLessons} of {totalLessons} lessons completed
        </p>
      </div>

      <div className="space-y-3">
        {modules.map((mod, i) => (
          <div key={mod.id} className="relative">
            {/* Connecting line */}
            {i < modules.length - 1 && (
              <div className="absolute left-[22px] top-[52px] w-0.5 h-4 bg-gray-200 z-0" />
            )}
            <ModuleCard module={mod} />
          </div>
        ))}
      </div>
    </div>
  );
}
