/* ============================================================
   CAPABILITIES / SERVICES DATA
   ============================================================ */

export interface ServiceBlock {
  index: string;
  title: string;
  blurb: string;
  deliverables: string[];
  accent: "acid" | "orange" | "ink";
}

export const services: ServiceBlock[] = [
  {
    index: "S1",
    title: "UI/UX & PRODUCT DESIGN",
    blurb:
      "Interfaces that convert — wireframed hard, prototyped early, and shipped with a system behind them.",
    deliverables: [
      "WIREFRAMING & USER FLOWS",
      "FIGMA DESIGN SYSTEMS",
      "RESPONSIVE WEB APPLICATIONS",
      "INTERACTION PROTOTYPING",
    ],
    accent: "acid",
  },
  {
    index: "S2",
    title: "GRAPHIC DESIGN & CREATIVE DIRECTION",
    blurb:
      "Editorial posters, raw typography concepts and social visuals with a spine — loud where it counts.",
    deliverables: [
      "EDITORIAL & POSTER ART",
      "RAW TYPOGRAPHY CONCEPTS",
      "SOCIAL VISUAL ASSETS",
      "CAMPAIGN ART DIRECTION",
    ],
    accent: "orange",
  },
  {
    index: "S3",
    title: "WEB EXPERIENCE & DEVELOPMENT",
    blurb:
      "Modern frontend execution — WebGL scenes, smooth animated portfolios and sites that feel engineered.",
    deliverables: [
      "FRONT-END EXECUTION (REACT/TS)",
      "WEBGL / THREE.JS SCENES",
      "GSAP MOTION SYSTEMS",
      "ANIMATED PORTFOLIOS & LANDINGS",
    ],
    accent: "ink",
  },
];

export interface WorkflowStep {
  index: string;
  title: string;
  detail: string;
}

export const workflow: WorkflowStep[] = [
  {
    index: "01",
    title: "RESEARCH",
    detail:
      "Goals, constraints and references before pixels. What has to work, what has to be said, and what everyone is too polite to say.",
  },
  {
    index: "02",
    title: "WIREFRAME",
    detail:
      "Structure in black and white. Grids, hierarchy and flows settled before any visual style gets a vote.",
  },
  {
    index: "03",
    title: "BRUTAL PROTOTYPE",
    detail:
      "A clickable, ugly-on-purpose prototype fast. Real content, real states — feedback while changing things is still cheap.",
  },
  {
    index: "04",
    title: "PRODUCTION",
    detail:
      "Polish, motion and performance. Design systems documented, code shipped, handover that doesn't need a meeting.",
  },
];
