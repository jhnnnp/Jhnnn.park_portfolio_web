export interface Technology {
    readonly name: string;
    readonly category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops' | 'testing';
    readonly color?: string;
}

export interface Project {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly longDescription?: string;
    readonly image?: string;
    readonly icon?: string;
    readonly detailImages?: readonly string[];
    readonly demoVideo?: string;
    readonly technologies: readonly Technology[];
    readonly github?: string;
    readonly live?: string | null;
    readonly featured: boolean;
    readonly category: 'web' | 'mobile' | 'desktop' | 'api';
    readonly status: 'completed' | 'in-progress' | 'maintenance';
    readonly year: number;
    readonly team?: readonly string[];
    readonly award?: string;
    readonly metrics?: {
        readonly note?: string;
        readonly duration?: string;
        readonly team?: string;
        readonly role?: string;
        readonly award?: string;
    };
}

export interface ProjectsProps {
    projects?: readonly Project[];
    className?: string;
    showFilters?: boolean;
    showSearch?: boolean;
    itemsPerPage?: number;
}

// 애니메이션 관련 타입들
export interface AnimationConfig {
    duration: number;
    ease: number[];
    stagger: number;
}

export interface ScrollAnimationOptions {
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean;
    markers?: boolean;
}

export interface Skill {
    name: string;
    icon: string;
    level: number; // 0-100
    category: 'frontend' | 'backend' | 'devops' | 'design' | 'other';
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
    technologies: string[];
    achievements: string[];
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
}

export interface NavigationItem {
    label: string;
    href: string;
    icon?: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface HeroData {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

export interface AboutData {
    name: string;
    title: string;
    description: string;
    image: string;
    skills: Skill[];
    socialLinks: SocialLink[];
} 