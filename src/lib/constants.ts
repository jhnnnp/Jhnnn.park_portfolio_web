export const SITE_CONFIG = {
    name: "Jinhan Park",
    title: "Jinhan Park - Frontend Developer",
    description: "Experienced frontend developer specializing in React, TypeScript, and modern web technologies.",
    url: "https://jinhanpark.dev",
    email: "contact@jinhanpark.dev",
    github: "https://github.com/jinhanpark",
    linkedin: "https://linkedin.com/in/jinhanpark",
    twitter: "https://twitter.com/jinhanpark",
} as const

export const NAVIGATION_ITEMS = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
] as const

export const SKILLS = {
    frontend: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "HTML/CSS", level: 95 },
        { name: "Vite", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Material-UI", level: 80 },
        { name: "Redux Toolkit", level: 80 },
    ],
    backend: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "Sequelize", level: 80 },
        { name: "JWT", level: 85 },
        { name: "WebSocket", level: 75 },
        { name: "AWS S3", level: 80 },
        { name: "Google OAuth", level: 75 },
    ],
    mobile: [
        { name: "React Native", level: 90 },
        { name: "Expo", level: 85 },
        { name: "WebRTC", level: 75 },
        { name: "AsyncStorage", level: 80 },
        { name: "Biometric Auth", level: 70 },
    ],
    tools: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 80 },
        { name: "MQTT", level: 70 },
        { name: "Twilio", level: 70 },
        { name: "Cursor", level: 85 },
        { name: "Claude", level: 85 },
        { name: "VS Code", level: 90 },
        { name: "Socket.io", level: 75 },
    ],
} as const

