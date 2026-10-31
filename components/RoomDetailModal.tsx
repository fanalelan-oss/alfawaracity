"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RoomUnit } from "@/data/roomsData";
import { hotelConfig } from "@/data/hotelConfig";
import { useHotelStore } from "@/lib/store";
import { createBookingConfirmationMessage, generateWhatsAppLink } from "@/lib/whatsappService";
import { 
  X, 
  Check, 
  Calendar, 
  Clock, 
  Users, 
  CreditCard, 
  MessageCircle, 
  Upload, 
  Copy, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

interface RoomDetailModalProps {
  unit: RoomUnit | null;
  onClose: () => void;
}

export default function RoomDetailModal({ unit, onClose }: RoomDetailModalProps) {
  const { addBooking } = useHotelStore();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bookingMode, setBookingMode] = useState<"daily" | "hourly">(
    unit?.bookingType === "hourly" ? "hourly" : "daily"
  );
  const [duration, setDuration] = useState<number>(unit?.bookingType === "hourly" ? 3 : 1);
  const [guestCount, setGuestCount] = useState<number>(4);
  const [startDate, setStartDate] = useState<string>("2026-11-01");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"كريمي" | "جيب" | "كاش" | "تحويل مباشر">("كريمي");
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<any>(null);

  if (!unit) return null;

  // Calculate total price
  const unitPrice = bookingMode === "hourly" ? unit.pricePerHourYER : unit.pricePerDayYER;
  const totalPriceYER = unitPrice * duration;
  const approxSAR = Math.round(totalPriceYER / 145);

  const handleCopyAccount = (acc: string, bank: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("فضلاً أدخل اسمك ورقم هاتفك للتأكيد");
      return;
    }

    const booking = addBooking({
      customerName,
      customerPhone,
      roomUnitId: unit.id,
      roomName: unit.name,
      bookingType: bookingMode,
      startDate,
      duration,
      guestCount,
      totalAmountYER: totalPriceYER,
      paymentMethod,
      paymentStatus: paymentMethod === "كاش" ? "unpaid" : "pending_verification",
      status: "confirmed",
      notes: `حجز مباشر عبر المنصة لـ ${duration} ${bookingMode === 'hourly' ? 'ساعات' : 'أيام'}`
    });

    setCreatedBooking(booking);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#0f1622] border border-[#27354a] rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f2a3c] bg-[#0c121a]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg text-white">
              {unit.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#1a2638] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!isSuccess ? (
            <>
              {/* Image Preview & Gallery */}
              <div className="space-y-3">
                <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#1f2a3c] bg-slate-900">
                  <Image
                    src={unit.images[activeImageIndex] || unit.images[0]}
                    alt={unit.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-[#080c10]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-amber-500/30">
                    صورة حقيقية من الموقع
                  </div>
                </div>
                {/* Thumbnails */}
                {unit.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {unit.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                          activeImageIndex === idx ? "border-amber-400 scale-95" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description & Amenities */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-300">وصف ومميزات الوحدة:</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {unit.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {unit.amenities.map((am, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-[#141d2b] px-3 py-2 rounded-xl border border-[#1f2a3c]">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking & Pricing Form */}
              <form onSubmit={handleBookingSubmit} className="bg-[#090e15] p-5 rounded-2xl border border-[#1f2a3c] space-y-4">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  تفاصيل الحجز والسداد
                </h4>

                {/* Mode Selector */}
                {unit.bookingType === "both" && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setBookingMode("daily")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        bookingMode === "daily"
                          ? "bg-amber-400 text-slate-950"
                          : "bg-[#141d2b] text-slate-400 hover:text-white"
                      }`}
                    >
                      حجز باليوم ({unit.pricePerDayYER.toLocaleString()} ريال/يوم)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingMode("hourly")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        bookingMode === "hourly"
                          ? "bg-amber-400 text-slate-950"
                          : "bg-[#141d2b] text-slate-400 hover:text-white"
                      }`}
                    >
                      حجز بالساعة ({unit.pricePerHourYER.toLocaleString()} ريال/ساعة)
                    </button>
                  </div>
                )}

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      {bookingMode === "hourly" ? "عدد الساعات" : "عدد الليالي"}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={duration}
                      onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-[#141d2b] border border-[#27354a] rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">تاريخ الوصول</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-[#141d2b] border border-[#27354a] rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">عدد الضيوف</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full bg-[#141d2b] border border-[#27354a] rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                {/* Customer Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">الاسم الكامل *</label>
                    <input
                      type="text"
                      placeholder="مثال: صالح محمد اليريمي"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#141d2b] border border-[#27354a] rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">رقم الواتساب / الهاتف *</label>
                    <input
                      type="tel"
                      placeholder="مثال: 771234567"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#141d2b] border border-[#27354a] rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* Payment Accounts Guide */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    طريقة السداد المعتمدة للحجز:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {hotelConfig.bankAccounts.slice(0, 2).map((acc, i) => (
                      <div key={i} className="p-3 bg-[#121a26] border border-[#27354a] rounded-xl flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{acc.bankName}</div>
                          <div className="text-xs text-amber-300 font-mono mt-0.5">{acc.accountNumber}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyAccount(acc.accountNumber, acc.bankName)}
                          className="p-1.5 bg-[#1b2637] rounded-lg text-slate-300 hover:text-white hover:bg-amber-500 hover:text-slate-950 transition-all text-xs flex items-center gap-1"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedBank === acc.bankName ? "تم النسخ" : "نسخ"}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary & Submit */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-emerald-950/30 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-400">الإجمالي المستحق:</div>
                    <div className="text-xl font-extrabold text-amber-300">
                      {totalPriceYER.toLocaleString()} <span className="text-xs font-normal text-slate-300">ريال يمني</span>
                      <span className="text-xs text-slate-400 mr-2">≈ ({approxSAR} ريال سعودي)</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تأكيد الحجز وإرسال الفاتورة</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                تم تسجيل حجزك بنجاح يا {customerName}! 🎉
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                رقم حجزك المعتمد هو <span className="font-mono font-bold text-amber-400">{createdBooking?.bookingCode}</span>.
                تم إدراج حجزك في نظام الاستقبال، ويمكنك الآن تأكيد تفاصيلك عبر واتساب بضغطة زر واحدة.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateWhatsAppLink(
                    hotelConfig.contacts.whatsappNumber,
                    createBookingConfirmationMessage(createdBooking)
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تأكيد الحجز ومراسلتنا على الواتساب</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-[#151f2e] text-slate-300 hover:text-white rounded-xl text-sm font-semibold border border-[#27354a]"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
