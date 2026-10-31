"use client";

import React, { useState } from "react";
import { hotelConfig, BankAccount } from "@/data/hotelConfig";
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
  Sparkles
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

  return (
    <section id="payment" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          طرق سداد سهلة ومباشرة
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          الحسابات والمحافظ البنكية المعتمدة
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          تقدر تسدد عربون أو قيمة حجزك بكل سهولة عبر محفظة جيب أو بنك الكريمي أو أي شبكة صرافة، وارسل لنا إشعار التحويل لتثبيت الحجز فوراً.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotelConfig.bankAccounts.map((acc, index) => {
          const IconComp = getBankIcon(acc.iconName);
          const isCopied = copiedAccount === acc.accountNumber;

          return (
            <div
              key={index}
              className="p-6 rounded-3xl bg-[#0f1622] border border-[#1f2a3c] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{acc.bankName}</h3>
                    <span className="text-[11px] text-slate-400">{acc.currency}</span>
                  </div>
                </div>

                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-medium">
                  معتمد
                </span>
              </div>

              <div className="p-4 bg-[#080c10] rounded-2xl border border-[#27354a] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">رقم الحساب / المحفظة:</div>
                  <div className="text-base sm:text-lg font-mono font-bold text-amber-300 tracking-wider">
                    {acc.accountNumber}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(acc.accountNumber)}
                  className={`p-2 rounded-xl text-xs flex items-center gap-1 font-semibold transition-all ${
                    isCopied
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "bg-[#1a2638] text-slate-300 hover:text-white hover:bg-amber-500 hover:text-slate-950"
                  }`}
                  title="نسخ رقم الحساب"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>نسخ الرقم</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{acc.instructions}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct WhatsApp Assistance Box */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#0f1622] to-amber-950/40 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-right">
          <h3 className="font-bold text-lg text-white">
            حولت العربون وتبغى تأكيد سريع؟
          </h3>
          <p className="text-sm text-slate-300">
            صور إشعار التحويل وأرسله على واتساب الاستقبال، وسيتم إرسال فاتورة الحجز ورابط الموقع مباشرة.
          </p>
        </div>

        <a
          href={`https://wa.me/${hotelConfig.contacts.whatsappNumber}?text=${encodeURIComponent("السلام عليكم، حولت دفعة لحجز في فندق الفوارة وأريد تأكيد الحجز")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all flex-shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>إرسال إشعار السداد على الواتساب</span>
        </a>
      </div>
    </section>
  );
}
