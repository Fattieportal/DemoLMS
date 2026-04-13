import { notFound } from "next/navigation";
import Link from "next/link";
import { modules, quizzes } from "@/lib/mockData";
import LessonRow from "@/components/LessonRow";
import { ArrowLeftIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export function generateStaticParams() {
  return modules.map((m) => ({ moduleId: m.id }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = modules.find((m) => m.id === moduleId);
  if (!mod) notFound();

  const progress = Math.round((mod.completedLessons / mod.lessonsCount) * 100);
  const isCompleted = progress === 100;
  const quiz = quizzes.find((q) => q.moduleId === moduleId);

  return (
    <div className="page-enter">
      {/* Hero header */}
      <div
        className={`bg-gradient-to-br ${mod.color} px-4 pt-14 pb-8 relative overflow-hidden`}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/10 rounded-full" />

        {/* Back button */}
        <Link
          href="/dashboard"
          className="relative inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-xl mb-5 hover:bg-white/30 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </Link>

        <div className="relative">
          <span className="text-4xl">{mod.icon}</span>
          <h1 className="text-white text-xl font-bold mt-2 mb-1">{mod.title}</h1>
          <p className="text-white/70 text-sm mb-4">{mod.description}</p>

          {/* Progress */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80 text-xs font-semibold">
                Progress
              </span>
              <span className="text-white font-bold text-sm">
                {progress}%
              </span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-white/60 text-xs">
                {mod.completedLessons}/{mod.lessonsCount} lessons
              </span>
              {isCompleted && (
                <span className="flex items-center gap-1 text-white/90 text-xs font-bold">
                  <CheckCircleIcon className="w-3.5 h-3.5" /> Completed!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="px-4 pt-5">
        <h2 className="text-base font-bold text-gray-800 mb-3">Lessons</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {mod.lessons.map((lesson, index) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              moduleId={mod.id}
              index={index}
            />
          ))}
        </div>

        {/* Quiz CTA */}
        {quiz && (
          <Link href={`/dashboard/modules/${mod.id}/quiz`}>
            <div className="mt-4 mb-2 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-all duration-150 cursor-pointer hover:border-violet-200">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-violet-200">
                <ClipboardDocumentListIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm">{quiz.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {quiz.questions.length} questions • Test your knowledge
                </p>
              </div>
              <span className="text-xs font-bold text-violet-600 bg-violet-100 px-2.5 py-1 rounded-full">
                Start
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
