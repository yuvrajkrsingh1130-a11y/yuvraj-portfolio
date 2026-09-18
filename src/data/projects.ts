/* ============================================================
   PROJECT DATA — WORKS / PROJECTS ARCHIVE
   ------------------------------------------------------------
   Replace titles, categories, years, tech stacks and links
   here. Every page (Home slider, Work bento, Project detail)
   reads from this single source.
   ============================================================ */

export type CoverVariant =
  | "monolith"
  | "static"
  | "signal"
  | "velocity"
  | "anthem"
  | "machines";

export type ProjectCategory = "UI/UX" | "BRANDING & POSTERS" | "WEB EXPERIMENTS";

export interface Project {
  slug: string;
  index: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  role: string;
  client: string;
  description: string;
  context: string;
  approach: string;
  tech: string[];
  tags: string[];
  cover: CoverVariant;
  palette: { bg: string; fg: string; accent: string };
  /** bento footprint on desktop grid (6 cols) */
  span: "wide" | "tall" | "box";
  featured?: boolean;
  /** placeholder prototype link — replace with live URL */
  link?: string;
}

export const projects: Project[] = [
  {
    slug: "gridcart",
    index: "01",
    title: "GRIDCART",
    category: "UI/UX",
    categoryLabel: "E-COMMERCE UI / UX",
    year: "2026",
    role: "UI/UX DESIGN / DESIGN SYSTEM",
    client: "PLACEHOLDER CLIENT",
    description:
      "High-converting e-commerce layouts with a brutalist design system — cart, checkout and PDP flows built to move fast.",
    context:
      "Placeholder brief: a streetwear store that wanted its checkout to feel as loud as its drops, without sacrificing conversion clarity.",
    approach:
      "Wireframes first, then a Figma design system with hard grids, monospace metadata and one acid accent. Every flow was prototyped before a single visual was polished.",
    tech: ["FIGMA", "REACT", "SUPABASE", "VERCEL"],
    tags: ["E-COMMERCE", "DESIGN SYSTEM", "CHECKOUT", "PROTOTYPE"],
    cover: "velocity",
    palette: { bg: "#F4F4F0", fg: "#0A0A0A", accent: "#FF4D00" },
    span: "wide",
    featured: true,
    link: "#",
  },
  {
    slug: "pulse-dash",
    index: "02",
    title: "PULSE/DASH",
    category: "UI/UX",
    categoryLabel: "DASHBOARD / PRODUCT UI",
    year: "2026",
    role: "PRODUCT DESIGN / INTERACTION",
    client: "PLACEHOLDER CLIENT",
    description:
      "An analytics dashboard where data reads like a Swiss timetable — dense, monospaced and weirdly calm.",
    context:
      "Placeholder project: a metrics tool drowning in charts. The job was density without noise.",
    approach:
      "One typeface family, one grid, zero decoration. Charts are drawn as raw ink blocks; motion is reserved for state changes that matter.",
    tech: ["FIGMA", "TYPESCRIPT", "GSAP"],
    tags: ["DASHBOARD", "DATA VIZ", "PRODUCT"],
    cover: "static",
    palette: { bg: "#0A0A0A", fg: "#F4F4F0", accent: "#CCFF00" },
    span: "box",
    link: "#",
  },
  {
    slug: "swiss-riot",
    index: "03",
    title: "SWISS RIOT",
    category: "BRANDING & POSTERS",
    categoryLabel: "POSTER SERIES / GRAPHIC ART",
    year: "2025",
    role: "GRAPHIC DESIGN / ART DIRECTION",
    client: "SELF-INITIATED",
    description:
      "Swiss typography set on fire — an ongoing poster series where strict grids get one violent interruption each.",
    context:
      "Self-initiated series exploring how much chaos a Swiss grid can absorb before it stops being Swiss.",
    approach:
      "Every poster starts as a perfect International Style layout, then gets exactly one act of vandalism: a tear, a smear, a misregistered layer.",
    tech: ["FIGMA", "KRITA", "RISO PRINT"],
    tags: ["POSTER", "TYPOGRAPHY", "PRINT"],
    cover: "anthem",
    palette: { bg: "#CCFF00", fg: "#0A0A0A", accent: "#F4F4F0" },
    span: "tall",
  },
  {
    slug: "monolith",
    index: "04",
    title: "MONOLITH",
    category: "BRANDING & POSTERS",
    categoryLabel: "BRAND IDENTITY",
    year: "2026",
    role: "BRAND DESIGN / LOGOTYPE",
    client: "PLACEHOLDER CLIENT",
    description:
      "A dynamic logotype and guideline system built on a single slab gesture — heavy, cropped, repeatable.",
    context:
      "Placeholder brief: a coffee roastery wanting an identity as dense and physical as its product.",
    approach:
      "The wordmark is cropped until it behaves like architecture. Two colours, one grid, and guidelines written so anyone can misuse them correctly.",
    tech: ["FIGMA", "ILLUSTRATOR"],
    tags: ["IDENTITY", "LOGOTYPE", "GUIDELINES"],
    cover: "monolith",
    palette: { bg: "#0A0A0A", fg: "#F4F4F0", accent: "#CCFF00" },
    span: "box",
    link: "#",
  },
  {
    slug: "signal-field",
    index: "05",
    title: "SIGNAL FIELD",
    category: "WEB EXPERIMENTS",
    categoryLabel: "WEBGL EXPERIENCE",
    year: "2026",
    role: "CREATIVE DEVELOPMENT / SHADERS",
    client: "SELF-INITIATED",
    description:
      "A WebGL scene where typography reacts to scroll velocity and pointer energy — sound made visible.",
    context:
      "Experiment turned into a piece: what happens when a website listens to how aggressively you scroll it.",
    approach:
      "Custom shaders, generative waveforms and scroll-driven type. One continuous scene, no hard cuts — only modulations.",
    tech: ["THREE.JS", "GLSL", "GSAP", "REACT"],
    tags: ["WEBGL", "SHADERS", "MOTION"],
    cover: "signal",
    palette: { bg: "#0A0A0A", fg: "#F4F4F0", accent: "#FF4D00" },
    span: "wide",
    link: "#",
  },
  {
    slug: "merch-drop",
    index: "06",
    title: "MERCH DROP 003",
    category: "BRANDING & POSTERS",
    categoryLabel: "MERCHANDISE VISUALS",
    year: "2025",
    role: "GRAPHIC DESIGN / VISUAL ASSETS",
    client: "PLACEHOLDER CLIENT",
    description:
      "Merch graphics and campaign visuals for a placeholder streetwear drop — loud front prints, quiet back details.",
    context:
      "Placeholder campaign: six garments, one typographic system, zero gradients.",
    approach:
      "Each piece takes one word from the drop's manifesto and treats it like a protest sign — oversized, misaligned on purpose.",
    tech: ["FIGMA", "KRITA"],
    tags: ["MERCH", "CAMPAIGN", "APPAREL"],
    cover: "static",
    palette: { bg: "#FF4D00", fg: "#0A0A0A", accent: "#F4F4F0" },
    span: "box",
  },
  {
    slug: "type-physics",
    index: "07",
    title: "TYPE PHYSICS",
    category: "WEB EXPERIMENTS",
    categoryLabel: "INTERACTIVE TYPOGRAPHY",
    year: "2025",
    role: "CREATIVE DEVELOPMENT",
    client: "SELF-INITIATED",
    description:
      "Variable fonts with velocity — letters that get thrown, stretched and snapped back by the pointer.",
    context:
      "Playground for font-variation axes treated as springs. No client, no brief, no mercy.",
    approach:
      "Each glyph carries its own physics state; the width and weight axes are the deformation channels.",
    tech: ["TYPESCRIPT", "GSAP", "CANVAS"],
    tags: ["TYPE", "PHYSICS", "EXPERIMENT"],
    cover: "machines",
    palette: { bg: "#F4F4F0", fg: "#0A0A0A", accent: "#CCFF00" },
    span: "box",
    link: "#",
  },
  {
    slug: "volt-records",
    index: "08",
    title: "VOLT RECORDS",
    category: "BRANDING & POSTERS",
    categoryLabel: "BRAND IDENTITY / MUSIC",
    year: "2026",
    role: "BRAND DESIGN / ART DIRECTION",
    client: "PLACEHOLDER CLIENT",
    description:
      "Identity for a placeholder electronic label — a logotype that behaves like a live waveform.",
    context:
      "Placeholder brief: a label that releases one track a week and needed a system fast enough to keep up.",
    approach:
      "The logotype is generated, never drawn: waveform data in, glyphs out. Sleeves assemble themselves from the same pipeline.",
    tech: ["FIGMA", "TYPESCRIPT", "CANVAS"],
    tags: ["IDENTITY", "MUSIC", "GENERATIVE"],
    cover: "anthem",
    palette: { bg: "#0A0A0A", fg: "#CCFF00", accent: "#FF4D00" },
    span: "tall",
    link: "#",
  },
  {
    slug: "checkout-os",
    index: "09",
    title: "CHECKOUT OS",
    category: "UI/UX",
    categoryLabel: "CHECKOUT FLOW / CASE STUDY",
    year: "2025",
    role: "UI/UX DESIGN / PROTOTYPING",
    client: "PLACEHOLDER CLIENT",
    description:
      "A three-step checkout rebuilt as a single confident screen — fewer fields, louder feedback.",
    context:
      "Placeholder case study: an abandoned-cart problem solved with typography instead of discounts.",
    approach:
      "Every step answers one question. Progress is drawn, not described; errors speak in full sentences.",
    tech: ["FIGMA", "REACT", "GSAP"],
    tags: ["CHECKOUT", "CONVERSION", "WIREFRAMES"],
    cover: "velocity",
    palette: { bg: "#0A0A0A", fg: "#F4F4F0", accent: "#CCFF00" },
    span: "box",
    link: "#",
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
