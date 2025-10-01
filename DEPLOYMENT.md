# 🚀 Portfolio Deployment Guide

## 배포 준비

### 1. GitHub Repository 생성
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/jhnnnp/portfolio.git
git push -u origin main
```

### 2. Vercel 배포

#### 방법 A: Vercel Dashboard (추천)
1. https://vercel.com 접속
2. "Import Project" 클릭
3. GitHub repository 선택
4. Framework: Vite
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Deploy 클릭

#### 방법 B: CLI
```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 3. 커스텀 도메인 연결

#### Vercel에서 설정:
1. Vercel Dashboard → Settings → Domains
2. Add Domain 입력 (예: jinhanpark.dev)
3. DNS 설정 안내 확인

#### 도메인 제공자(Namecheap 등)에서:
```
Type: A Record
Host: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

### 4. 환경 변수 설정 (EmailJS)
Vercel Dashboard → Settings → Environment Variables
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 5. 자동 배포 설정
- main 브랜치에 push하면 자동 배포
- Pull Request도 프리뷰 배포 생성

## 배포 체크리스트

- [ ] GitHub repository 생성 완료
- [ ] Vercel 계정 생성
- [ ] 프로젝트 빌드 테스트 (`npm run build`)
- [ ] 도메인 구매
- [ ] Vercel에 프로젝트 배포
- [ ] 커스텀 도메인 연결
- [ ] SSL 인증서 확인 (자동)
- [ ] EmailJS 환경 변수 설정
- [ ] 실제 도메인에서 테스트

## 유용한 명령어

```bash
# 로컬 빌드 테스트
npm run build
npm run preview

# 빌드 파일 크기 확인
npm run build -- --mode production

# 배포 상태 확인
vercel ls

# 로그 확인
vercel logs
```

## 도메인 추천

- **jinhanpark.dev** - 개발자 브랜딩 (추천!)
- **jhnnn.dev** - 간결한 브랜드명
- **parkjinhan.com** - 정통 도메인
- **jhnnn.me** - 개인 브랜딩

## 배포 후 최적화

### 성능 최적화
```bash
# 이미지 최적화
npm install -D vite-plugin-imagemin

# Lighthouse 점수 확인
npm install -g lighthouse
lighthouse https://your-domain.dev --view
```

### SEO 체크리스트
- [ ] sitemap.xml 생성
- [ ] robots.txt 추가
- [ ] Open Graph 이미지 생성
- [ ] Google Analytics 연결
- [ ] Google Search Console 등록

## 예상 비용

| 항목 | 서비스 | 비용 |
|------|--------|------|
| 도메인 | Namecheap | ~$12/년 |
| 호스팅 | Vercel | 무료 |
| SSL | Vercel | 무료 |
| CDN | Vercel | 무료 |
| **총계** | | **~$12/년** |

## 트러블슈팅

### 빌드 실패
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 빌드 로그 확인
npm run build -- --debug
```

### 도메인 연결 안됨
- DNS 전파 대기 (최대 48시간)
- DNS 설정 재확인
- Vercel DNS 설정 확인

### 404 에러
- Output Directory가 `dist`인지 확인
- SPA 리다이렉트 설정 (vercel.json)

## 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [DNS 전파 확인](https://www.whatsmydns.net/)

