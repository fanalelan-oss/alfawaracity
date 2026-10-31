"use client";

import React from "react";
import Image from "next/image";
import SteamEffect from "./SteamEffect";
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
    const el = document.getElementById("payment");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="sulfur" className="relative min-h-screen flex flex-col justify-between py-16 bg-[#080c10] border-t border-[#1f2a3c] overflow-hidden select-none">
      {/* Ambient Rising Steam Effect */}
      <SteamEffect density="medium" height="h-64" tint="turquoise" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              عافية واستشفاء طبيعي في حمام جارف
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              سر الراحة في فندق وشاليهات مدينة الفوارة
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              من زمان ومنطقة حمام جارف في بلاد الروس مقصد لكل من يدور العافية وراحة البال. في مدينة الفوارة، جمعنا لك هذي النعمة الربانية مع فخامة الفندق وخصوصية الشاليه والجاكوزي الخاص في غرفتك.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {benefits.map((b, i) => {
                const IconComponent = b.icon;
                return (
                  <div key={i} className="p-4 rounded-2xl bg-[#0f1622] border border-[#1f2a3c] space-y-2">
                    <div className={`w-9 h-9 rounded-xl ${b.bg} flex items-center justify-center`}>
                      <IconComponent className={`w-5 h-5 ${b.color}`} />
                    </div>
                    <h3 className="font-bold text-sm text-white">{b.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image Showcase with Real Scraped Sulfur Pool */}
          <div className="relative">
            <div className="relative w-full h-[460px] rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-emerald-950/30">
              <Image
                src="/images/units/pool_family_thermal_water.jpeg"
                alt="مسابح المياه الكبريتية في حمام جارف فندق الفوارة"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c10] via-transparent to-black/20" />

              <div className="absolute bottom-6 right-6 left-6 p-4 rounded-2xl bg-[#080c10]/90 backdrop-blur-md border border-[#1f2a3c]">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  مياه طبيعية 100% بدون أي تسخين صناعي
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  حرارة نابعة من عمق الأرض في جارف لتمنح جسدك الدفء والاسترخاء الفوري.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition to Next Screen */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex justify-end z-20 pb-4">
        <button
          onClick={scrollToPayment}
          className="group flex items-center gap-2 bg-[#0f1622] hover:bg-amber-500/20 px-5 py-2 rounded-full border border-amber-500/40 text-amber-300 font-bold transition-all shadow-lg text-xs"
        >
          <span>الانتقال إلى الحسابات البنكية وسندات السداد</span>
          <ArrowDown className="w-4 h-4 text-amber-400 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
