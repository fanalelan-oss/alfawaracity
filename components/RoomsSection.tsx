"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatNumber } from "@/lib/formatters";
import { RoomUnit, roomsData } from "@/data/roomsData";
import RoomDetailModal from "./RoomDetailModal";
import { 
  Users, 
  Sparkles, 
  Clock, 
  Calendar, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  ArrowDown, 
  Layers,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function RoomsSection() {
  const [activeUnitIndex, setActiveUnitIndex] = useState<number>(0);
  const [selectedUnitForModal, setSelectedUnitForModal] = useState<RoomUnit | null>(null);

  const activeUnit = roomsData[activeUnitIndex];

  const handleNext = () => {
    setActiveUnitIndex((prev) => (prev + 1) % roomsData.length);
  };

  const handlePrev = () => {
    setActiveUnitIndex((prev) => (prev - 1 + roomsData.length) % roomsData.length);
  };

  const scrollToNext = () => {
    const el = document.getElementById("sulfur");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="rooms" 
      className="snap-section bg-[#05080c] select-none"
    >
      {/* Full-Screen Edge-to-Edge Background Image of the Active Unit */}
      <div className="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out">
        <Image
          src={activeUnit.images[0] || "/images/units/hero_vip_suite.jpeg"}
          alt={activeUnit.name}
          fill
          priority
          className="object-cover object-center scale-100"
        />
        {/* Luxury Vignette & Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080c10]/95 via-[#080c10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c10] via-transparent to-[#080c10]/80" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-[#080c10]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-500/30">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-amber-300">
            الوحدة {activeUnitIndex + 1} من {roomsData.length}
          </span>
          <span className="text-xs text-slate-400">| {activeUnit.originalSectionTitle}</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-2xl bg-[#080c10]/80 hover:bg-[#151f2e] text-slate-300 hover:text-white border border-white/20 transition-all shadow-lg"
            title="السابق"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-2xl bg-[#080c10]/80 hover:bg-[#151f2e] text-slate-300 hover:text-white border border-white/20 transition-all shadow-lg"
            title="التالي"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Showcase Details Glass Card (Left-Aligned / Filling Half the Screen) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 my-auto">
        <div className="max-w-xl p-6 sm:p-8 rounded-3xl bg-[#080c10]/88 backdrop-blur-2xl border border-white/20 shadow-2xl space-y-5 text-right">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              {activeUnit.capacity}
            </span>

            {activeUnit.bookingType === "hourly" ? (
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                نظام ساعات
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                يومي / بالساعة
              </span>
            )}

            <span className="text-xs text-slate-400 font-mono">
              {activeUnit.images.length} صور مصنفة
            </span>
          </div>

          {/* Title & Description */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {activeUnit.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeUnit.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {activeUnit.amenities.slice(0, 4).map((am, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-200 bg-[#121c29]/70 px-3 py-2 rounded-xl border border-white/10">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{am}</span>
              </div>
            ))}
          </div>

          {/* Price & CTA */}
          <div className="pt-3 border-t border-[#1f2a3c] flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-slate-400">يبدأ السعر من:</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400">
                {activeUnit.bookingType === "hourly"
                  ? `${formatNumber(activeUnit.pricePerHourYER)} ريال/ساعة`
                  : `${formatNumber(activeUnit.pricePerDayYER)} ريال/يوم`}
              </div>
            </div>

            <button
              onClick={() => setSelectedUnitForModal(activeUnit)}
              className="px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>احجز هذه الوحدة الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM THUMBNAILS CAROUSEL RAIL (All 9 Units) & SCROLL HINT               */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 py-4 space-y-3">
        {/* Horizontal Thumbnails Strip */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {roomsData.map((unit, idx) => (
            <button
              key={unit.id}
              onClick={() => setActiveUnitIndex(idx)}
              className={`relative flex-shrink-0 w-32 sm:w-36 h-20 rounded-2xl overflow-hidden border-2 transition-all group ${
                activeUnitIndex === idx
                  ? "border-amber-400 scale-105 shadow-xl shadow-amber-400/30"
                  : "border-white/20 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={unit.images[0]}
                alt={unit.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-1.5 inset-x-1.5 text-[10px] font-bold text-white truncate text-right">
                {unit.name}
              </div>
            </button>
          ))}
        </div>

        {/* Scroll Down Hint */}
        <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
          <div className="flex items-center gap-2 bg-[#080c10]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px]">
            <span>انقر على أي وحدة لاستعراضها بكامل الشاشة</span>
          </div>

          <button
            onClick={scrollToNext}
            className="group flex items-center gap-2 bg-[#080c10]/85 backdrop-blur-md hover:bg-amber-500/20 px-5 py-2 rounded-full border border-amber-500/40 text-amber-300 font-bold transition-all shadow-xl"
          >
            <span>مرر للأسفل للمياه الكبريتية الطبيعية</span>
            <ArrowDown className="w-4 h-4 text-amber-400 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedUnitForModal && (
        <RoomDetailModal
          unit={selectedUnitForModal}
          onClose={() => setSelectedUnitForModal(null)}
        />
      )}
    </section>
  );
}
