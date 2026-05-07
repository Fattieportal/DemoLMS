import {
  Bell,
  ChevronRight,
  Crown,
  HelpCircle,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import { Link, redirect, useNavigate } from "react-router";
import { APP_NAME, APP_VERSION } from "~/constant";
import { user } from "~/data/data";
import type { Route } from "../+types/root";
import { useAuthStore } from "~/stores/auth.store";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `LMS - Profile` },
    { name: "description", content: "LMS App." },
  ];
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const menu = [
    { icon: Settings, label: "Settings", desc: "App preferences" },
    { icon: Bell, label: "Notifications", desc: "Email & push" },
    { icon: HelpCircle, label: "Help & support", desc: "Get in touch" },
  ];
  const logout = useAuthStore((x) => x.logout);

  function doLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="px-5 pt-4 space-y-6">
      {/* Profile header */}
      <section className="rounded-3xl p-6 bg-card border border-border/60 shadow-soft text-center relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary-soft blur-2xl" />
        <div className="relative">
          <div className="h-20 w-20 mx-auto rounded-full gradient-warm text-primary-foreground flex items-center justify-center font-display text-2xl font-bold shadow-pop">
            {user.initials}
          </div>
          <h1 className="font-display text-2xl font-bold mt-4">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold">
            <Crown className="h-3.5 w-3.5" /> {user.plan} plan
          </div>
        </div>
      </section>

      {/* Plans */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-3">Your plan</h2>
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`rounded-2xl p-4 border-2 ${user.plan === "Free" ? "bg-secondary-soft border-secondary" : "bg-card border-border/60"}`}
          >
            <div className="flex items-center justify-between">
              <p className="font-display font-bold">Free</p>
              {user.plan === "Free" && (
                <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              3 starter modules
            </p>
          </div>
          <Link
            to="/paywall"
            className={`rounded-2xl p-4 border-2 gradient-warm text-primary-foreground border-transparent shadow-pop`}
          >
            <div className="flex items-center justify-between">
              <p className="font-display font-bold">Pro</p>
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="text-xs opacity-90 mt-1">Unlock everything</p>
          </Link>
        </div>
      </section>

      {/* Menu */}
      <section className="space-y-2">
        {menu.map((m) => (
          <button
            key={m.label}
            className="w-full flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/60 hover:border-secondary/40 transition"
          >
            <div className="h-10 w-10 rounded-full bg-secondary-soft text-secondary flex items-center justify-center">
              <m.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-sm">{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </section>

      {/* Sign out */}
      <button
        onClick={doLogout}
        className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-destructive/10 text-destructive font-semibold"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>

      <p className="text-center text-[11px] text-muted-foreground pt-2">
        {APP_NAME} v{APP_VERSION} · Made with care ❤️
      </p>
    </div>
  );
};

export default ProfilePage;
