export type PageTab = "home" | "projects" | "system" | "about" | "contact";

export interface StageSpec {
  id: number;
  code: string;
  rangeLabel: string;
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
}

export interface BlueprintProject {
  sheet: string;
  id: string;
  title: string;
  subtitle: string;
  category: "LIVE PRODUCTION DEPLOYMENT" | "DESIGN SYSTEM & PRODUCT UI" | "BRAND IDENTITY & KINETIC WEB" | "MOTION FRAMEWORK & UX LAB" | "FINANCIAL TELEMETRY & DATA";
  role: string;
  scale: string;
  year: string;
  status: string;
  liveUrl: string;
  summary: string;
  specs: { key: string; val: string }[];
  stack: string[];
  layerCount: number;
  diagramType: "portfolio" | "saas" | "editorial" | "motion" | "fintech";
  challenge?: string;
  solution?: string;
  impactMetrics?: { label: string; value: string; desc: string }[];
}

export interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  tokens: string[];
}

export interface StudioPrinciple {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
}

export interface HardwareItem {
  category: string;
  name: string;
  spec: string;
  rationale: string;
}
