import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("paywall", "routes/paywall.tsx"),
  layout("routes/layout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),

    ...prefix("modules", [
      index("routes/modules/index.tsx"),
      ...prefix(":moduleId", [
        index("routes/modules/module.tsx"),
        ...prefix("lessons/:lessonId", [
          index("routes/modules/lesson.tsx"),
          route("quiz/:quizId", "routes/modules/quiz.tsx"),
        ]),
      ]),
    ]),

    route("progress", "routes/progress.tsx"),

    route("profile", "routes/profile.tsx"),
  ]),
  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
