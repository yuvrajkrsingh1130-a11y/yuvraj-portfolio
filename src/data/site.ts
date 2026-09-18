/* ============================================================
   SITE-WIDE DATA — replace links & copy here.
   ============================================================ */

export const site = {
  name: "YUVRAJ SINGH",
  firstName: "YUVRAJ",
  lastName: "SINGH",
  role: "GRAPHIC DESIGNER / BRAND DESIGNER / CREATIVE DEVELOPER",
  statement: "I DESIGN THINGS THAT MOVE.",
  email: "hello@yuvrajsingh.design",
  status: "AVAILABLE FOR SELECTED PROJECTS",
  location: "INDIA — WORKING WORLDWIDE",
  socials: [
    { label: "INSTAGRAM", href: "https://instagram.com/", handle: "@YUVRAJ.SINGH" },
    { label: "LINKEDIN", href: "https://linkedin.com/", handle: "/IN/YUVRAJSINGH" },
    { label: "GITHUB", href: "https://github.com/", handle: "/YUVRAJSINGH" },
  ],
};

export const navItems = [
  { label: "WORK", to: "/work", index: "01" },
  { label: "LAB", to: "/lab", index: "02" },
  { label: "ABOUT", to: "/about", index: "03" },
  { label: "CONTACT", to: "/contact", index: "04" },
];

export interface Skill {
  name: string;
  description: string;
}

export const skills: Skill[] = [
  {
    name: "GRAPHIC DESIGN",
    description: "POSTERS / PRINT / CAMPAIGNS / VISUAL SYSTEMS",
  },
  {
    name: "BRAND DESIGN",
    description: "IDENTITIES / LOGOTYPES / GUIDELINES / ART DIRECTION",
  },
  {
    name: "WEB DESIGN",
    description: "EDITORIAL LAYOUTS / ART-DIRECTED INTERFACES",
  },
  {
    name: "CREATIVE DEVELOPMENT",
    description: "WEBGL / SHADERS / GENERATIVE SYSTEMS",
  },
  {
    name: "FRONT-END",
    description: "REACT / TYPESCRIPT / PERFORMANCE / ACCESSIBILITY",
  },
  {
    name: "MOTION",
    description: "GSAP / SCROLL CHOREOGRAPHY / MICRO-INTERACTION",
  },
  {
    name: "3D / INTERACTIVE",
    description: "THREE.JS / PROCEDURAL FORMS / LIVE RENDERING",
  },
];

export const labIntro =
  "I DON'T ONLY DESIGN FINISHED WORK. I EXPERIMENT. THIS IS WHERE TYPE, CODE AND MOTION GET BROKEN ON PURPOSE.";
