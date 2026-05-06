import type { Week } from "../types";

export const week03: Week = {
  slug: "week-03",
  number: 3,
  level: "기초",
  title: "레이아웃 · 로딩 · 에러 시스템",
  summary:
    "App Router의 강점인 중첩 레이아웃과 자동 로딩/에러 UI를 이해하고, Suspense와 에러 경계의 동작 원리를 익힙니다.",
  objectives: [
    "루트/세그먼트 레이아웃을 중첩해 공통 UI를 재사용한다",
    "loading.tsx가 어떻게 Suspense로 변환되는지 안다",
    "error.tsx로 페이지를 무너뜨리지 않고 에러를 격리한다",
    "not-found.tsx와 notFound() 호출 패턴을 적용한다",
  ],
  sections: [
    {
      id: "nested-layouts",
      title: "1. 중첩 레이아웃",
      blocks: [
        {
          type: "p",
          text: "각 폴더의 layout.tsx는 그 폴더와 모든 하위 라우트를 감쌉니다. 라우트 사이를 이동해도 레이아웃은 마운트 상태를 유지하므로, 사이드바/탭 같은 영구 UI에 이상적입니다.",
        },
        {
          type: "code",
          lang: "tsx",
          filename: "app/layout.tsx (Root Layout)",
          code: `import './globals.css';

export const metadata = { title: 'My Site' };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}`,
        },
        {
          type: "code",
          lang: "tsx",
          filename: "app/dashboard/layout.tsx",
          code: `// /dashboard/* 모든 라우트에 사이드바 적용
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-60">사이드바</aside>
      <section className="flex-1">{children}</section>
    </div>
  );
}`,
        },
        {
          type: "callout",
          tone: "warning",
          title: "Root Layout 규칙",
          body: "최상단 app/layout.tsx에는 반드시 <html>, <body> 태그가 있어야 합니다. Next.js는 여기서부터 페이지를 렌더하기 때문입니다.",
        },
      ],
    },
    {
      id: "loading",
      title: "2. loading.tsx — 무료로 얻는 Suspense",
      blocks: [
        {
          type: "p",
          text: "동기로 보이는 async 컴포넌트가 데이터를 기다리는 동안, 같은 폴더의 loading.tsx가 자동으로 fallback이 됩니다. 내부적으로 React Suspense로 래핑되는 것입니다.",
        },
        {
          type: "code",
          lang: "tsx",
          filename: "app/dashboard/loading.tsx",
          code: `export default function Loading() {
  return <div className="animate-pulse">대시보드를 불러오는 중…</div>;
}`,
        },
        {
          type: "code",
          lang: "tsx",
          filename: "app/dashboard/page.tsx",
          code: `export default async function DashboardPage() {
  const data = await fetch('https://api.example.com/me', { cache: 'no-store' })
    .then(r => r.json());
  return <Dashboard data={data} />;
}`,
        },
      ],
    },
    {
      id: "error",
      title: "3. error.tsx — 세그먼트 단위 에러 경계",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          filename: "app/dashboard/error.tsx",
          code: `'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 text-red-600">
      <p>문제가 발생했어요: {error.message}</p>
      <button onClick={reset} className="mt-2 underline">
        다시 시도
      </button>
    </div>
  );
}`,
        },
        {
          type: "callout",
          tone: "info",
          body: "error.tsx는 반드시 'use client'여야 합니다. reset()을 호출하면 그 세그먼트만 다시 렌더하므로, 페이지 전체가 무너지지 않습니다.",
        },
      ],
    },
    {
      id: "notfound",
      title: "4. notFound() 패턴",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          filename: "app/blog/[slug]/page.tsx",
          code: `import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();           // 가장 가까운 not-found.tsx로 이동
  return <article>{post.title}</article>;
}`,
        },
      ],
    },
    {
      id: "boundary-tree",
      title: "5. 경계 트리: 한 페이지의 실제 모습",
      blocks: [
        {
          type: "code",
          lang: "text",
          code: `<RootLayout>           ← app/layout.tsx
  <ErrorBoundary>      ← (있다면) error.tsx
    <Suspense>         ← (있다면) loading.tsx
      <NestedLayout>   ← app/dashboard/layout.tsx
        <Page />       ← app/dashboard/page.tsx
      </NestedLayout>
    </Suspense>
  </ErrorBoundary>
</RootLayout>`,
        },
      ],
    },
  ],
  exercises: [
    "/dashboard/posts와 /dashboard/users 두 라우트에 공통 사이드바를 갖는 dashboard/layout.tsx를 작성하세요.",
    "의도적으로 throw new Error를 던지고 error.tsx의 reset 동작을 확인하세요.",
    "fetch 실패 시 notFound()를 호출하도록 코드를 수정하고 not-found.tsx를 꾸미세요.",
  ],
  references: [
    { label: "Pages and Layouts", url: "https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts" },
    { label: "Loading UI and Streaming", url: "https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming" },
    { label: "Error Handling", url: "https://nextjs.org/docs/app/building-your-application/routing/error-handling" },
  ],
};
