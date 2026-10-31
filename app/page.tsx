"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import Suite360Tour from "@/components/Suite360Tour";
import RoomsSection from "@/components/RoomsSection";
import SulfurSpringsInfo from "@/components/SulfurSpringsInfo";
import PaymentGuide from "@/components/PaymentGuide";
import SectionNavigator from "@/components/SectionNavigator";

export default function HomePage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05080c] text-slate-100 select-none">
      {/* Floating Side Section Navigator for Instant Gliding */}
      <SectionNavigator />

      {/* Snap Scroll Viewport Container: One Scroll Snap Per Section */}
      <div className="snap-container">
        {/* Screen 1: The Grand Full-Bleed Hero */}
        <HeroSection />

        {/* Screen 2: Clean 3D Suite 360 Tour (No duplicate panels) */}
        <Suite360Tour />

        {/* Screen 3: Cinematic Full-Screen 9 Units Showcase */}
        <RoomsSection />

        {/* Screen 4: Natural Sulfur Springs Health & Wellness Experience */}
        <SulfurSpringsInfo />

        {/* Screen 5: Bank Accounts, Jeeb Wallet & Direct Payments + Footer */}
        <PaymentGuide />
      </div>
    </div>
  );
}
