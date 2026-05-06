import type { Week } from "../types";

export const week11: Week = {
  slug: "week-11",
  number: 11,
  level: "고급",
  title: "성능 최적화 · 스트리밍 · PPR",
  summary:
    "<Suspense>로 점진적 스트리밍, dynamic import로 번들 분할, Partial Prerendering(PPR) 개념을 익혀 체감 성능을 끌어올립니다.",
  objectives: [
    "<Suspense>를 의도적으로 배치해 LCP를 분할한다",
    "next/dynamic으로 클라이언트 컴포넌트를 지연 로드한다",
    "PPR이 무엇이고 어디에 잘 어울리는지 안다",
    "@next/bundle-analyzer로 번들을 분석한다",
  ],
  sections: [
    {
      id: "streaming",
      title: "1. 스트리밍과 <Suspense>",
      blocks: [
        {
          type: "p",
          text: "Server에서 컴포넌트가 데이터를 기다리는 동안, 그 부분만 fallback을 보내고 데이터가 도착하는 즉시 HTML 청크를 추가로 흘려보내는 것이 스트리밍입니다. 사용자는 빈 화면 대신 ‘일부가 먼저 보이는 화면’을 봅니다.",
        },
        {
          type: "code",
          lang: "tsx",
          code: `import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <SlowSalesChart />     {/* 느린 RSC */}
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <SlowOrders />
      </Suspense>
    </>
  );
}`,
        },
        {
          type: "callout",
          tone: "tip",
          body: "loading.tsx는 ‘페이지 단위’ Suspense고, 직접 <Suspense>는 ‘컴포넌트 단위’입니다. 페이지를 잘게 쪼갤수록 빠르게 무언가가 보입니다.",
        },
      ],
    },
    {
      id: "dynamic-import",
      title: "2. next/dynamic으로 lazy load",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          code: `import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/HeavyEditor'), {
  loading: () => <p>에디터 불러오는 중…</p>,
  ssr: false, // 브라우저 전용 라이브러리(예: monaco)
});`,
        },
        {
          type: "p",
          text: "차트, WYSIWYG 에디터, 지도처럼 무겁고 첫 화면에 필요 없는 모듈은 dynamic으로 분리하면 초기 JS가 크게 줄어듭니다.",
        },
      ],
    },
    {
      id: "ppr",
      title: "3. Partial Prerendering (PPR)",
      blocks: [
        {
          type: "p",
          text: "PPR은 ‘정적인 셸’을 빌드 시점에 만들어 두고, 동적인 부분만 요청 시점에 스트리밍하는 새로운 렌더링 모드입니다. 같은 라우트에서 캐시 가능한 부분은 즉시(0ms) 전달하고, 사용자별 부분은 Suspense 경계로 흘려 보냅니다.",
        },
        {
          type: "code",
          lang: "ts",
          filename: "next.config.mjs",
          code: `// canary 채널에서만 동작
export default {
  experimental: { ppr: 'incremental' },
};`,
        },
        {
          type: "code",
          lang: "tsx",
          code: `export const experimental_ppr = true;

export default function Page() {
  return (
    <>
      <StaticHero />            {/* 빌드 시점 prerender */}
      <Suspense fallback={<Skeleton />}>
        <PersonalizedRecs />    {/* 요청 시점 streaming */}
      </Suspense>
    </>
  );
}`,
        },
      ],
    },
    {
      id: "bundle",
      title: "4. 번들 분석",
      blocks: [
        {
          type: "code",
          lang: "bash",
          code: "npm install -D @next/bundle-analyzer",
        },
        {
          type: "code",
          lang: "js",
          filename: "next.config.mjs",
          code: `import withBundleAnalyzer from '@next/bundle-analyzer';
const analyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
export default analyzer({ /* ... */ });`,
        },
        {
          type: "code",
          lang: "bash",
          code: "ANALYZE=true npm run build",
        },
      ],
    },
    {
      id: "checklist",
      title: "5. 성능 체크리스트",
      blocks: [
        {
          type: "list",
          items: [
            "Lighthouse Performance 점수 + Core Web Vitals (LCP/INP/CLS) 측정",
            "위쪽 fold의 이미지에 priority, 그 외엔 loading='lazy'",
            "큰 클라이언트 의존성은 dynamic + ssr:false",
            "느린 데이터는 별도 <Suspense>로 분리",
            "캐시 가능한 fetch는 가급적 force-cache + revalidate",
          ],
        },
      ],
    },
  ],
  exercises: [
    "한 페이지에 차트 컴포넌트 2개를 두고 각각 <Suspense>로 감싼 뒤 스트리밍 동작을 Network 탭에서 관찰하세요.",
    "monaco-editor를 next/dynamic으로 lazy load 하고 초기 JS 크기 변화를 비교하세요.",
    "@next/bundle-analyzer로 번들에서 가장 무거운 모듈 3개를 찾고, 대안을 제시하세요.",
  ],
  references: [
    { label: "Loading UI and Streaming", url: "https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming" },
    { label: "Lazy Loading", url: "https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading" },
    { label: "Partial Prerendering", url: "https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering" },
  ],
};
