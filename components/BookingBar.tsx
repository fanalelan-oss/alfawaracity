"use client";

import React, { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Sparkles, 
  Search, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface BookingBarProps {
  onFilterChange?: (filters: {
    bookingType: "daily" | "hourly";
    category: string;
    guestCount: number;
  }) => void;
}

export default function BookingBar({ onFilterChange }: BookingBarProps) {
  const [bookingType, setBookingType] = useState<"daily" | "hourly">("daily");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [date, setDate] = useState<string>("2026-11-01");
  const [timeOrHours, setTimeOrHours] = useState<number>(3);
  const [guests, setGuests] = useState<number>(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({
        bookingType,
        category: selectedCategory,
        guestCount: guests
      });
    }
    // Scroll to rooms section
    const el = document.getElementById("rooms");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="booking-bar" className="relative -mt-12 lg:-mt-20 z-30 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-[#0f1622]/95 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-950/20">
        {/* Top Type Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1f2a3c]">
          <div className="flex items-center gap-2 bg-[#080c10] p-1.5 rounded-2xl border border-[#1f2a3c]">
            <button
              type="button"
              onClick={() => setBookingType("daily")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                bookingType === "daily"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              حجز بالأيام (غرف وأجنحة فندقية)
            </button>
            <button
              type="button"
              onClick={() => setBookingType("hourly")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                bookingType === "hourly"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Clock className="w-4 h-4" />
              حجز بالساعات (شاليهات ومجالس ومسابح)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>تأكيد فوري عبر واتساب وبدون رسوم إضافية</span>
          </div>
        </div>

        {/* Search Inputs Grid */}
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">
              نوع المكان المطلوب
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#080c10] border border-[#27354a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 appearance-none"
              >
                <option value="all">كل الأقسام والخيارات</option>
                <option value="suite">أجنحة عائلية VIP مع جاكوزي</option>
                <option value="chalet">شاليهات خاصة ومسابح</option>
                <option value="majlis">مجالس مناسبات وضيافة (10-50 شخص)</option>
                <option value="youth">غرف شبابية مع جاكوزي</option>
                <option value="pool">مسابح مياه كبريتية استشفائية</option>
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">
              تاريخ الحضور
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#080c10] border border-[#27354a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Duration or Guests */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">
              {bookingType === "hourly" ? "عدد الساعات المطلوبة" : "عدد الضيوف والأسرة"}
            </label>
            {bookingType === "hourly" ? (
              <select
                value={timeOrHours}
                onChange={(e) => setTimeOrHours(Number(e.target.value))}
                className="w-full bg-[#080c10] border border-[#27354a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value={2}>ساعتان (جلسة سريعة)</option>
                <option value={3}>3 ساعات (جلسة رايقة مع مسبح)</option>
                <option value={5}>5 ساعات (مقيل ومناسبة كاملة)</option>
                <option value={8}>8 ساعات (يوم كامل استجمام)</option>
              </select>
            ) : (
              <div className="relative flex items-center">
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-[#080c10] border border-[#27354a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
                <span className="absolute left-3 text-xs text-slate-400">أفراد</span>
              </div>
            )}
          </div>

          {/* Submit Search Button */}
          <div className="flex flex-col justify-end">
            <button
              type="submit"
              className="w-full h-[46px] flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Search className="w-4 h-4" />
              <span>فحص التوفر والأسعار</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
