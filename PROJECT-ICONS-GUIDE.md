# 프로젝트 아이콘 설정 가이드

## 개요
프로젝트 카드와 모달에 표시될 아이콘을 `media` 폴더에 별도로 관리할 수 있습니다.

## 폴더 구조
```
portfolio/
├── public/
│   └── media/
│       ├── icons/              # 프로젝트 아이콘 폴더
│       │   ├── tuk-navi.png
│       │   ├── mimo.png
│       │   └── portfolio.png
│       ├── kdigital/           # 프로젝트 스크린샷
│       └── mimo/               # 프로젝트 스크린샷
```

## 아이콘 파일 규격

### 권장 사양
- **크기**: 512x512px 또는 1024x1024px (정사각형)
- **형식**: PNG (투명 배경 권장) 또는 SVG
- **파일명**: 프로젝트 식별이 쉬운 케밥-케이스 (예: `mimo-camera.png`, `tuk-navi.png`)
- **최적화**: TinyPNG, ImageOptim 등으로 파일 크기 최적화 권장

### 디자인 가이드라인
- 심플하고 인식하기 쉬운 아이콘
- 프로젝트를 대표하는 로고 또는 심볼
- 고해상도 디스플레이 대응을 위한 2x 크기

## 사용 방법

### 1. 아이콘 파일 추가
아이콘 파일을 `public/media/icons/` 폴더에 추가합니다.

```bash
# 예시
public/media/icons/
├── tuk-navi.png
├── mimo-camera.png
└── portfolio-website.png
```

### 2. constants.ts에 경로 설정
`src/lib/constants.ts`의 PROJECTS 배열에 `icon` 필드를 추가합니다.

```typescript
export const PROJECTS = [
    {
        id: '1',
        title: 'MIMO Camera Mobile App',
        description: 'React Native + Expo 기반 홈캠 실시간 스트리밍 모바일 앱',
        image: '/projects/mimo.jpg',              // 프로젝트 메인 이미지
        icon: '/media/icons/mimo-camera.png',      // 프로젝트 아이콘 (새로 추가)
        detailImages: [
            '/media/mimo/1.png',
            '/media/mimo/2.png',
            // ...
        ],
        // ... 나머지 필드들
    },
    // 다른 프로젝트들...
]
```

### 3. 아이콘이 표시되는 곳

#### 프로젝트 카드 (image가 없을 때)
- 프로젝트 카드에서 `image`가 없거나 로드 실패 시
- `icon`이 설정되어 있으면 아이콘 표시
- `icon`도 없으면 프로젝트 제목의 첫 글자 표시

#### 사용 예시
```typescript
// Case 1: image와 icon 모두 있음
{
    image: '/projects/mimo.jpg',      // 우선 표시
    icon: '/media/icons/mimo.png',    // image 실패 시 표시
}

// Case 2: icon만 있음
{
    image: undefined,                  // 이미지 없음
    icon: '/media/icons/mimo.png',    // 아이콘 표시
}

// Case 3: 둘 다 없음
{
    image: undefined,
    icon: undefined,                   // 제목 첫 글자 'M' 표시
}
```

## 아이콘 제작 도구

### 온라인 도구
- [Canva](https://canva.com) - 템플릿 기반 디자인
- [Figma](https://figma.com) - 전문 디자인 도구
- [Looka](https://looka.com) - AI 로고 생성기
- [IconScout](https://iconscout.com) - 무료/유료 아이콘 라이브러리

### 로컬 도구
- Adobe Illustrator - 벡터 기반 아이콘 제작
- Sketch - macOS 전용 디자인 도구
- Inkscape - 무료 벡터 그래픽 에디터

### 최적화 도구
- [TinyPNG](https://tinypng.com) - PNG 압축
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG 최적화
- ImageOptim (macOS) - 이미지 일괄 최적화

## 예제

### MIMO 프로젝트 아이콘 설정
```typescript
{
    id: 'mimo-1',
    title: 'MIMO Camera Mobile App',
    description: 'React Native + Expo 기반 홈캠 실시간 스트리밍 모바일 앱',
    icon: '/media/icons/mimo-camera.png',
    image: '/projects/mimo-app.jpg',
    detailImages: [
        '/media/mimo/1.png',
        '/media/mimo/2.png',
        // ...
    ],
    // ...
}
```

### 포트폴리오 웹사이트 아이콘 설정
```typescript
{
    id: 'portfolio-1',
    title: 'Portfolio Website',
    description: 'React + TypeScript + Vite 기반 개인 포트폴리오 웹사이트',
    icon: '/media/icons/portfolio.png',
    image: undefined,  // image 없이 icon만 사용
    // ...
}
```

## 주의사항

1. **경로는 `/media/icons/`로 시작**: public 폴더 기준 절대 경로 사용
2. **파일명 일관성**: 케밥-케이스 사용 권장 (예: `mimo-camera.png`)
3. **파일 크기**: 100KB 이하로 최적화 권장
4. **투명 배경**: PNG 사용 시 투명 배경 권장
5. **저작권**: 사용 권한이 있는 이미지만 사용

## 트러블슈팅

### 아이콘이 표시되지 않을 때

1. **경로 확인**
   ```typescript
   // 올바른 경로
   icon: '/media/icons/mimo.png'
   
   // 잘못된 경로
   icon: 'media/icons/mimo.png'      // '/' 없음
   icon: '/public/media/icons/mimo.png'  // '/public' 불필요
   ```

2. **파일 존재 확인**
   ```bash
   ls -la public/media/icons/
   ```

3. **브라우저 캐시 삭제**
   - 개발자 도구 > Network > Disable cache

4. **개발 서버 재시작**
   ```bash
   npm run dev
   ```

## TypeScript 타입 정의

```typescript
// src/types/index.ts
export interface Project {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly image?: string;           // 프로젝트 메인 이미지
    readonly icon?: string;             // 프로젝트 아이콘 (추가됨)
    readonly detailImages?: readonly string[];
    // ...
}
```

## 참고 자료

- [Vite Public Directory](https://vitejs.dev/guide/assets.html#the-public-directory)
- [React Image Best Practices](https://web.dev/fast/#optimize-your-images)
- [Icon Design Guidelines](https://developer.apple.com/design/human-interface-guidelines/app-icons)

