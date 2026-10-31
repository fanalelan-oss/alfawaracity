export interface BookingRecord {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  roomUnitId: string;
  roomName: string;
  bookingType: "hourly" | "daily";
  startDate: string;
  duration: number; // hours or days
  guestCount: number;
  totalAmountYER: number;
  paymentMethod: "كريمي" | "جيب" | "كاش" | "تحويل مباشر";
  paymentStatus: "paid" | "pending_verification" | "unpaid";
  transferProofImage?: string;
  status: "confirmed" | "checked_in" | "checked_out" | "cancelled";
  createdAt: string;
  notes?: string;
}

export const initialBookings: BookingRecord[] = [
  {
    id: "b-101",
    bookingCode: "AF-7821",
    customerName: "أحمد عبد الله الحيمي",
    customerPhone: "777123456",
    roomUnitId: "suite-royal-vip",
    roomName: "الجناح الملكي العائلي VIP (5 أشخاص)",
    bookingType: "daily",
    startDate: "2026-11-01",
    duration: 2,
    guestCount: 5,
    totalAmountYER: 130000,
    paymentMethod: "كريمي",
    paymentStatus: "paid",
    status: "confirmed",
    createdAt: "2026-10-31 16:30",
    notes: "طلب تجهيز الجاكوزي عند الوصول الساعة 4 عصراً"
  },
  {
    id: "b-102",
    bookingCode: "AF-7822",
    customerName: "محمد ناصر الصنعاني",
    customerPhone: "734998877",
    roomUnitId: "majlis-large-50",
    roomName: "المجلس الملكي الكبير (يتسع لـ 50 شخص)",
    bookingType: "hourly",
    startDate: "2026-11-01",
    duration: 5,
    guestCount: 35,
    totalAmountYER: 100000,
    paymentMethod: "جيب",
    paymentStatus: "paid",
    status: "checked_in",
    createdAt: "2026-10-31 18:10",
    notes: "جلسة مقيل ومناسبة عائلية"
  },
  {
    id: "b-103",
    bookingCode: "AF-7823",
    customerName: "يحيى قاسم اليريمي",
    customerPhone: "780554433",
    roomUnitId: "chalet-private-hours",
    roomName: "شاليه الشباب والعوائل الخاص",
    bookingType: "hourly",
    startDate: "2026-11-02",
    duration: 4,
    guestCount: 6,
    totalAmountYER: 60000,
    paymentMethod: "كريمي",
    paymentStatus: "pending_verification",
    transferProofImage: "/images/img_024_pbsl87kg7dgr3g2l4q11dqek.jpeg",
    status: "confirmed",
    createdAt: "2026-10-31 20:45",
    notes: "تم إرسال إشعار السند عبر تطبيق كريمي"
  },
  {
    id: "b-104",
    bookingCode: "AF-7824",
    customerName: "صالح علي المطري",
    customerPhone: "771882299",
    roomUnitId: "room-family-vip",
    roomName: "غرفة نوم عائلية VIP مع جاكوزي",
    bookingType: "daily",
    startDate: "2026-10-30",
    duration: 1,
    guestCount: 3,
    totalAmountYER: 45000,
    paymentMethod: "كاش",
    paymentStatus: "paid",
    status: "checked_out",
    createdAt: "2026-10-30 11:00",
    notes: "تم تسجيل المغادرة بدون ملاحظات"
  }
];
