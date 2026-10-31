"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import BookingBar from "@/components/BookingBar";
import RoomsSection from "@/components/RoomsSection";
import SulfurSpringsInfo from "@/components/SulfurSpringsInfo";
import PaymentGuide from "@/components/PaymentGuide";
import Footer from "@/components/Footer";
import { hotelConfig } from "@/data/hotelConfig";
import { 
  Droplets, 
  ShieldCheck, 
  Clock, 
  Users, 
  Sparkles, 
  ArrowDown, 
  MapPin, 
  PhoneCall, 
  MessageCircle 
} from "lucide-react";

export default function HomePage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Droplets": return Droplets;
      case "ShieldCheck": return ShieldCheck;
      case "Clock": return Clock;
      case "Users": return Users;
      default: return Sparkles;
    }
  };

  return (
    <div className="min-h-screen bg-[#080c10] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Hero Titles */}
          <div className="text-center max-w-4xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-emerald-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold shadow-lg shadow-amber-950/20">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>فندق وشاليهات مدينة الفوارة السياحية - حمام جارف الطبيعي</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              راحتك واستجمامك بين أحضان الطبيعة <br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                بمياه كبريتية استشفائية دافئة
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              نوفر لك ولعائلتك أجنحة VIP ملكية، شاليهات خاصة مع مسابح وجاكوزي، ومجالس واسعة للمناسبات، بنظام حجز مرن بالساعة أو باليوم وبأفضل الأسعار.
            </p>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
              <a
                href="#booking-bar"
                className="px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>احجز إقامتك الآن</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${hotelConfig.contacts.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#131c2a] hover:bg-[#1a2638] text-slate-200 hover:text-white font-semibold rounded-2xl border border-[#27354a] transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>استفسار فوري عبر واتساب</span>
              </a>
            </div>
          </div>

          {/* 3D WebGL Interactive Resort Canvas */}
          <Hero3D />
        </section>

        {/* Booking Bar (Search Widget) */}
        <BookingBar />

        {/* 4 Feature Highlights Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelConfig.features.map((feat, i) => {
              const IconComp = getIcon(feat.icon);
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-[#0f1622] border border-[#1f2a3c] hover:border-amber-500/30 transition-all space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/10 to-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Rooms & Chalets Catalog */}
        <RoomsSection />

        {/* Sulfur Waters Health & Wellness Info */}
        <SulfurSpringsInfo />

        {/* Payment Accounts & Guide */}
        <PaymentGuide />
      </main>

      <Footer />
    </div>
  );
}
