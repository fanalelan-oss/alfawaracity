"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useHotelStore } from "@/lib/store";
import { BookingRecord } from "@/data/mockBookings";
import { hotelConfig } from "@/data/hotelConfig";
import { createBookingConfirmationMessage, generateWhatsAppLink } from "@/lib/whatsappService";
import { 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  ExternalLink, 
  Eye, 
  Check, 
  X, 
  Search,
  Filter
} from "lucide-react";

export default function BookingsTable() {
  const { bookings, verifyPayment, updateBookingStatus } = useHotelStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProofImg, setSelectedProofImg] = useState<string | null>(null);

  const filteredBookings = bookings.filter(b => 
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.customerPhone.includes(searchTerm)
  );

  return (
    <div className="bg-[#0f1622] border border-[#1f2a3c] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg text-white">سجل حجوزات ومتابعة العملاء (CRM)</h3>
          <p className="text-xs text-slate-400">متابعة إشعارات التحويل، تأكيد الحجوزات، وإرسال رسائل الواتساب</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="بحث بالاسم أو رقم الهاتف أو كود الحجز..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#080c10] border border-[#27354a] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-[#1f2a3c] text-slate-400">
              <th className="py-3 px-3 font-semibold">كود الحجز</th>
              <th className="py-3 px-3 font-semibold">النزيل</th>
              <th className="py-3 px-3 font-semibold">الوحدة</th>
              <th className="py-3 px-3 font-semibold">المدة والتاريخ</th>
              <th className="py-3 px-3 font-semibold">المبلغ</th>
              <th className="py-3 px-3 font-semibold">طريقة وسند الدفع</th>
              <th className="py-3 px-3 font-semibold">حالة الحجز</th>
              <th className="py-3 px-3 font-semibold text-center">إجراءات سريعة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f2a3c]/60">
            {filteredBookings.map((b) => (
              <tr key={b.id} className="hover:bg-[#141d2b]/50 transition-colors">
                <td className="py-3 px-3 font-mono font-bold text-amber-400">{b.bookingCode}</td>
                <td className="py-3 px-3">
                  <div className="font-bold text-white">{b.customerName}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{b.customerPhone}</div>
                </td>
                <td className="py-3 px-3 text-slate-300 font-medium max-w-[150px] truncate">
                  {b.roomName}
                </td>
                <td className="py-3 px-3 text-slate-400">
                  <div>{b.startDate}</div>
                  <div className="text-[10px] text-slate-500">
                    {b.duration} {b.bookingType === 'hourly' ? 'ساعات' : 'أيام'}
                  </div>
                </td>
                <td className="py-3 px-3 font-bold text-amber-300 whitespace-nowrap">
                  {b.totalAmountYER.toLocaleString()} YER
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">{b.paymentMethod}</span>
                    {b.paymentStatus === "paid" ? (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                        مدفوع
                      </span>
                    ) : (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        مراجعة
                      </span>
                    )}
                  </div>
                  {b.transferProofImage && (
                    <button
                      onClick={() => setSelectedProofImg(b.transferProofImage!)}
                      className="mt-1 text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      معاينة صورة السند
                    </button>
                  )}
                </td>
                <td className="py-3 px-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    b.status === "confirmed" ? "bg-amber-500/20 text-amber-300" :
                    b.status === "checked_in" ? "bg-emerald-500/20 text-emerald-300" :
                    b.status === "checked_out" ? "bg-slate-700 text-slate-300" : "bg-rose-500/20 text-rose-300"
                  }`}>
                    {b.status === "confirmed" && "مؤكد"}
                    {b.status === "checked_in" && "مسكن الآن"}
                    {b.status === "checked_out" && "مغادر"}
                    {b.status === "cancelled" && "ملغي"}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center justify-center gap-1.5">
                    {/* Verify payment if pending */}
                    {b.paymentStatus === "pending_verification" && (
                      <button
                        onClick={() => verifyPayment(b.id)}
                        className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1"
                        title="اعتماد السند كمدفوع"
                      >
                        <Check className="w-3 h-3" />
                        اعتماد
                      </button>
                    )}

                    {/* Check In / Out toggle */}
                    {b.status === "confirmed" && (
                      <button
                        onClick={() => updateBookingStatus(b.id, "checked_in")}
                        className="p-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-[10px] font-bold"
                        title="تسكين النزيل"
                      >
                        تسكين
                      </button>
                    )}

                    {b.status === "checked_in" && (
                      <button
                        onClick={() => updateBookingStatus(b.id, "checked_out")}
                        className="p-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-[10px] font-bold"
                        title="تسجيل المغادرة"
                      >
                        مغادرة
                      </button>
                    )}

                    {/* Direct WhatsApp Trigger */}
                    <a
                      href={generateWhatsAppLink(
                        b.customerPhone,
                        createBookingConfirmationMessage(b)
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 rounded-lg transition-colors"
                      title="إرسال تأكيد الحجز واتساب"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Transfer Slip Preview */}
      {selectedProofImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative bg-[#0f1622] p-4 rounded-3xl border border-[#27354a] max-w-md w-full space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3c]">
              <h4 className="font-bold text-sm text-white">معاينة سند التحويل البنكي</h4>
              <button onClick={() => setSelectedProofImg(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-900 border border-[#1f2a3c]">
              <Image src={selectedProofImg} alt="سند التحويل" fill className="object-contain" />
            </div>
            <button
              onClick={() => setSelectedProofImg(null)}
              className="w-full py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
            >
              تمت المعاينة والمطابقة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
