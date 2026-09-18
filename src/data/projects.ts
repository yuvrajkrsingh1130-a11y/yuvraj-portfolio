/* ============================================================
   PROJECT DATA
   ------------------------------------------------------------
   Replace titles, categories, years, descriptions and links
   here — every page (Home, Work, Project detail) reads from
   this single source. Swap `cover` values or replace the
   <CoverArt /> component output with real imagery when ready.
   ============================================================ */

export type CoverVariant =
  | "monolith"
  | "static"
  | "signal"
  | "velocity"
  | "anthem"
  | "machines";

export type ProjectCategory =
  | "IDENTITY"
  | "EDITORIAL"
  | "DIGITAL"
  | "WEBSITE"
  | "CAMPAIGN"
  | "EXPERIMENTAL";

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
  tags: string[];
  cover: CoverVariant;
  palette: { bg: string; fg: string; accent: string };
  featured?: boolean;
  link?: string;
}

export const projects: Project[] = [
  {
    slug: "monolith",
    index: "01",
    title: "MONOLITH",
    category: "IDENTITY",
    categoryLabel: "IDENTITY / BRANDING",
    year: "2026",
    role: "BRAND DESIGN / ART DIRECTION",
    client: "PLACEHOLDER CLIENT",
    description:
      "A heavy, monolithic brand system built on a single gesture — the slab. Identity, packaging and a rigid typographic grid.",
    context:
      "A placeholder brief: a brutalist coffee roastery that wanted an identity as dense and physical as its product. The system had to survive print, packaging and screen without losing weight.",
    approach:
      "One typeface, cut and repeated. The wordmark is set in a condensed grotesk, cropped until it behaves like architecture. A two-colour palette keeps everything raw; the grid does the styling.",
    tags: ["IDENTITY", "PRINT", "PACKAGING", "TYPE"],
    cover: "monolith",
    palette: { bg: "#0c0c0c", fg: "#ece9e1", accent: "#ff4d00" },
  },
  {
    slug: "paper-static",
    index: "02",
    title: "PAPER STATIC",
    category: "EDITORIAL",
    categoryLabel: "EDITORIAL / GRAPHIC DESIGN",
    year: "2025",
    role: "EDITORIAL DESIGN / TYPOGRAPHY",
    client: "SELF-INITIATED",
    description:
      "A print zine about noise, interference and the glitches of analogue media. 96 pages of broken grids and loud type.",
    context:
      "A self-initiated editorial experiment. The zine collects visual essays on signal noise, printed with deliberate misregistration between layers.",
    approach:
      "Editorial layout treated as a mixing desk — columns drift, footnotes collide with headlines, and every spread breaks one rule it established on the previous page.",
    tags: ["EDITORIAL", "PRINT", "ZINE", "LAYOUT"],
    cover: "static",
    palette: { bg: "#ece9e1", fg: "#0c0c0c", accent: "#ff4d00" },
  },
  {
    slug: "signal-field",
    index: "03",
    title: "SIGNAL FIELD",
    category: "DIGITAL",
    categoryLabel: "DIGITAL EXPERIENCE",
    year: "2026",
    role: "CREATIVE DEVELOPMENT / MOTION",
    client: "PLACEHOLDER CLIENT",
    description:
      "An interactive WebGL experience where typography reacts to scroll velocity and pointer energy. Sound made visible.",
    context:
      "A placeholder digital experience for an electronic music label. The brief: make the catalogue feel like a live signal instead of a shop window.",
    approach:
      "Custom shaders, generative waveforms and scroll-driven type. Every section is one continuous scene — no hard cuts, only modulations.",
    tags: ["WEBGL", "CREATIVE DEV", "MOTION", "3D"],
    cover: "signal",
    palette: { bg: "#0c0c0c", fg: "#ece9e1", accent: "#ff4d00" },
    featured: true,
  },
  {
    slug: "velocity-club",
    index: "04",
    title: "VELOCITY CLUB",
    category: "WEBSITE",
    categoryLabel: "WEBSITE / CREATIVE DEVELOPMENT",
    year: "2025",
    role: "WEB DESIGN / FRONT-END",
    client: "PLACEHOLDER CLIENT",
    description:
      "A kinetic website for a running collective. Oversized numbers, split-flap transitions and a pace table as navigation.",
    context:
      "Placeholder project: a club that wanted its site to feel like race day. Fast, loud, and impossible to read while standing still.",
    approach:
      "The whole interface is paced like a training plan — sections arrive on a strict tempo, hover states sprint ahead, and the footer counts down like a finish clock.",
    tags: ["WEB DESIGN", "FRONT-END", "MOTION", "GSAP"],
    cover: "velocity",
    palette: { bg: "#ece9e1", fg: "#0c0c0c", accent: "#ff4d00" },
  },
  {
    slug: "noise-anthem",
    index: "05",
    title: "NOISE ANTHEM",
    category: "CAMPAIGN",
    categoryLabel: "POSTER / CAMPAIGN",
    year: "2025",
    role: "GRAPHIC DESIGN / ART DIRECTION",
    client: "PLACEHOLDER CLIENT",
    description:
      "A poster series for a placeholder festival — ten screens, one distorted anthem, infinite typographic variations.",
    context:
      "Placeholder campaign for a noise music festival. Every poster is generated from the same waveform, so the series behaves like one organism.",
    approach:
      "Waveform data mapped onto letterforms. Each poster is a different frame of the same sound — hung together they animate across the wall.",
    tags: ["POSTER", "CAMPAIGN", "GENERATIVE", "PRINT"],
    cover: "anthem",
    palette: { bg: "#ff4d00", fg: "#0c0c0c", accent: "#ece9e1" },
  },
  {
    slug: "soft-machines",
    index: "06",
    title: "SOFT MACHINES",
    category: "EXPERIMENTAL",
    categoryLabel: "EXPERIMENTAL PROJECT",
    year: "2026",
    role: "CREATIVE DEVELOPMENT / 3D",
    client: "SELF-INITIATED",
    description:
      "An ongoing study of inflatable chrome forms — procedural meshes that breathe, dent and reflect a fake studio.",
    context:
      "Self-initiated research into soft-body feeling without physics engines. Everything is noise displacement, lighting and patience.",
    approach:
      "Simplex fields displace low-poly meshes on the GPU; facet normals do the chrome work. The forms are rendered live — nothing here is a still image.",
    tags: ["3D", "SHADERS", "EXPERIMENT", "LIVE"],
    cover: "machines",
    palette: { bg: "#0c0c0c", fg: "#ece9e1", accent: "#ff4d00" },
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
