"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";

const navItems = [
  {
    href: "/dashboard",
    label: "Overzicht",
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
  },
  {
    href: "/dashboard/modules",
    label: "Modules",
    icon: BookOpenIcon,
    activeIcon: BookOpenIconSolid,
  },
  {
    href: "/dashboard/progress",
    label: "Voortgang",
    icon: ChartBarIcon,
    activeIcon: ChartBarIconSolid,
  },
  {
    href: "/dashboard/profile",
    label: "Profiel",
    icon: UserIcon,
    activeIcon: UserIconSolid,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-100 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2 pb-safe">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive ? "bg-blue-100" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-semibold tracking-wide ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}