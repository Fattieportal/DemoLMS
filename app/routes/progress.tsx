import { BookOpen, Flame, GraduationCap, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { ProgressBar } from "~/components/ProgressBar";
import { badges, moduleProgress, modules, overallProgress, user } from "~/data/data";
import type { Route } from "../+types/root";


export function meta({  }: Route.MetaArgs) {
  return [
    { title: `LMS - Progress` },
    { name: "description", content: "LMS App." },
  ];
}


const ProgressPage = () => {
  const p = overallProgress();
  const completedModules = modules.filter((m) =>
    m.lessons.every((l) => l.completed),
  ).length;
  const stats = [
    {
      label: "Lessons",
      value: p.done,
      icon: BookOpen,
      tone: "bg-secondary-soft text-secondary",
    },
    {
      label: "Modules",
      value: completedModules,
      icon: GraduationCap,
      tone: "bg-primary-soft text-primary",
    },
    {
      label: "Streak",
      value: `${user.streak}d`,
      icon: Flame,
      tone: "bg-accent-soft text-accent-foreground",
    },
    {
      label: "Points",
      value: user.points,
      icon: Sparkles,
      tone: "bg-warning/20 text-warning-foreground",
    },
  ];

  return (
    <div className="px-5 pt-4 space-y-6">
      <section>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Your Progress
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your learning journey
        </p>
      </section>

      <section className="rounded-3xl p-5 gradient-cool text-secondary-foreground shadow-pop relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-primary-foreground/10 blur-2xl" />
        <p className="text-xs uppercase tracking-wider opacity-80">
          Overall completion
        </p>
        <p className="font-display text-5xl font-bold mt-1">{p.percent}%</p>
        <ProgressBar value={p.percent} tone="light" className="mt-4" />
        <p className="text-xs mt-2 opacity-90">
          {p.done} of {p.total} lessons across all modules
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 bg-card border border-border/60"
          >
            <div
              className={`h-9 w-9 rounded-full ${s.tone} flex items-center justify-center`}
            >
              <s.icon className="h-4 w-4" />
            </div>
            <p className="font-display text-2xl font-bold mt-3">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold mb-3">Modules</h2>
        <div className="flex flex-col space-y-2.5">
          {modules.map((m) => {
            const mp = moduleProgress(m);
            const inner = (
              <div className="rounded-2xl p-4 bg-card border border-border/60 flex items-center gap-3">
                <img
                  src={m.image}
                  alt={m.title}
                  className="h-12 w-12 rounded-xl object-cover shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm truncate">{m.title}</p>
                    <p className="text-xs font-bold text-primary">
                      {mp.percent}%
                    </p>
                  </div>
                  <ProgressBar value={mp.percent} className="mt-2" />
                </div>
              </div>
            );
            return m.locked ? (
              <Link key={m.id} to="/paywall">
                {inner}
              </Link>
            ) : (
              <Link key={m.id} to={`/modules/${m.id}`}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold mb-3">Badges</h2>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`rounded-2xl p-3 text-center border ${
                b.earned
                  ? "bg-card border-accent/40 shadow-soft"
                  : "bg-muted/40 border-border opacity-60"
              }`}
            >
              <div className="text-3xl">{b.icon}</div>
              <p className="text-xs font-semibold mt-2 leading-tight">
                {b.name}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProgressPage;
