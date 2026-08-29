export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tags: string[];
  year: string;
  description: string;
  type: 'client' | 'concept' | 'experiment';
  accentColor: string;
  bgColor: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'barber-house',
    number: '01',
    title: 'BARBER HOUSE',
    subtitle: 'Digital identity and booking experience',
    tags: ['BRAND', 'WEB DESIGN', 'UI/UX'],
    year: '2026',
    description: 'A modern digital identity and booking experience for a contemporary barbershop. Clean interfaces, intentional typography.',
    type: 'client',
    accentColor: '#7a2d3a',
    bgColor: '#1c1c1c',
    featured: true,
  },
  {
    id: 'casa-restaurant',
    number: '02',
    title: 'CASA',
    subtitle: 'Restaurant identity & digital presence',
    tags: ['BRAND', 'VISUAL IDENTITY', 'WEB'],
    year: '2026',
    description: 'Visual identity and web presence for a modern restaurant concept rooted in warmth and simplicity.',
    type: 'concept',
    accentColor: '#5a5e45',
    bgColor: '#2a2420',
  },
  {
    id: 'northline',
    number: '03',
    title: 'NORTHLINE',
    subtitle: 'Cleaning service brand system',
    tags: ['BRAND', 'PRINT', 'IDENTITY'],
    year: '2025',
    description: 'A professional cleaning service brand built on the idea that clarity is the most convincing message.',
    type: 'concept',
    accentColor: '#4a5d6e',
    bgColor: '#1e2429',
  },
  {
    id: 'experiment-004',
    number: '04',
    title: 'EXPERIMENT 004',
    subtitle: 'Type in motion — self-initiated',
    tags: ['TYPOGRAPHY', 'MOTION', 'EXPERIMENT'],
    year: '2025',
    description: 'A self-initiated exploration of kinetic typography and typographic rhythm as spatial composition.',
    type: 'experiment',
    accentColor: '#b8a898',
    bgColor: '#131313',
  },
];

export interface Skill {
  category: string;
  items: string[];
}

export const skills: Skill[] = [
  {
    category: 'FOCUS',
    items: ['Graphic Design', 'UI / UX Design', 'Web Design', 'Visual Identity', 'Creative Development'],
  },
  {
    category: 'TOOLS',
    items: ['Figma', 'Adobe Creative Suite', 'AI-assisted Development', 'Modern Web Technologies'],
  },
];

export const navItems = [
  { label: '01 WORK', id: 'work' },
  { label: '02 ABOUT', id: 'about' },
  { label: '03 EXPERIMENTS', id: 'experiments' },
  { label: '04 CONTACT', id: 'contact' },
];
