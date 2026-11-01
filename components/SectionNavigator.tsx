"use client";

import React, { useState, useEffect } from "react";
import { smoothScrollTo } from "@/lib/scroll";
import { 
  Home, 
  Video,
  Compass, 
  BedDouble, 
  Droplets, 
  CreditCard 
} from "lucide-react";

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  const sections = [
    { id: "hero", label: "الرئيسية والواحة", icon: Home },
    { id: "resort-tour", label: "جولة المنتجع بالفيديو الحي", icon: Video },
    { id: "suite-360", label: "جولة الجناح الملكي 360°", icon: Compass },
    { id: "rooms", label: "الأجنحة والمرافق", icon: BedDouble },
    { id: "sulfur", label: "المياه الكبريتية", icon: Droplets },
    { id: "payment", label: "طرق السداد والحسابات", icon: CreditCard },
  ];

  useEffect(() => {
    const container = document.querySelector(".snap-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: container || null,
        threshold: 0.55
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    smoothScrollTo(id);
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 bg-[#0a1017]/85 backdrop-blur-xl p-2 rounded-full border border-amber-500/25 shadow-2xl shadow-black/80">
      {sections.map((sec) => {
        const IconComp = sec.icon;
        const isActive = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => handleNavClick(sec.id)}
            className="group relative p-2.5 rounded-full transition-all"
            aria-label={sec.label}
          >
            {/* Active Pill Glow */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isActive
                  ? "bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-bold scale-110 shadow-lg shadow-amber-500/40"
                  : "text-slate-400 hover:text-white hover:bg-[#151f2e]"
              }`}
            >
              <IconComp className="w-4 h-4" />
            </div>

            {/* Hover Tooltip (shows on right) */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#0f1622] text-white text-xs font-bold rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity border border-[#27354a] shadow-xl">
              {sec.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
