import Link from "next/link";
import { modules } from "@/lib/mockData";
import {
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { TrophyIcon } from "@heroicons/react/24/solid";

const completedLessons = modules.reduce((a, m) => a + m.completedLessons, 0);

const menuItems = [
  {
    icon: CogIcon,
    label: "Account Settings",
    desc: "Manage your profile & password",
    href: "#",
  },
  {
    icon: BellIcon,
    label: "Notifications",
    desc: "Reminders & learning nudges",
    href: "#",
  },
  {
    icon: StarIcon,
    label: "Subscription",
    desc: "LearnFlow Pro — Active",
    href: "#",
    badge: "PRO",
  },
  {
    icon: ShieldCheckIcon,
    label: "Privacy & Security",
    desc: "Data, permissions & sessions",
    href: "#",
  },
];

export default function ProfilePage() {
  return (
    <div className="page-enter px-4 pt-12">
      {/* Avatar + name */}
      <div className="flex flex-col items-center text-center mb-7">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-violet-200 mb-3">
          A
        </div>
        <h1 className="text-xl font-bold text-gray-800">Alex Johnson</h1>
        <p className="text-gray-400 text-sm mt-0.5">alex@learnflow.io</p>
        <div className="flex items-center gap-1.5 mt-2 bg-violet-50 px-3 py-1.5 rounded-full">
          <TrophyIcon className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-xs font-bold text-violet-700">Level 4 — Designer</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-800">{completedLessons}</p>
          <p className="text-[10px] text-gray-400 font-medium">Lessons done</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-800">1,240</p>
          <p className="text-[10px] text-gray-400 font-medium">XP earned</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-800">3</p>
          <p className="text-[10px] text-gray-400 font-medium">Badges</p>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4 divide-y divide-gray-50">
        {menuItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex items-center gap-3 p-4 hover:bg-gray-50 active:bg-violet-50 transition-colors group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-100 transition-colors">
              <item.icon className="w-5 h-5 text-violet-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                {item.badge && (
                  <span className="text-[9px] font-bold text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
            <ChevronRightIcon className="w-4 h-4 text-gray-300 flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Sign out */}
      <Link
        href="/"
        className="flex items-center justify-center gap-2 w-full p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-red-50 hover:border-red-100 text-red-500 font-semibold text-sm transition-all duration-150 active:scale-[0.98] mb-6"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        Sign Out
      </Link>

      <p className="text-center text-[10px] text-gray-300 mb-4">
        LearnFlow v1.0 — Demo prototype
      </p>
    </div>
  );
}
