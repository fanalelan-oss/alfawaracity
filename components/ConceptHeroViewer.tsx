"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useHotelStore } from "@/lib/store";
import { 
  Compass, 
  Lightbulb, 
  Calendar as CalendarIcon, 
  Users, 
  Sparkles, 
  Droplets, 
  ChevronRight, 
  ChevronLeft, 
  ChevronUp, 
  ChevronDown,
  RotateCcw,
  Check,
  CreditCard,
  Eye,
  CheckCircle2,
  Clock,
  Layers
} from "lucide-react";
import RoomDetailModal from "./RoomDetailModal";
import { roomsData } from "@/data/roomsData";

interface ConceptHeroViewerProps {
  onOpenBookingModal?: (unitId: string) => void;
}

export default function ConceptHeroViewer({ onOpenBookingModal }: ConceptHeroViewerProps) {
  // Mode: "resort" (Image 1) or "suite" (Image 2)
  const [viewMode, setViewMode] = useState<"resort" | "suite">("resort");

  // Suite 360 interactive state (Image 2)
  const [isLightOn, setIsLightOn] = useState<boolean>(true);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartY, setDragStartY] = useState<number>(0);

  // Booking Card State inside Suite (Image 2)
  const [bookingType, setBookingType] = useState<"daily" | "hourly">("daily");
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [guestCount, setGuestCount] = useState<number>(5);
  const [currency, setCurrency] = useState<"YER" | "SAR" | "USD">("YER");
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Quick search state for Resort view (Image 1)
  const [resortUnitType, setResortUnitType] = useState<string>("suite-family-5");
  const [resortDate, setResortDate] = useState<string>("2026-11-01");
  const [resortGuests, setResortGuests] = useState<number>(4);

  // Calculate pricing based on currency
  const basePriceYER = bookingType === "daily" ? 65000 : 12000;
  const convertedPrice = currency === "YER" 
    ? `${basePriceYER.toLocaleString()} ريال يمني`
    : currency === "SAR"
    ? `${Math.round(basePriceYER / 145)} ريال سعودي`
    : `$${Math.round(basePriceYER / 540)} دولار`;

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
    // Bound the pan
    setPanX(Math.max(-80, Math.min(80, newX)));
    setPanY(Math.max(-40, Math.min(40, newY)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Nudge functions for 360 Controller arrows
  const nudgePan = (dx: number, dy: number) => {
    setPanX(prev => Math.max(-80, Math.min(80, prev + dx)));
    setPanY(prev => Math.max(-40, Math.min(40, prev + dy)));
  };

  const currentUnit = roomsData.find(u => u.id === (viewMode === "suite" ? "suite-family-5" : resortUnitType)) || roomsData[0];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4">
      {/* View Mode Switcher Pills */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={() => setViewMode("resort")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-lg ${
            viewMode === "resort"
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/20 scale-105"
              : "bg-[#0f1622] text-slate-400 hover:text-white border border-[#1f2a3c]"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
          <span>المشهد الأول: واحة المنتجع والمسابح الكبريتية 3D</span>
        </button>

        <button
          onClick={() => setViewMode("suite")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-lg ${
            viewMode === "suite"
              ? "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 text-slate-950 shadow-amber-500/25 scale-105"
              : "bg-[#0f1622] text-slate-400 hover:text-white border border-[#1f2a3c]"
          }`}
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <span>المشهد الثاني: جولة تفاعلية 360° داخل الجناح الملكي والجاكوزي</span>
        </button>
      </div>

      {/* Main Luxury Tablet Frame Container matching Image 1 & Image 2 */}
      <div 
        className="relative w-full h-[580px] sm:h-[660px] lg:h-[720px] rounded-[32px] sm:rounded-[40px] overflow-hidden border-2 border-amber-500/40 shadow-[0_0_60px_rgba(212,175,55,0.18)] bg-[#05080c] select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* ========================================================================= */}
        {/* SCENE 1: RESORT OASIS VIEW (Matches Image 1)                             */}
        {/* ========================================================================= */}
        {viewMode === "resort" && (
          <div className="relative w-full h-full">
            {/* Background Image of 3D Resort */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out scale-100 hover:scale-[1.02]">
              <Image
                src="/concepts/01_hero_3d_landing_page.jpg"
                alt="فندق وشاليهات مدينة الفوارة - واحة الاسترخاء والمياه الكبريتية الطبيعية"
                fill
                priority
                className="object-cover"
              />
              {/* Subtle ambient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c10]/90 via-transparent to-[#080c10]/40 pointer-events-none" />
              <div className="absolute inset-0 bg-radial-vignette opacity-30 pointer-events-none" />
            </div>

            {/* Rising Steam Effect over the Hot Sulfur Pools */}
            <div className="absolute inset-x-0 bottom-24 h-48 pointer-events-none overflow-hidden">
              <div className="w-full h-full bg-gradient-to-t from-white/10 via-teal-400/5 to-transparent blur-2xl animate-pulse" style={{ animationDuration: "4s" }} />
            </div>

            {/* Top Bar inside frame */}
            <div className="absolute top-6 inset-x-6 z-20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 bg-[#080c10]/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 text-amber-300 font-semibold shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
                <span>إطلالة المنتجع والمياه الكبريتية الحارة - بلاد الروس جارف</span>
              </div>

              <div className="hidden sm:flex items-center gap-2 bg-[#080c10]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#1f2a3c] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>مياه كبريتية جارية 24 ساعة</span>
              </div>
            </div>

            {/* Central Floating Glassmorphism Reservation Widget (Exact Match to Image 1) */}
            <div className="absolute inset-x-4 sm:inset-x-12 top-1/2 -translate-y-1/2 z-30 max-w-4xl mx-auto">
              <div className="p-3 sm:p-4 rounded-3xl bg-[#0a111a]/85 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                  {/* Field 1: نوع الإقامة */}
                  <div className="px-3 py-2 rounded-2xl bg-[#121c29]/70 border border-[#27354a]/80 text-right">
                    <span className="block text-[11px] text-slate-400">نوع الإقامة</span>
                    <select
                      value={resortUnitType}
                      onChange={(e) => setResortUnitType(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-none cursor-pointer mt-0.5"
                    >
                      <option value="suite-family-5" className="bg-[#0f1622] text-white">جناح عائلي 5 أفراد</option>
                      <option value="room-family-vip" className="bg-[#0f1622] text-white">غرفة نوم عائلية VIP</option>
                      <option value="chalet-private-hours" className="bg-[#0f1622] text-white">شاليه مسبح خاص (ساعات)</option>
                      <option value="majlis-large-50" className="bg-[#0f1622] text-white">المجلس الكبير 50 شخص</option>
                      <option value="pools-family-hours" className="bg-[#0f1622] text-white">مسابح عائلية كبريتية</option>
                    </select>
                  </div>

                  {/* Field 2: تاريخ الوصول */}
                  <div className="px-3 py-2 rounded-2xl bg-[#121c29]/70 border border-[#27354a]/80 text-right">
                    <span className="block text-[11px] text-slate-400">تاريخ الوصول 📅</span>
                    <input
                      type="date"
                      value={resortDate}
                      onChange={(e) => setResortDate(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-none cursor-pointer mt-0.5"
                    />
                  </div>

                  {/* Field 3: عدد الضيوف */}
                  <div className="px-3 py-2 rounded-2xl bg-[#121c29]/70 border border-[#27354a]/80 text-right">
                    <span className="block text-[11px] text-slate-400">عدد الضيوف 👤</span>
                    <select
                      value={resortGuests}
                      onChange={(e) => setResortGuests(Number(e.target.value))}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-none cursor-pointer mt-0.5"
                    >
                      <option value={2} className="bg-[#0f1622] text-white">ضيفان (2)</option>
                      <option value={4} className="bg-[#0f1622] text-white">4 ضيوف (عائلة)</option>
                      <option value={6} className="bg-[#0f1622] text-white">6 ضيوف (عائلة كبيرة)</option>
                      <option value={15} className="bg-[#0f1622] text-white">10 - 20 ضيف (مجموعة)</option>
                      <option value={30} className="bg-[#0f1622] text-white">30 - 50 ضيف (مناسبة)</option>
                    </select>
                  </div>

                  {/* Field 4: احجز الآن Button (glowing green/gold) */}
                  <div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-emerald-300/40"
                    >
                      <span>احجز الآن</span>
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-6 inset-x-6 z-20 flex items-center justify-between text-xs text-slate-300">
              <div className="bg-[#080c10]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#1f2a3c] flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>حمام جارف - ينابيع طبيعية كبريتية دافئة تفك تعب العضلات والمفاصل</span>
              </div>

              <button
                onClick={() => setViewMode("suite")}
                className="hidden sm:flex items-center gap-2 bg-[#121c29]/90 hover:bg-[#1b283b] text-amber-300 px-4 py-2 rounded-2xl border border-amber-500/40 font-bold transition-all"
              >
                <span>دخول الجولة الافتراضية 360° للجناح الملكي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 2: 3D SUITE EXPLORER (Exact Match to Image 2)                       */}
        {/* ========================================================================= */}
        {viewMode === "suite" && (
          <div className="relative w-full h-full">
            {/* 3D Panoramic Background Canvas with Drag & Zoom */}
            <div 
              className={`absolute inset-0 transition-transform duration-300 ease-out ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                transform: `translate(${panX}px, ${panY}px) scale(1.08)`,
                filter: isLightOn ? "brightness(1.02) contrast(1.03)" : "brightness(0.65) contrast(1.15)"
              }}
            >
              <Image
                src="/concepts/02_interactive_3d_room_booking.jpg"
                alt="الجناح الملكي 360 درجة مع جاكوزي كبريتي خاص"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Top Bar inside frame */}
            <div className="absolute top-6 inset-x-6 z-20 flex items-center justify-between">
              {/* Left Brand */}
              <div className="flex items-center gap-2 bg-[#080c10]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-500/30">
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                  ف
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Alfawara Resort</div>
                  <div className="text-[10px] text-amber-300/80">فندق وشاليهات الفوارة</div>
                </div>
              </div>

              {/* Right Suite Badge */}
              <div className="bg-[#080c10]/80 backdrop-blur-md px-5 py-2 rounded-2xl border border-amber-500/40 text-sm font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Royal VIP Chalet (الجناح الملكي)</span>
              </div>
            </div>

            {/* 4 Interactive 3D Hotspot Pills (Matching Image 2 Positions) */}
            {/* Hotspot 1: Over the In-room Jacuzzi */}
            <div 
              style={{ transform: `translate(${panX * 0.8}px, ${panY * 0.8}px)` }}
              className="absolute left-[8%] sm:left-[12%] top-[40%] sm:top-[44%] z-20 transition-transform duration-200"
            >
              <button
                onClick={() => setSelectedHotspot("jacuzzi-water")}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080c10]/80 backdrop-blur-md border border-cyan-400/50 text-cyan-300 text-xs font-bold shadow-lg shadow-cyan-950/40 hover:scale-105 hover:bg-cyan-950/80 transition-all"
              >
                <Droplets className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                <span>مياه كبريتية استشفائية</span>
              </button>
            </div>

            {/* Hotspot 2: Beside Jacuzzi Base */}
            <div 
              style={{ transform: `translate(${panX * 0.85}px, ${panY * 0.85}px)` }}
              className="absolute left-[24%] sm:left-[30%] bottom-[24%] sm:bottom-[26%] z-20 transition-transform duration-200"
            >
              <button
                onClick={() => setSelectedHotspot("jacuzzi-private")}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080c10]/80 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-bold shadow-lg shadow-amber-950/40 hover:scale-105 hover:bg-amber-950/80 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>جاكوزي ملكي خاص</span>
              </button>
            </div>

            {/* Hotspot 3: King Bed & Family Capacity */}
            <div 
              style={{ transform: `translate(${panX * 0.9}px, ${panY * 0.9}px)` }}
              className="absolute right-[46%] sm:right-[38%] bottom-[26%] z-20 transition-transform duration-200"
            >
              <button
                onClick={() => setSelectedHotspot("capacity")}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080c10]/80 backdrop-blur-md border border-emerald-400/50 text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-950/40 hover:scale-105 hover:bg-emerald-950/80 transition-all"
              >
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>سعة عائلية 5+ أفراد</span>
              </button>
            </div>

            {/* Hotspot 4: In-room Wifi / Amenities */}
            <div 
              style={{ transform: `translate(${panX * 0.95}px, ${panY * 0.95}px)` }}
              className="absolute right-[46%] sm:right-[38%] top-[42%] z-20 transition-transform duration-200"
            >
              <button
                onClick={() => setSelectedHotspot("wifi")}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080c10]/80 backdrop-blur-md border border-slate-300/40 text-slate-200 text-xs font-bold shadow-lg hover:scale-105 hover:bg-slate-900 transition-all"
              >
                <span>شبكة عائلية وخدمة VIP</span>
              </button>
            </div>

            {/* Bottom-Left 360 Virtual Tour Controller Widget (Exact Match to Image 2) */}
            <div className="absolute left-6 bottom-6 z-30 flex items-center gap-4">
              {/* Circular 360 Compass with navigation arrows */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#080c10]/85 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center">
                {/* Arrow Buttons */}
                <button 
                  onClick={() => nudgePan(0, 25)}
                  className="absolute top-1 text-slate-400 hover:text-amber-400 p-1"
                  title="أعلى"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => nudgePan(0, -25)}
                  className="absolute bottom-1 text-slate-400 hover:text-amber-400 p-1"
                  title="أسفل"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => nudgePan(30, 0)}
                  className="absolute left-1 text-slate-400 hover:text-amber-400 p-1"
                  title="يسار"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => nudgePan(-30, 0)}
                  className="absolute right-1 text-slate-400 hover:text-amber-400 p-1"
                  title="يمين"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Center 360 text */}
                <div className="text-center pointer-events-none">
                  <div className="text-sm font-black text-amber-300 tracking-wide">360°</div>
                  <div className="text-[9px] text-slate-400 font-medium">جولة افتراضية</div>
                </div>
              </div>

              {/* Light Bulb Toggle Button (Image 2) */}
              <button
                onClick={() => setIsLightOn(!isLightOn)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl backdrop-blur-xl border flex flex-col items-center justify-center gap-0.5 transition-all shadow-xl ${
                  isLightOn
                    ? "bg-amber-400/90 text-slate-950 border-amber-300 shadow-amber-400/30 scale-105"
                    : "bg-[#080c10]/80 text-slate-400 border-white/20 hover:text-white"
                }`}
                title="تبديل إضاءة الغرفة"
              >
                <Lightbulb className={`w-6 h-6 ${isLightOn ? "fill-slate-950" : ""}`} />
                <span className="text-[9px] font-bold">تبديل الإضاءة</span>
              </button>
            </div>

            {/* Right Dark Glass Booking Panel (Exact Match to Image 2) */}
            <div className="absolute right-4 sm:right-6 top-16 sm:top-20 bottom-6 z-30 w-72 sm:w-80 bg-[#090e15]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl flex flex-col justify-between overflow-y-auto scrollbar-none text-right">
              <div className="space-y-4">
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
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">نوفمبر 2026</span>
                    <div className="flex gap-1 text-slate-500">
                      <span>‹</span>
                      <span>›</span>
                    </div>
                  </div>
                  {/* Days of week */}
                  <div className="grid grid-cols-7 gap-1 text-[10px] text-slate-500 text-center font-mono">
                    <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                  </div>
                  {/* Days numbers */}
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
              <div className="pt-3 border-t border-[#1f2a3c] space-y-3">
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

                {/* Local Payment Badges (Matching Image 2) */}
                <div className="pt-2 border-t border-[#1f2a3c]/60 flex items-center justify-between gap-1 text-[10px] text-slate-400">
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
        )}
      </div>

      {/* Booking Modal */}
      {showModal && (
        <RoomDetailModal
          unit={currentUnit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
