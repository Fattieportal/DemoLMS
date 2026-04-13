import { modules } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Link from "next/link";
import LessonRow from "@/components/LessonRow";
import { ArrowLeftIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = modules.find((m) => m.id === moduleId);
  if (!mod) notFound();

  const progress = Math.round((mod.completedLessons / mod.lessonsCount) * 100);
  const allDone = mod.completedLessons === mod.lessonsCount;
  const quizAvailable = mod.completedLessons > 0;

  return (
    <div className="page-enter pb-8">
      {/* Hero banner */}
      <div className={`bg-gradient-to-br ${mod.color} px-4 pt-12 pb-6 relative overflow-hidden`}>
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="relative">
          <Link
            href="/dashboard/modules"
            className="inline-flex items-center gap-1.5 text-white/80 text-sm font-medium hover:text-white mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Terug
          </Link>
          <div className="text-4xl mb-2">{mod.icon}</div>
          <h1 className="text-white text-2xl font-bold mb-1">{mod.title}</h1>
          <p className="text-white/70 text-sm mb-4">{mod.description}</p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white/70 text-xs">Voortgang</span>
                <span className="text-white text-xs font-bold">{progress}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            {allDone && (
              <CheckBadgeIcon className="w-7 h-7 text-white/90 flex-shrink-0" />
            )}
          </div>
        </div>
      </div>

      {/* Lessen */}
      <div className="px-4 mt-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Lessen
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden mb-4">
          {mod.lessons.map((lesson, index) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              moduleId={mod.id}
              index={index}
            />
          ))}
        </div>

        {/* Quiz knop */}
        {quizAvailable && (
          <Link href={`/dashboard/modules/${mod.id}/quiz`}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 flex items-center justify-between shadow-md shadow-blue-200 active:scale-[0.98] transition-transform cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <PlayCircleIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">
                    {allDone ? "Herhaal oefenvragen" : "Oefenvragen starten"}
                  </p>
                  <p className="text-white/70 text-xs">Test jouw kennis</p>
                </div>
              </div>
              <ArrowLeftIcon className="w-5 h-5 text-white/70 rotate-180" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}