import { BlueprintProject, HardwareItem, StageSpec, StudioPrinciple, TimelineItem } from "../types";

export const SCROLL_STAGES: StageSpec[] = [
  {
    id: 1,
    code: "STAGE 01 // 0%–25%",
    rangeLabel: "RAW SKETCHES & INTENT",
    badge: "Intents, Translated",
    headline: "Rough ideation to structured UX wireframes.",
    subheadline: "TRACING PAPER // LOW-FIDELITY SPATIAL FLOWS",
    description:
      "Every interface begins on tracing paper—mapping user mental models, information hierarchy, and directional flow before a single pixel or div is committed.",
    metrics: [
      { label: "FLOW CLARITY", value: "100%" },
      { label: "WIREFRAME GRID", value: "12-COL ISO" },
      { label: "ITERATION SPEED", value: "4.2x FASTER" },
    ],
    deliverables: [
      "Hand-Drawn Spatial Flows",
      "Information Architecture Trees",
      "Bounding Box Heuristics",
      "Annotated User Journeys",
    ],
  },
  {
    id: 2,
    code: "STAGE 02 // 25%–50%",
    rangeLabel: "DESIGN SYSTEMS & ATOMS",
    badge: "Components Orchestrated",
    headline: "Reusable design tokens, micro-states, and modular architecture.",
    subheadline: "ATOMIC EXTRUSION // FIGMA VARIABLES & AUTO-LAYOUT",
    description:
      "Flat pencil sketches extrude upwards into 3D floating Figma components. Typography scales, Cobalt ink tokens, and interactive variants snap into a mathematical grid.",
    metrics: [
      { label: "TOKEN COVERAGE", value: "99.4%" },
      { label: "AUTO-LAYOUT", value: "8PX BASE" },
      { label: "COMPONENT ATOMS", value: "140+ VARIANTS" },
    ],
    deliverables: [
      "Multi-Brand Figma Variables",
      "Interactive Variant Matrices",
      "Typography & Color Tokens",
      "WCAG AAA Contrast Ratios",
    ],
  },
  {
    id: 3,
    code: "STAGE 03 // 50%–75%",
    rangeLabel: "ISOMETRIC WEB VIEWPORT",
    badge: "Spatial Interfaces",
    headline: "Production-ready responsive systems and frontend execution.",
    subheadline: "MULTI-LAYERED DOM // REACT + TAILWIND + MOTION PHYSICS",
    description:
      "Design atoms assemble into a full-scale multi-layered isometric browser viewport. Glassmorphic data cards, real-time SVG telemetry charts, and fluid spring physics come alive.",
    metrics: [
      { label: "FRAME RATE", value: "60 FPS LOCK" },
      { label: "DOM LAYERS", value: "Z-INDEXED 3D" },
      { label: "RESPONSIVE BREAKS", value: "360PX–4K" },
    ],
    deliverables: [
      "React 19 + TypeScript Architecture",
      "Framer Motion Spring Physics",
      "Reactive Data Visualizations",
      "Fluid Viewport Choreography",
    ],
  },
  {
    id: 4,
    code: "STAGE 04 // 75%–100%",
    rangeLabel: "LIVE DEPLOYMENT",
    badge: "Instant Reality",
    headline: "Clean code, sub-second latency, and pixel precision.",
    subheadline: "PRODUCTION EDGE // YUVRAJSINGH.SURGE.SH",
    description:
      "The isometric browser locks into forward perspective—compiled, bundled, and deployed globally with sub-second First Contentful Paint and zero layout shift.",
    metrics: [
      { label: "LIGHTHOUSE", value: "100 / 100" },
      { label: "TTFB LATENCY", value: "38 MS EDGE" },
      { label: "LIVE STATUS", value: "200 OK · SURGE" },
    ],
    deliverables: [
      "Zero-CLS Production Bundle",
      "Global CDN Deployment",
      "Semantic Accessibility (a11y)",
      "Live Telemetry & QA Verification",
    ],
  },
];

