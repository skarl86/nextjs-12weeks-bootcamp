import type { Week } from "../types";

export const week02: Week = {
  slug: "week-02",
  number: 2,
  level: "기초",
  title: "App Router & 파일 시스템 라우팅",
  summary:
    "폴더와 파일 이름만으로 URL을 만드는 App Router 라우팅 규칙을 익히고, 동적 세그먼트와 링크/네비게이션 패턴을 학습합니다.",
  objectives: [
    "page.tsx, layout.tsx, route.ts 파일의 역할을 구분한다",
    "정적/동적/캐치올 세그먼트를 적재적소에 사용한다",
    "<Link>와 useRouter, redirect()의 쓰임새를 비교한다",
    "generateStaticParams로 정적 경로를 생성한다",
  ],
  sections: [
    {
      id: "convention",
      title: "1. 파일 컨벤션",
      blocks: [
        {
          type: "p",
          text: "App Router는 약속된 파일 이름이 곧 기능입니다. 가장 자주 만나는 7가지를 외우세요.",
        },
        {
          type: "list",
          items: [
            "page.tsx — 해당 경로에서 보일 UI",
            "layout.tsx — 자식 라우트를 감싸는 영구 UI (헤더/사이드바 등)",
            "loading.tsx — 데이터 로딩 중 자동으로 보일 UI (Suspense fallback)",
            "error.tsx — 그 세그먼트에서 던진 에러를 잡는 경계 (Client Component여야 함)",
            "not-found.tsx — notFound() 호출 또는 매칭 실패 시",
            "template.tsx — layout과 비슷하지만 매 네비게이션마다 새로 마운트",
            "route.ts — REST API 라우트 핸들러 (GET/POST 등)",
          ],
        },
      ],
    },
    {
      id: "dynamic-segments",
      title: "2. 동적 세그먼트",
      blocks: [
        {
          type: "code",
          lang: "text",
          code: `app/blog/[slug]/page.tsx          → /blog/hello, /blog/foo
app/shop/[...categories]/page.tsx → /shop/a, /shop/a/b, /shop/a/b/c
app/[[...slug]]/page.tsx          → 옵셔널 캐치올 (루트 포함)`,
        },
        {
          type: "code",
          lang: "tsx",
          filename: "app/blog/[slug]/page.tsx",
          code: `// Next.js 15: params는 Promise — async/await 필수
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <h1>Post: {slug}</h1>;
}`,
        },
        {
          type: "callout",
          tone: "warning",
          title: "Next.js 15 변경점",
          body: "params와 searchParams가 동기 객체에서 Promise로 변경되었습니다. async 컴포넌트로 await 하거나 React.use()로 풀어 사용하세요.",
        },
      ],
    },
    {
      id: "navigation",
      title: "3. 페이지 이동: <Link> vs router.push() vs redirect()",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          code: `import Link from 'next/link';

// 1) 선언형 링크 — 프리페치, 클라이언트 사이드 네비게이션
<Link href="/blog/hello" prefetch>읽기</Link>

// 2) 명령형 — 이벤트 핸들러 안에서 (Client Component)
'use client';
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/dashboard');

// 3) 서버에서의 강제 리다이렉트 (RSC, Server Action, Route Handler)
import { redirect } from 'next/navigation';
if (!session) redirect('/login');`,
        },
      ],
    },
    {
      id: "static-params",
      title: "4. generateStaticParams로 빌드 타임 경로 생성",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          filename: "app/blog/[slug]/page.tsx",
          code: `export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}

export const dynamicParams = false; // 위에 없는 slug는 404`,
        },
        {
          type: "p",
          text: "이 함수는 빌드 시점에 어떤 동적 경로를 미리 생성할지 알려줍니다. 결과는 SSG로 만들어져 CDN에서 즉시 응답합니다.",
        },
      ],
    },
  ],
  exercises: [
    "/products/[id] 라우트를 만들고 1~5번 상품을 generateStaticParams로 미리 생성하세요.",
    "검색 페이지 /search?q=...를 만들고 searchParams를 받아 그대로 출력하세요.",
    "<Link prefetch={false}>를 적용했을 때와 안 했을 때 Network 탭이 어떻게 다른지 비교하세요.",
  ],
  references: [
    { label: "Routing Fundamentals", url: "https://nextjs.org/docs/app/building-your-application/routing" },
    { label: "Dynamic Routes", url: "https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes" },
    { label: "Linking and Navigating", url: "https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating" },
  ],
};
