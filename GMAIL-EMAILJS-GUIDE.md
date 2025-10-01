# 📧 Gmail + EmailJS 무료 이메일 전송 완벽 가이드

## ✅ 완료된 작업
- ✅ `.env` 파일 생성 완료
- ✅ EmailJS 코드 연동 완료
- ✅ Gmail 연동 준비 완료

## 🚀 Gmail + EmailJS 설정 단계

### 1️⃣ EmailJS 무료 계정 생성 (2분)
1. [EmailJS 웹사이트](https://www.emailjs.com) 방문
2. **"Sign Up Free"** 클릭
3. 이메일 주소: `jhnnn.park@gmail.com` 입력
4. 비밀번호 설정 후 계정 생성

### 2️⃣ Gmail 서비스 연결 (3분)
1. EmailJS Dashboard → **"Email Services"** 클릭
2. **"Add New Service"** 선택
3. **"Gmail"** 선택
4. Gmail 계정 정보 입력:
   - **Email**: `jhnnn.park@gmail.com`
   - **Password**: Gmail 앱 비밀번호 (아래 단계 참조)

### 3️⃣ Gmail 앱 비밀번호 생성 (중요!)
1. Gmail 로그인 → **설정** ⚙️ 클릭
2. **"보안"** 탭 선택
3. **"2단계 인증"** 활성화 (필수!)
4. **"앱 비밀번호"** 클릭
5. **"앱 선택"** → **"기타"** → **"EmailJS"** 입력
6. **16자리 비밀번호** 생성 (예: `abcd efgh ijkl mnop`)
7. 이 비밀번호를 EmailJS Gmail 서비스에 입력

### 4️⃣ 이메일 템플릿 생성 (2분)
1. EmailJS Dashboard → **"Email Templates"** 클릭
2. **"Create New Template"** 클릭
3. 템플릿 설정:

```
Template ID: portfolio_contact
Subject: [포트폴리오 문의] {{subject}}

From: {{from_name}} <{{from_email}}>
To: jhnnn.park@gmail.com
Reply-To: {{from_email}}

HTML Content:
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        🎯 새로운 포트폴리오 문의가 도착했습니다!
    </h2>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">📋 문의 정보</h3>
        <p><strong>👤 이름:</strong> {{from_name}}</p>
        <p><strong>📧 이메일:</strong> {{from_email}}</p>
        <p><strong>📝 제목:</strong> {{subject}}</p>
    </div>
    
    <div style="background: white; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
        <h3 style="color: #333;">💬 메시지 내용</h3>
        <p style="white-space: pre-wrap; line-height: 1.6;">{{message}}</p>
    </div>
    
    <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #6c757d; font-size: 14px;">
            📱 포트폴리오 웹사이트에서 자동 전송됨
        </p>
    </div>
</div>
```

### 5️⃣ API 키 복사 및 .env 파일 업데이트
1. EmailJS Dashboard → **"Account"** → **"General"** 클릭
2. **"Public Key"** 복사
3. **"Email Services"**에서 **Service ID** 복사
4. **"Email Templates"**에서 **Template ID** 복사

### 6️⃣ .env 파일 업데이트
```bash
# 터미널에서 .env 파일 수정
nano .env
```

다음과 같이 실제 값으로 변경:
```env
# EmailJS 설정 - Gmail 연동
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx  
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

### 7️⃣ 개발 서버 재시작
```bash
npm run dev
```

## 🎯 테스트 방법
1. Contact 폼에서 테스트 메시지 전송
2. `jhnnn.park@gmail.com`으로 실제 이메일 수신 확인
3. 이메일 내용이 올바르게 표시되는지 확인

## 💰 비용: 완전 무료!
- **EmailJS**: 월 200통 무료
- **Gmail**: 완전 무료
- **서버**: 불필요 (클라이언트 사이드)

## 🚨 문제 해결
- **이메일 안 옴**: Gmail 앱 비밀번호 확인
- **서비스 오류**: Service ID 재확인
- **템플릿 오류**: Template ID 재확인
- **CORS 오류**: Public Key 재확인

## 📞 완료 후
모든 설정이 완료되면 Contact 폼에서 실제 이메일이 `jhnnn.park@gmail.com`으로 전송됩니다! 🎉



