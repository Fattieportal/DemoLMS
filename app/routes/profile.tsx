import {
  Bell,
  ChevronRight,
  Crown,
  HelpCircle,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { APP_NAME, APP_VERSION } from "~/constant";
import type { Route } from "./+types/profile";
import { useAuthStore } from "~/stores/auth.store";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - Profile` },
    { name: "description", content: "LMS App." },
  ];
}

const menu = [
  // { icon: Settings, label: "Settings", desc: "App preferences" },
  // { icon: Bell, label: "Notifications", desc: "Email & push" },
  // { icon: HelpCircle, label: "Help & support", desc: "Get in touch" },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const initials = user
    ? user.display_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "??";

  const plan = user?.is_pro ? "Pro" : "Free";

  async function doLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="px-5 pt-4 space-y-6">
      {/* Profile header */}
      <section className="rounded-3xl p-6 bg-card border border-border/60 shadow-soft text-center relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary-soft blur-2xl" />
        <div className="relative">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.display_name}
              className="h-20 w-20 mx-auto rounded-full object-cover shadow-pop"
            />
          ) : (
            <div className="h-20 w-20 mx-auto rounded-full gradient-warm text-primary-foreground flex items-center justify-center font-display text-2xl font-bold shadow-pop">
              {initials}
            </div>
          )}
          <h1 className="font-display text-2xl font-bold mt-4">{user?.display_name ?? "—"}</h1>
          <p className="text-sm text-muted-foreground">{user?.email ?? "—"}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold">
            <Crown className="h-3.5 w-3.5" /> {plan} plan
          </div>
        </div>
      </section>

      {/* Plans */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-3">Your plan</h2>
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`rounded-2xl p-4 border-2 ${!user?.is_pro ? "bg-secondary-soft border-secondary" : "bg-card border-border/60"}`}
          >
            <div className="flex items-center justify-between">
              <p className="font-display font-bold">Free</p>
              {!user?.is_pro && (
                <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">3 free lessons</p>
          </div>
          <Link
            to="/paywall"
            className={`rounded-2xl p-4 border-2 ${user?.is_pro ? "bg-secondary-soft border-secondary" : "gradient-warm text-primary-foreground border-transparent shadow-pop"}`}
          >
            <div className="flex items-center justify-between">
              <p className="font-display font-bold">Pro</p>
              {user?.is_pro ? (
                <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
                  Active
                </span>
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </div>
            <p className={`text-xs mt-1 ${user?.is_pro ? "text-muted-foreground" : "opacity-90"}`}>
              {user?.is_pro ? "Full access" : "Unlock everything"}
            </p>
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