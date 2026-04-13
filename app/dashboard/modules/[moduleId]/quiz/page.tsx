import { notFound } from "next/navigation";
import { quizzes } from "@/lib/mockData";
import QuizView from "@/components/QuizView";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const quiz = quizzes.find((q) => q.moduleId === moduleId);
  if (!quiz) notFound();

  return <QuizView quiz={quiz} moduleId={moduleId} />;
}