/* ============================================================
   SITE-WIDE DATA — replace links & copy here.
   ============================================================ */

export const site = {
  name: "YUVRAJ SINGH",
  firstName: "YUVRAJ",
  lastName: "SINGH",
  role: "MULTIDISCIPLINARY VISUAL & UI/UX DESIGNER",
  base: "DELHI, INDIA",
  statement: "DESIGN THAT REFUSES TO WHISPER.",
  email: "hello@yuvrajsingh.design",
  status: "AVAILABLE FOR FREELANCE & CONTRACTS",
  coords: "28.6139° N / 77.2090° E",
  timezone: "IST (UTC+5:30)",
  socials: [
    { label: "EMAIL", href: "mailto:hello@yuvrajsingh.design", handle: "hello@yuvrajsingh.design" },
    { label: "GITHUB", href: "https://github.com/", handle: "@yuvrajsingh" },
    { label: "FIGMA", href: "https://figma.com/", handle: "@yuvraj" },
    { label: "INSTAGRAM", href: "https://instagram.com/", handle: "@yuvraj.design" },
    { label: "LINKEDIN", href: "https://linkedin.com/", handle: "/in/yuvrajsingh" },
  ],
};

export const navItems = [
  { label: "WORK", to: "/work", index: "01" },
  { label: "ABOUT", to: "/about", index: "02" },
  { label: "SERVICES", to: "/services", index: "03" },
  { label: "LAB", to: "/lab", index: "04" },
  { label: "CONTACT", to: "/contact", index: "05" },
];

/* ---------------- About page ---------------- */

export const philosophy = [
  "COOKIE-CUTTER WEB DESIGN IS DEAD WEIGHT. CLEAN ENOUGH TO BE Boring IS STILL BORING.",
  "I BUILD WITH FUNCTIONAL CHAOS — BRUTALIST GRIDS, PRECISION TYPOGRAPHY AND JUST ENOUGH NOISE TO MAKE PEOPLE LOOK TWICE.",
  "EVERY PIXEL EARNS ITS PLACE. EVERY INTERACTION HAS A REASON. IF IT DOESN'T MOVE YOU, IT MOVES OUT.",
];

export interface ToolkitGroup {
  group: string;
  items: string[];
}

export const toolkit: ToolkitGroup[] = [
  { group: "DESIGN", items: ["FIGMA", "KRITA", "PHOTO / SCAN"] },
  { group: "MOTION & 3D", items: ["THREE.JS", "GSAP", "SHADERS"] },
  { group: "BUILD", items: ["REACT", "TYPESCRIPT", "TAILWIND", "SUPABASE"] },
  { group: "SHIP", items: ["VERCEL", "GIT", "PERFORMANCE"] },
];

export interface Milestone {
  year: string;
  title: string;
  detail: string;
  tag: string;
}

/* Sample timeline — replace with real milestones in src/data/site.ts */
export const timeline: Milestone[] = [
  {
    year: "2026",
    title: "INDEPENDENT PRACTICE",
    detail:
      "Freelance & contract work across UI/UX, branding and web experiments — taking selected projects end-to-end.",
    tag: "FREELANCE",
  },
  {
    year: "2025",
    title: "AGENCY COLLABORATIONS",
    detail:
      "Collaborated with studios on interfaces, campaign graphics and motion-heavy marketing sites.",
    tag: "COLLAB",
  },
  {
    year: "2025",
    title: "FIRST CLIENT ENGAGEMENTS",
    detail:
      "Shipped e-commerce interfaces, brand systems and poster series for early clients.",
    tag: "CLIENT",
  },
  {
    year: "2024",
    title: "GOING MULTIDISCIPLINARY",
    detail:
      "Merged graphic design practice with front-end code — the design + code + motion stack was born.",
    tag: "ORIGIN",
  },
];

/* ---------------- Lab ---------------- */

export const labIntro =
  "GENERATIVE ART, SHADERS, RAW TYPE AND MICRO-INTERACTIONS. CLICK ANY EXPERIMENT TO OPEN THE INSPECTOR.";
