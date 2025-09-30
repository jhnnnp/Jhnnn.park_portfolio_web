import type { HeroData, AboutData, Project, Experience } from '@/types';

export const HERO_DATA: HeroData = {
    title: "안녕하세요, 저는",
    subtitle: "풀스택 개발자",
    description: "사용자 경험을 중시하는 웹 애플리케이션을 개발합니다. 최신 기술 스택과 애플의 디자인 철학을 결합하여 직관적이고 아름다운 디지털 경험을 만들어갑니다.",
    ctaText: "프로젝트 보기",
    ctaLink: "#projects"
};

export const ABOUT_DATA: AboutData = {
    name: "박진한",
    title: "풀스택 개발자",
    description: "5년간의 개발 경험을 바탕으로 사용자 중심의 웹 애플리케이션을 개발하고 있습니다. React, Node.js, TypeScript를 주력으로 하며, 깔끔하고 효율적인 코드 작성을 지향합니다. 새로운 기술을 배우는 것을 즐기며, 팀과의 협업을 통해 더 나은 솔루션을 만들어갑니다.",
    image: "/profile.jpg",
    skills: [
        { name: "React", icon: "react", level: 95, category: "frontend" },
        { name: "TypeScript", icon: "typescript", level: 90, category: "frontend" },
        { name: "Node.js", icon: "nodejs", level: 85, category: "backend" },
        { name: "Next.js", icon: "nextjs", level: 88, category: "frontend" },
        { name: "Python", icon: "python", level: 80, category: "backend" },
        { name: "Docker", icon: "docker", level: 75, category: "devops" },
        { name: "AWS", icon: "aws", level: 70, category: "devops" },
        { name: "Figma", icon: "figma", level: 65, category: "design" }
    ],
    socialLinks: [
        { name: "GitHub", url: "https://github.com/jhnnn", icon: "github" },
        { name: "LinkedIn", url: "https://linkedin.com/in/jhnnn", icon: "linkedin" },
        { name: "Twitter", url: "https://twitter.com/jhnnn", icon: "twitter" },
        { name: "Email", url: "mailto:jhnnn@example.com", icon: "mail" }
    ]
};

export const PROJECTS: Project[] = [
    {
        id: "1",
        title: "E-Commerce Platform",
        description: "React와 Node.js로 구축한 풀스택 이커머스 플랫폼. 결제 시스템, 재고 관리, 사용자 인증 등 완전한 기능을 제공합니다.",
        image: "/projects/ecommerce.jpg",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
        githubUrl: "https://github.com/jhnnn/ecommerce",
        liveUrl: "https://ecommerce-demo.com",
        featured: true
    },
    {
        id: "2",
        title: "Task Management App",
        description: "팀 협업을 위한 태스크 관리 애플리케이션. 실시간 업데이트, 드래그 앤 드롭, 프로젝트 추적 기능을 포함합니다.",
        image: "/projects/taskmanager.jpg",
        technologies: ["React", "TypeScript", "Firebase", "Framer Motion"],
        githubUrl: "https://github.com/jhnnn/taskmanager",
        liveUrl: "https://taskmanager-demo.com",
        featured: true
    },
    {
        id: "3",
        title: "Portfolio Website",
        description: "애플 스타일의 반응형 포트폴리오 웹사이트. Framer Motion과 Tailwind CSS를 활용한 부드러운 애니메이션과 모던한 디자인.",
        image: "/projects/portfolio.jpg",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        githubUrl: "https://github.com/jhnnn/portfolio",
        liveUrl: "https://portfolio-demo.com",
        featured: false
    },
    {
        id: "4",
        title: "Weather Dashboard",
        description: "실시간 날씨 정보를 제공하는 대시보드. OpenWeatherMap API를 활용하여 현재 날씨와 예보를 시각적으로 표시합니다.",
        image: "/projects/weather.jpg",
        technologies: ["React", "TypeScript", "Chart.js", "OpenWeatherMap API"],
        githubUrl: "https://github.com/jhnnn/weather-dashboard",
        liveUrl: "https://weather-demo.com",
        featured: false
    },
    {
        id: "5",
        title: "Blog Platform",
        description: "마크다운을 지원하는 블로그 플랫폼. 관리자 패널, 댓글 시스템, SEO 최적화 기능을 포함합니다.",
        image: "/projects/blog.jpg",
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
        githubUrl: "https://github.com/jhnnn/blog-platform",
        liveUrl: "https://blog-demo.com",
        featured: false
    },
    {
        id: "6",
        title: "Chat Application",
        description: "실시간 채팅 애플리케이션. Socket.io를 활용한 실시간 메시징, 파일 공유, 그룹 채팅 기능을 제공합니다.",
        image: "/projects/chat.jpg",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
        githubUrl: "https://github.com/jhnnn/chat-app",
        liveUrl: "https://chat-demo.com",
        featured: false
    }
];

export const EXPERIENCES: Experience[] = [
    {
        id: "1",
        company: "TechCorp",
        position: "Senior Frontend Developer",
        duration: "2022 - Present",
        description: "React와 TypeScript를 활용한 대규모 웹 애플리케이션 개발. 팀 리드로서 5명의 개발자를 관리하며 프로젝트 일정과 코드 품질을 책임집니다.",
        technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Jest"],
        achievements: [
            "성능 최적화를 통해 페이지 로딩 속도 40% 개선",
            "컴포넌트 라이브러리 구축으로 개발 효율성 30% 향상",
            "테스트 커버리지 90% 달성"
        ]
    },
    {
        id: "2",
        company: "StartupXYZ",
        position: "Full Stack Developer",
        duration: "2020 - 2022",
        description: "스타트업에서 풀스택 개발자로 근무. 프론트엔드부터 백엔드까지 전체 개발 스택을 담당하며 빠른 프로토타이핑과 MVP 개발에 집중했습니다.",
        technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
        achievements: [
            "MVP 개발을 통해 6개월 내 서비스 런칭",
            "사용자 수 10,000명 달성",
            "AWS 인프라 최적화로 월 비용 50% 절감"
        ]
    },
    {
        id: "3",
        company: "DigitalAgency",
        position: "Frontend Developer",
        duration: "2019 - 2020",
        description: "다양한 클라이언트의 웹사이트와 웹 애플리케이션 개발. 반응형 디자인과 사용자 경험 최적화에 중점을 두었습니다.",
        technologies: ["React", "Vue.js", "SCSS", "Webpack", "Git"],
        achievements: [
            "20개 이상의 클라이언트 프로젝트 완료",
            "평균 페이지 로딩 속도 2초 이하 달성",
            "모바일 최적화로 모바일 트래픽 60% 증가"
        ]
    }
];

export const NAVIGATION_ITEMS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" }
]; 