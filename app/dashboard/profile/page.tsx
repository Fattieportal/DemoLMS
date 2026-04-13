"use client";
import { useState } from "react";
import {
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  CheckBadgeIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

const menuItems = [
  { icon: UserCircleIcon, label: "Persoonlijke gegevens", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: BellIcon, label: "Meldingen", color: "text-indigo-500", bg: "bg-indigo-50" },
  { icon: ShieldCheckIcon, label: "Privacy & beveiliging", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: StarIcon, label: "Upgrade naar Pro", color: "text-yellow-500", bg: "bg-yellow-50" },
  { icon: QuestionMarkCircleIcon, label: "Help & ondersteuning", color: "text-sky-500", bg: "bg-sky-50" },
  { icon: DocumentTextIcon, label: "Voorwaarden & beleid", color: "text-gray-400", bg: "bg-gray-50" },
];

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="page-enter pb-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-4 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            T
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <h1 className="text-white text-xl font-bold">Thomas de Vries</h1>
              <CheckBadgeIcon className="w-5 h-5 text-blue-200" />
            </div>
            <p className="text-white/70 text-sm">Niveau 4 — Gevorderd</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                TheorieRijbewijs Pro
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-4 -mt-4 bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-5">
        <div className="grid grid-cols-3 divide-x divide-gray-100">
          {[
            { value: "12", label: "Lessen" },
            { value: "1.240", label: "Punten" },
            { value: "4", label: "Dagreeks" },
          ].map((s, i) => (
            <div key={i} className="px-4 text-center">
              <p className="text-lg font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="px-4 space-y-2 mb-5">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <span className="flex-1 text-sm font-medium text-gray-700 text-left">
              {item.label}
            </span>
            {item.label === "Meldingen" ? (
              <button
                onClick={() => setNotifications((v) => !v)}
                className={`w-11 h-6 rounded-full transition-colors ${
                  notifications ? "bg-blue-500" : "bg-gray-200"
                } relative flex-shrink-0`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                    notifications ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-300 flex-shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Uitloggen */}
      <div className="px-4">
        <button className="w-full bg-red-50 rounded-2xl p-4 flex items-center justify-center gap-2 border border-red-100 active:bg-red-100 transition-colors cursor-pointer">
          <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-red-400" />
          <span className="text-sm font-semibold text-red-500">Uitloggen</span>
        </button>
      </div>
    </div>
  );
}