"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SteamEffect from "./SteamEffect";
import RoomDetailModal from "./RoomDetailModal";
import { roomsData } from "@/data/roomsData";
import { smoothScrollTo } from "@/lib/scroll";
import { 
  Globe, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Users, 
  Check, 
  ArrowDown, 
  Droplets,
  Menu,
  X
} from "lucide-react";

export default function HeroSection() {
  const [unitType, setUnitType] = useState<string>("suite-family-5");
  const [date, setDate] = useState<string>("2026-11-01");
  const [guests, setGuests] = useState<number>(4);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const selectedUnit = roomsData.find(u => u.id === unitType) || roomsData[0];

  const scrollToSection = (id: string) => {
    smoothScrollTo(id);
  };

  return (
    <section id="hero" className="snap-section bg-[#05080c] select-none">
      {/* Background: Edge-to-Edge Full Bleed Cinematic Resort Landscape */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/concepts/resort_fullbleed_hero.jpg"
          alt="فندق وشاليهات مدينة الفوارة - واحة الاسترخاء والمياه الكبريتية الطبيعية"
          fill
          priority
          className="object-cover object-center scale-105 animate-fade-in"
        />
        {/* Cinematic gradient overlays for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c10] via-black/30 to-[#080c10]/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
      </div>

      {/* Atmospheric Live Steam Effect Rising from Hot Sulfur Pools */}
      <SteamEffect density="medium" height="h-64 sm:h-80" tint="turquoise" />

      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (Single, Clean, Edge-to-Edge Header Matching Image 1)       */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Left: Language & POS Shortcut */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080c10]/70 backdrop-blur-md border border-white/20 text-xs font-semibold text-slate-200 shadow-sm cursor-pointer hover:border-amber-400/50 transition-colors">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>AR</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white bg-[#080c10]/70 backdrop-blur-md border border-amber-500/30 px-3.5 py-1.5 rounded-full font-bold transition-all hover:bg-amber-500/20"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>لوحة الكاشير</span>
          </Link>
        </div>

        {/* Center: Navigation Links (Matching Image 1) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-200">
          <button onClick={() => scrollToSection("payment")} className="hover:text-amber-400 transition-colors">
            تواصل معنا
          </button>
          <button onClick={() => scrollToSection("rooms")} className="hover:text-amber-400 transition-colors">
            الخدمات
          </button>
          <button onClick={() => scrollToSection("sulfur")} className="hover:text-amber-400 transition-colors">
            المياه الكبريتية
          </button>
          <button onClick={() => scrollToSection("suite-360")} className="hover:text-amber-400 transition-colors">
            الأجنحة والشاليهات
          </button>
          {/* Active Home with Green Glow Indicator (Image 1) */}
          <button onClick={() => scrollToSection("hero")} className="relative text-amber-300 font-bold py-1">
            <span>الرئيسية</span>
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.9)] rounded-full" />
          </button>
        </nav>

        {/* Right: Golden Logo Emblem (Matching Image 1) */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-extrabold text-base sm:text-lg text-white">
              فندق وشاليهات
            </div>
            <div className="text-xs font-semibold text-amber-400 font-serif tracking-wider">
              Alfawara Resort
            </div>
          </div>
          {/* Gold Palm Emblem */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/30">
            <div className="w-full h-full bg-[#080c10] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>

          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 bg-[#080c10]/80 border border-white/20 rounded-xl text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="relative z-40 lg:hidden px-6 py-4 bg-[#0a1017]/95 backdrop-blur-xl border-b border-[#1f2a3c] space-y-2 text-right">
          <button onClick={() => { scrollToSection("hero"); setMobileMenuOpen(false); }} className="block w-full text-right py-2 text-amber-300 font-bold">الرئيسية</button>
          <button onClick={() => { scrollToSection("suite-360"); setMobileMenuOpen(false); }} className="block w-full text-right py-2 text-slate-300">جولة الجناح الملكي 360°</button>
          <button onClick={() => { scrollToSection("rooms"); setMobileMenuOpen(false); }} className="block w-full text-right py-2 text-slate-300">الأجنحة والشاليهات</button>
          <button onClick={() => { scrollToSection("sulfur"); setMobileMenuOpen(false); }} className="block w-full text-right py-2 text-slate-300">المياه الكبريتية</button>
          <button onClick={() => { scrollToSection("payment"); setMobileMenuOpen(false); }} className="block w-full text-right py-2 text-slate-300">طرق الدفع والحسابات</button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. HERO CENTER CONTENT (Headline + Floating Glass Booking Bar)            */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 w-full text-center my-auto py-2 sm:py-6 space-y-4 sm:space-y-6">
        {/* Title (Matching Image 1) */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080c10]/70 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold shadow-xl">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span>حمام جارف الطبيعي - صنعاء - بلاد الروس</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-2xl">
            فندق وشاليهات مدينة الفوارة - واحة الاسترخاء والمياه الكبريتية الطبيعية
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto drop-shadow-md">
            ينابيع مياه دافئة جارية من باطن الأرض، أجنحة عائلية وشبابية VIP، ومجالس فخمة مع جاكوزي خاص وخصوصية تامة
          </p>
        </div>

        {/* Floating Glassmorphism Reservation Widget (Exact Match to Image 1) */}
        <div className="max-w-4xl mx-auto">
          <div className="p-3 sm:p-4 rounded-3xl bg-[#080c10]/85 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
              {/* Field 1: نوع الإقامة */}
              <div className="px-3.5 py-2.5 rounded-2xl bg-[#121c29]/75 border border-[#27354a] text-right">
                <span className="block text-[11px] text-slate-400 font-semibold">نوع الإقامة</span>
                <select
                  value={unitType}
                  onChange={(e) => setUnitType(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-none cursor-pointer mt-0.5"
                >
                  <option value="suite-family-5" className="bg-[#0f1622] text-white">جناح عائلي 5 أفراد</option>
                  <option value="room-family-vip" className="bg-[#0f1622] text-white">غرفة عائلية VIP مع جاكوزي</option>
                  <option value="chalet-private-hours" className="bg-[#0f1622] text-white">شاليه مسبح خاص (ساعات/يوم)</option>
                  <option value="majlis-large-50" className="bg-[#0f1622] text-white">المجلس الكبير 50 شخص</option>
                  <option value="majlis-youth-30" className="bg-[#0f1622] text-white">مجلس شبابي 30 شخص</option>
                  <option value="pools-family-hours" className="bg-[#0f1622] text-white">مسابح عائلية كبريتية</option>
                </select>
              </div>

              {/* Field 2: تاريخ الوصول */}
              <div className="px-3.5 py-2.5 rounded-2xl bg-[#121c29]/75 border border-[#27354a] text-right">
                <span className="block text-[11px] text-slate-400 font-semibold">تاريخ الوصول 📅</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-none cursor-pointer mt-0.5"
                />
              </div>

              {/* Field 3: عدد الضيوف */}
              <div className="px-3.5 py-2.5 rounded-2xl bg-[#121c29]/75 border border-[#27354a] text-right">
                <span className="block text-[11px] text-slate-400 font-semibold">عدد الضيوف 👤</span>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-none cursor-pointer mt-0.5"
                >
                  <option value={2} className="bg-[#0f1622] text-white">شخصان (2)</option>
                  <option value={4} className="bg-[#0f1622] text-white">4 أشخاص (عائلي)</option>
                  <option value={6} className="bg-[#0f1622] text-white">6 أشخاص (عائلة كبيرة)</option>
                  <option value={15} className="bg-[#0f1622] text-white">10 - 20 شخص (مجموعة)</option>
                  <option value={35} className="bg-[#0f1622] text-white">30 - 50 شخص (مناسبة)</option>
                </select>
              </div>

              {/* Field 4: احجز الآن Glowing Button (Image 1) */}
              <div>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:shadow-[0_0_40px_rgba(16,185,129,0.9)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-emerald-300/40"
                >
                  <span>احجز الآن</span>
                  <Check className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM GLIDE BAR (Scroll down to Section 2: Suite Tour)               */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2 bg-[#080c10]/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>مياه كبريتية استشفائية طبيعية دافئة</span>
        </div>

        <button
          onClick={() => scrollToSection("suite-360")}
          className="group flex items-center gap-2 bg-[#080c10]/80 backdrop-blur-md hover:bg-amber-500/20 px-5 py-2 rounded-full border border-amber-500/40 text-amber-300 font-bold transition-all shadow-lg"
        >
          <span>استكشف الجناح الملكي والجاكوزي 360°</span>
          <ArrowDown className="w-4 h-4 text-amber-400 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <RoomDetailModal
          unit={selectedUnit}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </section>
  );
}
