# Next.js 12주 부트캠프 — 강의자료 사이트

> Next.js App Router 기반 12주 풀 코스 커리큘럼을 호스팅하는 **Next.js 웹사이트**입니다.
> 사이트 자체가 Next.js로 만들어져 있어, 동시에 좋은 학습 레퍼런스 코드가 됩니다.

## ✨ 한눈에 보기

- **Next.js 15 + React 19 + TypeScript + Tailwind CSS**
- **App Router** 기반 — `app/`, `layout.tsx`, RSC, dynamic routes, `generateStaticParams`, `generateMetadata`
- **동적 OG 이미지** — `app/api/og/route.tsx`에서 Edge runtime + `ImageResponse`
- **sitemap / robots** — 메타데이터 파일 컨벤션
- **정적 생성** — 12주 강의 페이지가 모두 빌드 시점에 prerender (`dynamicParams = false`)
- **그대로 Vercel에 배포** 가능

## 🗂️ 폴더 구조

```
.
├── app/
│   ├── layout.tsx                ← 루트 레이아웃 + 메타데이터
│   ├── page.tsx                  ← 홈 (랜딩)
│   ├── globals.css
│   ├── not-found.tsx             ← 404
│   ├── about/page.tsx            ← 학습 가이드
│   ├── curriculum/
│   │   └── [week]/page.tsx       ← 동적 라우트, 12주 강의 페이지
│   ├── api/og/route.tsx          ← 동적 OG 이미지 (Edge)
│   ├── sitemap.ts                ← /sitemap.xml
│   └── robots.ts                 ← /robots.txt
├── components/
│   ├── Sidebar.tsx               ← 주차 사이드바
│   ├── BlockRenderer.tsx         ← 섹션 블록 렌더러
│   ├── CodeBlock.tsx
│   └── Callout.tsx
├── content/
│   ├── types.ts                  ← Week / Section / Block 타입
│   └── weeks/
│       ├── index.ts              ← 모든 주차 export + getWeekBySlug
│       ├── week-01.ts ~ week-12.ts
├── public/
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

## 🚀 로컬에서 실행

```bash
# 1) 의존성 설치
npm install

# 2) 개발 서버 실행
npm run dev
# → http://localhost:3000

# 3) 프로덕션 빌드 / 실행
npm run build
npm run start
```

> Node.js **20 LTS 이상**이 필요합니다.

## 🌐 Vercel에 배포

가장 빠른 방법은 GitHub에 푸시 후 Vercel 대시보드에서 import 하는 것입니다.

### 1) GitHub에 올리기

```bash
git init
git add .
git commit -m "feat: Next.js 12주 부트캠프 사이트 초기 커밋"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### 2) Vercel에서 import

1. <https://vercel.com> 로그인 (GitHub 계정으로)
2. **Add New… → Project** 클릭
3. 방금 푸시한 레포 선택 → **Import**
4. **Framework Preset** 이 자동으로 `Next.js`로 잡힘 → 그대로 **Deploy** 클릭
5. 30~60초 후 `https://<프로젝트명>.vercel.app` URL이 발급됩니다

> 환경 변수가 없어도 동작하는 정적 컨텐츠 사이트입니다. 추후 인증/DB를 붙이면 Project Settings → Environment Variables에서 추가하세요.

### 3) (선택) Vercel CLI로 즉시 배포

```bash
npm i -g vercel
vercel              # 첫 실행 시 GitHub 연결 + 프로젝트 생성
vercel --prod       # 프로덕션 배포
```

### 4) 커스텀 도메인 연결

Vercel 프로젝트 → **Settings → Domains** 에 도메인을 추가하고, DNS의 CNAME을 `cname.vercel-dns.com` 으로 설정하면 됩니다.

## 🧭 사이트 구조

| 경로 | 설명 |
|------|------|
| `/` | 홈 — 학습 목표, 12주 미리보기 |
| `/curriculum/week-01` ~ `/curriculum/week-12` | 주차별 강의자료 |
| `/about` | 학습 가이드 |
| `/api/og?title=...` | 동적 OG 이미지 |
| `/sitemap.xml` | 사이트맵 |
| `/robots.txt` | 크롤러 규칙 |

## 📚 12주 커리큘럼 요약

| 주차 | 단계 | 주제 |
|------|------|------|
| W1 | 기초 | Next.js 소개 & 환경 세팅 |
| W2 | 기초 | App Router & 파일 시스템 라우팅 |
| W3 | 기초 | 레이아웃 · 로딩 · 에러 시스템 |
| W4 | 기초 | 동적 / 병렬 / 인터셉트 라우트 |
| W5 | 중급 | RSC vs Client Components |
| W6 | 중급 | 데이터 페칭 & 캐싱 4종 |
| W7 | 중급 | Server Actions & 폼 / 뮤테이션 |
| W8 | 중급 | 스타일링 · 이미지 · 폰트 최적화 |
| W9 | 고급 | 메타데이터 · SEO · 동적 OG |
| W10 | 고급 | Middleware · 인증 · API |
| W11 | 고급 | 성능 최적화 · 스트리밍 · PPR |
| W12 | 고급 | 테스트 · 배포 · 모니터링 |

## 🧩 콘텐츠 추가/수정하는 법

각 주차 강의자료는 `content/weeks/week-XX.ts` 파일 하나에 들어 있습니다. 타입 안전하므로 추가/수정이 단순합니다.

```ts
// content/weeks/week-01.ts
import type { Week } from "../types";

export const week01: Week = {
  slug: "week-01",
  number: 1,
  level: "기초",
  title: "...",
  summary: "...",
  objectives: ["..."],
  sections: [
    {
      id: "intro",
      title: "1. 소개",
      blocks: [
        { type: "p", text: "본문..." },
        { type: "code", lang: "tsx", code: "..." },
        { type: "callout", tone: "tip", body: "..." },
        { type: "list", items: ["..."] },
      ],
    },
  ],
  exercises: ["..."],
  references: [{ label: "...", url: "..." }],
};
```

새 주차를 추가하면 `content/weeks/index.ts`의 `weeks` 배열에 import만 추가하세요.

## 🛠️ 학습 활용 팁

- **`/curriculum/[week]/page.tsx`** 코드를 직접 읽어 보세요 — 동적 라우팅 + `generateStaticParams` + `generateMetadata`의 살아있는 예제입니다.
- **`app/api/og/route.tsx`** 의 `ImageResponse`는 Week 9에서 다시 등장합니다.
- **`app/sitemap.ts` / `app/robots.ts`** 도 Week 9의 실습 그 자체입니다.

## 📜 라이선스

학습용 자료입니다. 자유롭게 fork·변경·재배포하세요.

---

**다음 단계**: 강의를 따라가며 자기 코드로 똑같이 다시 만들어 보면, 이 사이트의 모든 기능이 곧 실습 결과가 됩니다.
