"use client";

import React, { useState } from "react";
import { useHotelStore } from "@/lib/store";
import { roomsData } from "@/data/roomsData";
import { hotelConfig } from "@/data/hotelConfig";
import { createBookingConfirmationMessage, generateWhatsAppLink } from "@/lib/whatsappService";
import { 
  CreditCard, 
  Printer, 
  Send, 
  UserCheck, 
  PlusCircle, 
  CheckCircle2, 
  Sparkles,
  Receipt,
  QrCode
} from "lucide-react";

export default function CashierPOS() {
  const { addBooking } = useHotelStore();
  const [selectedUnitId, setSelectedUnitId] = useState<string>(roomsData[0].id);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [mode, setMode] = useState<"daily" | "hourly">("daily");
  const [duration, setDuration] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<"كريمي" | "جيب" | "كاش" | "تحويل مباشر">("كاش");
  const [receiptBooking, setReceiptBooking] = useState<any>(null);

  const currentUnit = roomsData.find(u => u.id === selectedUnitId) || roomsData[0];
  const unitPrice = mode === "hourly" ? currentUnit.pricePerHourYER : currentUnit.pricePerDayYER;
  const totalAmountYER = unitPrice * duration;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("يرجى إدخال اسم العميل ورقم هاتفه");
      return;
    }

    const booking = addBooking({
      customerName,
      customerPhone,
      roomUnitId: currentUnit.id,
      roomName: currentUnit.name,
      bookingType: mode,
      startDate: new Date().toISOString().split("T")[0],
      duration,
      guestCount: 4,
      totalAmountYER,
      paymentMethod,
      paymentStatus: "paid",
      status: "checked_in",
      notes: "تسجيل فوري عبر كاشير الاستقبال (POS)"
    });

    setReceiptBooking(booking);
    setCustomerName("");
    setCustomerPhone("");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* POS Input Terminal */}
      <div className="lg:col-span-2 bg-[#0f1622] border border-[#1f2a3c] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#1f2a3c]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">نظام الكاشير ونقاط البيع (Reception POS)</h3>
              <p className="text-xs text-slate-400">تسجيل وتسكين سريع وإصدار فواتير وسندات القبض الفورية</p>
            </div>
          </div>

          <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
            الكاشير متصل وجاهز
          </span>
        </div>

        <form onSubmit={handleCheckout} className="space-y-4">
          {/* Room selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                الوحدة أو الشاليه المراد تسكينه
              </label>
              <select
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(e.target.value)}
                className="w-full bg-[#080c10] border border-[#27354a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                {roomsData.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} - ({u.pricePerDayYER.toLocaleString()} ريال/يوم)
                  </option>
                ))}
              </select>
            </div>

            {/* Mode & Duration */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                نوع المدة
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode("daily")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    mode === "daily" ? "bg-amber-400 text-slate-950 font-bold" : "bg-[#080c10] text-slate-400"
                  }`}
                >
                  حجز باليوم
                </button>
                <button
                  type="button"
                  onClick={() => setMode("hourly")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    mode === "hourly" ? "bg-amber-400 text-slate-950 font-bold" : "bg-[#080c10] text-slate-400"
                  }`}
                >
                  حجز بالساعة
                </button>
              </div>
            </div>
          </div>

          {/* Customer info & Duration count */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {mode === "hourly" ? "عدد الساعات" : "عدد الأيام"}
              </label>
              <input
                type="number"
                min={1}
                value={duration}
                onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
                className="w-full bg-[#080c10] border border-[#27354a] rounded-xl px-4 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                اسم النزيل *
              </label>
              <input
                type="text"
                required
                placeholder="مثال: يحيى صالح الصنعاني"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#080c10] border border-[#27354a] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                رقم جوال النزيل *
              </label>
              <input
                type="tel"
                required
                placeholder="مثال: 771234567"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-[#080c10] border border-[#27354a] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              طريقة تحصيل المبلغ
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["كاش", "كريمي", "جيب", "تحويل مباشر"] as const).map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    paymentMethod === method
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 border-amber-300"
                      : "bg-[#080c10] border-[#27354a] text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {method === "كاش" && "💵 "}
                  {method === "كريمي" && "🏦 "}
                  {method === "جيب" && "📱 "}
                  {method === "تحويل مباشر" && "⚡ "}
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing bar & Action */}
          <div className="pt-4 p-4 rounded-2xl bg-[#080c10] border border-[#1f2a3c] flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">إجمالي الحساب المستحق:</div>
              <div className="text-2xl font-black text-amber-400">
                {totalAmountYER.toLocaleString()} <span className="text-sm font-normal text-slate-300">ريال يمني</span>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2 transition-all"
            >
              <UserCheck className="w-4 h-4" />
              <span>إتمام القبض والتسكين الفوري</span>
            </button>
          </div>
        </form>
      </div>

      {/* Invoice & Receipt Preview */}
      <div className="bg-[#0f1622] border border-[#1f2a3c] rounded-3xl p-6 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#1f2a3c]">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-amber-400" />
              معاينة الفاتورة الحرارية
            </h4>
            <span className="text-[10px] text-slate-400">POS Slip</span>
          </div>

          {receiptBooking ? (
            <div className="mt-4 p-4 rounded-2xl bg-white text-slate-900 font-mono text-xs space-y-3 shadow-md">
              <div className="text-center pb-2 border-b border-dashed border-slate-300">
                <div className="font-black text-sm">فندق وشاليهات مدينة الفوارة</div>
                <div className="text-[10px] text-slate-600">صنعاء - بلاد الروس - حمام جارف</div>
                <div className="text-[10px] text-slate-600">هاتف: {hotelConfig.contacts.phonePrimary}</div>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>رقم السند:</span>
                  <span className="font-bold">{receiptBooking.bookingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span>النزيل:</span>
                  <span>{receiptBooking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>الهاتف:</span>
                  <span>{receiptBooking.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span>الوحدة:</span>
                  <span className="font-bold truncate max-w-[140px]">{receiptBooking.roomName}</span>
                </div>
                <div className="flex justify-between">
                  <span>المدة:</span>
                  <span>{receiptBooking.duration} {receiptBooking.bookingType === 'hourly' ? 'ساعات' : 'أيام'}</span>
                </div>
                <div className="flex justify-between">
                  <span>طريقة الدفع:</span>
                  <span className="font-bold">{receiptBooking.paymentMethod}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-slate-300 flex justify-between text-sm font-black">
                <span>المبلغ المدفوع:</span>
                <span>{receiptBooking.totalAmountYER.toLocaleString()} YER</span>
              </div>

              <div className="text-center pt-2 text-[9px] text-slate-500">
                شكرًا لزيارتكم ونتمنى لكم أطيب الأوقات!
              </div>
            </div>
          ) : (
            <div className="mt-8 py-12 text-center text-slate-500 space-y-2">
              <QrCode className="w-12 h-12 mx-auto opacity-40" />
              <p className="text-xs">سجل عملية تسكين جديدة لإصدار الفاتورة الفورية</p>
            </div>
          )}
        </div>

        {receiptBooking && (
          <div className="space-y-2 pt-2">
            <button
              onClick={handlePrint}
              className="w-full py-2.5 bg-[#151f2e] border border-[#27354a] text-slate-200 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة إيصال القبض الحراري</span>
            </button>
            <a
              href={generateWhatsAppLink(
                receiptBooking.customerPhone,
                createBookingConfirmationMessage(receiptBooking)
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>إرسال الفاتورة عبر واتساب للنزيل</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
