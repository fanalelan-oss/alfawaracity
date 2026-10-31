import QRCode from "qrcode";
import { hotelConfig } from "@/data/hotelConfig";
import { BookingRecord } from "@/data/mockBookings";

export interface WhatsAppSessionState {
  connected: boolean;
  phoneNumber?: string;
  qrCodeDataUrl?: string;
  lastConnectedAt?: string;
  pendingMessagesCount: number;
}

// Generate realistic QR for receptionist to link their WhatsApp
export async function generateWhatsAppQr(sessionSeed: string = "alfawara-session"): Promise<string> {
  const payload = `2@${Date.now()},${sessionSeed},hotel-alfawara-pos-client,${Math.random().toString(36).substring(7)}`;
  try {
    const qrDataUrl = await QRCode.toDataURL(payload, {
      width: 280,
      margin: 2,
      color: {
        dark: "#080c10",
        light: "#ffffff",
      },
    });
    return qrDataUrl;
  } catch (err) {
    console.error("QR Code generation error:", err);
    return "";
  }
}

// Clean and format phone number for WhatsApp
export function formatPhoneNumberForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("05") || cleaned.startsWith("01")) {
    cleaned = cleaned.substring(1);
  }
  if (!cleaned.startsWith("967") && cleaned.length >= 9) {
    cleaned = `967${cleaned}`;
  } else if (!cleaned.startsWith("967")) {
    cleaned = `967${cleaned}`;
  }
  return cleaned;
}

// Message Templates in warm, friendly, everyday Arabic
export function createBookingConfirmationMessage(booking: BookingRecord): string {
  const durationLabel = booking.bookingType === "hourly" 
    ? `${booking.duration} ساعات` 
    : `${booking.duration} ليلة`;

  return `*حياك الله يا ${booking.customerName} في فندق وشاليهات مدينة الفوارة 🌿*

تم تسجيل حجزك بنجاح وسعادتنا بخدمتك كبيرة:
📋 *رقم الحجز:* ${booking.bookingCode}
🏨 *الوحدة المحجوزة:* ${booking.roomName}
⏰ *مدة الإقامة:* ${durationLabel}
📅 *تاريخ الحجز:* ${booking.startDate}
👥 *عدد الضيوف:* ${booking.guestCount} أفراد
💰 *المبلغ الإجمالي:* ${booking.totalAmountYER.toLocaleString()} ريال يمني
💳 *طريقة الدفع:* ${booking.paymentMethod}
📌 *حالة السداد:* ${booking.paymentStatus === 'paid' ? 'تم استلام المبلغ بنجاح ✅' : 'قيد تأكيد الإشعار ⏳'}

📍 *موقعنا:* صنعاء - بلاد الروس - حمام جارف الطبيعي
🔗 رابط الموقع على الخريطة: ${hotelConfig.location.googleMapsUrl}

إذا عندك أي استفسار أو تحب نجهز لك الجاكوزي مسبقاً، تواصل معنا على هذا الرقم مباشرة. نتمنى لك إقامة ممتعة ومليانة راحة وعافية!`;
}

export function createWelcomeDirectionsMessage(customerName: string): string {
  return `*أهلاً بك يا ${customerName} في فندق وشاليهات مدينة الفوارة 🌸*

نوجه لك أطيب التحايا ويسرنا تزويدك بإرشادات الوصول:
🚗 *خط السير:* صنعاء ⬅️ اتجاه بلاد الروس ⬅️ الوصول إلى منطقة حمام جارف الطبيعي (الطريق مسفلت وميسر للجميع).
♨️ المياه الكبريتية جاهزة ودافئة على مدار الساعة لراحتك.
📞 هاتف الاستقبال المباشر للمساعدة: ${hotelConfig.contacts.phonePrimary}

حياك الله في أي وقت بيتك ومطرحك!`;
}

export function createFollowUpReviewMessage(customerName: string, roomName: string): string {
  return `*نتمنى لك دوام الصحة والعافية يا ${customerName} 🌿*

نشكرك على زيارتك لـ *فندق وشاليهات مدينة الفوارة* وإقامتك في (${roomName}).
رأيك يهمنا ويسعدنا جداً! نتمنى كانت إقامتك واستجمامك بالمياه الكبريتية ممتعة ومريحة، ونسعد باستقبالك أنت وعائلتك الكريمة في أي وقت قادم. 

في حفظ الله ورعايته!`;
}

// Generate direct wa.me link for instant customer messaging
export function generateWhatsAppLink(phoneNumber: string, messageText: string): string {
  const targetPhone = formatPhoneNumberForWhatsApp(phoneNumber);
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${targetPhone}?text=${encodedText}`;
}
