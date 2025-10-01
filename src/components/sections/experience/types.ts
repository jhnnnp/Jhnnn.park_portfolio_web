export interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: readonly string[] | string[];
  achievements: readonly string[] | string[];
  images: readonly string[] | string[];
  image?: string;
  demoVideo?: string;
}