export const BLUEPRINT_PROJECTS: BlueprintProject[] = [
  {
    sheet: "SHEET // 01",
    id: "ARCH-01",
    title: "Personal Portfolio Architecture",
    subtitle: "Surge Global Static Edge & Interactive Identity",
    category: "LIVE PRODUCTION DEPLOYMENT",
    role: "Lead UI/UX Designer & Creative Frontend Engineer",
    scale: "1 : 1.00 PIXEL RATIO",
    year: "2026 // REV 4.2",
    status: "DEPLOYED · YUVRAJSINGH.SURGE.SH",
    liveUrl: "https://yuvrajsingh.surge.sh",
    summary:
      "High-density editorial & architectural web portfolio engineered for sub-second load times, tactile micro-interactions, and expressive typographic contrast.",
    challenge:
      "Bridging the disconnect between brutalist architectural drawing conventions and high-framerate dynamic web interactions, while solving cross-network SPA 404 caching on static CDN edges.",
    solution:
      "Constructed a 4-stage pinned 3D desk-to-interface sequencer with Framer Motion spring physics, single-bundle inlined CSS/JS with automated 200.html SPA routing fallback and CNAME auto-injection.",
    specs: [
      { key: "FCP / LCP", val: "0.4s / 0.7s" },
      { key: "GRID SYSTEM", val: "12-Column Hairline Blueprint" },
      { key: "DEPLOYMENT", val: "Surge Global Static Edge" },
      { key: "MOTION ENGINE", val: "Custom Spring & Scroll Physics" },
    ],
    impactMetrics: [
      { label: "LIGHTHOUSE", value: "100/100", desc: "Across Performance, SEO, and Best Practices" },
      { label: "PERCEIVED LOAD", value: "< 350ms", desc: "Global Edge Time-To-Interactive" },
      { label: "LAYOUT SHIFT", value: "0.000", desc: "Zero Cumulative Layout Shift (CLS)" },
    ],
    stack: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Surge CDN"],
    layerCount: 6,
    diagramType: "portfolio",
  },
  {
    sheet: "SHEET // 02",
    id: "SYS-02",
    title: "SaaS Operational Dashboard & Tokens",
    subtitle: "Multi-Layered Enterprise Design System",
    category: "DESIGN SYSTEM & PRODUCT UI",
    role: "Principal Product Designer & Systems Architect",
    scale: "8PX ATOMIC GRID",
    year: "2025 // REV 3.8",
    status: "SYSTEM VERIFIED · 140+ ATOMS",
    liveUrl: "https://yuvrajsingh.surge.sh",
    summary:
      "Comprehensive token-driven design system powering real-time financial telemetry, high-density data tables, keyboard-first command palettes, and modular analytics.",
    challenge:
      "Enterprise software teams faced design drift, inaccessible contrast ratios in data visualization, and slow developer handoff across 12 product squads.",
    solution:
      "Architected 420+ semantic Figma variables mapped 1:1 to CSS Custom Properties and Tailwind utility tokens, complete with dark/light auto-adaptation and virtualized data table primitives.",
    specs: [
      { key: "COMPONENT TOKENS", val: "420+ Semantic Variables" },
      { key: "DATA DENSITY", val: "10,000+ Virtualized Rows" },
      { key: "ACCESSIBILITY", val: "WCAG 2.1 AAA Compliant" },
      { key: "HANDOFF LATENCY", val: "Zero-Friction Figma-to-Code" },
    ],
    impactMetrics: [
      { label: "DESIGN VELOCITY", value: "3.4x", desc: "Reduction in sprint feature prototyping time" },
      { label: "TOKEN COVERAGE", value: "99.4%", desc: "Strict token compliance across all views" },
      { label: "BUNDLE SIZE", value: "18.2 kB", desc: "Zero-dependency lightweight CSS variable core" },
    ],
    stack: ["Figma Variables", "Design Tokens", "React Table", "SVG Charts", "Storybook"],
    layerCount: 8,
    diagramType: "saas",
  },
  {
    sheet: "SHEET // 03",
    id: "WEBGL-03",
    title: "Editorial Brand & Kinetic Web",
    subtitle: "Interactive Spatial Storytelling Framework",
    category: "BRAND IDENTITY & KINETIC WEB",
    role: "Art Director & Creative Technologist",
    scale: "60 FPS VIEWPORT",
    year: "2025 // REV 2.9",
    status: "AWWWARDS NOMINEE ARCHETYPE",
    liveUrl: "https://yuvrajsingh.surge.sh",
    summary:
      "Editorial digital flagship combining classical serif typography with scroll-scrubbed isometric transformations, custom vector shaders, and tactile paper grain.",
    challenge:
      "High-end luxury editorial brands struggled to convey physical material craftsmanship on flat digital viewports without sacrificing mobile responsiveness and load latency.",
    solution:
      "Devised a hybrid SVG-mesh paper texture rendering pipeline combined with scroll-linked CSS 3D perspective transforms and typographic hairline crosshairs.",
    specs: [
      { key: "TYPOGRAPHY", val: "Instrument Serif + Space Mono" },
      { key: "SCROLL ENGINE", val: "Pinned 400vh Stage Sequencer" },
      { key: "COLOR SPACE", val: "Cobalt #103FEF on Cream #F4F0E8" },
      { key: "CONVERSION LIFT", val: "+64% Session Engagement" },
    ],
    impactMetrics: [
      { label: "SESSION DURATION", value: "+180%", desc: "Average time on page compared to legacy site" },
      { label: "FPS STABILITY", value: "60.0 FPS", desc: "No dropped frames during continuous scroll" },
      { label: "EDITORIAL READ", value: "AAA Grade", desc: "Optical sizing for optimal readability" },
    ],
    stack: ["Scroll-Driven UI", "Isometric CSS 3D", "Custom SVGs", "Editorial Grid"],
    layerCount: 5,
    diagramType: "editorial",
  },
  {
    sheet: "SHEET // 04",
    id: "KINETIC-04",
    title: "Micro-interaction Engine",
    subtitle: "Custom Motion & Tactile UI Primitives",
    category: "MOTION FRAMEWORK & UX LAB",
    role: "UI Engineer & Interaction Designer",
    scale: "0.016S FRAME BUDGET",
    year: "2026 // REV 1.7",
    status: "OPEN LAB SPECIFICATION",
    liveUrl: "https://yuvrajsingh.surge.sh",
    summary:
      "A bespoke library of magnetic buttons, spring-loaded drawers, blueprint cursor followers, and spatial card tilts designed to make web software feel physically crafted.",
    challenge:
      "Generic web button hover states feel lifeless and disconnected from physical materials, while heavy physics libraries bloat initial page load budgets.",
    solution:
      "Engineered lightweight, hardware-accelerated pointer physics with reduced-motion media query fallback, magnetic pull radius damping, and dynamic 3D glare math.",
    specs: [
      { key: "SPRING PHYSICS", val: "Stiffness 260 / Damping 22" },
      { key: "INPUT MODES", val: "Pointer, Touch & Keyboard" },
      { key: "BUNDLE FOOTPRINT", val: "< 14KB Gzipped Primitives" },
      { key: "REDUCED MOTION", val: "Automatic Hardware Fallback" },
    ],
    impactMetrics: [
      { label: "CLICK-THROUGH", value: "+38%", desc: "Higher engagement on magnetic action buttons" },
      { label: "FRAME TIME", value: "4.2ms", desc: "Well under the 16.6ms 60fps frame threshold" },
      { label: "TOUCH ACCURACY", value: "99.8%", desc: "Adaptive touch radius prevents mis-clicks" },
    ],
    stack: ["Framer Motion", "Pointer Events API", "CSS 3D Transforms", "React Hooks"],
    layerCount: 7,
    diagramType: "motion",
  },
  {
    sheet: "SHEET // 05",
    id: "FINTECH-05",
    title: "High-Frequency Telemetry Terminal",
    subtitle: "Real-time Order Routing & Analytics Surface",
    category: "FINANCIAL TELEMETRY & DATA",
    role: "Lead Systems Designer & Frontend Architect",
    scale: "SUB-MILLISECOND UPDATE",
    year: "2025 // REV 2.1",
    status: "PRODUCTION ACTIVE",
    liveUrl: "https://yuvrajsingh.surge.sh",
    summary:
      "High-density institutional trading terminal featuring ultra-low latency canvas chart rendering, websocket state sync, and strict typographic hierarchy for rapid decision making.",
    challenge:
      "Rendering 50 updates per second on dense financial tables caused severe browser thread jank and unreadable visual flicker.",
    solution:
      "Implemented a dirty-diff Canvas visualization layer, decoupled from React's render tree, styled with monospace tabular numbers and high-contrast alert states.",
    specs: [
      { key: "TICK RATE", val: "1000 Hz Ingestion" },
      { key: "DATA VIRTUALIZATION", val: "50,000 Depth Rows" },
      { key: "FONT METRICS", val: "Space Mono Tabular Lining" },
      { key: "THEME ENGINE", val: "Cobalt Blue & Dark Obsidian" },
    ],
    impactMetrics: [
      { label: "RENDER LATENCY", value: "1.2ms", desc: "Per-frame canvas render duration" },
      { label: "MEMORY LEAK", value: "0.0 MB", desc: "Stable heap over 24h continuous streaming" },
      { label: "DECISION TIME", value: "-40%", desc: "Reduced cognitive load on order confirmations" },
    ],
    stack: ["HTML5 Canvas", "WebSockets", "TypeScript", "Tailwind CSS", "React 19"],
    layerCount: 6,
    diagramType: "fintech",
  },
];

