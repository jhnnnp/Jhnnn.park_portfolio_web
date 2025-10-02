# Portfolio Website

React, TypeScript, Tailwind CSS로 구축된 개인 포트폴리오 웹사이트입니다.

## 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS 4** - 스타일링
- **Vite** - 빌드 도구
- **Framer Motion** - 애니메이션
- **EmailJS** - 이메일 폼

## 주요 기능

- 반응형 디자인
- 다국어 지원 (한국어/영어)
- 프로젝트 필터링 및 검색
- 이메일 연락 폼
- 스크롤 애니메이션
- 이력서 다운로드

## 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/jhnnnp/Jhnnn.park_portfolio_web.git
cd portfolio
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
```bash
cp .env.example .env.local
```

`.env.local` 파일에 EmailJS 설정 추가:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4. 개발 서버 실행
```bash
npm run dev
```

## 프로젝트 구조

```
src/
├── components/
│   ├── ui/              # 재사용 가능한 UI 컴포넌트
│   ├── layout/          # 레이아웃 컴포넌트
│   └── sections/        # 페이지 섹션
├── hooks/               # 커스텀 훅
├── lib/                 # 유틸리티 및 상수
└── types/               # TypeScript 타입 정의
```

## 배포

### Vercel
1. GitHub 저장소를 Vercel에 연결
2. 빌드 설정:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. 환경 변수 설정 후 배포

### Netlify
1. 저장소 연결
2. 빌드 명령어: `npm run build`
3. 배포 디렉토리: `dist`

## 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 미리보기
npm run lint     # 린터 실행
```

## 라이선스

MIT License

## 연락처

- **Email**: jhnnn.park@gmail.com
- **GitHub**: [@jhnnnp](https://github.com/jhnnnp)