export const PROJECTS = [
    {
        id: '1',
        title: 'Backend TUK Navi',
        description: 'Node.js 기반 학사관리 시스템 API 서버',
        longDescription: 'Node.js와 Express.js로 구현된 웹서비스 백엔드. JWT 인증, 강의/사용자/커리큘럼 관리 API, MySQL(Sequelize ORM), AWS S3 파일 저장, Swagger(OpenAPI) 문서, Google OAuth 지원.',
        image: '/projects/tuk-navi.jpg',
        detailImages: [
            '/projects/tuk-navi-backend/api-docs.jpg',
            '/projects/tuk-navi-backend/database-schema.jpg',
            '/projects/tuk-navi-backend/swagger-screenshot.jpg',
            '/projects/tuk-navi-backend/auth-flow.jpg'
        ],
        technologies: [
            { name: 'Node.js', category: 'backend', color: '#339933' },
            { name: 'Express.js', category: 'backend', color: '#000000' },
            { name: 'MySQL', category: 'backend', color: '#4479A1' },
            { name: 'Sequelize', category: 'backend', color: '#52B0E7' },
            { name: 'Passport.js', category: 'backend', color: '#34E27A' },
            { name: 'AWS S3', category: 'backend', color: '#FF9900' },
            { name: 'Swagger', category: 'backend', color: '#85EA2D' },
            { name: 'Google OAuth', category: 'backend', color: '#4285F4' }
        ],
        github: 'https://github.com/TUK-curriculum/backend-tuk-navi',
        live: null,
        featured: false,
        category: 'api',
        status: 'completed',
        year: 2024,
        team: ['Backend Developer'],
        metrics: {
            note: "한국공학대학교 컴퓨터공학과 학생들을 위한 종합 학사 관리 시스템. 캡스톤 프로젝트로 진행된 풀스택 웹 애플리케이션",
            duration: "2024.09 - 2025.09",
            team: "팀 프로젝트",
            role: "백엔드 API 개발, 데이터베이스 설계, JWT 인증, AWS S3 파일 저장, Swagger API 문서화"
        }
    },
    {
        id: '2',
        title: 'Frontend TUK Navi',
        description: 'React와 TypeScript로 만든 학사관리 웹 프론트엔드',
        longDescription: 'React+TypeScript 기반 SPA. 시간표, 커리큘럼, 졸업요건, 과목 검색, 챗봇(AI 학사 상담), 반응형 웹, 사용자별 데이터 분리(LocalStorage) 등 다양한 학사관리 기능 구현. 캡스톤 주제의 대표 학부 프로젝트.',
        image: '/projects/tuk-navi-frontend.jpg',
        detailImages: [
            '/projects/tuk-navi-frontend/homepage.jpg',
            '/projects/tuk-navi-frontend/schedule.jpg',
            '/projects/tuk-navi-frontend/curriculum.jpg',
            '/projects/tuk-navi-frontend/chatbot.jpg',
            '/projects/tuk-navi-frontend/mobile-responsive.jpg'
        ],
        technologies: [
            { name: 'React', category: 'frontend', color: '#61DAFB' },
            { name: 'TypeScript', category: 'frontend', color: '#3178C6' },
            { name: 'Vite', category: 'frontend', color: '#646CFF' },
            { name: 'Material-UI', category: 'frontend', color: '#0081CB' },
            { name: 'Tailwind CSS', category: 'frontend', color: '#06B6D4' },
            { name: 'Context API', category: 'frontend', color: '#61DAFB' }
        ],
        github: 'https://github.com/TUK-curriculum/frontend-tuk-navi',
        live: null,
        featured: false,
        category: 'web',
        status: 'completed',
        year: 2024,
        team: ['Frontend Developer'],
        metrics: {
            note: "React+TypeScript 기반 SPA. 시간표, 커리큘럼, 졸업요건, 과목 검색, AI 챗봇, 반응형 웹, 다크모드 등 다양한 학사관리 기능 구현",
            duration: "2024.09 - 2025.09",
            team: "팀 프로젝트",
            role: "프론트엔드 개발, React Query 상태관리, Material-UI 컴포넌트 설계, Framer Motion 애니메이션 구현"
        }
    },
    {
        id: '3',
        title: 'TUK K-Digital Backend API Server',
        description: 'Node.js 기반 IoT 로봇 카메라 모니터링 시스템 API 서버',
        longDescription: 'Node.js와 Express.js로 구현된 스마트 홈 로봇 카메라 백엔드 시스템. 실시간 카메라 스트리밍, AI 기반 소리 감지, 이벤트 녹화, 사용자 인증, MQTT 통신 등을 제공하는 종합적인 IoT 플랫폼',
        image: '/projects/tuk-kdigital-backend.jpg',
        detailImages: [
            '/projects/tuk-kdigital-backend/architecture.jpg',
            '/projects/tuk-kdigital-backend/ai-detection.jpg',
            '/projects/tuk-kdigital-backend/mqtt-communication.jpg',
            '/projects/tuk-kdigital-backend/aws-s3-integration.jpg',
            '/projects/tuk-kdigital-backend/api-endpoints.jpg'
        ],
        technologies: [
            { name: 'Node.js', category: 'backend', color: '#339933' },
            { name: 'Express.js', category: 'backend', color: '#000000' },
            { name: 'MySQL', category: 'backend', color: '#4479A1' },
            { name: 'Sequelize', category: 'backend', color: '#52B0E7' },
            { name: 'JWT', category: 'backend', color: '#000000' },
            { name: 'Twilio SMS', category: 'backend', color: '#F22F46' },
            { name: 'AWS S3', category: 'backend', color: '#FF9900' },
            { name: 'Google OAuth', category: 'backend', color: '#4285F4' },
            { name: 'MQTT', category: 'backend', color: '#660066' },
            { name: 'WebSocket', category: 'backend', color: '#010101' },
            { name: 'Socket.io', category: 'backend', color: '#010101' }
        ],
        github: 'https://github.com/jhnnnp/tuk_k.digital_05_backend',
        live: null,
        featured: true,
        category: 'api',
        status: 'completed',
        year: 2025,
        team: ['Backend Developer'],
        award: '최우수상',
        metrics: {
            note: "K-Digital Training 캡스톤 프로젝트. AI 기반 소리 감지, 실시간 카메라 스트리밍, MQTT 통신을 활용한 IoT 로봇 카메라 모니터링 시스템",
            duration: "2024.09 - 2025.06",
            team: "팀 프로젝트",
            role: "백엔드 API 개발, AI 소리 감지 시스템, MQTT 통신, AWS S3 클라우드 저장, JWT 인증, Twilio SMS 알림",
            award: "K-하이테크 플랫폼 사업단에서 시행한 K-Digital Training 「IoT 스마트 융합 프로젝트 경진대회」 최우수상 수상"
        }
    },
    {
        id: '4',
        title: 'TUK K-Digital Frontend APP - TIBO',
        description: 'React Native 기반 AI 로봇 카메라 관리 모바일 애플리케이션',
        longDescription: 'React Native와 Expo를 기반으로 한 로봇 카메라 관리 앱. 실시간 PTZ 제어, WebRTC 스트리밍, AI 기반 모션/소리 감지, 생체 인증 앱 잠금, 녹화 관리 등을 제공하는 Apple-inspired 모던 모바일 애플리케이션',
        image: '/projects/tibo-mobile.jpg',
        detailImages: [
            '/projects/tibo-mobile/app-screens.jpg',
            '/projects/tibo-mobile/ptz-control.jpg',
            '/projects/tibo-mobile/webrtc-streaming.jpg',
            '/projects/tibo-mobile/biometric-auth.jpg',
            '/projects/tibo-mobile/recording-management.jpg',
            '/projects/tibo-mobile/apple-design.jpg'
        ],
        technologies: [
            { name: 'React Native', category: 'mobile', color: '#61DAFB' },
            { name: 'Expo', category: 'mobile', color: '#000020' },
            { name: 'TypeScript', category: 'frontend', color: '#3178C6' },
            { name: 'React Navigation', category: 'mobile', color: '#6B52AE' },
            { name: 'Redux Toolkit', category: 'frontend', color: '#764ABC' },
            { name: 'Zustand', category: 'frontend', color: '#FF6B35' },
            { name: 'React Query', category: 'frontend', color: '#FF4154' },
            { name: 'WebRTC', category: 'mobile', color: '#333333' },
            { name: 'React Native Reanimated', category: 'mobile', color: '#61DAFB' },
            { name: 'Styled Components', category: 'frontend', color: '#DB7093' },
            { name: 'React Hook Form', category: 'frontend', color: '#EC5990' },
            { name: 'Lottie', category: 'frontend', color: '#00D4FF' }
        ],
        github: 'https://github.com/jhnnnp/tuk_k.digital_05_frontend',
        live: null,
        featured: true,
        category: 'mobile',
        status: 'completed',
        year: 2025,
        team: ['Mobile Developer'],
        award: '최우수상',
        metrics: {
            note: "K-Digital Training. Apple-inspired 디자인으로 실시간 PTZ 제어, WebRTC 스트리밍, AI 감지 알림, 생체 인증 보안을 제공하는 모던 모바일 앱",
            duration: "2025.06 - 2025.09",
            team: "팀 프로젝트",
            role: "모바일 앱 개발, React Native UI/UX 구현, WebRTC 스트리밍, Redux 상태관리, 생체 인증 보안",
            award: "K-하이테크 플랫폼 사업단에서 시행한 K-Digital Training 「IoT 스마트 융합 프로젝트 경진대회」 최우수상 수상"
        }
    },
    {
        id: '5',
        title: 'MIMO Camera Mobile App',
        description: 'React Native + Expo 기반 홈캠 실시간 스트리밍 모바일 앱',
        longDescription: '공기계를 활용한 홈캠 솔루션의 모바일 앱. QR/PIN 기반 뷰어 연결, WebRTC 실시간 스트리밍, 생체 인증 보안, PTZ 카메라 제어, 이벤트 알림, 녹화 관리 등 완전한 홈캠 제어 기능을 제공하는 iOS/Android 모바일 애플리케이션',
        image: '/projects/mimo-mobile.jpg',
        detailImages: [
            '/projects/mimo-mobile/qr-connection.jpg',
            '/projects/mimo-mobile/webrtc-streaming.jpg',
            '/projects/mimo-mobile/biometric-security.jpg',
            '/projects/mimo-mobile/ptz-control.jpg',
            '/projects/mimo-mobile/event-alerts.jpg',
            '/projects/mimo-mobile/recording-features.jpg'
        ],
        technologies: [
            { name: 'React Native', category: 'mobile', color: '#61DAFB' },
            { name: 'Expo', category: 'mobile', color: '#000020' },
            { name: 'TypeScript', category: 'frontend', color: '#3178C6' },
            { name: 'React Navigation', category: 'mobile', color: '#6B52AE' },
            { name: 'Zustand', category: 'frontend', color: '#FF6B35' },
            { name: 'React Query', category: 'frontend', color: '#FF4154' },
            { name: 'WebRTC', category: 'mobile', color: '#333333' },
            { name: 'React Native Reanimated', category: 'mobile', color: '#61DAFB' },
            { name: 'React Hook Form', category: 'frontend', color: '#EC5990' },
            { name: 'React Native Vision Camera', category: 'mobile', color: '#61DAFB' },
            { name: 'Axios', category: 'frontend', color: '#5A29E4' }
        ],
        github: 'https://github.com/jhnnnp/MIMO_Homecam_frontend',
        live: null,
        featured: false,
        category: 'mobile',
        status: 'in-progress',
        year: 2025,
        team: ['Mobile Developer'],
        metrics: {
            note: "공기계를 활용한 홈캠 솔루션의 모바일 앱. QR/PIN 연결, WebRTC 스트리밍, 생체 인증, PTZ 제어 등 완전한 홈캠 제어 기능 제공",
            duration: "2025.06 - 진행 중",
            team: "개인 프로젝트",
            role: "모바일 앱 개발, React Native UI/UX 구현, WebRTC 스트리밍, 생체 인증 보안, PTZ 카메라 제어"
        }
    },
    {
        id: '6',
        title: 'MIMO Camera Backend API',
        description: 'Node.js + Express + MySQL + S3 기반 홈캠 백엔드 시스템',
        longDescription: '공기계를 활용한 홈캠 솔루션의 백엔드 API. JWT 인증, Google OAuth, QR/PIN 기반 연결, WebSocket 실시간 통신, WebRTC 스트리밍, AWS S3 클라우드 저장, 이벤트 알림, PTZ 카메라 제어 등 완전한 홈캠 백엔드 인프라를 제공하는 RESTful API 서버',
        image: '/projects/mimo-backend.jpg',
        detailImages: [
            '/projects/mimo-backend/api-architecture.jpg',
            '/projects/mimo-backend/websocket-communication.jpg',
            '/projects/mimo-backend/jwt-authentication.jpg',
            '/projects/mimo-backend/aws-s3-storage.jpg',
            '/projects/mimo-backend/event-notifications.jpg',
            '/projects/mimo-backend/database-design.jpg'
        ],
        technologies: [
            { name: 'Node.js', category: 'backend', color: '#339933' },
            { name: 'Express.js', category: 'backend', color: '#000000' },
            { name: 'MySQL', category: 'backend', color: '#4479A1' },
            { name: 'Sequelize', category: 'backend', color: '#52B0E7' },
            { name: 'WebSocket', category: 'backend', color: '#010101' },
            { name: 'JWT', category: 'backend', color: '#000000' },
            { name: 'Passport.js', category: 'backend', color: '#34E27A' },
            { name: 'Google OAuth', category: 'backend', color: '#4285F4' },
            { name: 'AWS S3', category: 'backend', color: '#FF9900' },
            { name: 'Jest', category: 'testing', color: '#C21325' },
            { name: 'Zod', category: 'backend', color: '#3E63DD' }
        ],
        github: 'https://github.com/jhnnnp/MIMO_Homecam_backend',
        live: null,
        featured: false,
        category: 'api',
        status: 'in-progress',
        year: 2025,
        team: ['Backend Developer'],
        metrics: {
            note: "공기계를 활용한 홈캠 솔루션의 백엔드 API. JWT 인증, WebSocket 통신, AWS S3 저장, 이벤트 알림, PTZ 제어 등 완전한 홈캠 백엔드 인프라",
            duration: "2025.06 - 진행 중",
            team: "개인 프로젝트",
            role: "백엔드 API 개발, JWT 인증, WebSocket 실시간 통신, AWS S3 클라우드 저장, 이벤트 알림 시스템, PTZ 카메라 제어"
        }
    }
] as const

