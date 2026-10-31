"use client";

import React, { useState } from "react";
import Link from "next/link";
import { hotelConfig } from "@/data/hotelConfig";
import { 
  Globe, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck, 
  Phone,
  MessageCircle
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#080c10]/90 border-b border-[#1f2a3c]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Side: Language Switcher (Exact match to Image 1: 🌐 L ▾) */}
        <div className="flex items-center gap-3">
          <div className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#101722] border border-[#27354a] text-xs font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors shadow-sm">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>AR</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 bg-[#121c29] border border-amber-500/20 px-3 py-1.5 rounded-full transition-colors font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>لوحة الكاشير</span>
          </Link>
        </div>

        {/* Center: Navigation Links (Exact match to Image 1) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
          <Link
            href="#contact"
            className="hover:text-amber-400 transition-colors"
          >
            تواصل معنا
          </Link>

          <Link
            href="#services"
            className="hover:text-amber-400 transition-colors"
          >
            الخدمات
          </Link>

          <Link
            href="#sulfur"
            className="hover:text-amber-400 transition-colors"
          >
            المياه الكبريتية
          </Link>

          <Link
            href="#rooms"
            className="hover:text-amber-400 transition-colors"
          >
            الأجنحة والشاليهات
          </Link>

          {/* Active Home Item with Green Glow Underline (Image 1) */}
          <Link
            href="/"
            className="relative text-amber-300 font-bold transition-colors py-1 group"
          >
            <span>الرئيسية</span>
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.9)] rounded-full" />
          </Link>
        </nav>

        {/* Right Side: Brand Logo & Title (Exact match to Image 1) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="text-right">
            <div className="font-extrabold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
              فندق وشاليهات
            </div>
            <div className="text-xs font-semibold tracking-wider text-amber-400/90 font-serif">
              Alfawara Resort
            </div>
          </div>

          {/* Golden Palm Tree in Arched Dome Icon */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#080c10] rounded-[14px] flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                <path d="M12 2C8 2 5 6 5 11c0 3 2 5 3 6l-1 5h10l-1-5c1-1 3-3 3-6 0-5-3-9-7-9zm0 3c2 2 3 4 3 6 0 1-1 2-3 2s-3-1-3-2c0-2 1-4 3-6z" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white bg-[#101722] border border-[#27354a] rounded-xl"
          aria-label="القائمة"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#0a1017] border-b border-[#1f2a3c] space-y-2 text-right">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-bold text-amber-300 bg-[#121c29] rounded-xl"
          >
            الرئيسية
          </Link>
          <Link
            href="#rooms"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-300 hover:bg-[#121c29] rounded-xl"
          >
            الأجنحة والشاليهات
          </Link>
          <Link
            href="#sulfur"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-300 hover:bg-[#121c29] rounded-xl"
          >
            المياه الكبريتية
          </Link>
          <Link
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-300 hover:bg-[#121c29] rounded-xl"
          >
            الخدمات
          </Link>
          <Link
            href="#payment"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-300 hover:bg-[#121c29] rounded-xl"
          >
            طرق الدفع والحسابات
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-bold text-amber-400 bg-[#1b2637] rounded-xl border border-amber-500/30 text-center"
          >
            لوحة كاشير الاستقبال والإدارة
          </Link>
        </div>
      )}
    </header>
  );
}
