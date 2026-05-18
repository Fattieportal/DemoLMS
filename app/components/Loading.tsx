import React from "react";
import { APP_NAME } from "~/constant";

const Loading = () => {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 absolute inset-0 z-50"
    >
      {/* Ambient gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 45%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 h-112 w-md rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 50%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 text-center">
        {/* Orbiting loader */}
        <div className="relative h-28 w-28">
          <div
            className="absolute inset-0 animate-spin rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, color-mix(in oklab, var(--primary) 90%, transparent) 70%, var(--primary) 100%)",
              animationDuration: "1.6s",
              mask: "radial-gradient(circle, transparent 58%, black 60%)",
              WebkitMask: "radial-gradient(circle, transparent 58%, black 60%)",
            }}
          />
          <div className="absolute inset-3 rounded-full bg-surface-elevated shadow-[0_10px_40px_-10px_color-mix(in_oklab,var(--primary)_40%,transparent)]" />
          <div
            className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold text-foreground"
            aria-hidden
          >
            {APP_NAME}
          </div>
          <span
            aria-hidden
            className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
            style={{
              animation: "spin 1.6s linear infinite",
              transformOrigin: "50% 56px",
            }}
          />
        </div>

        <div className="space-y-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Loading...
          </h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Tuning your modules, syncing progress, and warming up the quizzes.
          </p>
        </div>

        {/* Indeterminate progress bar */}
        <div className="relative h-1.5 w-64 overflow-hidden rounded-full bg-surface">
          <div
            className="absolute inset-y-0 w-1/3 rounded-full bg-primary"
            style={{
              animation:
                "loading-slide 1.4s cubic-bezier(0.65, 0, 0.35, 1) infinite",
            }}
          />
        </div>

        {/* Pulsing dots */}
        <div className="flex items-center gap-2" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-foreground/60"
              style={{
                animation: "loading-pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </div>

        <span className="sr-only">Loading, please wait…</span>
      </div>

      <style>{`
        @keyframes loading-slide {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(310%); }
        }
        @keyframes loading-pulse {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </main>
  );
};

export default Loading;
