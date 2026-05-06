import type { Week } from "../types";

export const week04: Week = {
  slug: "week-04",
  number: 4,
  level: "기초",
  title: "동적 / 병렬 / 인터셉트 라우트",
  summary:
    "라우트 그룹, 병렬 라우트, 인터셉트 라우트를 활용해 모달/탭/쪽패널 같은 복잡한 UX 패턴을 폴더 구조만으로 구현합니다.",
  objectives: [
    "라우트 그룹 (folder) 으로 URL을 바꾸지 않고 코드를 묶는다",
    "병렬 라우트 @slot 으로 한 화면에 여러 라우트를 동시에 띄운다",
    "인터셉트 라우트 (.) 로 모달 패턴을 만든다",
    "default.tsx의 역할과 필요한 시점을 설명할 수 있다",
  ],
  sections: [
    {
      id: "groups",
      title: "1. 라우트 그룹 (folder)",
      blocks: [
        {
          type: "p",
          text: "괄호로 감싼 폴더는 URL에 영향을 주지 않으면서 코드를 논리적으로 묶을 수 있습니다. 마케팅 페이지와 앱 페이지의 레이아웃을 분리할 때 자주 씁니다.",
        },
        {
          type: "code",
          lang: "text",
          code: `app/
  (marketing)/
    layout.tsx       ← 마케팅 레이아웃
    page.tsx         → '/'
    pricing/page.tsx → '/pricing'
  (app)/
    layout.tsx       ← 앱 레이아웃 (사이드바)
    dashboard/page.tsx → '/dashboard'`,
        },
      ],
    },
    {
      id: "parallel",
      title: "2. 병렬 라우트 @slot",
      blocks: [
        {
          type: "p",
          text: "@로 시작하는 폴더는 부모 layout의 'props'로 전달됩니다. 같은 화면에 분석/팀/공지 등 여러 라우트를 독립적으로 보여줄 때 강력합니다.",
        },
        {
          type: "code",
          lang: "text",
          code: `app/dashboard/
  layout.tsx
  page.tsx
  @analytics/page.tsx
  @team/page.tsx`,
        },
        {
          type: "code",
          lang: "tsx",
          filename: "app/dashboard/layout.tsx",
          code: `export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <main className="col-span-2">{children}</main>
      <aside>{analytics}</aside>
      <aside>{team}</aside>
    </div>
  );
}`,
        },
        {
          type: "callout",
          tone: "tip",
          title: "default.tsx",
          body: "병렬 라우트에서 일부 슬롯이 매칭되지 않을 때 보일 폴백입니다. 새로고침을 해도 모달이 살아있게 하려면 default.tsx를 꼭 추가하세요.",
        },
      ],
    },
    {
      id: "intercept",
      title: "3. 인터셉트 라우트 (.) (..) (...)",
      blocks: [
        {
          type: "p",
          text: "리스트에서 항목을 클릭하면 모달로 띄우되, URL은 상세 페이지로 바꾸고, 새로고침 시에는 진짜 상세 페이지가 나오는 패턴을 폴더 규칙으로 구현합니다.",
        },
        {
          type: "code",
          lang: "text",
          code: `app/feed/
  page.tsx                          → 피드 리스트
  photo/[id]/page.tsx               → 진짜 상세 페이지 (새로고침 시)
  @modal/
    default.tsx                     → 닫혀 있을 때
    (.)photo/[id]/page.tsx          → 모달로 가로채기 (소프트 네비게이션 시)`,
        },
        {
          type: "list",
          items: [
            "(.) — 같은 레벨 인터셉트",
            "(..) — 한 단계 위 인터셉트",
            "(...) — 루트에서 인터셉트",
          ],
        },
      ],
    },
    {
      id: "ux-recipes",
      title: "4. 자주 만드는 UX 레시피",
      blocks: [
        {
          type: "list",
          items: [
            "사진 그리드 → 클릭 시 라이트박스 모달, URL 공유 가능",
            "메인 + 사이드 패널 (Slack/Notion 스타일)",
            "공지/배너를 별도 슬롯으로 영구 표시",
            "탭 UI를 라우트로 표현 → 뒤로가기로 탭 이동 자연스러움",
          ],
        },
      ],
    },
  ],
  exercises: [
    "(marketing)과 (app) 라우트 그룹을 만들고 각자 다른 layout.tsx를 적용하세요.",
    "/dashboard에 @analytics, @notifications 두 슬롯을 만들고 layout에서 props로 받아 그리드로 배치하세요.",
    "/photos를 만들고 카드 클릭 시 (.)id 인터셉트로 모달, 새로고침 시 풀 페이지가 뜨도록 구현하세요.",
  ],
  references: [
    { label: "Route Groups", url: "https://nextjs.org/docs/app/building-your-application/routing/route-groups" },
    { label: "Parallel Routes", url: "https://nextjs.org/docs/app/building-your-application/routing/parallel-routes" },
    { label: "Intercepting Routes", url: "https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes" },
  ],
};
