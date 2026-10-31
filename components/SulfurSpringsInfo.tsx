"use client";

import React from "react";
import Image from "next/image";
import SteamEffect from "./SteamEffect";
import { smoothScrollTo } from "@/lib/scroll";
import { Droplets, Heart, Sparkles, Shield, ThermometerSun, Smile, ArrowDown } from "lucide-react";

export default function SulfurSpringsInfo() {
  const benefits = [
    {
      title: "راحة العضلات والمفاصل",
      desc: "حرارة المياه الكبريتية الطبيعية تساعد في فك تشنج الظهر والركب والمفاصل بعد تعب الشغل وأيام الأسبوع الطويلة.",
      icon: ThermometerSun,
      color: "text-amber-400",
      bg: "bg-amber-500/10"
    },
    {
      title: "نقاء ونضارة البشرة",
      desc: "عنصر الكبريت الطبيعي معروف بقدرته على تنظيف مسام الجلد وتخفيف الحساسية والطفح الجلدي بشكل طبيعي وبدون مواد كيماوية.",
      icon: Droplets,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      title: "استرخاء وهدوء للأعصاب",
      desc: "جلسة دافئة لمدة نصف ساعة في الجاكوزي أو المسبح ترجع لك نشاطك وتفرغ كل التوتر وضغوطات الحياة وتخليك تنام نومة عميقة.",
      icon: Smile,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },
    {
      title: "مياه دافئة جارية من المنبع",
      desc: "المياه في الفوارة متجددة وتتدفق باستمرار من باطن الأرض بجارف، ويتم تجديدها وتعقيم الأحواض بشكل دوري ومنتظم.",
      icon: Shield,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10"
    }
  ];

  const scrollToPayment = () => {
    smoothScrollTo("payment");
  };

  return (
    <section 
      id="sulfur" 
      className="snap-section bg-[#05080c] select-none"
    >
      {/* Full-Screen Edge-to-Edge Thermal Pool Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/units/pool_family_thermal_water.jpeg"
          alt="مسابح المياه الكبريتية في حمام جارف فندق الفوارة"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c10] via-[#080c10]/80 to-[#080c10]/70" />
      </div>

      {/* Atmospheric Live Steam Effect across the whole screen */}
      <SteamEffect density="high" height="h-80" tint="turquoise" />

      {/* Top Header Tag */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[#080c10]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-emerald-500/30">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-300">
            مياه استشفائية طبيعية دافئة - حمام جارف الطبيعي
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-[#080c10]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-xs text-slate-300">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>مياه طبيعية 100% بدون أي تسخين صناعي</span>
        </div>
      </div>

      {/* Center Wide Grid of Benefits Spanning the Screen */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 my-auto space-y-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-xl">
            سر الراحة والعافية في فندق وشاليهات مدينة الفوارة
          </h2>
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            من قديم الزمان ومنطقة حمام جارف في بلاد الروس مقصد لكل من يدور العافية وتجديد النشاط. هنا جمعنا لك نعمة مياه الينابيع الحارة مع فخامة الإقامة وخصوصية الجاكوزي في غرفتك.
          </p>
        </div>

        {/* 4 Wide Glass Cards Spanning Across the Screen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-right">
          {benefits.map((b, i) => {
            const IconComponent = b.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-3xl bg-[#080c10]/85 backdrop-blur-xl border border-white/15 space-y-3 shadow-xl hover:border-emerald-500/40 transition-all group"
              >
                <div className={`w-11 h-11 rounded-2xl ${b.bg} border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`w-5 h-5 ${b.color}`} />
                </div>
                <h3 className="font-bold text-base text-white">{b.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Scroll Down Hint */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2 bg-[#080c10]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px]">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>أحواض معقمة ومياه جارية ومستمرة</span>
        </div>

        <button
          onClick={scrollToPayment}
          className="group flex items-center gap-2 bg-[#080c10]/85 backdrop-blur-md hover:bg-amber-500/20 px-6 py-2.5 rounded-full border border-amber-500/40 text-amber-300 font-bold transition-all shadow-xl"
        >
          <span>مرر للأسفل للحسابات وطرق السداد المباشر</span>
          <ArrowDown className="w-4 h-4 text-amber-400 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
