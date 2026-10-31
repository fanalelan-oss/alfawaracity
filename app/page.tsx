"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import Suite360Tour from "@/components/Suite360Tour";
import RoomsSection from "@/components/RoomsSection";
import SulfurSpringsInfo from "@/components/SulfurSpringsInfo";
import PaymentGuide from "@/components/PaymentGuide";
import Footer from "@/components/Footer";
import SectionNavigator from "@/components/SectionNavigator";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#080c10] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      {/* Floating Side Section Navigator (Quick glide transitions) */}
      <SectionNavigator />

      {/* Screen 1: The Grand Full-Bleed Hero (Image 1 Design) */}
      <HeroSection />

      {/* Screen 2: Interactive 3D Suite 360 Tour (Image 2 Design) */}
      <Suite360Tour />

      {/* Screen 3: The 9 Categorized Rooms & Chalets with Real Images */}
      <RoomsSection />

      {/* Screen 4: Natural Sulfur Springs Health & Wellness Experience */}
      <SulfurSpringsInfo />

      {/* Screen 5: Bank Accounts, Jeeb Wallet & Direct Payments */}
      <PaymentGuide />

      {/* Footer */}
      <Footer />
    </div>
  );
}
