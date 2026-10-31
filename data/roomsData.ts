export interface RoomUnit {
  id: string;
  name: string;
  originalSectionTitle: string;
  category: "suite" | "family_room" | "youth_room" | "majlis" | "chalet" | "pool";
  capacity: string;
  pricePerDayYER: number;
  pricePerHourYER: number;
  priceSAR: number;
  bookingType: "daily" | "hourly" | "both";
  description: string;
  amenities: string[];
  images: string[];
  featured?: boolean;
  sizeM2?: number;
  availableCount: number;
}

export const roomsData: RoomUnit[] = [
  {
    id: "suite-family-5",
    name: "جناح عائلي فاخر (5 أشخاص)",
    originalSectionTitle: "جناح عائلي 5 اشخاص",
    category: "suite",
    capacity: "5 إلى 7 أشخاص",
    pricePerDayYER: 65000,
    pricePerHourYER: 12000,
    priceSAR: 450,
    bookingType: "both",
    description: "متعة عائلية متكاملة بإطلالة مبهرة على جبال جارف وتجارب استرخاء لا تُنسى. يضم غرفتي نوم منفصلتين، صالة معيشة فسيحة، وجاكوزي خاص بمياه كبريتية استشفائية.",
    amenities: [
      "جاكوزي خاص بمياه كبريتية علاجية",
      "غرفة نوم رئيسية + غرفة أطفال",
      "صالة جلوس مفروشة بمدخل مستقل",
      "شرفة بإطلالة بانورامية خلابة",
      "مطبخ تحضيري متكامل وثلاجة",
      "شبكة واي فاي عائلية سريعة"
    ],
    images: [
      "/images/units/suite_5_master_bedroom.jpeg",
      "/images/units/suite_5_living_hall.jpeg",
      "/images/units/suite_5_jacuzzi_bath.jpeg",
      "/images/units/suite_5_balcony_view.jpeg",
      "/images/units/suite_5_kids_room.jpeg",
      "/images/units/suite_5_dining_kitchen.jpeg",
      "/images/units/suite_5_panorama.jpeg"
    ],
    featured: true,
    sizeM2: 85,
    availableCount: 4
  },
  {
    id: "room-family-vip",
    name: "غرفة نوم عائلية VIP مع جاكوزي ومجلس",
    originalSectionTitle: "غرفة نوم عائلي",
    category: "family_room",
    capacity: "3 إلى 4 أشخاص",
    pricePerDayYER: 45000,
    pricePerHourYER: 8000,
    priceSAR: 310,
    bookingType: "both",
    description: "وجهتكم المثالية لبداية أجمل أيامكم معاً. تشمل سرير ملكي كينج، جاكوزي دافئ بمياه كبريتية متجددة، صالة استراحة ملحقة، وإمكانية الدخول للمسبح العام.",
    amenities: [
      "جاكوزي مياه كبريتية خاص بالغرفة",
      "مجلس وجلسة داخلية مريحة",
      "سرير كينج ملكي فاخر",
      "شاشة ذكية وتكييف وتدفئة",
      "دخول مجاني لمسابح المنتجع"
    ],
    images: [
      "/images/units/family_room_bed.jpeg",
      "/images/units/family_room_jacuzzi.jpeg",
      "/images/units/family_room_lounge.jpeg",
      "/images/units/family_room_view.jpeg"
    ],
    featured: true,
    sizeM2: 50,
    availableCount: 6
  },
  {
    id: "chalet-private-hours",
    name: "شاليهات خاصة شبابية وعائلية (نظام ساعتين / يوم)",
    originalSectionTitle: "شاليهات - شبابي (نظام ساعتين)",
    category: "chalet",
    capacity: "حتى 10 أشخاص",
    pricePerDayYER: 80000,
    pricePerHourYER: 15000,
    priceSAR: 550,
    bookingType: "both",
    description: "تجربة شاليه متكاملة ليوم كامل أو بنظام الساعات تناسب الجميع. مسبح كبريتي خاص مغلق، جلسة استراحة فخمة، حديقة وتراس مشمس وخصوصية مطلقة.",
    amenities: [
      "مسبح خاص مغلق بمياه كبريتية دافئة",
      "صالة استراحة وجلسة ترفيهية",
      "تراس خارجي وجلسة مشمسة",
      "مطبخ خدمة وباربكيو",
      "مدخل مستقل وموقف خاص"
    ],
    images: [
      "/images/units/chalet_private_pool.jpeg",
      "/images/units/chalet_pool_indoor.jpeg",
      "/images/units/chalet_lounge.jpeg",
      "/images/units/chalet_terrace.jpeg"
    ],
    featured: true,
    sizeM2: 120,
    availableCount: 3
  },
  {
    id: "majlis-large-50",
    name: "المجلس الكبير للمناسبات (50 شخص) مع حوض كبريتي",
    originalSectionTitle: "مجلس كبير (50) شخص",
    category: "majlis",
    capacity: "حتى 50 شخص",
    pricePerDayYER: 95000,
    pricePerHourYER: 20000,
    priceSAR: 660,
    bookingType: "both",
    description: "مجالس بإطلالة طبيعية هادئة تنبض بالراحة مع حوض كبريتي كبير ملحق. مصمم لاستقبال العزائم الكبيرة، اللقاءات العائلية وجلسات الضيافة الراقية.",
    amenities: [
      "حوض مياه كبريتية كبير ملحق بالمجلس",
      "إطلالة مفتوحة على جبال حمام جارف",
      "فرش أرضي فاخر ومريح للمناسبات",
      "مرافق ضيافة ومغاسل ودورات مياه مستقلة",
      "شاشات عرض ونظام صوتي متكامل"
    ],
    images: [
      "/images/units/majlis_50_panoramic_hall.jpeg",
      "/images/units/majlis_50_thermal_basin.jpeg",
      "/images/units/majlis_50_view.jpeg"
    ],
    featured: true,
    sizeM2: 180,
    availableCount: 2
  },
  {
    id: "majlis-youth-30",
    name: "مجلس شبابي حجم متوسط مع 2 جاكوزي (30 شخص)",
    originalSectionTitle: "مجلس شبابي (30 شخص)",
    category: "majlis",
    capacity: "25 إلى 35 شخص",
    pricePerDayYER: 60000,
    pricePerHourYER: 14000,
    priceSAR: 420,
    bookingType: "both",
    description: "مجلس حجم متوسط مع اثنين جاكوزيهات للمياه الكبريتية. مناسب لجلسات الأصدقاء واللمة الطيبة بإطلالة هادئة وأجواء دافئة.",
    amenities: [
      "2 جاكوزي مياه كبريتية ملحقة",
      "جلسة أرضية يمنية أصيلة ومريحة",
      "شاشة ذكية وسماعات وجلسة مكيفة",
      "خدمة مشروبات وضيافة"
    ],
    images: [
      "/images/units/majlis_30_seating_jacuzzis.jpeg",
      "/images/units/majlis_20_seating_jacuzzis.jpeg"
    ],
    availableCount: 3
  },
  {
    id: "majlis-youth-20",
    name: "مجلس شبابي مع 2 جاكوزي (20 شخص)",
    originalSectionTitle: "مجلس شبابي ( 20شخص)",
    category: "majlis",
    capacity: "15 إلى 20 شخص",
    pricePerDayYER: 50000,
    pricePerHourYER: 11000,
    priceSAR: 350,
    bookingType: "both",
    description: "مجلس شبابي مع اثنين جاكوزيهات مياه كبريتية دافئة. خصوصية كاملة وراحة واستجمام لجمعات الشباب والزملاء.",
    amenities: [
      "اثنين جاكوزي كبريتي دافئ",
      "جلسة مريحة مكيفة ومجهزة",
      "شاشة عرض وإنترنت سريع",
      "مدخل خاص وخدمة سريعة"
    ],
    images: [
      "/images/units/majlis_20_seating_jacuzzis.jpeg",
      "/images/units/majlis_30_seating_jacuzzis.jpeg"
    ],
    availableCount: 3
  },
  {
    id: "majlis-small-10",
    name: "مجلس صغير هادئ (10 أشخاص) مع جاكوزي",
    originalSectionTitle: "مجلس صغير (10) اشخاص",
    category: "majlis",
    capacity: "8 إلى 12 شخص",
    pricePerDayYER: 35000,
    pricePerHourYER: 7000,
    priceSAR: 240,
    bookingType: "both",
    description: "مصمم للراحة واللمة الحلوة. مجلس هادئ ومريح يضم جاكوزي كبريتي خاص وإطلالة طبيعية على الجبال والينابيع.",
    amenities: [
      "جاكوزي مياه كبريتية مدمج",
      "جلسة عائلية وشبابية ملمومة",
      "نوافذ زجاجية تطل على الطبيعة",
      "ثلاجة ومغاسل مستقلة"
    ],
    images: [
      "/images/units/majlis_10_cozy_hall.jpeg",
      "/images/units/majlis_10_jacuzzi.jpeg",
      "/images/units/majlis_10_interior.jpeg",
      "/images/units/majlis_10_window.jpeg"
    ],
    availableCount: 4
  },
  {
    id: "room-youth-cozy",
    name: "غرفة نوم شبابية مع جاكوزي خاص",
    originalSectionTitle: "غرفة نوم شبابي",
    category: "youth_room",
    capacity: "2 إلى 3 أشخاص",
    pricePerDayYER: 30000,
    pricePerHourYER: 6000,
    priceSAR: 210,
    bookingType: "both",
    description: "إقامة شبابية راقية تجمع الراحة ومتعة الجاكوزي الكبريتي الخاص. أسرة مريحة، تكييف، ودورة مياه مجهزة بأعلى درجات النظافة.",
    amenities: [
      "جاكوزي كبريتي استشفائي داخل الغرفة",
      "أسرة مريحة بتجهيز فندقي",
      "شاشة ذكية وواي فاي مجاني",
      "خدمة غرف ونظافة دورية"
    ],
    images: [
      "/images/units/youth_room_beds.jpeg",
      "/images/units/youth_room_jacuzzi.jpeg",
      "/images/units/youth_room_seating.jpeg"
    ],
    availableCount: 8
  },
  {
    id: "pools-family-hours",
    name: "مسابح عائلية كبريتية خاصة (نظام ساعات)",
    originalSectionTitle: "مسابح عائلي - نظام ساعات",
    category: "pool",
    capacity: "عوائل ومجموعات خاصة",
    pricePerDayYER: 40000,
    pricePerHourYER: 8000,
    priceSAR: 180,
    bookingType: "hourly",
    description: "مسابح عائلية خاصة تعمل بنظام الساعات بمياه كبريتية جارية ومستمرة من منبع حمام جارف الطبيعي، مع خصوصية تامة للعائلات وتبديل مياه مستمر.",
    amenities: [
      "مياه كبريتية طبيعية دافئة متجددة من المنبع",
      "خصوصية عائلية مغلقة 100%",
      "غرف تبديل وشاورات معقمة",
      "جلسات استراحة جانبية مريحة"
    ],
    images: [
      "/images/units/pool_family_thermal_water.jpeg",
      "/images/units/pool_family_cabin.jpeg"
    ],
    availableCount: 5
  }
];
