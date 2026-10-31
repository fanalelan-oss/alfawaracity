"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useHotelStore } from "@/lib/store";
import RoomStatusGrid from "@/components/admin/RoomStatusGrid";
import CashierPOS from "@/components/admin/CashierPOS";
import BookingsTable from "@/components/admin/BookingsTable";
import WhatsAppQRManager from "@/components/admin/WhatsAppQRManager";
import { formatNumber } from "@/lib/formatters";
import { 
  ShieldCheck, 
  BedDouble, 
  CreditCard, 
  Users, 
  MessageCircle, 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Sparkles,
  Home
} from "lucide-react";

export default function AdminPage() {
  const { bookings, roomStates, rooms } = useHotelStore();
  const [activeTab, setActiveTab] = useState<"grid" | "pos" | "bookings" | "whatsapp">("grid");

  // Calculate live stats
  const totalRooms = rooms.length;
  const occupiedCount = Object.values(roomStates).filter(s => s.status === "occupied").length;
  const reservedCount = Object.values(roomStates).filter(s => s.status === "reserved").length;
  const availableCount = totalRooms - occupiedCount - reservedCount;
  const occupancyPercentage = Math.round(((occupiedCount + reservedCount) / totalRooms) * 100);

  const totalRevenueYER = bookings
    .filter(b => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.totalAmountYER, 0);

  return (
    <div className="min-h-screen bg-[#080c10] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0a1017]/90 border-b border-[#1f2a3c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-[#080c10] rounded-[14px] flex items-center justify-center font-bold text-amber-300">
                ف
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg text-white">
                  لوحة تحكم فندق وشاليهات مدينة الفوارة
                </h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  نظام حي متصل
                </span>
              </div>
              <p className="text-xs text-slate-400">
                إدارة الاستقبال، الكاشير ونقاط البيع، وخادم واتساب الآلي
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 bg-[#141d2b] hover:bg-[#1a2638] hover:text-white rounded-xl border border-[#27354a] transition-all"
          >
            <Home className="w-4 h-4 text-amber-400" />
            <span>عرض موقع الزوار</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-[#0f1622] border border-[#1f2a3c] flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">نسبة الإشغال الإجمالية</div>
              <div className="text-2xl font-black text-white mt-1">{occupancyPercentage}%</div>
              <div className="text-[11px] text-emerald-400 mt-0.5">
                {occupiedCount + reservedCount} من {totalRooms} وحدات مشغولة
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#0f1622] border border-[#1f2a3c] flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">الوحدات المتاحة للتسكين</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">{availableCount}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">جاهزة للاستقبال الفوري</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#0f1622] border border-[#1f2a3c] flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">إجمالي الحجوزات المسجلة</div>
              <div className="text-2xl font-black text-white mt-1">{bookings.length}</div>
              <div className="text-[11px] text-amber-300 mt-0.5">نزلاء عبر المنصة والكاشير</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#0f1622] border border-[#1f2a3c] flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">إجمالي الإيرادات المقبوضة</div>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {formatNumber(totalRevenueYER)}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">ريال يمني (كاش ومحافظ)</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#1f2a3c]">
          <button
            onClick={() => setActiveTab("grid")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "grid"
                ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-[#0f1622] text-slate-400 hover:text-white border border-[#1f2a3c]"
            }`}
          >
            <BedDouble className="w-4 h-4" />
            <span>خريطة وحالة الغرف المباشرة</span>
          </button>

          <button
            onClick={() => setActiveTab("pos")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "pos"
                ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-[#0f1622] text-slate-400 hover:text-white border border-[#1f2a3c]"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>كاشير ونقاط بيع الاستقبال (POS)</span>
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "bookings"
                ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-[#0f1622] text-slate-400 hover:text-white border border-[#1f2a3c]"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>سجل الحجوزات ومطابقة السندات (CRM)</span>
          </button>

          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "whatsapp"
                ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-[#0f1622] text-slate-400 hover:text-white border border-[#1f2a3c]"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>خادم واتساب المجاني (مسح QR)</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div>
          {activeTab === "grid" && <RoomStatusGrid />}
          {activeTab === "pos" && <CashierPOS />}
          {activeTab === "bookings" && <BookingsTable />}
          {activeTab === "whatsapp" && <WhatsAppQRManager />}
        </div>
      </main>
    </div>
  );
}
