import type { Week } from "../types";

export const week01: Week = {
  slug: "week-01",
  number: 1,
  level: "기초",
  title: "Next.js 소개 & 환경 세팅",
  summary:
    "Next.js가 무엇이고 왜 쓰는지, App Router 기반 프로젝트 구조와 개발 환경을 정확히 이해합니다.",
  objectives: [
    "Next.js와 일반 React(SPA)의 차이를 한 문장으로 설명할 수 있다",
    "create-next-app으로 App Router 기반 프로젝트를 생성할 수 있다",
    "기본 폴더 구조(app/, public/, next.config)를 그릴 수 있다",
    "TypeScript + ESLint 기본 설정을 완수한다",
  ],
  sections: [
    {
      id: "what-is-nextjs",
      title: "1. Next.js란 무엇인가",
      blocks: [
        {
          type: "p",
          text: "Next.js는 React 위에서 동작하는 풀스택 웹 프레임워크입니다. React는 UI 라이브러리이지만, 라우팅·데이터 페칭·렌더링 모드·번들링·이미지 최적화 같은 '프로덕션에서 필요한 모든 것'을 직접 짜야 합니다. Next.js는 이 모든 것을 표준화된 규칙으로 제공합니다.",
        },
        {
          type: "p",
          text: "특히 App Router(Next.js 13.4+)는 React Server Components(RSC)를 1급으로 다루고, 폴더 구조 자체가 라우팅·레이아웃·로딩·에러 UI를 표현합니다. 이번 부트캠프는 App Router를 표준 패러다임으로 학습합니다.",
        },
        {
          type: "callout",
          tone: "info",
          title: "왜 App Router인가?",
          body: "Vercel은 2024년부터 모든 신규 프로젝트에 App Router를 권장합니다. Pages Router는 유지되지만 신규 기능(서버 액션, 부분 사전 렌더링, 향상된 캐싱 모델)은 App Router 중심으로 추가됩니다.",
        },
      ],
    },
    {
      id: "spa-vs-nextjs",
      title: "2. SPA(CSR)와 Next.js의 차이",
      blocks: [
        {
          type: "p",
          text: "기존 SPA는 빈 HTML을 받고 자바스크립트로 화면을 그립니다(CSR). Next.js는 기본적으로 서버에서 HTML을 만들어 보내고(SSR/RSC), 필요한 부분만 클라이언트에서 인터랙티브하게 만듭니다(부분 하이드레이션). 결과:",
        },
        {
          type: "list",
          items: [
            "초기 화면이 빠르고 SEO에 유리",
            "서버에서 DB·서드파티 API에 직접 접근 → 토큰 노출/CORS 이슈 감소",
            "JS 번들 크기 감소 (Server Component는 클라이언트로 보내지 않음)",
          ],
        },
      ],
    },
    {
      id: "install",
      title: "3. 프로젝트 생성",
      blocks: [
        {
          type: "p",
          text: "Node.js 20 LTS 이상을 설치한 뒤 아래 한 줄로 시작합니다.",
        },
        {
          type: "code",
          lang: "bash",
          code: "npx create-next-app@latest my-app --ts --tailwind --eslint --app --src-dir=false --import-alias='@/*'",
        },
        {
          type: "p",
          text: "옵션 의미: --ts(TypeScript) / --tailwind / --eslint / --app(App Router) / --src-dir(false=루트에 app/ 둠) / --import-alias(절대경로 별칭).",
        },
        {
          type: "code",
          lang: "bash",
          code: "cd my-app\nnpm run dev   # http://localhost:3000",
        },
      ],
    },
    {
      id: "structure",
      title: "4. 폴더 구조의 의미",
      blocks: [
        {
          type: "code",
          lang: "text",
          filename: "프로젝트 루트",
          code: `app/
  layout.tsx       ← 모든 페이지를 감싸는 루트 레이아웃 (필수)
  page.tsx         ← '/' 경로에서 보일 화면
  globals.css      ← 전역 스타일
  about/
    page.tsx       ← '/about' 경로
public/            ← 정적 파일 (이미지, robots.txt 등)
next.config.mjs    ← Next.js 설정
tailwind.config.ts
tsconfig.json`,
        },
        {
          type: "callout",
          tone: "tip",
          body: "폴더 = URL, 폴더 안의 page.tsx = 그 URL의 화면, layout.tsx = 그 폴더와 하위 폴더 전체에 적용되는 껍데기. 이 세 가지가 App Router의 핵심 약속입니다.",
        },
      ],
    },
    {
      id: "first-page",
      title: "5. 첫 페이지 작성",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          filename: "app/page.tsx",
          code: `export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Hello, Next.js!</h1>
      <p className="mt-2 text-gray-600">
        이 컴포넌트는 기본적으로 <strong>Server Component</strong>입니다.
      </p>
    </main>
  );
}`,
        },
        {
          type: "p",
          text: "App Router에서는 'use client' 지시어가 없으면 모든 컴포넌트가 Server Component입니다. 즉 console.log는 터미널에 찍히고, useState 같은 훅은 사용할 수 없습니다.",
        },
      ],
    },
  ],
  exercises: [
    "create-next-app으로 새 프로젝트를 만들고 개발 서버를 띄워 보세요.",
    "/about 경로에 자기 소개 페이지를 추가하세요. (app/about/page.tsx)",
    "page.tsx 안에 console.log('hello')를 적고, 어디(브라우저/터미널)에서 출력되는지 확인하세요.",
    "useState를 추가했을 때 발생하는 에러 메시지를 캡처하고 원인을 한 줄로 적어 보세요.",
  ],
  references: [
    { label: "Next.js — Installation", url: "https://nextjs.org/docs/app/getting-started/installation" },
    { label: "Next.js — Project Structure", url: "https://nextjs.org/docs/app/getting-started/project-structure" },
    { label: "React — Server Components", url: "https://react.dev/reference/rsc/server-components" },
  ],
};
