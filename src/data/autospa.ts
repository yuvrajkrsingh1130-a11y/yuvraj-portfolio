export type VehicleClass = "sedan" | "suv";

export interface DetailPackage {
  id: string;
  name: string;
  tagline: string;
  sedanPrice: number;
  suvPrice: number;
  duration: string;
  popular?: boolean;
  features: string[];
}

export const PHONE_DISPLAY = "(813) 669-3131";
export const PHONE_HREF = "tel:+18136693131";
export const ADDRESS = "2223 N Westshore Blvd, Tampa, FL 33607";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Auto+Spa+America+2223+N+Westshore+Blvd+Tampa+FL+33607";
export const MAPS_EMBED =
  "https://www.google.com/maps?q=2223%20N%20Westshore%20Blvd%2C%20Tampa%2C%20FL%2033607&output=embed";

export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/6159208/6159208-hd_1920_1080_30fps.mp4";
export const HERO_POSTER =
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1920&auto=format&fit=crop";

export const NAV_LINKS = [
  { label: "Packages", href: "#packages" },
  { label: "Ceramic", href: "#ceramic" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
] as const;

export const PACKAGES: DetailPackage[] = [
  {
    id: "interior-exterior",
    name: "Interior + Exterior",
    tagline: "The essential spa reset — inside and out, flawlessly hand finished.",
    sedanPrice: 60,
    suvPrice: 75,
    duration: "60–90 min",
    features: [
      "Express 2-bucket hand wash & dry",
      "Full interior wipe down & vacuum",
      "Streak-free glass, inside & out",
      "Wheel detail & tire dressing",
      "Door jambs & console refresh",
    ],
  },
  {
    id: "ultimate-interior",
    name: "Ultimate Interior",
    tagline: "A hospital-grade cabin restoration. Every fiber, every stitch.",
    sedanPrice: 125,
    suvPrice: 145,
    duration: "2–3 hrs",
    features: [
      "Hospital-grade steam extraction",
      "Deep leather clean & conditioning",
      "Carpet & upholstery hot extraction",
      "Odor elimination treatment",
      "Vent, crevice & stitch detailing",
    ],
  },
  {
    id: "ultimate-exterior",
    name: "Ultimate Exterior",
    tagline: "Decontaminated, clayed and hand-buffed to a liquid gloss.",
    sedanPrice: 150,
    suvPrice: 175,
    duration: "2.5–3.5 hrs",
    features: [
      "Iron & fallout decontamination",
      "Full clay bar treatment",
      "Hand-buffed carnauba protection",
      "Wheel, barrel & caliper detail",
      "Trim restoration & tire shine",
    ],
  },
  {
    id: "french-spa-signature",
    name: "French Spa Signature",
    tagline: "Our bumper-to-bumper masterpiece. The full correction ritual.",
    sedanPrice: 250,
    suvPrice: 285,
    duration: "4–6 hrs",
    popular: true,
    features: [
      "Complete interior + exterior ritual",
      "Clay bar & paint decontamination",
      "Engine bay detail wipe down",
      "Mirror polish & gloss enhancement",
      "Leather, steam & odor treatment",
    ],
  },
];

export interface GalleryItem {
  src: string;
  fallback: string;
  car: string;
  service: string;
  finish: string;
}

const FALLBACK_CAR =
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop";

export const GALLERY: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    fallback: FALLBACK_CAR,
    car: "Porsche 911 Carrera",
    service: "French Spa Signature",
    finish: "Mirror Polish",
  },
  {
    src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
    fallback: FALLBACK_CAR,
    car: "BMW M4 Competition",
    service: "System X® Ceramic",
    finish: "9H Diamond Armor",
  },
  {
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
    fallback: FALLBACK_CAR,
    car: "Dodge Challenger SRT",
    service: "Ultimate Exterior",
    finish: "Carnauba Hand-Buff",
  },
  {
    src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
    fallback: FALLBACK_CAR,
    car: "Ford Mustang GT",
    service: "Paint Correction",
    finish: "Showroom Gloss",
  },
  {
    src: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
    fallback: FALLBACK_CAR,
    car: "Mercedes-AMG GT",
    service: "French Spa Signature",
    finish: "Concours Finish",
  },
  {
    src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop",
    fallback: FALLBACK_CAR,
    car: "Nissan GT-R Premium",
    service: "System X® Ceramic",
    finish: "Hydrophobic Sheeting",
  },
];

