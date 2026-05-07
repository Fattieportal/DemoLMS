import { BarChart3, BookOpen, Home, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import useMainStore from "~/stores/main.store";

const tabs = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/modules", label: "Modules", icon: BookOpen },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/profile", label: "Profile", icon: User },
] as const;

const Tabs = () => {
  const location = useLocation();
  const path = location.pathname;
  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
    height: number;
    top: number;
    visible: boolean;
  }>({
    left: 0,
    width: 0,
    height: 0,
    top: 0,
    visible: false,
  });

  // const activeIdx = tabs.findIndex((t) => (t.href === "/" ? path === "/" : path.startsWith(t.href)));
  const activeIdx = tabs.findIndex((t) => path.startsWith(t.href));
  const targetIdx = hoveredIdx ?? (activeIdx >= 0 ? activeIdx : null);

  const hideTabs = useMainStore((x) => x.hideTabs);

  

  useEffect(() => {
    if (targetIdx == null) {
      setIndicator((s) => ({ ...s, visible: false }));
      return;
    }
    const el = tabRefs.current[targetIdx];
    const parent = navRef.current;
    if (!el || !parent) return;
    const elRect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    setIndicator({
      left: elRect.left - parentRect.left,
      top: elRect.top - parentRect.top,
      width: elRect.width,
      height: elRect.height,
      visible: true,
    });
  }, [targetIdx, path]);

  return (
    <>
      {!hideTabs && (
        <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-104 z-40">
          <div
            ref={navRef}
            onMouseLeave={() => setHoveredIdx(null)}
            className="relative rounded-3xl px-2 py-2 flex items-center justify-between border border-foreground/20 backdrop-blur-2xl backdrop-saturate-200 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--foreground) 80%, transparent), color-mix(in oklab, var(--foreground) 65%, transparent))",
              boxShadow:
                "0 16px 48px -12px color-mix(in oklab, var(--foreground) 60%, transparent), inset 0 1px 0 0 color-mix(in oklab, white 35%, transparent), inset 0 -1px 0 0 color-mix(in oklab, black 25%, transparent)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-3 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in oklab, white 75%, transparent), transparent)",
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute rounded-2xl"
              style={{
                left: indicator.left,
                top: indicator.top,
                width: indicator.width,
                height: indicator.height,
                opacity: indicator.visible ? 1 : 0,
                background:
                  "linear-gradient(135deg, color-mix(in oklab, white 30%, transparent), color-mix(in oklab, white 12%, transparent))",
                boxShadow:
                  "inset 0 1px 0 0 color-mix(in oklab, white 45%, transparent), inset 0 -1px 0 0 color-mix(in oklab, black 20%, transparent), 0 6px 16px -8px color-mix(in oklab, black 40%, transparent)",
                backdropFilter: "blur(8px)",
                transition:
                  "left 520ms cubic-bezier(0.32, 0.72, 0, 1), top 520ms cubic-bezier(0.32, 0.72, 0, 1), width 520ms cubic-bezier(0.32, 0.72, 0, 1), height 520ms cubic-bezier(0.32, 0.72, 0, 1), opacity 200ms ease-out",
              }}
            />

            {tabs.map((t, i) => {
              const active = i === activeIdx;
              const Icon = t.icon;
              return (
                <Link
                  key={t.href}
                  to={t.href}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onFocus={() => setHoveredIdx(i)}
                  className={`relative z-10 flex-1 flex flex-col items-center gap-0.5 py-2 rounded-2xl transition-opacity text-primary-foreground ${
                    active || hoveredIdx === i ? "opacity-100" : "opacity-85"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-colors ${active ? "text-accent" : ""}`}
                  />
                  <span className="text-[12px] font-semibold">{t.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};

export default Tabs;