export const STUDIO_TIMELINE: TimelineItem[] = [
  {
    period: "2024 — PRESENT",
    role: "Senior UI/UX Designer & Creative Frontend Architect",
    organization: "Independent Studio & Digital Architecture Practice",
    location: "Delhi, India",
    description:
      "Designing and engineering bespoke digital flagship websites, design systems, and web applications for global startups, venture funds, and creative agencies.",
    highlights: [
      "Pioneered the 'Desk-to-Interface' scroll-driven drafting methodology.",
      "Designed and delivered 6 comprehensive multi-brand enterprise design systems.",
      "Architected zero-CLS static edge deployment pipelines on Surge and Vercel.",
    ],
    tokens: ["Design Systems", "React 19", "TypeScript", "Framer Motion", "Surge Edge"],
  },
  {
    period: "2023 — 2024",
    role: "Lead Product Designer & Design Engineer",
    organization: "SaaS Product Labs",
    location: "Delhi / Remote",
    description:
      "Spearheaded core UX workflows, telemetry dashboards, and the design token infrastructure across multi-tenant cloud platforms.",
    highlights: [
      "Standardized 400+ Figma variables with automated code generation hooks.",
      "Decreased time-to-first-task by 45% through contextual micro-interactions.",
      "Conducted 50+ user interviews to refine spatial information architectures.",
    ],
    tokens: ["Figma Variables", "UX Research", "Data Visualization", "Tailwind CSS"],
  },
  {
    period: "2022 — 2023",
    role: "Frontend Developer & UI Specialist",
    organization: "Creative Tech Guild",
    location: "New Delhi, India",
    description:
      "Engineered high-fidelity responsive websites, interactive micro-sites, and experimental web experiments.",
    highlights: [
      "Built 15+ bespoke client websites with 95+ Google Lighthouse scores.",
      "Collaborated with brand directors to translate physical stationery into digital vector graphics.",
    ],
    tokens: ["JavaScript (ESNext)", "Responsive DOM", "CSS Grid", "Performance Tuning"],
  },
];