export const CERAMIC_IMAGE =
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1400&auto=format&fit=crop";

export interface Review {
  name: string;
  vehicle: string;
  neighborhood: string;
  initials: string;
  gradient: string;
  quote: string;
  service: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Marcus Whitfield",
    vehicle: "Porsche 911 Turbo S",
    neighborhood: "South Tampa",
    initials: "MW",
    gradient: "from-blue-500 to-indigo-600",
    quote:
      "Dropped the 911 at the lower deck, had lunch at Cheesecake Factory, came back to a mirror. The paint correction erased two years of swirls in one visit. Nobody touches this car but Auto Spa now.",
    service: "French Spa Signature + Ceramic",
  },
  {
    name: "Priya Raman",
    vehicle: "Range Rover Autobiography",
    neighborhood: "Hyde Park",
    initials: "ER",
    gradient: "from-cyan-500 to-blue-600",
    quote:
      "The steam interior detail is unreal — kids, a golden retriever, and beach sand, gone. It smells brand new and the leather looks factory-fresh. Booked my standing Saturday slot.",
    service: "Ultimate Interior",
  },
  {
    name: "Daniel Okafor",
    vehicle: "BMW M8 Gran Coupé",
    neighborhood: "Westshore",
    initials: "DO",
    gradient: "from-sky-500 to-blue-700",
    quote:
      "System X ceramic was worth every penny. Florida sun, lovebugs, afternoon storms — everything sheets right off. CarFax-registered, ten-year warranty, zero maintenance headaches.",
    service: "System X® 9H Diamond Armor",
  },
];

export const FAQS = [
  {
    q: "Where exactly do I drop off my car?",
    a: "Enter the International Plaza parking garage and head to the lower level, directly beneath Cheesecake Factory. Follow the Auto Spa America signage — our valet desk is on the lower deck. Key hand-off takes under 2 minutes and we text you the moment your car is ready.",
  },
  {
    q: "Do I need an appointment, or can I walk in?",
    a: "Walk-ins are welcome, but weekend slots at International Plaza fill quickly. Reserving ahead guarantees your bay, your detailer, and a finish time built around your shopping or dining plans. Call (813) 669-3131 or reserve online in under a minute.",
  },
  {
    q: "How long does each package take?",
    a: "Interior + Exterior runs 60–90 minutes — perfect for lunch. Ultimate Interior or Exterior take 2–3.5 hours, and the French Spa Signature is a 4–6 hour full ritual. Ceramic coating installations are scheduled as half-day or full-day appointments depending on paint correction needs.",
  },
  {
    q: "What does the System X® ceramic warranty actually cover?",
    a: "Every System X® 9H Diamond Armor installation carries a 10-year transferable warranty, is registered to your vehicle's CarFax, and protects against UV fading, oxidation, and environmental fallout. If the coating fails under normal use, we re-apply it — and the warranty transfers to the next owner, protecting your resale value.",
  },
  {
    q: "Is the hand wash safe for wraps, PPF and ceramic coatings?",
    a: "Absolutely. We use a pH-neutral, 2-bucket hand wash with grit guards and plush microfiber — never tunnels, brushes, or recycled water. Our process is specifically designed to be safe for vinyl wraps, paint protection film, matte finishes, and existing ceramic coatings.",
  },
  {
    q: "Why is pricing higher for SUVs, trucks and vans?",
    a: "Larger vehicles carry significantly more paint surface, glass, and cabin volume. The +$15–$35 adjustment simply reflects the extra artisan time and product required to hold the same flawless standard on a third row, a truck bed, or an extended roofline.",
  },
];

export const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
  "5:30 PM",
] as const;
