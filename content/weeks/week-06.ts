import type { Week } from "../types";

export const week06: Week = {
  slug: "week-06",
  number: 6,
  level: "중급",
  title: "데이터 페칭 & 캐싱 4종",
  summary:
    "Server Component에서의 fetch, Next.js 캐시 모델, revalidate, unstable_cache, Route Handler를 구분하고 전략적으로 조합합니다.",
  objectives: [
    "fetch의 cache, next.revalidate, next.tags 옵션을 구분한다",
    "unstable_cache로 임의 함수의 결과를 캐싱한다",
    "Route Segment Config(dynamic, revalidate)와 fetch 옵션의 우선순위를 안다",
    "revalidatePath / revalidateTag로 캐시를 즉시 무효화한다",
  ],
  sections: [
    {
      id: "server-fetch",
      title: "1. Server Component에서 직접 fetch",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          filename: "app/posts/page.tsx",
          code: `export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return (
    <ul>
      {posts.map((p: { id: number; title: string }) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}`,
        },
        {
          type: "p",
          text: "useEffect로 가져오던 시절과 비교해 보세요. 로딩 상태, 에러 처리, 토큰 노출 걱정 모두 사라집니다. 데이터는 빌드 또는 요청 시점에 서버에서 채워져 HTML로 옵니다.",
        },
      ],
    },
    {
      id: "fetch-options",
      title: "2. fetch 캐시 옵션 4가지",
      blocks: [
        {
          type: "code",
          lang: "ts",
          code: `// (a) 영구 캐시 = SSG/ISR. 기본값(force-cache)
fetch(url);

// (b) 매 요청마다 새로 (SSR)
fetch(url, { cache: 'no-store' });

// (c) N초 동안 캐시 후 백그라운드 재검증 (ISR)
fetch(url, { next: { revalidate: 60 } });

// (d) 태그 기반 → revalidateTag('posts')로 즉시 무효화
fetch(url, { next: { tags: ['posts'] } });`,
        },
        {
          type: "callout",
          tone: "warning",
          title: "Next.js 15 변경",
          body: "v15부터 fetch와 GET Route Handler의 기본 캐싱이 'no-store'(=동적)로 바뀌었습니다. 명시적으로 cache: 'force-cache'를 적어야 SSG처럼 동작합니다. 공식 문서를 꼭 확인하세요.",
        },
      ],
    },
    {
      id: "unstable-cache",
      title: "3. unstable_cache — fetch 아닌 함수도 캐싱",
      blocks: [
        {
          type: "p",
          text: "DB 쿼리(prisma 등)나 임의 비동기 함수의 결과를 메모이즈하고 싶다면 unstable_cache를 씁니다.",
        },
        {
          type: "code",
          lang: "ts",
          code: `import { unstable_cache } from 'next/cache';
import { db } from '@/lib/db';

export const getPosts = unstable_cache(
  async () => db.post.findMany(),
  ['posts'],                          // 캐시 키
  { revalidate: 60, tags: ['posts'] }
);`,
        },
      ],
    },
    {
      id: "segment-config",
      title: "4. Route Segment Config",
      blocks: [
        {
          type: "code",
          lang: "ts",
          filename: "app/dashboard/page.tsx",
          code: `// 이 라우트 전체의 동작을 제어
export const dynamic = 'force-dynamic'; // 'auto' | 'force-static' | 'force-dynamic' | 'error'
export const revalidate = 30;           // 30초마다 재검증
export const fetchCache = 'force-no-store';
export const runtime = 'edge';          // 'nodejs' | 'edge'`,
        },
        {
          type: "p",
          text: "여러 옵션이 충돌하면 가장 동적인 설정이 이깁니다. 예를 들어 페이지에 cache:'no-store' fetch가 하나라도 있으면 해당 페이지는 동적이 됩니다.",
        },
      ],
    },
    {
      id: "revalidate",
      title: "5. 캐시 즉시 무효화: revalidatePath / revalidateTag",
      blocks: [
        {
          type: "code",
          lang: "ts",
          code: `'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function publishPost(formData: FormData) {
  await db.post.create({ /* ... */ });
  revalidateTag('posts');           // tags: ['posts']로 캐싱한 모든 fetch/unstable_cache 무효화
  // 또는 revalidatePath('/posts');
}`,
        },
      ],
    },
    {
      id: "route-handler",
      title: "6. Route Handler (REST API)",
      blocks: [
        {
          type: "code",
          lang: "ts",
          filename: "app/api/posts/route.ts",
          code: `import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await db.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const post = await db.post.create({ data: body });
  return NextResponse.json(post, { status: 201 });
}`,
        },
        {
          type: "callout",
          tone: "tip",
          body: "Server Component에서 자기 앱의 /api/...를 fetch 할 필요는 거의 없습니다. 그냥 같은 함수를 import 해서 호출하면 한 단계 빠릅니다. Route Handler는 외부에서 호출하는 진짜 API에만 쓰세요.",
        },
      ],
    },
  ],
  exercises: [
    "외부 API에서 게시물 목록을 60초 ISR로 가져오고, Server Action에서 revalidateTag로 즉시 갱신하세요.",
    "unstable_cache로 DB 쿼리를 캐싱한 뒤, fetch 캐시와 동작 차이를 비교하세요.",
    "한 페이지 안에서 force-static과 force-dynamic을 동시에 시도해 어떤 에러가 나는지 확인하세요.",
  ],
  references: [
    { label: "Data Fetching", url: "https://nextjs.org/docs/app/building-your-application/data-fetching" },
    { label: "Caching", url: "https://nextjs.org/docs/app/building-your-application/caching" },
    { label: "Route Segment Config", url: "https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config" },
  ],
};