export const EXPERIENCE = [
    {
        id: 1,
        company: "K-Digital Training",
        position: "Full-Stack Developer",
        period: "2024 - 2025",
        description: "K-하이테크 플랫폼 사업단 K-Digital Training IoT 스마트 융합 프로젝트 참여. AI 기반 로봇 카메라 모니터링 시스템 개발로 최우수상 수상.",
        technologies: ["React Native", "Node.js", "WebRTC", "MQTT", "AI Detection", "AWS S3"],
        achievements: [
            "K-Digital Training IoT 스마트 융합 프로젝트 경진대회 최우수상 수상",
            "AI 기반 소리 감지 및 실시간 카메라 스트리밍 시스템 개발",
            "React Native + Node.js 풀스택 모바일 애플리케이션 구현",
        ],
    },
    {
        id: 2,
        company: "TUK Curriculum Project",
        position: "Full-Stack Developer",
        period: "2024 - 2025",
        description: "한국공학대학교 컴퓨터공학과 캡스톤 프로젝트. React+TypeScript 프론트엔드와 Node.js 백엔드를 통한 종합 학사관리 시스템 개발.",
        technologies: ["React", "TypeScript", "Node.js", "MySQL", "Material-UI", "Swagger"],
        achievements: [
            "React+TypeScript 기반 SPA 학사관리 시스템 프론트엔드 개발",
            "Node.js+Express 기반 RESTful API 백엔드 서버 구축",
            "JWT 인증, AWS S3 파일 저장, Swagger API 문서화 구현",
        ],
    },
    {
        id: 3,
        company: "MIMO Homecam Project",
        position: "Full-Stack Developer",
        period: "2025 - Present",
        description: "공기계를 활용한 홈캠 솔루션 개발. React Native 모바일 앱과 Node.js 백엔드 API를 통한 완전한 IoT 홈캠 시스템 구현.",
        technologies: ["React Native", "Expo", "Node.js", "WebRTC", "WebSocket", "Biometric Auth"],
        achievements: [
            "QR/PIN 기반 뷰어 연결 및 WebRTC 실시간 스트리밍 구현",
            "생체 인증 보안 및 PTZ 카메라 제어 기능 개발",
            "WebSocket 실시간 통신 및 이벤트 알림 시스템 구축",
        ],
    },
] as const

export const ANIMATION_CONFIG = {
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94],
    stagger: 0.1,
} as const

export const BREAKPOINTS = {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const 