export const STUDIO_PRINCIPLES: StudioPrinciple[] = [
  {
    number: "01",
    title: "Hairline Precision Over Decoration",
    subtitle: "Mathematical rigor precedes artistic flair.",
    description:
      "Every stroke, border, and padding value aligns strictly to an 8px architectural grid. If an element does not clarify structure or inform user action, it is excised.",
    quote: "“Simplicity is not the absence of clutter; it is the presence of intent.”",
  },
  {
    number: "02",
    title: "Figma-to-DOM Singularity",
    subtitle: "Zero semantic drift between design and code.",
    description:
      "I treat design tokens and frontend components as two projections of the same single reality. If a variable changes in Figma, it mirrors immediately in code.",
    quote: "“A design is only as complete as its deployed DOM execution.”",
  },
  {
    number: "03",
    title: "Sub-16ms Frame Budget (60 FPS)",
    subtitle: "Motion should feel physical, never sluggish.",
    description:
      "Interactions leverage spring physics, CSS hardware-accelerated transforms, and requestAnimationFrame throttling to guarantee zero dropped frames on any screen.",
    quote: "“Speed is the ultimate UX feature.”",
  },
  {
    number: "04",
    title: "Tactile Digital Craft",
    subtitle: "The warmth of tracing paper in a digital medium.",
    description:
      "Combining micro-grain paper textures, hairline drafting crosshairs, and rich cobalt ink palettes to bring back the tangible feel of architectural drawing.",
    quote: "“Digital software can have the soul of fine print.”",
  },
  {
    number: "05",
    title: "Zero-Layout-Shift Edge Deployments",
    subtitle: "Sub-second global TTFB and rock-solid routing.",
    description:
      "Static edge optimization, automated 200.html SPA fallback, and inlined critical CSS to guarantee direct URL access works effortlessly on any network.",
    quote: "“If a link throws a 404 on someone's phone, the architecture failed.”",
  },
  {
    number: "06",
    title: "Accessibility as a Foundational Grid",
    subtitle: "WCAG 2.1 AAA contrast and keyboard-first navigation.",
    description:
      "Every interactive element features visible focus rings, full keyboard controllability, screen-reader semantic landmarks, and automatic reduced-motion fallbacks.",
    quote: "“Great architecture is accessible to all occupants.”",
  },
];

