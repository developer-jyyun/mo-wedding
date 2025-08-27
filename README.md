# 모바일 청첩장 페이지

[실제 배포 링크](https://jiyoung-chunho-wedding.netlify.app/)

## 📖 프로젝트 개요

이 프로젝트는 **React + TypeScript** 기반의 **모바일 청첩장 (Invitation Web App)**입니다.  
반응형 UI, 모던한 컴포넌트 구조, 다양한 사용자 인터랙션 기능을 통해 사용자가 직관적으로 정보를 확인할 수 있도록 설계되었습니다.

---

## 🚀 데모

- **배포 URL**: [https://jiyoung-chunho-wedding.netlify.app/](https://jiyoung-chunho-wedding.netlify.app/)
- **주요 섹션**: 소개(Intro), 이미지 갤러리, 하이라이트 영상, 계좌 복사, 지도 안내, 연락처, 방명록 등

---

## ✨ 주요 기능

### UI / UX

- `Intro`, `Main`, `ImageGallery`, `Video` 등 여러 페이지 단위 섹션 컴포넌트 구성
- `Accordion`, `Countdown`, `FloatingAction` 등 공통 인터랙티브 컴포넌트 포함
- `FullScreenMessage`를 이용한 팝업/알림 메시지 구현
- 감각적인 폰트 및 아이콘 활용으로 고유하고 세련된 디자인 제공

### 갤러리 & 미디어

- `ImageGallery`와 `ImageSlide`를 활용한 이미지 뷰어 구현
- `Video.tsx` 컴포넌트로 하이라이트 영상 삽입 가능

### 이벤트 안내

- `Calendar`: 일시 정보 안내
- `Map`: 카카오맵/네이버 지도 연동 및 이동 네비게이션 아이콘 제공

### 연락 및 소통

- `Contact`, `ContactItem`: 전화, 문자, 카카오톡, 지도 연동 등 다양한 경로 안내
- `clipboardActions.ts`를 활용한 계좌번호 복사 기능 구현

### 추가 인터랙션 요소

- `Countdown`: 결혼식 D-Day 카운트다운 기능
- `BgmToggle`: 배경음악 재생 On/Off 토글 기능
- `Toast`: 사용자 피드백(복사 알림 등)을 위한 알림 기능
- `FallingFX`: 눈송이·꽃잎 등 낙하 효과 연출

---

## 🛠️ 기술 스택

- **Frontend**: React, TypeScript
- **스타일링**: SCSS 모듈, CSS 커스텀 애니메이션
- **유틸 및 상태관리**: 커스텀 Hooks & 유틸 (`toast`, `clipboardActions`, `bankActions` 등)
- **폰트 리소스**: MaruBuri, Nanum, Cormorant, Corinthia 등
- **배포 플랫폼**: Netlify

---

## 📂 프로젝트 구조

```
src
 ┣ components
 ┃ ┣ common           # 공통 UI 컴포넌트 (Accordion, Countdown, FloatingAction 등)
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

## 📸 Screenshots

| Intro 화면                        | 메인 섹션                       | 이미지 갤러리                         |
| --------------------------------- | ------------------------------- | ------------------------------------- |
| ![Intro](./screenshots/intro.png) | ![Main](./screenshots/main.png) | ![Gallery](./screenshots/gallery.png) |

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
