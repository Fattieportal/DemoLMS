import { notFound } from "next/navigation";
import { modules } from "@/lib/mockData";
import LessonView from "@/components/LessonView";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;

  const mod = modules.find((m) => m.id === moduleId);
  if (!mod) notFound();

  const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId);
  if (lessonIndex === -1) notFound();

  const lesson = mod.lessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null;

  return (
    <LessonView
      mod={mod}
      lesson={lesson}
      lessonIndex={lessonIndex}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    />
  );
}