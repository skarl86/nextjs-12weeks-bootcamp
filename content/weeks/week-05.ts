import type { Week } from "../types";

export const week05: Week = {
  slug: "week-05",
  number: 5,
  level: "중급",
  title: "RSC vs Client Components",
  summary:
    "Server Components와 Client Components의 경계, 직렬화 가능한 props, 컴포지션 패턴을 익혀 둘을 자유자재로 섞습니다.",
  objectives: [
    "Server/Client Component를 정확히 구분하고 언제 무엇을 쓸지 결정한다",
    "'use client' 지시어가 어디까지 전파되는지 안다",
    "Server → Client에 children prop으로 RSC를 끼워 넣는 컴포지션 패턴을 쓴다",
    "직렬화 불가능한 값을 prop으로 넘기는 실수를 피한다",
  ],
  sections: [
    {
      id: "default-server",
      title: "1. 기본은 Server Component",
      blocks: [
        {
          type: "p",
          text: "App Router의 모든 컴포넌트는 'use client' 지시어가 없으면 Server Component입니다. 서버에서만 실행되고, JS 번들로 보내지지 않으며, 브라우저 API와 상태/이벤트 훅을 쓸 수 없습니다.",
        },
        {
          type: "list",
          items: [
            "✅ async/await, DB 직접 접근, 시크릿 사용, 큰 라이브러리(서버에만 존재)",
            "❌ useState/useEffect/onClick 같은 인터랙션 훅",
            "❌ window/document 같은 브라우저 API",
          ],
        },
      ],
    },
    {
      id: "use-client",
      title: "2. 'use client'의 의미와 전파",
      blocks: [
        {
          type: "p",
          text: "'use client'는 그 파일과 그 파일이 import 하는 모든 모듈을 클라이언트 번들로 보내라는 지시어입니다. 즉 Client Boundary는 import 경계를 따라 '아래로' 전파됩니다. 그래서 'use client'는 가능한 가장 깊은 leaf에 두는 것이 좋습니다.",
        },
        {
          type: "code",
          lang: "tsx",
          filename: "components/LikeButton.tsx",
          code: `'use client';
import { useState } from 'react';

export default function LikeButton({ initial }: { initial: number }) {
  const [count, setCount] = useState(initial);
  return <button onClick={() => setCount(c => c + 1)}>좋아요 {count}</button>;
}`,
        },
        {
          type: "callout",
          tone: "warning",
          title: "흔한 실수",
          body: "page.tsx 최상단에 'use client'를 붙이면 그 페이지의 모든 자식 컴포넌트가 클라이언트 번들에 포함됩니다. 데이터 페칭/번들 크기 면에서 손해가 큽니다.",
        },
      ],
    },
    {
      id: "composition",
      title: "3. Server → Client 컴포지션 (children 패턴)",
      blocks: [
        {
          type: "p",
          text: "Client Component 안에서 Server Component를 직접 import 할 수는 없지만, 'children'으로 받는 것은 가능합니다. 이 차이가 RSC 컴포지션의 핵심입니다.",
        },
        {
          type: "code",
          lang: "tsx",
          filename: "components/ClientWrapper.tsx",
          code: `'use client';
import { useState } from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(o => !o)}>토글</button>
      {open && children}
    </>
  );
}`,
        },
        {
          type: "code",
          lang: "tsx",
          filename: "app/page.tsx (Server Component)",
          code: `import ClientWrapper from '@/components/ClientWrapper';
import HeavyServerStuff from '@/components/HeavyServerStuff'; // RSC

export default function Page() {
  return (
    <ClientWrapper>
      <HeavyServerStuff />   {/* 서버에서 렌더된 결과가 children으로 전달 */}
    </ClientWrapper>
  );
}`,
        },
      ],
    },
    {
      id: "serialization",
      title: "4. 직렬화 가능한 props만 넘긴다",
      blocks: [
        {
          type: "p",
          text: "Server → Client로 넘어가는 prop은 직렬화 가능해야 합니다. JSON으로 표현 가능한 값(원시값/배열/평범한 객체/Date)만 OK. 함수, 클래스 인스턴스, Map/Set, Symbol은 안 됩니다.",
        },
        {
          type: "list",
          items: [
            "✅ 문자열, 숫자, boolean, null, Array, 평범한 객체, Date",
            "❌ 함수 (이벤트 핸들러를 prop으로 못 넘김 → 자식에서 만들거나 Server Action 사용)",
            "❌ 클래스 인스턴스 (prisma 모델 객체 등 → 평범한 객체로 변환)",
          ],
        },
      ],
    },
    {
      id: "decision",
      title: "5. 어떻게 결정할까",
      blocks: [
        {
          type: "list",
          items: [
            "데이터 가져와 보여주기만? → Server Component",
            "useState/onClick 등 상호작용 필요? → 그 부분만 Client Component",
            "둘이 섞이는 경우? → Server에서 Client를 import 해서 RSC를 children으로 끼움",
          ],
        },
      ],
    },
  ],
  exercises: [
    "Server Component인 PostList 안에 Client Component인 LikeButton을 배치해 카운터를 동작시키세요.",
    "‘use client’를 페이지 전체에 잘못 붙였을 때 번들 분석에서 어떤 변화가 생기는지 비교하세요.",
    "Date 객체를 Server에서 Client로 prop으로 넘겨 toLocaleDateString을 호출하세요.",
  ],
  references: [
    { label: "Server and Client Components", url: "https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns" },
    { label: "React — 'use client'", url: "https://react.dev/reference/rsc/use-client" },
  ],
};
