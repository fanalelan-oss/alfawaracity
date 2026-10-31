"use client";

import React from "react";
import { useHotelStore, RoomStatus, RoomStateInfo } from "@/lib/store";
import { roomsData } from "@/data/roomsData";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  User, 
  DoorClosed,
  BedDouble,
  RefreshCw
} from "lucide-react";

export default function RoomStatusGrid() {
  const { roomStates, setRoomStatus } = useHotelStore();

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case "available":
        return {
          label: "متاح للحجز",
          color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          dot: "bg-emerald-500"
        };
      case "occupied":
        return {
          label: "مسكون حالياً",
          color: "bg-rose-500/10 text-rose-400 border-rose-500/30",
          dot: "bg-rose-500"
        };
      case "reserved":
        return {
          label: "محجوز مسبقاً",
          color: "bg-amber-500/10 text-amber-300 border-amber-500/30",
          dot: "bg-amber-500"
        };
      case "cleaning":
        return {
          label: "قيد التنظيف والتعقيم",
          color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
          dot: "bg-cyan-500"
        };
    }
  };

  const handleStatusChange = (unitId: string, newStatus: RoomStatus) => {
    const guest = newStatus === "occupied" ? prompt("اسم النزيل المسكن:") || undefined : undefined;
    setRoomStatus(unitId, newStatus, guest);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg text-white">
            خريطة إشغال الغرف والشاليهات المباشرة (Live Room Grid)
          </h3>
          <p className="text-xs text-slate-400">
            تحديث فوري لحالة كل وحدة، مع إمكانية تعديل الحالة بنقرة واحدة من قبل موظف الاستقبال
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            متاح
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            مسكون
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            محجوز
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            تنظيف
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roomsData.map((unit) => {
          const state: RoomStateInfo = roomStates[unit.id] || { unitId: unit.id, status: "available" };
          const badge = getStatusBadge(state.status);

          return (
            <div
              key={unit.id}
              className="p-5 rounded-2xl bg-[#0f1622] border border-[#1f2a3c] flex flex-col justify-between space-y-4 hover:border-[#2f3e58] transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                    {badge.label}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {unit.category.toUpperCase()}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-white line-clamp-1">
                  {unit.name}
                </h4>

                {state.currentGuestName && (
                  <div className="p-2 rounded-xl bg-[#090e15] border border-[#1f2a3c] text-xs text-slate-300 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="truncate">{state.currentGuestName}</span>
                  </div>
                )}

                {state.expectedCheckOut && (
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>المغادرة المتوقعة: {state.expectedCheckOut}</span>
                  </div>
                )}
              </div>

              {/* Status Switcher Buttons */}
              <div className="pt-3 border-t border-[#1f2a3c] flex items-center justify-between gap-1">
                <button
                  onClick={() => handleStatusChange(unit.id, "available")}
                  className={`flex-1 py-1 text-[10px] rounded-lg font-semibold transition-all ${
                    state.status === "available"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "bg-[#151f2e] text-slate-400 hover:text-white"
                  }`}
                  title="متاح"
                >
                  متاح
                </button>
                <button
                  onClick={() => handleStatusChange(unit.id, "occupied")}
                  className={`flex-1 py-1 text-[10px] rounded-lg font-semibold transition-all ${
                    state.status === "occupied"
                      ? "bg-rose-500 text-white font-bold"
                      : "bg-[#151f2e] text-slate-400 hover:text-white"
                  }`}
                  title="مسكون"
                >
                  مسكون
                </button>
                <button
                  onClick={() => handleStatusChange(unit.id, "reserved")}
                  className={`flex-1 py-1 text-[10px] rounded-lg font-semibold transition-all ${
                    state.status === "reserved"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-[#151f2e] text-slate-400 hover:text-white"
                  }`}
                  title="محجوز"
                >
                  محجوز
                </button>
                <button
                  onClick={() => handleStatusChange(unit.id, "cleaning")}
                  className={`flex-1 py-1 text-[10px] rounded-lg font-semibold transition-all ${
                    state.status === "cleaning"
                      ? "bg-cyan-500 text-slate-950 font-bold"
                      : "bg-[#151f2e] text-slate-400 hover:text-white"
                  }`}
                  title="تنظيف"
                >
                  تنظيف
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
