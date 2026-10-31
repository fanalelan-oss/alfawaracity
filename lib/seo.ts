import { Metadata } from "next";
import { hotelConfig } from "@/data/hotelConfig";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
}

export function constructMetadata({
  title,
  description = hotelConfig.description,
  path = "",
  image = "/concepts/01_hero_3d_landing_page.jpg",
  keywords = []
}: SeoProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${hotelConfig.name}`
    : `${hotelConfig.name} - إقامة فاخرة ومياه كبريتية طبيعية بحمام جارف`;

  const baseUrl = "https://alfawaracity.com";
  const url = `${baseUrl}${path}`;

  const defaultKeywords = [
    "فندق مدينة الفوارة",
    "شاليهات الفوارة",
    "فندق الفوارة",
    "حمام جارف",
    "مياه كبريتية جارف",
    "منتجع سياحي صنعاء",
    "حجوزات شاليهات اليمن",
    "غرف عائلية بلاد الروس",
    "جاكوزي مياه كبريتية",
    "استشفاء طبيعي اليمن",
    "شاليهات بالساعة صنعاء",
    "مجالس مناسبات اليمن"
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: "فندق وشاليهات مدينة الفوارة" }],
    creator: "فن الإعلان - Fanalelan",
    publisher: "فندق مدينة الفوارة",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: hotelConfig.name,
      locale: "ar_YE",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: hotelConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export function generateHotelJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Resort",
    name: hotelConfig.name,
    description: hotelConfig.description,
    url: "https://alfawaracity.com",
    telephone: `+${hotelConfig.contacts.whatsappNumber}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "حمام جارف الطبيعي - بلاد الروس",
      addressLocality: "صنعاء",
      addressRegion: "محافظة صنعاء",
      addressCountry: "YE"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "15.0833",
      longitude: "44.2333"
    },
    image: [
      "https://alfawaracity.com/concepts/01_hero_3d_landing_page.jpg",
      "https://alfawaracity.com/concepts/02_interactive_3d_room_booking.jpg"
    ],
    priceRange: "$$",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "مياه كبريتية استشفائية طبيعية",
        value: true
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "شاليهات عائلية خاصة ومسابح مغلقة",
        value: true
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "جاكوزي خاص في الغرف والأجنحة",
        value: true
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "حجز مرن بنظام الساعات واليوم الكامل",
        value: true
      }
    ]
  };
}
