"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RoomUnit, roomsData } from "@/data/roomsData";
import RoomDetailModal from "./RoomDetailModal";
import { 
  Users, 
  Sparkles, 
  Clock, 
  Calendar, 
  Check, 
  ArrowLeft,
  Waves,
  ShieldCheck
} from "lucide-react";

export default function RoomsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedUnit, setSelectedUnit] = useState<RoomUnit | null>(null);

  const categories = [
    { id: "all", label: "جميع الوحدات والمرافق" },
    { id: "suite", label: "أجنحة ملكية عائلية VIP" },
    { id: "chalet", label: "شاليهات خاصة ومسابح" },
    { id: "majlis", label: "مجالس مناسبات وضيافة" },
    { id: "pool", label: "مسابح كبريتية استشفائية" },
    { id: "youth", label: "غرف شبابية" }
  ];

  const filteredUnits = selectedCategory === "all" 
    ? roomsData 
    : roomsData.filter(u => u.category === selectedCategory);

  return (
    <section id="rooms" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          إقامات تناسب كل الأذواق والعوائل والشباب
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          اختر مكانك المفضل في مدينة الفوارة
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          جميع الوحدات مجهزة بمياه كبريتية دافئة تنبع من حمام جارف الطبيعي، مع خصوصية تامة وخدمة متواصلة طوال فترة إقامتك.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mt-10 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-[#0f1622] text-slate-400 hover:text-white border border-[#1f2a3c]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Rooms Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredUnits.map((unit) => (
          <div
            key={unit.id}
            className="group relative bg-[#0f1622] border border-[#1f2a3c] rounded-3xl overflow-hidden hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/20 transition-all flex flex-col"
          >
            {/* Image Box */}
            <div className="relative w-full h-56 overflow-hidden bg-slate-900">
              <Image
                src={unit.images[0] || "/images/img_028_u8dd32ak3clce4sj1pyeapqc.jpeg"}
                alt={unit.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1622] via-transparent to-black/30" />

              {/* Badges */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span className="bg-[#080c10]/80 backdrop-blur-md text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {unit.capacity}
                </span>
              </div>

              {unit.bookingType === "hourly" && (
                <div className="absolute top-3 left-3 bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  نظام ساعات
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  {unit.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {unit.description}
                </p>
              </div>

              {/* Amenities quick list */}
              <div className="space-y-1.5 pt-2 border-t border-[#1f2a3c]/70">
                {unit.amenities.slice(0, 3).map((am, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{am}</span>
                  </div>
                ))}
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 border-t border-[#1f2a3c] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">يبدأ من:</div>
                  <div className="text-lg font-extrabold text-amber-400">
                    {unit.bookingType === "hourly"
                      ? `${unit.pricePerHourYER.toLocaleString()} ريال/ساعة`
                      : `${unit.pricePerDayYER.toLocaleString()} ريال/يوم`}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedUnit(unit)}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/10 flex items-center gap-1.5 transition-all"
                >
                  <span>عرض وحجز</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedUnit && (
        <RoomDetailModal
          unit={selectedUnit}
          onClose={() => setSelectedUnit(null)}
        />
      )}
    </section>
  );
}
