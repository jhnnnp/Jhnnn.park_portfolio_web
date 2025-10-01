# Contact Form 구현 가이드

## 개요
포트폴리오 웹사이트의 Contact 섹션을 실제 동작 가능하도록 구현했습니다.

## 구현된 기능

### 1. 이메일 주소 업데이트
- `jhnnn.park@gmail.com`으로 실제 이메일 주소 설정
- SITE_CONFIG에서 이메일 정보 관리

### 2. 연락처 정보
- **이메일**: jhnnn.park@gmail.com (클릭 시 메일 앱 실행)
- **전화번호**: 010-1234-5678 (클릭 시 전화 앱 실행)
- **위치**: Seoul, South Korea (클릭 시 Google Maps 실행)

### 3. 소셜 링크
- **GitHub**: https://github.com/jhnnnp
- **이메일**: jhnnn.park@gmail.com

### 4. 폼 유효성 검사
- 이름: 최소 2글자
- 이메일: 유효한 이메일 형식
- 제목: 최소 5글자
- 메시지: 최소 10글자

### 5. 폼 제출 처리
- React Hook Form + Zod를 사용한 타입 안전한 폼 처리
- 서버 엔드포인트 `/api/send-email`로 POST 요청
- 로딩 상태, 성공/실패 메시지 표시

## 실제 배포 시 필요한 작업

### 1. 이메일 서비스 설정
현재는 모의 이메일 전송이 구현되어 있습니다. 실제 배포 시 다음 중 하나를 선택하여 구현하세요:

#### Option A: EmailJS (클라이언트 사이드)
```bash
npm install @emailjs/browser
```

환경 변수 설정:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

#### Option B: 서버리스 함수 (Vercel/Netlify)
`api/send-email.js`를 서버리스 함수로 배포하고 실제 이메일 서비스 연결

#### Option C: 백엔드 API
Node.js + Express + nodemailer 또는 SendGrid를 사용한 백엔드 구현

### 2. 실제 전화번호 업데이트
`Contact.tsx`에서 실제 전화번호로 변경:
```typescript
value: '010-실제번호-숫자',
href: 'tel:010-실제번호-숫자'
```

### 3. CORS 설정
프로덕션 환경에서 CORS 정책 확인 및 설정

## 테스트 방법

1. 폼 필드에 유효한 데이터 입력
2. 제출 버튼 클릭
3. 콘솔에서 이메일 전송 로그 확인
4. 성공 메시지 표시 확인

## 보안 고려사항

1. **스팸 방지**: reCAPTCHA 추가 권장
2. **Rate Limiting**: 동일 IP에서의 반복 요청 제한
3. **입력값 검증**: 서버 사이드에서도 검증 필요
4. **환경 변수**: 민감한 정보는 환경 변수로 관리

## 향후 개선 사항

1. 이메일 템플릿 디자인
2. 자동 응답 이메일 기능
3. 문의 내역 관리 시스템
4. 실시간 알림 (Slack, Discord 등)



