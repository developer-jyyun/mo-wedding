# 모바일 청첩장 페이지

### 🚀 배포 URL

[https://jiyoung-chunho-wedding.netlify.app/](https://jiyoung-chunho-wedding.netlify.app/)

---

## 📖 프로젝트 개요

**React + TypeScript** 기반으로 제작한 **모바일 청첩장**입니다.  
디자인부터 직접 구현했으며, 반응형 UI와 다양한 인터랙션을 통해 하객이 직관적으로 사용할 수 있도록 설계했습니다.

---

## ✨ 주요 기능

### 📍 연락처 / 오시는 길

- 전화 / 문자 연결
- 계좌번호·연락처 복사, 청첩장 링크 복사·공유
- **카카오 API**
  - 지도 표시 및 길찾기, 카카오 내비 실행
  - 카카오페이 송금 바로가기
  - 카카오톡 공유하기
- **추가 내비 지원**
  - 네이버 지도 연동
  - 티맵 내비게이션 연동  
    → 하객이 **익숙한 앱을 바로 선택**할 수 있도록 구성

---

### 🔄 로딩 / 에러 처리

- **로딩 화면**:  
  네트워크 지연 시 `FullScreenMessage(type="loading")` 노출 →  
  로딩 스피너 + "데이터를 불러오는 중입니다..🐢" 텍스트 표시

- **에러 화면**:  
  요청 실패 시 `FullScreenMessage(type="error")` 노출 →  
   에러 아이콘 + "에러가 발생했어요! 잠시 후 다시 시도해주세요." 문구와 함께 전체 화면 안내

---

### 📱 UX 최적화 & 미디어 인터랙션

- 모바일 친화적 반응형 UI
- Framer Motion + CSS 애니메이션으로 자연스러운 인터랙션
- Intro/Outro 애니메이션 효과
- 배경음악 재생 / On·Off 토글
- 꽃잎 낙하 효과 (FallingFX)
- 이미지 갤러리: Swiper 슬라이드 + 클릭 시 모달 뷰어
- 하이라이트 영상 삽입
- 캘린더 (react-day-picker) + D-Day 카운트다운
- 아코디언 UI: 계좌번호·연락처 등 반복 정보를 접고 펼쳐, 화면 간결성 유지
- 탭 UI: 오시는 길 안내(대중교통/셔틀/주차) 정보를 직관적으로 전환

## 🛠️ 사용 기술 / 라이브러리

### Frontend

- **React**, **TypeScript**
- **SCSS Modules** – 컴포넌트 단위 스타일링

### 데이터 & 서버

- **json-server** – 개발용 목업 API 서버

### 애니메이션 & UI

- **Framer Motion** – 스크롤 및 등장 애니메이션
- **CSS Custom Animations** – Gradient Text, Glow, Fade/Slide 효과

### 날짜·시간 & 기능

- **date-fns** – 날짜/시간 포맷 + 로컬라이징
- **react-day-picker** – 달력 UI
- **Swiper.js** – 이미지 갤러리/슬라이드
- **클립보드 API** – 계좌·연락처 복사
- **커스텀 Toast** – 사용자 알림

### 배포

- **Netlify** – CI/CD 및 배포

---

## 📂 프로젝트 구조

```
src
 ┣ components
 ┃ ┣ common           # 공통 UI 컴포넌트 (Accordion, Countdown, Button 등)
 ┃ ┣ effects          # 시각 효과 컴포넌트 (FallingFX 등)
 ┃ ┣ ImageSlide       # 이미지 슬라이드 관련 컴포넌트
 ┃ ┗ sections         # 페이지별 주요 섹션 (Intro, Map, Contact, Video 등)
 ┣ assets              # 폰트 및 아이콘 리소스
 ┣ models              # 타입 정의 (예: wedding.ts)
 ┣ scss                # 글로벌 스타일, reset, 유용한 유틸 스타일
 ┣ utils               # 기능 유틸 (toast, clipboardActions, bankActions 등)
 ┣ App.tsx             # 메인 엔트리
 ┗ index.tsx           # 렌더링 시작점
```

---

## ⚙️ 설치 및 실행 방법

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn start

# 빌드 (프로덕션)
yarn build
```

---
