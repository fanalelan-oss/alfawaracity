"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { smoothScrollTo } from "@/lib/scroll";
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ArrowDown, 
  Droplets, 
  MessageCircle,
  Eye,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

interface SceneInfo {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  timeSec: number;
  durationSec: number;
  desc: string;
  hotspot: {
    label: string;
    detail: string;
    top: string;
    left: string;
  };
}

export default function ResortVideoTour() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [showHotspotDetail, setShowHotspotDetail] = useState<boolean>(false);

  const scenes: SceneInfo[] = [
    {
      id: "aerial",
      num: "01",
      title: "واحة المسابح الكبريتية الجوية",
      subtitle: "إطلالة بانورامية من سماء المنتجع",
      timeSec: 0,
      durationSec: 6,
      desc: "مسابح كبريتية خارجية مصممة بطراز هندسي طبيعي وسط مسطحات خضراء وجبال بلاد الروس.",
      hotspot: {
        label: "أحواض المياه الكبريتية المفتوحة",
        detail: "مياه دافئة تتدفق باستمرار من المنبع الطبيعي، مخصصة للعائلات مع مقاعد وجلسات مظللة.",
        top: "42%",
        left: "48%"
      }
    },
    {
      id: "corridor",
      num: "02",
      title: "أروقة الممشى والمظلة الريفية",
      subtitle: "جلسات استرخاء بأجواء هادئة",
      timeSec: 6,
      durationSec: 6,
      desc: "ممرات زجاجية رخامية حديثة مزودة بجلسات خشبية فريدة تحت إضاءات مخفية وأجواء استرخاء.",
      hotspot: {
        label: "جلسة المظلة الريفية",
        detail: "تصميم خشبي ريفي فريد للجلسات العائلية واستراحة الضيوف بين أروقة الفندق.",
        top: "46%",
        left: "50%"
      }
    },
    {
      id: "lake",
      num: "03",
      title: "بحيرة النوافير وواجهات الفندق",
      subtitle: "قلب المنتجع الحيوي والمقاهي",
      timeSec: 12,
      durationSec: 6,
      desc: "الحوض الكبريتي الرئيسي بنافورته الشاهقة أمام واجهات الأجنحة الفندقية والجلسات الشاطئية.",
      hotspot: {
        label: "نافورة مياه جارف الكبرى",
        detail: "نافورة مياه كبريتية متجددة بارتفاع شاهق وسط الحوض أمام واجهات الأجنحة الفندقية مباشرة.",
        top: "40%",
        left: "52%"
      }
    },
    {
      id: "chalets",
      num: "04",
      title: "شاليهات القرية والشلال الصخري",
      subtitle: "خصوصية كاملة للعائلات والنزلاء",
      timeSec: 18,
      durationSec: 5,
      desc: "صف الشاليهات المستقلة ذات الطابع المعماري الأنيق بجوار الشلال الملون وممشى المنتجع الترفيهي.",
      hotspot: {
        label: "شاليهات عائلية خاصة ومستقلة",
        detail: "شاليهات بخصوصية كاملة ومداخل مستقلة مع حدائق مائية ومواقف سيارات قريبة.",
        top: "38%",
        left: "36%"
      }
    },
    {
      id: "night",
      num: "05",
      title: "عروض النوافير المضيئة ليلاً",
      subtitle: "سحر المساء وأمسيات الاستجمام",
      timeSec: 23,
      durationSec: 5.3,
      desc: "عروض مائية ليلية ساحرة بإضاءات فيروزية وذهبية تنعش الأجواء بعد مغيب شمس جبال جارف.",
      hotspot: {
        label: "نوافير المياه الملونة",
        detail: "أجواء ليلية رومانسية مخصصة للنزلاء مع موسيقى هادئة وخرير المياه الكبريتية المنعش.",
        top: "52%",
        left: "50%"
      }
    }
  ];

  // Pause video when section is not in view to prevent any GPU/CPU lag
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!videoRef.current) return;
      if (entry.isIntersecting) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }, { threshold: 0.25 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Optimized lightweight scene detector: only changes state when entering a new scene
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;

    let currentIdx = 0;
    for (let i = scenes.length - 1; i >= 0; i--) {
      if (time >= scenes[i].timeSec - 0.2) {
        currentIdx = i;
        break;
      }
    }

    // Only trigger re-render if scene actually changed
    setActiveSceneIndex((prev) => {
      if (prev !== currentIdx) {
        setShowHotspotDetail(false);
        return currentIdx;
      }
      return prev;
    });
  }, [scenes]);

  const jumpToScene = (index: number) => {
    if (!videoRef.current) return;
    const targetSec = scenes[index].timeSec;
    videoRef.current.currentTime = targetSec;
    setActiveSceneIndex(index);
    setShowHotspotDetail(false);
  };

  const nextScene = () => {
    jumpToScene((activeSceneIndex + 1) % scenes.length);
  };

  const prevScene = () => {
    jumpToScene((activeSceneIndex - 1 + scenes.length) % scenes.length);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const activeScene = scenes[activeSceneIndex];

  return (
    <section 
      ref={sectionRef}
      id="resort-tour" 
      className="snap-section bg-[#05080c] select-none flex flex-col justify-between"
      style={{ contain: "paint" }}
    >
      {/* 1. Full-Bleed Video (Hardware Accelerated) */}
      <div className="absolute inset-0 z-0 overflow-hidden transform-gpu">
        <video
          ref={videoRef}
          src="/videos/resort_walkthrough.mp4"
          loop
          muted={isMuted}
          playsInline
          autoPlay
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover object-center"
        />
        {/* Crisp Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-black/20 to-[#05080c]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/50 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* TOP BAR: MINIMAL LUXURY BRAND HEADER                                      */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between pointer-events-none">
        {/* Right in RTL: Official Resort Logo */}
        <div className="pointer-events-auto flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#00b4d8] to-[#0077b6] text-white flex items-center justify-center font-bold text-xs shadow">
            ف
          </div>
          <div className="text-right">
            <div className="text-xs font-black text-white">مدينة الفوارة السياحية</div>
            <div className="text-[10px] font-semibold text-[#e5c158]">حمام جارف - صنعاء</div>
          </div>
        </div>

        {/* Center: Clean Progress Segmented Story Bars (5 Stages) */}
        <div className="pointer-events-auto flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
          {scenes.map((sc, idx) => {
            const isCurrent = activeSceneIndex === idx;

            return (
              <button
                key={sc.id}
                onClick={() => jumpToScene(idx)}
                className="group flex items-center gap-1.5 focus:outline-none"
                title={sc.title}
              >
                <div 
                  className={`w-7 sm:w-11 h-1.5 rounded-full transition-all duration-300 ${
                    isCurrent 
                      ? "bg-gradient-to-l from-[#d4af37] to-[#f3e5ab] shadow-[0_0_8px_rgba(212,175,55,0.7)] scale-105" 
                      : "bg-white/20 hover:bg-white/40"
                  }`} 
                />
                <span className={`text-[10px] font-mono transition-colors ${isCurrent ? "text-[#f3e5ab] font-bold" : "text-slate-400 group-hover:text-white"}`}>
                  {sc.num}
                </span>
              </button>
            );
          })}
        </div>

        {/* Left in RTL: Sound Toggle Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-2xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-lg"
            title={isMuted ? "تشغيل صوت الأجواء" : "كتم الصوت"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#d4af37]" />}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CENTER: SINGLE DELICATE PULSING RADAR PIN FOR THE CURRENT FEATURE         */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-6 pointer-events-none flex items-center justify-center">
        <div 
          style={{ top: activeScene.hotspot.top, left: activeScene.hotspot.left }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-500 ease-out"
        >
          <button
            onClick={() => setShowHotspotDetail(!showHotspotDetail)}
            className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-[#d4af37]/70 text-[#f3e5ab] text-xs font-extrabold shadow-xl hover:scale-105 hover:bg-black/70 transition-all shadow-[#d4af37]/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{activeScene.hotspot.label}</span>
          </button>

          {/* Interactive Popover Modal */}
          {showHotspotDetail && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-black/70 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-right space-y-2 shadow-2xl z-50 animate-fade-in">
              <div className="flex items-center justify-between text-xs text-[#f3e5ab] font-bold pb-1.5 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  مرفق طبيعي متاح للنزلاء
                </span>
                <button onClick={() => setShowHotspotDetail(false)} className="text-slate-400 hover:text-white">
                  ✕
                </button>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{activeScene.hotspot.detail}</p>
              <div className="pt-1">
                <a
                  href={`https://wa.me/967784555515?text=${encodeURIComponent(`مرحباً فندق الفوارة، أود الاستفسار والحجز في: ${activeScene.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>حجز عبر واتساب فوراً</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM AREA: ONE ULTRA-TRANSPARENT FLOATING GLASS CARD + GLIDE CUE        */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-6 sm:pb-8 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 pointer-events-none">
        
        {/* Right in RTL: THE ONE DYNAMIC FLOATING GLASS CARD (CRYSTAL TRANSPARENT) */}
        <div className="pointer-events-auto max-w-md w-full bg-black/45 backdrop-blur-xl border border-white/15 rounded-3xl p-5 shadow-2xl text-right space-y-2.5 transition-all duration-300">
          
          {/* Card Top: Stage Number & Navigation arrows */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={prevScene}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                title="المحطة السابقة"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={nextScene}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                title="المحطة التالية"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#e5c158]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>المحطة {activeScene.num} من 05</span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h2 className="text-base sm:text-lg font-black text-white leading-tight">
              {activeScene.title}
            </h2>
            <div className="text-[11px] text-slate-300 font-medium mt-0.5">
              {activeScene.subtitle}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-200 leading-relaxed">
            {activeScene.desc}
          </p>

          {/* Direct WhatsApp Booking button */}
          <div className="pt-1.5 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              متاح للزيارة والحجز اليومي
            </span>

            <a
              href={`https://wa.me/967784555515?text=${encodeURIComponent(`السلام عليكم فندق الفوارة، أرغب بحجز استفسار بخصوص: ${activeScene.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/90 to-teal-500/90 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all border border-emerald-400/30"
            >
              <span>احجز هذا المرفق</span>
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Center / Left in RTL: Clean Glide Prompt to 360 Suite */}
        <div className="pointer-events-auto">
          <button
            onClick={() => smoothScrollTo("suite-360")}
            className="group flex items-center gap-2.5 bg-black/40 backdrop-blur-md hover:bg-[#d4af37]/20 px-5 py-2.5 rounded-full border border-white/20 text-[#f3e5ab] font-bold transition-all shadow-xl text-xs hover:scale-105 active:scale-95"
          >
            <span>انتقل إلى جولة الجناح الملكي والجاكوزي 360°</span>
            <ArrowDown className="w-4 h-4 text-[#d4af37] group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
