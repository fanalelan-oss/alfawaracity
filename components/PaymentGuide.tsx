"use client";

import React, { useState } from "react";
import Link from "next/link";
import { hotelConfig } from "@/data/hotelConfig";
import { 
  CreditCard, 
  Wallet, 
  Landmark, 
  DollarSign, 
  Send, 
  Copy, 
  Check, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles,
  Phone,
  MapPin,
  ExternalLink,
  ChevronUp
} from "lucide-react";

export default function PaymentGuide() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (accNum: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedAccount(accNum);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const getBankIcon = (iconName: string) => {
    switch (iconName) {
      case "Wallet": return Wallet;
      case "Landmark": return Landmark;
      case "DollarSign": return DollarSign;
      case "Send": return Send;
      default: return CreditCard;
    }
  };

  const scrollToTop = () => {
    const el = document.getElementById("hero");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="payment" 
      className="snap-section bg-[#060a0f] select-none"
    >
      {/* Top Header Tag */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[#080c10]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-500/30">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-amber-300">
            حسابات السداد المعتمدة وتأكيد الحجز الفوري
          </span>
        </div>

        <Link
          href="/admin"
          className="flex items-center gap-2 bg-[#121c29] hover:bg-[#1b283b] text-amber-300 px-4 py-2 rounded-2xl border border-amber-500/30 text-xs font-bold transition-all shadow-md"
        >
          <CreditCard className="w-4 h-4" />
          <span>الدخول إلى لوحة الكاشير</span>
        </Link>
      </div>

      {/* Main Content Filling the Screen */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 my-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            طرق الدفع والحسابات البنكية المعتمدة
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            سدد العربون أو كامل الحجز عبر محفظة جيب أو بنك الكريمي، وانسخ الرقم بنقرة واحدة
          </p>
        </div>

        {/* 5 Wide Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotelConfig.bankAccounts.map((acc, index) => {
            const IconComp = getBankIcon(acc.iconName);
            const isCopied = copiedAccount === acc.accountNumber;

            return (
              <div
                key={index}
                className="p-5 rounded-3xl bg-[#0b121b]/90 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{acc.bankName}</h3>
                      <span className="text-[10px] text-slate-400">{acc.currency}</span>
                    </div>
                  </div>

                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                    معتمد
                  </span>
                </div>

                <div className="p-3 bg-[#06090e] rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="text-base sm:text-lg font-mono font-bold text-amber-300 tracking-wider">
                    {acc.accountNumber}
                  </div>
                  <button
                    onClick={() => handleCopy(acc.accountNumber)}
                    className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 font-bold transition-all ${
                      isCopied
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-[#141f2d] text-slate-200 hover:text-white hover:bg-amber-400 hover:text-slate-950"
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? "تم النسخ!" : "نسخ"}</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{acc.instructions}</span>
                </div>
              </div>
            );
          })}

          {/* Direct WhatsApp Box as the 6th Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-[#0b121b] border border-emerald-500/40 flex flex-col justify-between space-y-3 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                تأكيد فوري عبر واتساب
              </span>
              <h4 className="font-bold text-sm text-white">
                حولت العربون وتبغى إشعار وسند القبض فوراً؟
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                صور إشعار التحويل وأرسله على واتساب الاستقبال، وسيتم إرسال فاتورة الحجز ورابط الموقع مباشرة.
              </p>
            </div>

            <a
              href={`https://wa.me/${hotelConfig.contacts.whatsappNumber}?text=${encodeURIComponent("السلام عليكم، حولت دفعة لحجز في فندق الفوارة وأريد تأكيد الحجز")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال إشعار السداد على الواتساب</span>
            </a>
          </div>
        </div>
      </div>

      {/* Integrated Sleek Footer Bar at the Bottom */}
      <footer className="relative z-30 w-full max-w-7xl mx-auto px-6 py-4 border-t border-[#1f2a3c] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white">فندق وشاليهات مدينة الفوارة</span>
          <span>• صنعاء - بلاد الروس - حمام جارف الطبيعي</span>
          <span>• هاتف الاستقبال: {hotelConfig.contacts.phonePrimary}</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors font-bold"
        >
          <span>العودة إلى أعلى الصفحة</span>
          <ChevronUp className="w-4 h-4" />
        </button>
      </footer>
    </section>
  );
}
