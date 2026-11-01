"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SteamEffect from "./SteamEffect";
import RoomDetailModal from "./RoomDetailModal";
import { roomsData } from "@/data/roomsData";
import { formatNumber } from "@/lib/formatters";
import { smoothScrollTo } from "@/lib/scroll";
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
  ArrowDown,
  Info,
  X,
  Calendar as CalendarIcon,
  Eye,
  ShieldCheck
} from "lucide-react";

export default function Suite360Tour() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
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
  const [activeHotspotInfo, setActiveHotspotInfo] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const basePriceYER = bookingType === "daily" ? 65000 : 12000;
  
  // Safe deterministic price string
  const formattedPrice = currency === "YER"
    ? `${formatNumber(basePriceYER)} ريال يمني`
    : currency === "SAR"
    ? `${formatNumber(Math.round(basePriceYER / 145))} ريال سعودي`
    : `$${formatNumber(Math.round(basePriceYER / 540))} USD`;

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
    setPanX(Math.max(-70, Math.min(70, newX)));
    setPanY(Math.max(-35, Math.min(35, newY)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const nudgePan = (dx: number, dy: number) => {
    setPanX(prev => Math.max(-70, Math.min(70, prev + dx)));
    setPanY(prev => Math.max(-35, Math.min(35, prev + dy)));
  };

  const currentUnit = roomsData.find(u => u.id === "suite-family-5") || roomsData[0];

  const scrollToNext = () => {
    smoothScrollTo("rooms");
  };

  // Calendar dates mock
  const weekDays = [
    { label: "سبت", day: 14 },
    { label: "أحد", day: 15 },
    { label: "اثنين", day: 16 },
    { label: "ثلاثاء", day: 17 },
    { label: "أربعاء", day: 18 },
    { label: "خميس", day: 19 },
    { label: "جمعة", day: 20 },
  ];

  return (
    <section 
      id="suite-360" 
      className="snap-section bg-[#05080c] select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* ========================================================================= */}
      {/* 1. 100% CLEAN PHOTOGRAPHY BACKGROUND (PANORAMIC SUITE WITH JACUZZI)       */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-transform duration-300 ease-out ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          transform: `translate(${panX}px, ${panY}px) scale(1.08)`,
          filter: isLightOn ? "brightness(1.03) contrast(1.04)" : "brightness(0.68) contrast(1.2)"
        }}
      >
        <Image
          src="/concepts/suite_clean_interior.jpg"
          alt="الجناح الرئاسي الملكي مع جاكوزي كبريتي دافئ"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Warm Cove Lighting Atmosphere Layer */}
        {isLightOn && (
          <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 via-amber-500/10 to-transparent pointer-events-none mix-blend-screen" />
        )}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. ATMOSPHERIC RISING STEAM FROM JACUZZI (BOTTOM-LEFT ZONE)               */}
      {/* ========================================================================= */}
      <div className="absolute left-[2%] bottom-[12%] w-[38%] h-64 sm:h-80 pointer-events-none z-10">
        <SteamEffect density="high" height="h-full" tint="warm" />
      </div>

      {/* ========================================================================= */}
      {/* 3. TOP SCENE HEADER BAR (PROPERLY SEPARATED ZONES)                        */}
      {/* ========================================================================= */}
      <header className="absolute top-0 inset-x-0 z-30 px-6 sm:px-10 py-5 flex items-center justify-between pointer-events-none">
        {/* Right side in RTL: Brand Identity */}
        <div className="pointer-events-auto flex items-center gap-3 bg-[#080d16]/85 backdrop-blur-xl px-4 py-2 rounded-2xl border border-[#d4af37]/35 shadow-xl shadow-black/80">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c59b27] via-[#f3e5ab] to-[#aa7c11] text-slate-950 flex items-center justify-center font-black text-sm shadow-md">
            ف
          </div>
          <div className="text-right">
            <div className="text-xs font-black text-white">Alfawara Resort</div>
            <div className="text-[10px] font-semibold text-[#e5c158]">فندق وشاليهات الفوارة</div>
          </div>
        </div>

        {/* Center: Tour Hint */}
        <div className="hidden lg:flex items-center gap-2 bg-[#080d16]/80 backdrop-blur-xl px-5 py-2 rounded-full border border-white/15 text-xs text-slate-200 shadow-xl shadow-black/60">
          <Compass className="w-4 h-4 text-[#d4af37] animate-spin" style={{ animationDuration: "14s" }} />
          <span>اسحب بالماوس للتجول 360° داخل الجناح واكتشاف تفاصيل الجاكوزي</span>
        </div>

        {/* Left side in RTL: Luxury Unit Badge */}
        <div className="pointer-events-auto bg-[#080d16]/85 backdrop-blur-xl px-4 sm:px-5 py-2 rounded-2xl border border-[#d4af37]/50 text-xs sm:text-sm font-extrabold text-white flex items-center gap-2 shadow-xl shadow-black/80">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span>Royal VIP Suite (الجناح الملكي)</span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE 3D HOTSPOTS ACCURATELY PLACED OVER VISUAL FEATURES         */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {/* Hotspot 1: Over Warm Jacuzzi Water (Bottom-Left) */}
        <div 
          style={{ transform: `translate(${panX * 0.8}px, ${panY * 0.8}px)` }}
          className="absolute left-[16%] sm:left-[20%] bottom-[32%] pointer-events-auto transition-transform duration-200"
        >
          <button
            onClick={() => setActiveHotspotInfo("مياه كبريتية استشفائية طبيعية دافئة تنبع مباشرة من باطن الأرض بحمام جارف، تريح المفاصل والعضلات.")}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080d16]/90 backdrop-blur-xl border border-cyan-400/70 text-cyan-300 text-xs font-bold shadow-2xl hover:scale-105 hover:bg-cyan-950/90 transition-all shadow-cyan-500/20"
          >
            <Droplets className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            <span>مياه كبريتية استشفائية</span>
          </button>
        </div>

        {/* Hotspot 2: Over Jacuzzi Rim & Stepping Stone */}
        <div 
          style={{ transform: `translate(${panX * 0.85}px, ${panY * 0.85}px)` }}
          className="absolute left-[30%] sm:left-[33%] bottom-[22%] pointer-events-auto transition-transform duration-200"
        >
          <button
            onClick={() => setActiveHotspotInfo("جاكوزي مدمج داخل الغرفة بجلسات رخامية ونظام تحكم بتدفق المياه الساخنة لخصوصية واسترخاء تام.")}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080d16]/90 backdrop-blur-xl border border-[#d4af37]/70 text-[#f5d77f] text-xs font-bold shadow-2xl hover:scale-105 hover:bg-[#c59b27]/30 transition-all shadow-[#d4af37]/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>جاكوزي ملكي مدمج</span>
          </button>
        </div>

        {/* Hotspot 3: Over Panoramic Mountain View Window */}
        <div 
          style={{ transform: `translate(${panX * 0.75}px, ${panY * 0.75}px)` }}
          className="absolute left-[20%] sm:left-[24%] top-[30%] pointer-events-auto transition-transform duration-200"
        >
          <button
            onClick={() => setActiveHotspotInfo("واجهات زجاجية بانورامية مفتوحة على جبال بلاد الروس وضباب الصباح الساحر.")}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080d16]/90 backdrop-blur-xl border border-white/40 text-slate-100 text-xs font-bold shadow-2xl hover:scale-105 hover:bg-slate-900 transition-all shadow-black/50"
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>إطلالة بانورامية ساحرة</span>
          </button>
        </div>

        {/* Hotspot 4: Over King Size Luxury Bed */}
        <div 
          style={{ transform: `translate(${panX * 0.9}px, ${panY * 0.9}px)` }}
          className="absolute left-[52%] sm:left-[55%] bottom-[32%] pointer-events-auto transition-transform duration-200"
        >
          <button
            onClick={() => setActiveHotspotInfo("سرير ملكي واسع مع مراتب طبية فاخرة ومفارش قطنية نقية 100% تضمن لك نوماً عميقاً ومريحاً.")}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080d16]/90 backdrop-blur-xl border border-emerald-400/70 text-emerald-300 text-xs font-bold shadow-2xl hover:scale-105 hover:bg-emerald-950/90 transition-all shadow-emerald-500/20"
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>سعة عائلية 5+ أفراد</span>
          </button>
        </div>

        {/* Hotspot 5: Over Wooden Feature Wall / Headboard */}
        <div 
          style={{ transform: `translate(${panX * 0.95}px, ${panY * 0.95}px)` }}
          className="absolute left-[52%] sm:left-[55%] top-[34%] pointer-events-auto transition-transform duration-200"
        >
          <button
            onClick={() => setActiveHotspotInfo("إضاءة استرخاء دافئة، خدمة غرف مدار 24 ساعة، وشبكة واي فاي عالية السرعة.")}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080d16]/90 backdrop-blur-xl border border-[#d4af37]/60 text-slate-100 text-xs font-bold shadow-2xl hover:scale-105 hover:bg-slate-900 transition-all shadow-black/50"
          >
            <Wifi className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>خدمة VIP وواي فاي سريع</span>
          </button>
        </div>

        {/* Active Hotspot Modal / Popup */}
        {activeHotspotInfo && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-24 pointer-events-auto bg-[#0a1017]/95 backdrop-blur-2xl p-4 rounded-2xl border border-[#d4af37]/50 shadow-2xl max-w-sm text-center space-y-2 z-40 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-[#f3e5ab] font-bold">
              <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-[#d4af37]" /> تفاصيل الميزة</span>
              <button onClick={() => setActiveHotspotInfo(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{activeHotspotInfo}</p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. DEDICATED RIGHT ZONE: ELEGANT DARK GLASS BOOKING PANEL                 */}
      {/* ========================================================================= */}
      <aside className="absolute right-4 sm:right-8 top-20 sm:top-24 bottom-6 w-80 sm:w-[340px] z-30 pointer-events-auto flex flex-col">
        <div className="h-full bg-[#080d16]/92 backdrop-blur-2xl border border-[#d4af37]/35 rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-y-auto scrollbar-none text-right space-y-3">
          
          {/* Panel Header */}
          <div className="pb-3 border-b border-[#1f2a3c]">
            <div className="flex items-center justify-between mb-1">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                متاح للحجز الآن
              </span>
              <span className="text-[11px] font-bold text-[#e5c158]">حجز فوري مباشر</span>
            </div>
            <h2 className="text-base font-black text-white">الجناح الملكي مع جاكوزي</h2>
          </div>

          {/* Daily / Hourly Toggle */}
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 font-semibold">مدة الإقامة المطلوبة:</label>
            <div className="grid grid-cols-2 bg-[#05080c] p-1 rounded-2xl border border-[#1f2a3c]">
              <button
                onClick={() => setBookingType("daily")}
                className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                  bookingType === "daily"
                    ? "bg-[#182333] text-[#f3e5ab] shadow border border-[#d4af37]/40 font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                يومي (ليلة كاملة)
              </button>
              <button
                onClick={() => setBookingType("hourly")}
                className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                  bookingType === "hourly"
                    ? "bg-[#182333] text-[#f3e5ab] shadow border border-[#d4af37]/40 font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                بالساعة (استرخاء)
              </button>
            </div>
          </div>

          {/* Calendar Strip (Localized Arabic Days) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">نوفمبر 2026</span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <CalendarIcon className="w-3 h-3 text-[#d4af37]" />
                اختر اليوم
              </span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((item) => (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 transition-all ${
                    selectedDay === item.day
                      ? "bg-gradient-to-b from-[#c59b27] via-[#f3e5ab] to-[#aa7c11] text-slate-950 font-black shadow-md shadow-[#d4af37]/35 border border-[#f5d77f]/60"
                      : "bg-[#0b121c] text-slate-300 hover:bg-[#151f2e] border border-white/5"
                  }`}
                >
                  <span className="text-[9px] font-medium opacity-80">{item.label}</span>
                  <span className="text-xs font-bold font-mono">{item.day}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Guests Picker */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">عدد الضيوف</label>
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full bg-[#05080c] border border-[#27354a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]/60"
            >
              <option value={2}>شخصان (2 ضيوف)</option>
              <option value={4}>4 أشخاص (عائلي)</option>
              <option value={5}>5 أشخاص (الجناح الملكي)</option>
              <option value={7}>7 أشخاص مع أطفال</option>
            </select>
          </div>

          {/* Currency Selector */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">عملة السداد</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="w-full bg-[#05080c] border border-[#27354a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]/60"
            >
              <option value="YER">ريال يمني (YER)</option>
              <option value="SAR">ريال سعودي (SAR)</option>
              <option value="USD">دولار أمريكي (USD)</option>
            </select>
          </div>

          {/* Pricing & Booking Submission */}
          <div className="pt-2 border-t border-[#1f2a3c] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {bookingType === "daily" ? "السعر لليلة واحدة:" : "السعر للساعة:"}
              </span>
              <span className="font-black text-[#f3e5ab] text-sm sm:text-base drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
                {isMounted ? formattedPrice : `${formatNumber(basePriceYER)} ريال يمني`}
              </span>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 gold-gradient-btn font-black text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>تأكيد الحجز الفوري</span>
              <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
            </button>

            {/* Direct Payment Methods */}
            <div className="pt-1.5 border-t border-[#1f2a3c]/60 flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-[9px]">الدفع المباشر:</span>
              <div className="flex items-center gap-1">
                <span className="bg-[#121c29] px-2 py-0.5 rounded text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
                  الكريمي
                </span>
                <span className="bg-[#121c29] px-2 py-0.5 rounded text-[9px] font-bold text-cyan-400 border border-cyan-500/20">
                  محفظة جيب
                </span>
                <span className="bg-[#121c29] px-2 py-0.5 rounded text-[9px] font-bold text-[#e5c158] border border-[#d4af37]/30">
                  Mastercard
                </span>
              </div>
            </div>
          </div>

        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 6. DEDICATED BOTTOM-LEFT ZONE: 360 CONTROLLER WHEEL & LIGHT TOGGLE         */}
      {/* ========================================================================= */}
      <div className="absolute left-6 sm:left-10 bottom-6 sm:bottom-8 z-30 pointer-events-auto flex items-center gap-3">
        {/* Circular 360 Compass Dial with directional navigation */}
        <div className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-[#080d16]/92 backdrop-blur-xl border border-[#d4af37]/40 shadow-2xl flex items-center justify-center shadow-black/80">
          <button 
            onClick={() => nudgePan(0, 30)} 
            className="absolute top-1 text-slate-400 hover:text-[#d4af37] p-1 transition-colors" 
            title="أعلى"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button 
            onClick={() => nudgePan(0, -30)} 
            className="absolute bottom-1 text-slate-400 hover:text-[#d4af37] p-1 transition-colors" 
            title="أسفل"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button 
            onClick={() => nudgePan(35, 0)} 
            className="absolute left-1 text-slate-400 hover:text-[#d4af37] p-1 transition-colors" 
            title="يسار"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => nudgePan(-35, 0)} 
            className="absolute right-1 text-slate-400 hover:text-[#d4af37] p-1 transition-colors" 
            title="يمين"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <div className="text-center pointer-events-none">
            <div className="text-xs sm:text-sm font-black text-[#f3e5ab] tracking-wide">360°</div>
            <div className="text-[8px] text-slate-400 font-medium">جولة افتراضية</div>
          </div>
        </div>

        {/* Ambient Room Lighting Switch */}
        <button
          onClick={() => setIsLightOn(!isLightOn)}
          className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl backdrop-blur-xl border flex flex-col items-center justify-center gap-0.5 transition-all shadow-xl ${
            isLightOn
              ? "bg-gradient-to-b from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-slate-950 border-[#f5d77f] shadow-[0_0_24px_rgba(212,175,55,0.6)] scale-105"
              : "bg-[#080d16]/85 text-slate-400 border-white/20 hover:text-white"
          }`}
          title="تبديل إضاءة الغرفة"
        >
          <Lightbulb className={`w-5 h-5 ${isLightOn ? "fill-slate-950 text-slate-950 stroke-[2.5]" : ""}`} />
          <span className="text-[8px] font-black">الإضاءة</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 7. DEDICATED BOTTOM-CENTER ZONE: SCROLL DOWN TO OTHER ROOMS PROMPT        */}
      {/* ========================================================================= */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-5 sm:bottom-6 z-30 pointer-events-auto">
        <button
          onClick={scrollToNext}
          className="group flex items-center gap-2.5 bg-[#080d16]/88 backdrop-blur-xl hover:bg-[#d4af37]/20 px-5 py-2.5 rounded-full border border-[#d4af37]/45 text-[#f3e5ab] font-bold transition-all shadow-2xl text-xs shadow-black/80 hover:scale-105 active:scale-95"
        >
          <span>مرر للأسفل لاستعراض كافة الأجنحة والمرافق</span>
          <ArrowDown className="w-4 h-4 text-[#d4af37] animate-bounce" />
        </button>
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <RoomDetailModal
          unit={currentUnit}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