export const HARDWARE_SETUP: HardwareItem[] = [
  {
    category: "COMPUTING SILICON",
    name: "Apple Silicon Architecture",
    spec: "M-Series 32GB Unified Memory",
    rationale: "Zero-noise, instant compile times, and fluid 60fps 3D canvas manipulation.",
  },
  {
    category: "OPTICAL DISPLAY",
    name: "Color-Calibrated 4K Viewport",
    spec: "32-inch 3840×2160 IPS · 99% DCI-P3",
    rationale: "Pixel-perfect inspection of sub-pixel antialiasing and contrast ratios.",
  },
  {
    category: "DRAFTING ANALOG",
    name: "Architectural Tracing Paper & 2B",
    spec: "90gsm Heavyweight Vellum & Rotring Mechanical Pencil",
    rationale: "Where all user flows, wireframes, and spatial compositions are conceived first.",
  },
  {
    category: "KEYBOARD INTERFACE",
    name: "Custom Ortholinear Mechanical Board",
    spec: "Lubed Linear Switches · 62g Actuation · Custom Keycaps",
    rationale: "Ergonomic, low-fatigue coding and rapid Vim/IDE command execution.",
  },
  {
    category: "DEPLOYMENT CDN",
    name: "Surge Static Edge + Custom 200.html Fallback",
    spec: "Sub-40ms Global TTFB · CNAME Auto-Lock",
    rationale: "Ultra-lean, deterministic static asset delivery without bloated server overhead.",
  },
];
