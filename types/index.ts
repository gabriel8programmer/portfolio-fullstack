export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'backend' | 'fullstack' | 'api' | 'devops' | 'database';
  image: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  featured: boolean;
  order: number;
  createdAt: string;
  stats?: {
    stars?: number;
    forks?: number;
  };
}

export type StackCategory = 'languages' | 'backend' | 'database' | 'devops' | 'frontend';

export interface StackItem {
  id: string;
  name: string;
  category: StackCategory;
  iconSlug: string; // Used with simpleicons or fallback
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';
  color?: string;
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface PortfolioData {
  projects: Project[];
  stacks: StackItem[];
  messages: ContactMessage[];
}
