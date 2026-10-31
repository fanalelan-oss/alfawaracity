export interface BankAccount {
  bankName: string;
  accountNumber: string;
  currency: string;
  accountHolder: string;
  iconName: string;
  instructions: string;
}

export interface HotelConfig {
  name: string;
  tagline: string;
  description: string;
  location: {
    governorate: string;
    district: string;
    area: string;
    landmark: string;
    googleMapsUrl: string;
  };
  contacts: {
    whatsappNumber: string; // international without +
    whatsappDisplay: string;
    phonePrimary: string;
    phoneSecondary: string;
    phoneEmergency: string;
  };
  bankAccounts: BankAccount[];
  features: {
    title: string;
    desc: string;
    icon: string;
  }[];
}

export const hotelConfig: HotelConfig = {
  name: "فندق وشاليهات مدينة الفوارة السياحية",
  tagline: "إقامتك المريحة في قلب الطبيعة ومياه حمام جارف الكبريتية",
  description: "أهلاً وسهلاً بكم في فندق وشاليهات مدينة الفوارة السياحية. نوفر لكم غرف عائلية وشبابية VIP، ومجالس ضيافة واسعة، وشاليهات خاصة مع مسابح وجاكوزي بمياه كبريتية طبيعية دافئة وصحية، وسط أجواء هادئة تناسب العوائل والشباب.",
  location: {
    governorate: "صنعاء",
    district: "بلاد الروس",
    area: "جارف (حمام جارف الطبيعي)",
    landmark: "بجوار ينابيع المياه الكبريتية الطبيعية",
    googleMapsUrl: "https://maps.google.com/?q=صنعاء+بلاد+الروس+حمام+جارف+فندق+الفوارة"
  },
  contacts: {
    whatsappNumber: "967784555525",
    whatsappDisplay: "784 555 525",
    phonePrimary: "735 000 060",
    phoneSecondary: "784 555 515",
    phoneEmergency: "735 000 061"
  },
  bankAccounts: [
    {
      bankName: "محفظة جيب (Jeeb)",
      accountNumber: "5907771",
      currency: "ريال يمني",
      accountHolder: "فندق مدينة الفوارة",
      iconName: "Wallet",
      instructions: "حول عبر تطبيق جيب برقم المحفظة ثم أرسل صورة السند"
    },
    {
      bankName: "بنك الكريمي - ريال يمني",
      accountNumber: "3162933514",
      currency: "ريال يمني (YER)",
      accountHolder: "فندق وشاليهات مدينة الفوارة",
      iconName: "CreditCard",
      instructions: "تحويل فوري عبر تطبيق كريمي جوال أو صراف"
    },
    {
      bankName: "بنك الكريمي - ريال سعودي",
      accountNumber: "3163017015",
      currency: "ريال سعودي (SAR)",
      accountHolder: "فندق وشاليهات مدينة الفوارة",
      iconName: "Landmark",
      instructions: "تحويل مباشر بالريال السعودي"
    },
    {
      bankName: "بنك الكريمي - دولار أمريكي",
      accountNumber: "3162981055",
      currency: "دولار أمريكي (USD)",
      accountHolder: "فندق وشاليهات مدينة الفوارة",
      iconName: "DollarSign",
      instructions: "تحويل مباشر بالدولار"
    },
    {
      bankName: "تحويل مباشر سريع",
      accountNumber: "784555515",
      currency: "أي عملة",
      accountHolder: "إدارة الحجوزات",
      iconName: "Send",
      instructions: "حوالة باسم المسؤول المباشر عبر أي شبكة صرافة"
    }
  ],
  features: [
    {
      title: "مياه كبريتية طبيعية دافئة",
      desc: "تنبع مباشرة من باطن الأرض بجارف، ممتازة لراحة العضلات والمفاصل والاسترخاء التام بعد تعب الأسبوع.",
      icon: "Droplets"
    },
    {
      title: "خصوصية كاملة للعائلات والشباب",
      desc: "شاليهات وأجنحة مستقلة تماماً، ومسابح خاصة مغلقة للنساء والرجال ومسابح عائلية.",
      icon: "ShieldCheck"
    },
    {
      title: "حجز بالساعة أو باليوم",
      desc: "نظام مرن جداً يناسب مشوارك؛ تقدر تحجز ساعتين لشاليه ومسبح أو ليلة كاملة لجناح فاخر.",
      icon: "Clock"
    },
    {
      title: "مجالس ضيافة كبيرة للمناسبات",
      desc: "مجالس تتسع من 10 إلى 50 شخص مجهزة بجاكوزي وإطلالات مفتوحة على الطبيعة للمّة الأهل والأصحاب.",
      icon: "Users"
    }
  ]
};
