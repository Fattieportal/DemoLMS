import { Module, Quiz } from "./types";

export const modules: Module[] = [
  {
    id: "module-1",
    title: "Foundations of UX Design",
    description: "Learn the core principles of user experience design.",
    lessonsCount: 6,
    completedLessons: 6,
    color: "from-violet-500 to-purple-600",
    icon: "🎨",
    lessons: [
      {
        id: "m1-l1",
        title: "What is UX Design?",
        duration: "5 min",
        completed: true,
        locked: false,
        description:
          "An introduction to UX design — what it is, why it matters, and how it shapes the products we use every day.",
      },
      {
        id: "m1-l2",
        title: "Design Thinking Process",
        duration: "8 min",
        completed: true,
        locked: false,
        description:
          "Explore the five stages of design thinking: Empathize, Define, Ideate, Prototype, and Test.",
      },
      {
        id: "m1-l3",
        title: "User Research Methods",
        duration: "10 min",
        completed: true,
        locked: false,
        description:
          "Discover qualitative and quantitative research techniques to understand your users deeply.",
      },
      {
        id: "m1-l4",
        title: "Information Architecture",
        duration: "7 min",
        completed: true,
        locked: false,
        description:
          "Learn how to structure and organize content so users can navigate your product with ease.",
      },
      {
        id: "m1-l5",
        title: "Wireframing Basics",
        duration: "9 min",
        completed: true,
        locked: false,
        description:
          "From sketch to screen: how to create low-fidelity wireframes that communicate layout and flow.",
      },
      {
        id: "m1-l6",
        title: "Usability Testing",
        duration: "11 min",
        completed: true,
        locked: false,
        description:
          "Plan and run usability tests to validate your designs with real users before shipping.",
      },
    ],
  },
  {
    id: "module-2",
    title: "Visual Design Principles",
    description: "Master color, typography, and layout fundamentals.",
    lessonsCount: 5,
    completedLessons: 3,
    color: "from-pink-500 to-rose-500",
    icon: "✏️",
    lessons: [
      {
        id: "m2-l1",
        title: "Color Theory Essentials",
        duration: "6 min",
        completed: true,
        locked: false,
        description:
          "Understand hue, saturation, and value — and how to build color palettes that feel intentional.",
      },
      {
        id: "m2-l2",
        title: "Typography That Works",
        duration: "7 min",
        completed: true,
        locked: false,
        description:
          "Choosing typefaces, setting hierarchy, and using spacing to make text readable and beautiful.",
      },
      {
        id: "m2-l3",
        title: "Layout & Grid Systems",
        duration: "8 min",
        completed: true,
        locked: false,
        description:
          "How grids create visual harmony and guide the eye across any screen or print layout.",
      },
      {
        id: "m2-l4",
        title: "Contrast & Accessibility",
        duration: "6 min",
        completed: false,
        locked: false,
        description:
          "Design for everyone: WCAG guidelines, color contrast ratios, and accessible UI patterns.",
      },
      {
        id: "m2-l5",
        title: "Icons & Illustrations",
        duration: "9 min",
        completed: false,
        locked: false,
        description:
          "When and how to use icons and illustrations to enhance communication without adding noise.",
      },
    ],
  },
  {
    id: "module-3",
    title: "Prototyping & Figma",
    description: "Build interactive prototypes from scratch.",
    lessonsCount: 5,
    completedLessons: 1,
    color: "from-sky-500 to-cyan-500",
    icon: "🖥️",
    lessons: [
      {
        id: "m3-l1",
        title: "Figma Interface Tour",
        duration: "5 min",
        completed: true,
        locked: false,
        description:
          "Get comfortable with Figma's layout, panels, and essential keyboard shortcuts.",
      },
      {
        id: "m3-l2",
        title: "Components & Auto Layout",
        duration: "12 min",
        completed: false,
        locked: false,
        description:
          "Build reusable UI components and use Auto Layout to create responsive, flexible designs.",
      },
      {
        id: "m3-l3",
        title: "Interactive Prototyping",
        duration: "10 min",
        completed: false,
        locked: true,
        description:
          "Add interactions and transitions to your designs to simulate real app behavior.",
      },
      {
        id: "m3-l4",
        title: "Design Handoff",
        duration: "8 min",
        completed: false,
        locked: true,
        description:
          "Prepare your files for developers with proper naming, styles, and Inspect mode.",
      },
      {
        id: "m3-l5",
        title: "Responsive Design in Figma",
        duration: "11 min",
        completed: false,
        locked: true,
        description:
          "Design screens for multiple breakpoints using constraints and component variants.",
      },
    ],
  },
  {
    id: "module-4",
    title: "Frontend Fundamentals",
    description: "HTML, CSS, and JavaScript from the ground up.",
    lessonsCount: 6,
    completedLessons: 0,
    color: "from-amber-500 to-orange-500",
    icon: "💻",
    lessons: [
      {
        id: "m4-l1",
        title: "HTML Structure & Semantics",
        duration: "8 min",
        completed: false,
        locked: false,
        description:
          "Write clean, semantic HTML that is accessible and SEO-friendly.",
      },
      {
        id: "m4-l2",
        title: "CSS Box Model",
        duration: "7 min",
        completed: false,
        locked: true,
        description:
          "Master margins, padding, borders, and how the box model affects every element on the page.",
      },
      {
        id: "m4-l3",
        title: "Flexbox & Grid",
        duration: "10 min",
        completed: false,
        locked: true,
        description:
          "The two modern layout systems that power virtually every website built today.",
      },
      {
        id: "m4-l4",
        title: "JavaScript Basics",
        duration: "12 min",
        completed: false,
        locked: true,
        description:
          "Variables, functions, events, and DOM manipulation — the essentials to make pages interactive.",
      },
      {
        id: "m4-l5",
        title: "Responsive Web Design",
        duration: "9 min",
        completed: false,
        locked: true,
        description:
          "Media queries, fluid layouts, and mobile-first thinking to build for every screen size.",
      },
      {
        id: "m4-l6",
        title: "CSS Animations",
        duration: "8 min",
        completed: false,
        locked: true,
        description:
          "Add life to your interfaces with smooth CSS transitions and keyframe animations.",
      },
    ],
  },
  {
    id: "module-5",
    title: "Product Strategy & Launch",
    description: "Turn your ideas into products people love.",
    lessonsCount: 4,
    completedLessons: 0,
    color: "from-emerald-500 to-teal-500",
    icon: "🚀",
    lessons: [
      {
        id: "m5-l1",
        title: "Defining Your MVP",
        duration: "6 min",
        completed: false,
        locked: true,
        description:
          "How to scope a minimum viable product and decide what to build first.",
      },
      {
        id: "m5-l2",
        title: "Product Metrics",
        duration: "8 min",
        completed: false,
        locked: true,
        description:
          "The key metrics every product team should track — from activation to retention and revenue.",
      },
      {
        id: "m5-l3",
        title: "Launch Strategy",
        duration: "7 min",
        completed: false,
        locked: true,
        description:
          "Plan a product launch that creates momentum and drives early adoption.",
      },
      {
        id: "m5-l4",
        title: "Iteration & Growth",
        duration: "9 min",
        completed: false,
        locked: true,
        description:
          "Build feedback loops, run experiments, and continuously improve your product after launch.",
      },
    ],
  },
];

