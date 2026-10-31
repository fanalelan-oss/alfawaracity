"use client";

import React from "react";
import Link from "next/link";
import { hotelConfig } from "@/data/hotelConfig";
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Heart, 
  ExternalLink 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#05080c] border-t border-[#1f2a3c] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5">
                <div className="w-full h-full bg-[#080c10] rounded-[14px] flex items-center justify-center font-bold text-amber-300">
                  ف
                </div>
              </div>
              <span className="font-extrabold text-lg text-white">مدينة الفوارة</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              فندق وشاليهات مدينة الفوارة السياحية - إقامة راقية، شاليهات عائلية وشبابية ومسابح بمياه كبريتية استشفائية طبيعية في حمام جارف - بلاد الروس - صنعاء.
            </p>
            <div className="pt-1">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-[#101724] px-3 py-1.5 rounded-xl border border-[#27354a]"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                لوحة كاشير الاستقبال والإدارة
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#rooms" className="hover:text-amber-300 transition-colors">
                  الأجنحة والغرف الفندقية
                </Link>
              </li>
              <li>
                <Link href="#rooms" className="hover:text-amber-300 transition-colors">
                  شاليهات خاصة ومسابح
                </Link>
              </li>
              <li>
                <Link href="#rooms" className="hover:text-amber-300 transition-colors">
                  المجالس الملكية والمناسبات
                </Link>
              </li>
              <li>
                <Link href="#sulfur" className="hover:text-amber-300 transition-colors">
                  فوائد مياه حمام جارف الكبريتية
                </Link>
              </li>
              <li>
                <Link href="#payment" className="hover:text-amber-300 transition-colors">
                  الحسابات البنكية ومحفظة جيب
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">أرقام التواصل والحجز</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href={`tel:${hotelConfig.contacts.phonePrimary}`} className="hover:text-white">
                  استقبال رئيسي: {hotelConfig.contacts.phonePrimary}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href={`tel:${hotelConfig.contacts.phoneSecondary}`} className="hover:text-white">
                  هاتف الحجوزات: {hotelConfig.contacts.phoneSecondary}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <a
                  href={`https://wa.me/${hotelConfig.contacts.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  واتساب المباشر: {hotelConfig.contacts.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Location Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">الموقع والعنوان</h4>
            <p className="text-xs text-slate-300 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                اليمن - صنعاء - مديرية بلاد الروس - منطقة حمام جارف السياحية (بجوار ينابيع المياه الكبريتية).
              </span>
            </p>
            <a
              href={hotelConfig.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline mt-1"
            >
              <span>فتح الموقع على خرائط Google</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#1f2a3c] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} فندق وشاليهات مدينة الفوارة السياحية.
          </div>
          <div className="flex items-center gap-1.5">
            <span>تم التطوير والإشراف بواسطة</span>
            <span className="font-bold text-slate-300">فن الإعلان (Fanalelan)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
