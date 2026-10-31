"use client";

import React, { useState } from "react";
import Link from "next/link";
import { hotelConfig } from "@/data/hotelConfig";
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  ShieldCheck, 
  Menu, 
  X, 
  MapPin,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#080c10]/85 border-b border-[#1f2a3c]">
      {/* Top Banner with phone & location */}
      <div className="hidden md:flex items-center justify-between px-6 py-2 bg-gradient-to-r from-emerald-950/40 via-[#0f1622] to-amber-950/40 text-xs border-b border-[#1f2a3c]/60 text-slate-300">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <MapPin className="w-3.5 h-3.5" />
            صنعاء - بلاد الروس - حمام جارف الطبيعي
          </span>
          <span className="flex items-center gap-1.5 text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            مياه كبريتية استشفائية طبيعية دافئة على مدار الساعة
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href={`tel:${hotelConfig.contacts.phonePrimary}`} 
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            استقبال: {hotelConfig.contacts.phonePrimary}
          </a>
          <span className="text-slate-600">|</span>
          <a 
            href={`https://wa.me/${hotelConfig.contacts.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <MessageCircle className="w-3 h-3" />
            واتساب: {hotelConfig.contacts.whatsappDisplay}
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#080c10] rounded-[14px] flex items-center justify-center">
              <span className="font-extrabold text-xl bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
                ف
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg md:text-xl text-white tracking-wide">
                مدينة الفوارة
              </h1>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
                سياحي VIP
              </span>
            </div>
            <p className="text-xs text-slate-400">
              فندق وشاليهات ومياه كبريتية بحمام جارف
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            الرئيسية
          </Link>
          <Link href="#rooms" className="hover:text-amber-400 transition-colors">
            الغرف والشاليهات
          </Link>
          <Link href="#majlis" className="hover:text-amber-400 transition-colors">
            المجالس والمسابح
          </Link>
          <Link href="#sulfur" className="hover:text-amber-400 transition-colors">
            فوائد المياه الكبريتية
          </Link>
          <Link href="#payment" className="hover:text-amber-400 transition-colors">
            طرق الدفع
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link 
            href="/admin" 
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 bg-[#141d2b] border border-[#27354a] rounded-xl hover:bg-[#1a2638] hover:text-white transition-all shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            لوحة الكاشير والإدارة
          </Link>
          <Link 
            href="#booking-bar"
            className="flex items-center gap-2 px-5 py-2.5 text-xs md:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 rounded-xl hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Calendar className="w-4 h-4" />
            احجز إقامتك الآن
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white bg-[#141d2b] border border-[#27354a] rounded-xl"
          aria-label="القائمة"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#0c121a] border-b border-[#1f2a3c] space-y-3">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-200 hover:bg-[#151f2e] rounded-lg"
          >
            الرئيسية
          </Link>
          <Link 
            href="#rooms" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-200 hover:bg-[#151f2e] rounded-lg"
          >
            الغرف والشاليهات
          </Link>
          <Link 
            href="#majlis" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-200 hover:bg-[#151f2e] rounded-lg"
          >
            المجالس والمسابح
          </Link>
          <Link 
            href="#sulfur" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-200 hover:bg-[#151f2e] rounded-lg"
          >
            فوائد المياه الكبريتية
          </Link>
          <Link 
            href="#payment" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-200 hover:bg-[#151f2e] rounded-lg"
          >
            طرق الدفع والحسابات
          </Link>

          <div className="pt-2 border-t border-[#1f2a3c] flex flex-col gap-2">
            <Link 
              href="/admin" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-200 bg-[#141d2b] rounded-xl border border-[#27354a]"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              لوحة تحكم الكاشير والاستقبال
            </Link>
            <Link 
              href="#booking-bar" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-xl"
            >
              <Calendar className="w-4 h-4" />
              احجز الآن
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