export const quizzes: Quiz[] = [
  {
    id: "quiz-1",
    moduleId: "module-1",
    title: "UX Design Fundamentals Quiz",
    questions: [
      {
        id: "q1",
        question: "What does the 'E' in the Design Thinking process stand for?",
        options: ["Evaluate", "Empathize", "Explore", "Execute"],
        correctIndex: 1,
        explanation:
          "The first stage of Design Thinking is Empathize — understanding users' needs and experiences.",
      },
      {
        id: "q2",
        question: "Which research method involves observing users in their natural environment?",
        options: [
          "A/B Testing",
          "Surveys",
          "Contextual Inquiry",
          "Card Sorting",
        ],
        correctIndex: 2,
        explanation:
          "Contextual Inquiry is a field research technique where you observe and interview users in their own environment.",
      },
      {
        id: "q3",
        question: "What is a wireframe primarily used for?",
        options: [
          "Final visual design",
          "Backend architecture",
          "Layout and structure planning",
          "User interviews",
        ],
        correctIndex: 2,
        explanation:
          "Wireframes are low-fidelity representations used to plan layout, structure, and content hierarchy.",
      },
      {
        id: "q4",
        question: "Information Architecture is concerned with:",
        options: [
          "Server infrastructure",
          "Organizing and structuring content",
          "Choosing color palettes",
          "Writing copy",
        ],
        correctIndex: 1,
        explanation:
          "Information Architecture (IA) focuses on how content is organized, structured, and labeled to help users navigate.",
      },
      {
        id: "q5",
        question: "Usability testing should happen:",
        options: [
          "Only after launch",
          "Only before development",
          "Throughout the design process",
          "Once per year",
        ],
        correctIndex: 2,
        explanation:
          "Usability testing is most effective when done iteratively throughout the design process, not just at one stage.",
      },
    ],
  },
  {
    id: "quiz-2",
    moduleId: "module-2",
    title: "Visual Design Quiz",
    questions: [
      {
        id: "q1",
        question: "What is the minimum contrast ratio recommended by WCAG AA for normal text?",
        options: ["2:1", "3:1", "4.5:1", "7:1"],
        correctIndex: 2,
        explanation:
          "WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text.",
      },
      {
        id: "q2",
        question: "Which color model is best suited for digital screens?",
        options: ["CMYK", "RGB", "Pantone", "LAB"],
        correctIndex: 1,
        explanation:
          "RGB (Red, Green, Blue) is the standard color model for digital displays.",
      },
      {
        id: "q3",
        question: "What does 'typographic hierarchy' help establish?",
        options: [
          "Font licensing",
          "Reading order and importance",
          "Page load speed",
          "Mobile responsiveness",
        ],
        correctIndex: 1,
        explanation:
          "Typographic hierarchy uses size, weight, and contrast to guide readers through content in order of importance.",
      },
    ],
  },
];
