export interface RoomUnit {
  id: string;
  name: string;
  category: "suite" | "youth" | "majlis" | "chalet" | "pool";
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
    id: "suite-royal-vip",
    name: "الجناح الملكي العائلي VIP (5 أشخاص)",
    category: "suite",
    capacity: "5 إلى 7 أشخاص",
    pricePerDayYER: 65000,
    pricePerHourYER: 12000,
    priceSAR: 450,
    bookingType: "both",
    description: "جناح عائلي فسيح ومؤثث بأعلى درجات الراحة، يحتوي على غرفتي نوم منفصلتين، صالة جلوس بإطلالة على الطبيعة، وجاكوزي خاص مع مياه كبريتية دافئة.",
    amenities: [
      "جاكوزي خاص بمياه كبريتية",
      "صالة جلوس واسعة ومؤثثة",
      "إطلالة بانورامية على جبال جارف",
      "شاشة ذكية 65 بوصة وواي فاي مجاني",
      "مطبخ تحضيري وثلاجة وغلاية",
      "خدمة غرف ونظافة دورية"
    ],
    images: [
      "/images/img_028_u8dd32ak3clce4sj1pyeapqc.jpeg",
      "/images/img_013_ghgvkz3r7563hwwr1j2ka1px.jpeg",
      "/images/img_014_hj50hs3gjw1dw7j83lcl2fnl.jpeg",
      "/images/img_011_elrdx2vdjmw16j6guffpimed.jpeg"
    ],
    featured: true,
    sizeM2: 85,
    availableCount: 4
  },
  {
    id: "room-family-vip",
    name: "غرفة نوم عائلية VIP مع جاكوزي",
    category: "suite",
    capacity: "3 إلى 4 أشخاص",
    pricePerDayYER: 45000,
    pricePerHourYER: 8000,
    priceSAR: 320,
    bookingType: "both",
    description: "غرفة أنيقة للعائلات الصغيرة بتشطيبات راقية، سرير كينج مريح، حمام واسع بجاكوزي كبريتي استشفائي وخصوصية تامة.",
    amenities: [
      "جاكوزي مياه كبريتية استشفائية",
      "سرير ملكي مريح جداً",
      "جلسة جانبية داخلية",
      "تكييف وتدفئة وتلفزيون ذكي",
      "دخول مجاني للمسابح العائلية"
    ],
    images: [
      "/images/img_031_uya3wnwiyto5apphzyas223u.jpeg",
      "/images/img_036_xwa3pkj2bbt1b9f47xwzn4k4.jpeg",
      "/images/img_021_mci00w3628j15kgal513jaba.jpeg"
    ],
    featured: true,
    sizeM2: 50,
    availableCount: 6
  },
  {
    id: "chalet-private-hours",
    name: "شاليه الشباب والعوائل الخاص (نظام ساعات / يوم)",
    category: "chalet",
    capacity: "حتى 10 أشخاص",
    pricePerDayYER: 80000,
    pricePerHourYER: 15000,
    priceSAR: 550,
    bookingType: "both",
    description: "شاليه خاص متكامل يضم مسبحاً كبريتياً مغلقاً وجلسة استراحة فخمة، حديقة صغيرة ومدخل مستقل تماماً لقضاء أمتع الأوقات والراحة التامة.",
    amenities: [
      "مسبح كبريتي خاص دافئ",
      "جلسة خارجية مع شواية باربكيو",
      "صالة مكيفة ومجهزة",
      "مطبخ متكامل للتحضير",
      "موقف سيارات خاص ومظلل"
    ],
    images: [
      "/images/img_022_o1lfj0q71zxo582r4o463i55.jpeg",
      "/images/img_006_cg6frlfluigpv7lb6hbd6bdw.jpeg",
      "/images/img_015_i1wjguywi3jubg7bdqa3qt3u.jpeg"
    ],
    featured: true,
    sizeM2: 120,
    availableCount: 3
  },
  {
    id: "majlis-large-50",
    name: "المجلس الملكي الكبير (يتسع لـ 50 شخص)",
    category: "majlis",
    capacity: "حتى 50 شخص",
    pricePerDayYER: 95000,
    pricePerHourYER: 20000,
    priceSAR: 650,
    bookingType: "both",
    description: "مجلس فاخر جداً ومفروش بأصالة، مثالي للمناسبات العائلية، جلسات القات، العزائم، واللقاءات الكبيرة مع حوض مياه كبريتية كبير ملحق وإطلالة جبلية خلابة.",
    amenities: [
      "حوض مياه كبريتية ملحق واسع",
      "إطلالة طبيعية مفتوحة على بلاد الروس",
      "نظام صوت وشاشات عرض للمناسبات",
      "بوفيه ومرافق ضيافة مجهزة",
      "دورات مياه ومغاسل متعددة"
    ],
    images: [
      "/images/img_020_m49ej2lhke4k3pksihk8k2qj.jpeg",
      "/images/img_033_v4doi9wx3r6e46eks0tl10gt.jpeg",
      "/images/img_026_qksk02ao4vm2j1ymgq3kakia.jpeg"
    ],
    featured: true,
    sizeM2: 180,
    availableCount: 2
  },
  {
    id: "majlis-youth-30",
    name: "مجلس شبابي مميز مع 2 جاكوزي (30 شخص)",
    category: "majlis",
    capacity: "20 إلى 30 شخص",
    pricePerDayYER: 60000,
    pricePerHourYER: 14000,
    priceSAR: 420,
    bookingType: "both",
    description: "مجلس متوسط مريح ومجهز باثنين جاكوزي خاص للمياه الكبريتية، إضاءات مريحة وتكييف وشاشة ذكية لجلسات الأصدقاء واللمة الطيبة.",
    amenities: [
      "2 جاكوزي مياه كبريتية ملحقة",
      "فرش أرضي يمني أصيل ومريح",
      "شاشة تلفزيون ذكية وسماعات",
      "مطبخ خدمة وسيرفيس ضيافة"
    ],
    images: [
      "/images/img_025_qi4uk7rwji1rpygdt7gnup4l.jpeg",
      "/images/img_005_adisjf12pxooe3kqknkwz8sa.jpeg",
      "/images/img_018_ipp9q8iofmmkfm84nzep3abl.jpeg"
    ],
    availableCount: 3
  },
  {
    id: "majlis-cozy-10",
    name: "مجلس شبابي وعائلي صغير (10 أشخاص)",
    category: "majlis",
    capacity: "8 إلى 12 شخص",
    pricePerDayYER: 35000,
    pricePerHourYER: 7000,
    priceSAR: 250,
    bookingType: "both",
    description: "مجلس هادئ وملموم مصمم للراحة واللمة الحلوة، بجاكوزي كبريتي ونوافذ زجاجية تطل على الجبال.",
    amenities: [
      "جاكوزي مياه دافئة استشفائية",
      "جلسة أرضية هادئة ومكيفة",
      "ثلاجة ومغسلة ملحقة",
      "واي فاي سريع"
    ],
    images: [
      "/images/img_035_wgd00u886wkcan8u13vvdwht.jpeg",
      "/images/img_009_dne1j2aqn48frhgum842ib4s.jpeg"
    ],
    availableCount: 4
  },
  {
    id: "room-youth-cozy",
    name: "غرفة نوم شبابية مع جاكوزي",
    category: "youth",
    capacity: "2 إلى 3 أشخاص",
    pricePerDayYER: 30000,
    pricePerHourYER: 6000,
    priceSAR: 210,
    bookingType: "both",
    description: "إقامة شبابية راقية تجمع بين الراحة وسعر مناسب، مع جاكوزي كبريتي خاص لتجديد النشاط بعد جولة في المنطقة.",
    amenities: [
      "جاكوزي كبريتي خاص",
      "سريران مفردان أو سرير مزدوج",
      "تكييف وتلفزيون وميني بار",
      "حمام خاص ونظافة مستمرة"
    ],
    images: [
      "/images/img_038_zz87k50fvzpgny4q3z7p58qt.jpeg",
      "/images/img_010_e1nyc37uylpit7l9nlnlrajx.jpeg"
    ],
    availableCount: 8
  },
  {
    id: "pools-sulfur-private",
    name: "مسبح كبريتي علاجي خاص (نظام ساعات)",
    category: "pool",
    capacity: "عائلي / خاص",
    pricePerDayYER: 40000,
    pricePerHourYER: 8000,
    priceSAR: 180,
    bookingType: "hourly",
    description: "أحواض ومسابح بمياه كبريتية حارة جارية مستمرة من المنبع الطبيعي مباشرة بحمام جارف، معقمة ومفيدة لآلام الظهر والمفاصل وتنشيط الدورة الدموية.",
    amenities: [
      "مياه جارية حارة متجددة من المنبع",
      "خصوصية مطلقة (أقسام عائلية وخاصة)",
      "شاورات وتبديل ملابس معقم",
      "جلسة استراحة جانبية"
    ],
    images: [
      "/images/img_016_i805mh07d9fdgoqi3q6vu17w.jpeg",
      "/images/img_004_a6n8layuahfzwg3hvkbqrzks.jpeg",
      "/images/img_023_oithe235k6q1xivx1ccsved0.jpeg"
    ],
    availableCount: 5
  }
];
