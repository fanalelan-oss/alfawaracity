"use client";

import React, { useState } from "react";
import Image from "next/image";
import SteamEffect from "./SteamEffect";
import RoomDetailModal from "./RoomDetailModal";
import { roomsData } from "@/data/roomsData";
import { 
  Compass, 
  Lightbulb, 
  Droplets, 
  Sparkles, 
  Users, 
  Wifi, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  ArrowDown
} from "lucide-react";

export default function Suite360Tour() {
  const [isLightOn, setIsLightOn] = useState<boolean>(true);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartY, setDragStartY] = useState<number>(0);

  // Booking Card State
  const [bookingType, setBookingType] = useState<"daily" | "hourly">("daily");
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [guestCount, setGuestCount] = useState<number>(5);
  const [currency, setCurrency] = useState<"YER" | "SAR" | "USD">("YER");
  const [showModal, setShowModal] = useState<boolean>(false);

  const basePriceYER = bookingType === "daily" ? 65000 : 12000;
  const convertedPrice = currency === "YER" 
    ? `${basePriceYER.toLocaleString()} YER`
    : currency === "SAR"
    ? `${Math.round(basePriceYER / 145)} SAR`
    : `$${Math.round(basePriceYER / 540)} USD`;

  // 360 Mouse Drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX - panX);
    setDragStartY(e.clientY - panY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStartX;
    const newY = e.clientY - dragStartY;
    setPanX(Math.max(-80, Math.min(80, newX)));
    setPanY(Math.max(-40, Math.min(40, newY)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const nudgePan = (dx: number, dy: number) => {
    setPanX(prev => Math.max(-80, Math.min(80, prev + dx)));
    setPanY(prev => Math.max(-40, Math.min(40, prev + dy)));
  };

  const currentUnit = roomsData.find(u => u.id === "suite-family-5") || roomsData[0];

  const scrollToNext = () => {
    const el = document.getElementById("rooms");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="suite-360" 
      className="snap-section bg-[#05080c] select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 100% Clean Photography Background (NO baked-in fake UI) */}
      <div 
        className={`absolute inset-0 transition-transform duration-300 ease-out ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          transform: `translate(${panX}px, ${panY}px) scale(1.08)`,
          filter: isLightOn ? "brightness(1.02) contrast(1.04)" : "brightness(0.62) contrast(1.2)"
        }}
      >
        <Image
          src="/concepts/suite_clean_interior.jpg"
          alt="الجناح الرئاسي الملكي مع جاكوزي كبريتي دافئ"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Atmospheric Live Steam from Jacuzzi */}
      <div className="absolute left-[4%] bottom-[8%] w-[38%] h-72 pointer-events-none z-10">
        <SteamEffect density="high" height="h-full" tint="warm" />
      </div>

      {/* Top Bar Header inside Scene */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between pointer-events-none">
        {/* Left: Brand Badge */}
        <div className="pointer-events-auto flex items-center gap-2.5 bg-[#080c10]/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-500/30 shadow-lg">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
            ف
          </div>
          <div>
            <div className="text-xs font-bold text-white">Alfawara Resort</div>
            <div className="text-[10px] text-amber-300/80">فندق وشاليهات الفوارة</div>
          </div>
        </div>

        {/* Center: Interactive Hint */}
        <div className="hidden md:flex items-center gap-2 bg-[#080c10]/75 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 text-xs text-slate-200 shadow-xl">
          <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: "14s" }} />
          <span>اسحب بالماوس للتجول 360° داخل الجناح واكتشاف تفاصيل الجاكوزي</span>
        </div>

        {/* Right: Suite Title */}
        <div className="pointer-events-auto bg-[#080c10]/85 backdrop-blur-md px-5 py-2 rounded-2xl border border-amber-500/40 text-sm font-extrabold text-white flex items-center gap-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Royal VIP Suite (الجناح الملكي)</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 REAL INTERACTIVE 3D HOTSPOT PINS                                        */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-6 pointer-events-none">
        {/* Hotspot 1: Over the Jacuzzi on the left */}
        <div 
          style={{ transform: `translate(${panX * 0.8}px, ${panY * 0.8}px)` }}
          className="absolute left-[10%] sm:left-[15%] top-[45%] pointer-events-auto transition-transform duration-200"
        >
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#080c10]/90 backdrop-blur-xl border border-cyan-400/60 text-cyan-300 text-xs font-bold shadow-2xl hover:scale-105 hover:bg-cyan-950/90 transition-all"
          >
            <Droplets className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            <span>مياه كبريتية استشفائية</span>
          </button>
        </div>

        {/* Hotspot 2: Beside Jacuzzi Base */}
        <div 
          style={{ transform: `translate(${panX * 0.85}px, ${panY * 0.85}px)` }}
          className="absolute left-[24%] sm:left-[28%] bottom-[24%] pointer-events-auto transition-transform duration-200"
        >
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#080c10]/90 backdrop-blur-xl border border-amber-400/60 text-amber-300 text-xs font-bold shadow-2xl hover:scale-105 hover:bg-amber-950/90 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>جاكوزي ملكي خاص</span>
          </button>
        </div>

        {/* Hotspot 3: King Bed & Family Capacity */}
        <div 
          style={{ transform: `translate(${panX * 0.9}px, ${panY * 0.9}px)` }}
          className="absolute right-[46%] sm:right-[40%] bottom-[25%] pointer-events-auto transition-transform duration-200"
        >
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#080c10]/90 backdrop-blur-xl border border-emerald-400/60 text-emerald-300 text-xs font-bold shadow-2xl hover:scale-105 hover:bg-emerald-950/90 transition-all"
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>سعة عائلية 5+ أفراد</span>
          </button>
        </div>

        {/* Hotspot 4: In-Room Wifi & Amenities */}
        <div 
          style={{ transform: `translate(${panX * 0.95}px, ${panY * 0.95}px)` }}
          className="absolute right-[46%] sm:right-[40%] top-[38%] pointer-events-auto transition-transform duration-200"
        >
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#080c10]/90 backdrop-blur-xl border border-slate-300/40 text-slate-100 text-xs font-bold shadow-2xl hover:scale-105 hover:bg-slate-900 transition-all"
          >
            <Wifi className="w-3.5 h-3.5 text-amber-300" />
            <span>شبكة عائلية وخدمة VIP</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* ONE SINGLE REAL DARK GLASS BOOKING PANEL ON THE RIGHT                     */}
        {/* ========================================================================= */}
        <div className="absolute right-4 sm:right-8 top-4 sm:top-8 bottom-6 w-72 sm:w-80 bg-[#090e15]/92 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 shadow-2xl flex flex-col justify-between overflow-y-auto scrollbar-none text-right pointer-events-auto">
          <div className="space-y-3.5">
            {/* Daily / Hourly Toggle */}
            <div className="flex bg-[#05080c] p-1 rounded-2xl border border-[#1f2a3c]">
              <button
                onClick={() => setBookingType("daily")}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  bookingType === "daily"
                    ? "bg-[#182333] text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                يومي
              </button>
              <button
                onClick={() => setBookingType("hourly")}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  bookingType === "hourly"
                    ? "bg-[#182333] text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                يومي / بالساعة
              </button>
            </div>

            {/* Calendar Days Strip */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">نوفمبر 2026</span>
                <span className="text-[10px] text-slate-500 font-mono">اختر اليوم</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-[10px] text-slate-500 text-center font-mono">
                <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs text-center font-mono">
                {[5, 6, 7, 8, 9, 10, 11].map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`py-1 rounded-lg transition-all ${
                      selectedDay === d
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:bg-[#151f2e]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
                {[12, 13, 14, 15, 16, 17, 18].map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`py-1 rounded-lg transition-all ${
                      selectedDay === d
                        ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20"
                        : "text-slate-300 hover:bg-[#151f2e]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests Picker */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">عدد الضيوف</label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full bg-[#05080c] border border-[#27354a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value={2}>شخصان (2 ضيوف)</option>
                <option value={4}>4 أشخاص (عائلي)</option>
                <option value={5}>5 أشخاص (الجناح الملكي)</option>
                <option value={7}>7 أشخاص مع أطفال</option>
              </select>
            </div>

            {/* Currency Selector */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">عملة السداد</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-full bg-[#05080c] border border-[#27354a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="YER">ريال يمني (YER)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
                <option value="USD">دولار أمريكي (USD)</option>
              </select>
            </div>
          </div>

          {/* Price & Submit Action */}
          <div className="pt-2.5 border-t border-[#1f2a3c] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {bookingType === "daily" ? "السعر لليلة:" : "السعر للساعة:"}
              </span>
              <span className="font-extrabold text-amber-300 text-sm">
                {convertedPrice}
              </span>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>تأكيد الحجز</span>
              <Check className="w-4 h-4" />
            </button>

            {/* Local Payment Badges */}
            <div className="pt-1.5 border-t border-[#1f2a3c]/60 flex items-center justify-between gap-1 text-[10px] text-slate-400">
              <span className="text-[9px]">الدفع المباشر:</span>
              <div className="flex items-center gap-1.5">
                <span className="bg-[#121c29] px-2 py-0.5 rounded text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  بنك الكريمي
                </span>
                <span className="bg-[#121c29] px-2 py-0.5 rounded text-[10px] font-semibold text-cyan-400 border border-cyan-500/20">
                  محفظة جيب
                </span>
                <span className="bg-[#121c29] px-2 py-0.5 rounded text-[10px] font-semibold text-amber-300 border border-amber-500/20">
                  Mastercard
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM CONTROLLER & SCROLL TRANSITION HINT                                */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between pointer-events-none">
        {/* Bottom-Left 360 Controller & Light Switch */}
        <div className="pointer-events-auto flex items-center gap-4">
          {/* Circular 360 Compass with navigation arrows */}
          <div className="relative w-28 h-28 rounded-full bg-[#080c10]/90 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center">
            <button onClick={() => nudgePan(0, 30)} className="absolute top-1 text-slate-400 hover:text-amber-400 p-1" title="أعلى">
              <ChevronUp className="w-5 h-5" />
            </button>
            <button onClick={() => nudgePan(0, -30)} className="absolute bottom-1 text-slate-400 hover:text-amber-400 p-1" title="أسفل">
              <ChevronDown className="w-5 h-5" />
            </button>
            <button onClick={() => nudgePan(35, 0)} className="absolute left-1 text-slate-400 hover:text-amber-400 p-1" title="يسار">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => nudgePan(-35, 0)} className="absolute right-1 text-slate-400 hover:text-amber-400 p-1" title="يمين">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="text-center pointer-events-none">
              <div className="text-sm font-black text-amber-300 tracking-wide">360°</div>
              <div className="text-[9px] text-slate-400 font-medium">جولة افتراضية</div>
            </div>
          </div>

          {/* Light Bulb Toggle Button */}
          <button
            onClick={() => setIsLightOn(!isLightOn)}
            className={`w-14 h-14 rounded-2xl backdrop-blur-xl border flex flex-col items-center justify-center gap-0.5 transition-all shadow-xl ${
              isLightOn
                ? "bg-amber-400/90 text-slate-950 border-amber-300 shadow-amber-400/30 scale-105"
                : "bg-[#080c10]/80 text-slate-400 border-white/20 hover:text-white"
            }`}
            title="تبديل إضاءة الغرفة"
          >
            <Lightbulb className={`w-5 h-5 ${isLightOn ? "fill-slate-950" : ""}`} />
            <span className="text-[9px] font-bold">تبديل الإضاءة</span>
          </button>
        </div>

        {/* Scroll Down Hint with Pulsing Animation */}
        <button
          onClick={scrollToNext}
          className="pointer-events-auto group flex items-center gap-2.5 bg-[#080c10]/85 backdrop-blur-md hover:bg-amber-500/20 px-6 py-2.5 rounded-full border border-amber-500/40 text-amber-300 font-bold transition-all shadow-xl text-xs"
        >
          <span>مرر للأسفل لاستعراض كافة الأجنحة والمرافق</span>
          <ArrowDown className="w-4 h-4 text-amber-400 animate-bounce" />
        </button>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <RoomDetailModal
          unit={currentUnit}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
