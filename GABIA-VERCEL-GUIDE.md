# 🌐 가비아 도메인 + Vercel 연결 가이드

## 1단계: Vercel 프로젝트 배포

### Vercel 접속 및 배포
1. https://vercel.com 접속
2. GitHub로 로그인
3. "Add New..." → "Project" 클릭
4. `Jhnnn.park_portfolio_web` 선택
5. Deploy 클릭
6. 배포 완료 후 임시 URL 확인 (예: `portfolio-xyz.vercel.app`)

---

## 2단계: Vercel에 커스텀 도메인 추가

### Vercel Dashboard 설정
1. 배포된 프로젝트 클릭
2. **Settings** → **Domains** 클릭
3. **Add** 버튼 클릭
4. 구매한 도메인 입력 (예: `jinhanpark.com`)
5. **Add** 클릭

### DNS 설정 안내 확인
Vercel이 아래와 같은 DNS 설정을 안내합니다:

```
A 레코드:
Host: @
Value: 76.76.21.21

CNAME 레코드:
Host: www
Value: cname.vercel-dns.com
```

---

## 3단계: 가비아 DNS 설정

### 가비아 My가비아 접속
1. https://www.gabia.com 로그인
2. **My가비아** → **서비스 관리**
3. 구매한 도메인의 **관리** 버튼 클릭
4. **DNS 정보** → **DNS 설정** 클릭

### DNS 레코드 추가

#### A 레코드 추가 (메인 도메인)
```
호스트: @
타입: A
값/위치: 76.76.21.21
TTL: 3600 (기본값)
```

#### CNAME 레코드 추가 (www)
```
호스트: www
타입: CNAME
값/위치: cname.vercel-dns.com
TTL: 3600 (기본값)
```

### ⚠️ 중요!
- **기존 A 레코드**가 있다면 삭제 또는 수정
- **네임서버**는 변경하지 않음 (가비아 기본 네임서버 유지)

---

## 4단계: DNS 전파 대기

### 확인 방법
- DNS 전파 시간: **10분 ~ 48시간** (보통 1-2시간)
- 확인 사이트: https://www.whatsmydns.net/
- 도메인 입력하고 **A** 레코드 확인
- 전 세계에서 `76.76.21.21`이 보이면 성공!

---

## 5단계: SSL 인증서 (자동)

Vercel이 자동으로 처리:
- DNS 전파 확인 후 자동으로 Let's Encrypt SSL 인증서 발급
- HTTPS 자동 활성화
- 별도 설정 불필요!

---

## 트러블슈팅

### ❌ "Domain is not verified" 에러
**원인:** DNS 설정이 잘못되었거나 전파 중
**해결:**
1. 가비아 DNS 설정 재확인
2. 10-20분 대기 후 Vercel에서 "Refresh" 클릭
3. 여전히 안되면 DNS 캐시 삭제:
   ```bash
   # Mac
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   ```

### ❌ "Invalid Configuration" 에러
**원인:** A 레코드가 잘못 설정됨
**해결:**
1. 가비아에서 **@** 호스트의 A 레코드가 `76.76.21.21`인지 확인
2. 중복된 레코드가 있다면 삭제

### ❌ SSL 인증서가 발급 안됨
**원인:** DNS 전파가 완료되지 않음
**해결:**
1. https://www.whatsmydns.net/ 에서 전파 확인
2. 전파 완료 후 Vercel에서 자동 발급 (최대 1시간)

---

## 최종 체크리스트

- [ ] Vercel 프로젝트 배포 완료
- [ ] Vercel에 커스텀 도메인 추가
- [ ] 가비아 DNS A 레코드 설정 (@ → 76.76.21.21)
- [ ] 가비아 DNS CNAME 레코드 설정 (www → cname.vercel-dns.com)
- [ ] DNS 전파 확인 (whatsmydns.net)
- [ ] HTTPS 자동 활성화 확인
- [ ] 도메인 접속 테스트

---

## 예상 비용

| 항목 | 가격 |
|------|------|
| 도메인 (.com) | 15,000원/년 |
| Vercel 호스팅 | 무료 |
| SSL 인증서 | 무료 |
| **총계** | **15,000원/년** |

---

## 추가 설정 (선택사항)

### 이메일 포워딩 설정
가비아에서 제공하는 무료 이메일 포워딩:
1. **My가비아** → **서비스 관리** → **메일**
2. 메일 호스팅 신청 (무료)
3. `contact@jinhanpark.com` → `jhnnn.park@gmail.com` 포워딩 설정

### Vercel Analytics 연결
1. Vercel Dashboard → **Analytics** 탭
2. **Enable Analytics** 클릭
3. 방문자 수, 성능 지표 확인 가능

### Google Search Console 등록
1. https://search.google.com/search-console
2. 도메인 추가
3. 사이트맵 제출: `https://jinhanpark.com/sitemap.xml`

---

## 참고 링크

- [Vercel Custom Domains 공식 문서](https://vercel.com/docs/concepts/projects/custom-domains)
- [가비아 DNS 설정 가이드](https://customer.gabia.com/manual/domain/207)
- [DNS 전파 확인](https://www.whatsmydns.net/)

