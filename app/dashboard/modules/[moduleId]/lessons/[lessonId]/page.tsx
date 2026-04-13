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

  return (
    <LessonView
      module={mod}
      lesson={lesson}
      lessonIndex={lessonIndex}
    />
  );
}