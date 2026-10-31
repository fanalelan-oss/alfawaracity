"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ConceptHeroViewer from "@/components/ConceptHeroViewer";
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
  CheckCircle2, 
  PhoneCall, 
  MessageCircle,
  MapPin,
  ChevronDown
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
      {/* Top Navbar matching Image 1 */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section matching Image 1 */}
        <section className="pt-8 sm:pt-12 pb-16 px-2 sm:px-4 max-w-7xl mx-auto">
          {/* Centered Main Headline matching Image 1 */}
          <div className="text-center max-w-4xl mx-auto space-y-3 mb-8">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              فندق وشاليهات مدينة الفوارة - واحة الاسترخاء والمياه الكبريتية الطبيعية
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
              صنعاء - بلاد الروس - حمام جارف الطبيعي | مياه علاجية دافئة، أجنحة عائلية VIP، ومجالس مناسبات بخصوصية تامة
            </p>
          </div>

          {/* The High-End Interactive 3D Tablet Frame (Image 1 & Image 2) */}
          <ConceptHeroViewer />
        </section>

        {/* 4 Feature Cards */}
        <section id="services" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelConfig.features.map((feat, i) => {
              const IconComp = getIcon(feat.icon);
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-[#0f1622] border border-[#1f2a3c] hover:border-amber-500/40 transition-all space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Rooms & Chalets Catalog with exact classified images */}
        <RoomsSection />

        {/* Sulfur Waters Natural Wellness Info */}
        <SulfurSpringsInfo />

        {/* Payment Guide with Al-Kuraimi and Jeeb Wallet */}
        <PaymentGuide />
      </main>

      <Footer />
    </div>
  );
}
