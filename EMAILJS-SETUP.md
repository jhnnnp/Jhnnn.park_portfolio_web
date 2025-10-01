# 📧 EmailJS 무료 이메일 전송 설정 가이드

## 🚀 완료된 작업
- ✅ EmailJS 패키지 설치 완료
- ✅ useEmailForm 훅 EmailJS 연동 완료
- ✅ 실제 이메일 전송 코드 구현 완료

## 📋 다음 단계: EmailJS 계정 설정

### 1️⃣ EmailJS 무료 계정 생성
1. [EmailJS 웹사이트](https://www.emailjs.com) 방문
2. "Sign Up" 클릭하여 무료 계정 생성
3. 이메일 인증 완료

### 2️⃣ 이메일 서비스 연결
1. **Dashboard** → **Email Services** 클릭
2. **Add New Service** 선택
3. **Gmail** 선택 (추천)
4. Gmail 계정 연결:
   - Gmail 주소: `jhnnn.park@gmail.com`
   - Gmail 앱 비밀번호 생성 필요 (2단계 인증 설정 후)

### 3️⃣ 이메일 템플릿 생성
1. **Email Templates** → **Create New Template** 클릭
2. 템플릿 설정:
   ```
   Subject: [포트폴리오 문의] {{subject}}
   
   From: {{from_name}} <{{from_email}}>
   To: jhnnn.park@gmail.com
   
   내용:
   새로운 문의가 도착했습니다!
   
   이름: {{from_name}}
   이메일: {{from_email}}
   제목: {{subject}}
   
   메시지:
   {{message}}
   
   ---
   포트폴리오 웹사이트에서 전송됨
   ```

### 4️⃣ 환경 변수 설정
프로젝트 루트에 `.env` 파일 생성:
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx  
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

### 5️⃣ Gmail 앱 비밀번호 생성 (중요!)
1. Gmail → **설정** → **보안**
2. **2단계 인증** 활성화 (필수)
3. **앱 비밀번호** 생성
4. 생성된 16자리 비밀번호를 EmailJS Gmail 서비스에 입력

## 🎯 무료 플랜 제한사항
- **월 200통** 이메일 전송 가능
- **일 200통** 제한
- **개인 사용** 목적으로 충분

## 🔧 테스트 방법
1. 환경 변수 설정 후 개발 서버 재시작
2. Contact 폼에서 테스트 메시지 전송
3. `jhnnn.park@gmail.com`으로 실제 이메일 수신 확인

## 🚨 문제 해결
- **이메일이 안 옴**: Gmail 앱 비밀번호 확인
- **서비스 오류**: Service ID, Template ID 재확인
- **CORS 오류**: Public Key 확인

## 📞 지원
설정 중 문제가 있으면 언제든 문의하세요!



