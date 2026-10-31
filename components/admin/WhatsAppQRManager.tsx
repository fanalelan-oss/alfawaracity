"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useHotelStore } from "@/lib/store";
import { generateWhatsAppQr, createWelcomeDirectionsMessage, generateWhatsAppLink } from "@/lib/whatsappService";
import { hotelConfig } from "@/data/hotelConfig";
import { 
  QrCode, 
  CheckCircle2, 
  RefreshCw, 
  MessageCircle, 
  ShieldCheck, 
  Send, 
  Smartphone,
  AlertCircle,
  Sparkles
} from "lucide-react";

export default function WhatsAppQRManager() {
  const { isWaConnected, toggleWhatsAppConnection } = useHotelStore();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [testPhone, setTestPhone] = useState<string>("771234567");
  const [testMessage, setTestMessage] = useState<string>(
    `حياك الله في فندق وشاليهات مدينة الفوارة! تم ربط نظام واتساب التلقائي بنجاح 🌿`
  );
  const [sentNotice, setSentNotice] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const refreshQr = async () => {
    setIsGenerating(true);
    const qr = await generateWhatsAppQr(`session-${Date.now()}`);
    setQrCodeUrl(qr);
    setIsGenerating(false);
  };

  useEffect(() => {
    refreshQr();
  }, []);

  const handleSimulateScan = () => {
    toggleWhatsAppConnection(true);
  };

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    const link = generateWhatsAppLink(testPhone, testMessage);
    window.open(link, "_blank");
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 4000);
  };

  return (
    <div className="bg-[#0f1622] border border-[#1f2a3c] rounded-3xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f2a3c]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">
              محرك واتساب المجاني (Zero-Cost WhatsApp Engine)
            </h3>
            <p className="text-xs text-slate-400">
              ربط مباشر بهاتف استقبال الفندق بمسح الباركود، وبدون أي تكاليف أو اشتراكات شهرية
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isWaConnected ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              الجلسة متصلة ومفعلة (967784555525)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <AlertCircle className="w-4 h-4" />
              بانتظار مسح الباركود
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* QR Section */}
        <div className="p-6 rounded-2xl bg-[#090e15] border border-[#1f2a3c] flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-52 h-52 bg-white p-2 rounded-2xl shadow-xl flex items-center justify-center flex-shrink-0">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="WhatsApp QR Code" className="w-full h-full object-contain" />
            ) : (
              <div className="text-slate-500 text-xs text-center font-mono">جارٍ توليد الرمز...</div>
            )}
            {isWaConnected && (
              <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-center p-3 text-emerald-300 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                <span className="text-xs font-bold">تم ربط الهاتف بنجاح!</span>
                <button
                  onClick={() => toggleWhatsAppConnection(false)}
                  className="text-[10px] text-rose-300 underline"
                >
                  فصل الجلسة وإعادة الربط
                </button>
              </div>
            )}
          </div>

          <div className="space-y-3 text-right">
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-amber-400" />
              خطوات ربط جوال الفندق:
            </h4>
            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>افتح تطبيق واتساب على جوال الاستقبال.</li>
              <li>انتقل إلى <strong>الأجهزة المرتبطة (Linked Devices)</strong>.</li>
              <li>اضغط على <strong>ربط جهاز</strong> ووجه الكاميرا نحو الباركود.</li>
            </ol>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={refreshQr}
                disabled={isGenerating}
                className="px-3 py-1.5 bg-[#141d2b] hover:bg-[#1a2638] text-slate-300 text-xs rounded-xl border border-[#27354a] flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
                <span>تحديث الباركود</span>
              </button>

              {!isWaConnected && (
                <button
                  type="button"
                  onClick={handleSimulateScan}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  تأكيد المسح والاتصال
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Test Messenger & Templates */}
        <form onSubmit={handleSendTest} className="p-6 rounded-2xl bg-[#090e15] border border-[#1f2a3c] space-y-4">
          <h4 className="font-bold text-sm text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            اختبار إرسال الرسائل التلقائية
          </h4>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              رقم هاتف العميل للتجربة:
            </label>
            <input
              type="tel"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              className="w-full bg-[#141d2b] border border-[#27354a] rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              نص الرسالة:
            </label>
            <textarea
              rows={3}
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              className="w-full bg-[#141d2b] border border-[#27354a] rounded-xl p-3 text-xs text-white leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTestMessage(createWelcomeDirectionsMessage("ضيفنا الكريم"))}
                className="text-[10px] bg-[#151f2e] text-slate-300 px-2 py-1 rounded-lg border border-[#27354a] hover:text-white"
              >
                قالب إرشادات الطريق
              </button>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال تجريبي</span>
            </button>
          </div>

          {sentNotice && (
            <div className="text-center text-xs text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30 p-2 rounded-xl">
              تم تجهيز وإرسال رسالة الواتساب بنجاح!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
