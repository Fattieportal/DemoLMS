import mindset from "~/assets/images/module-mindset.jpg";
import foundations from "~/assets/images/module-foundations.jpg";
import strategy from "~/assets/images/module-strategy.jpg";
import mastery from "~/assets/images/module-mastery.jpg";
import practice from "~/assets/images/module-practice.jpg";
import advanced from "~/assets/images/module-advanced.jpg";

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  content: string;
  quiz: QuizQuestion[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type Module = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  locked: boolean;
  lessons: Lesson[];
  category: string;
};

const sampleContent = `
<p>Welcome to this lesson. In this section we will explore the core ideas behind the topic and how they apply in real-world scenarios.</p>
<h3>Key Concepts</h3>
<ul>
  <li>Understand the foundational principles</li>
  <li>Apply techniques through guided practice</li>
  <li>Test your knowledge with the lesson quiz</li>
</ul>
<p>Take your time, replay the video if needed, and remember — consistent practice beats intensity.</p>
`;

const makeLessons = (prefix: string, count: number, completedCount: number): Lesson[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-l${i + 1}`,
    title: [
      "Getting Started",
      "Core Principles",
      "Deep Dive: Methods",
      "Real-World Application",
      "Mastery Practice",
      "Final Review",
    ][i % 6],
    duration: `${8 + ((i * 3) % 14)} min`,
    completed: i < completedCount,
    videoUrl: i % 2 === 0 ? "https://www.w3schools.com/html/mov_bbb.mp4" : undefined,
    content: sampleContent,
    quiz: [
      {
        id: `${prefix}-q${i}-1`,
        question: "Which of the following best describes the main idea of this lesson?",
        options: [
          "A foundational principle that guides daily practice",
          "An advanced technique reserved for experts",
          "An optional consideration",
          "Not relevant to the subject",
        ],
        correctIndex: 0,
      },
      {
        id: `${prefix}-q${i}-2`,
        question: "What's the recommended next step after this lesson?",
        options: [
          "Skip ahead to the final exam",
          "Reflect and apply the technique",
          "Move on without practice",
          "Restart the module",
        ],
        correctIndex: 1,
      },
    ],
  }));

export const modules: Module[] = [
  {
    id: "foundations",
    title: "Foundations of Theory",
    subtitle: "Start here — the essentials",
    image: foundations,
    locked: false,
    category: "Beginner",
    lessons: makeLessons("foundations", 5, 2),
  },
  {
    id: "mindset",
    title: "Mindset & Focus",
    subtitle: "Build the mental model",
    image: mindset,
    locked: false,
    category: "Core",
    lessons: makeLessons("mindset", 4, 1),
  },
  {
    id: "strategy",
    title: "Strategy in Practice",
    subtitle: "Apply what you've learned",
    image: strategy,
    locked: false,
    category: "Intermediate",
    lessons: makeLessons("strategy", 6, 0),
  },
  {
    id: "practice",
    title: "Deliberate Practice",
    subtitle: "Sharpen with daily drills",
    image: practice,
    locked: true,
    category: "Pro",
    lessons: makeLessons("practice", 5, 0),
  },
  {
    id: "advanced",
    title: "Advanced Techniques",
    subtitle: "Go beyond the basics",
    image: advanced,
    locked: true,
    category: "Pro",
    lessons: makeLessons("advanced", 7, 0),
  },
  {
    id: "mastery",
    title: "Path to Mastery",
    subtitle: "Synthesize and lead",
    image: mastery,
    locked: true,
    category: "Pro",
    lessons: makeLessons("mastery", 6, 0),
  },
];

export const getModule = (id: string) => modules.find((m) => m.id === id);

export const getLesson = (moduleId: string, lessonId: string) => {
  const m = getModule(moduleId);
  return m ? { module: m, lesson: m.lessons.find((l) => l.id === lessonId) } : null;
};

export const overallProgress = () => {
  const total = modules.reduce((s, m) => s + m.lessons.length, 0);
  const done = modules.reduce((s, m) => s + m.lessons.filter((l) => l.completed).length, 0);
  return { total, done, percent: Math.round((done / total) * 100) };
};

export const moduleProgress = (m: Module) => {
  const done = m.lessons.filter((l) => l.completed).length;
  return { done, total: m.lessons.length, percent: Math.round((done / m.lessons.length) * 100) };
};

export const user = {
  name: "Alex Morgan",
  email: "alex@domain.com",
  initials: "AM",
  streak: 12,
  points: 2480,
  plan: "Free" as "Free" | "Pro" | "Mastery",
};

export const badges = [
  { id: "first", name: "First Step", icon: "🌱", earned: true, desc: "Complete your first lesson" },
  { id: "streak7", name: "7-Day Streak", icon: "🔥", earned: true, desc: "7 days in a row" },
  { id: "quiz", name: "Quiz Whiz", icon: "🎯", earned: true, desc: "Score 100% on a quiz" },
  { id: "module", name: "Module Master", icon: "🏆", earned: false, desc: "Complete a full module" },
  { id: "night", name: "Night Owl", icon: "🌙", earned: false, desc: "Study after 10pm" },
  { id: "scholar", name: "Scholar", icon: "📚", earned: false, desc: "Finish 10 lessons" },
];

export const continueLearning = () => {
  const m = modules.find((m) => m.lessons.some((l) => l.completed) && !m.lessons.every((l) => l.completed));
  if (!m) return null;
  const nextLesson = m.lessons.find((l) => !l.completed) ?? m.lessons[0];
  return { module: m, lesson: nextLesson };
};
