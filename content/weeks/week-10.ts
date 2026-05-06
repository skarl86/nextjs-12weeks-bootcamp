import type { Week } from "../types";

export const week10: Week = {
  slug: "week-10",
  number: 10,
  level: "고급",
  title: "Middleware · 인증 · API 라우트",
  summary:
    "middleware.ts로 Edge에서 요청을 가로채는 패턴, NextAuth/Auth.js 기반 인증 흐름, 보호된 라우트 핸들러 만들기를 학습합니다.",
  objectives: [
    "middleware의 실행 시점과 matcher 설정 방식을 이해한다",
    "쿠키·세션 기반 인증 흐름을 설계한다",
    "보호된 페이지/라우트 핸들러에서 세션을 검증한다",
    "Next.js 15 async cookies/headers API를 정확히 쓴다",
  ],
  sections: [
    {
      id: "middleware",
      title: "1. middleware.ts",
      blocks: [
        {
          type: "p",
          text: "middleware는 모든 요청이 라우트에 도착하기 전 Edge 런타임에서 실행됩니다. 인증 체크, 지역화, A/B 테스트, 봇 차단에 적합합니다.",
        },
        {
          type: "code",
          lang: "ts",
          filename: "middleware.ts",
          code: `import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isAuthed = req.cookies.get('session')?.value;
  const isProtected = req.nextUrl.pathname.startsWith('/dashboard');
  if (isProtected && !isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};`,
        },
        {
          type: "callout",
          tone: "warning",
          title: "Edge 런타임 제약",
          body: "middleware는 Node API(fs, crypto 일부)와 큰 라이브러리를 쓸 수 없습니다. DB 쿼리는 보통 미들웨어 대신 page/route 안에서 수행하세요.",
        },
      ],
    },
    {
      id: "cookies-headers",
      title: "2. Next.js 15: 비동기 cookies/headers",
      blocks: [
        {
          type: "code",
          lang: "ts",
          code: `import { cookies, headers } from 'next/headers';

// v15부터 둘 다 Promise. await 또는 React.use로 푼다.
export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  const h = await headers();
  const ua = h.get('user-agent');
  // ...
}`,
        },
      ],
    },
    {
      id: "auth-flow",
      title: "3. 인증 흐름 한눈에",
      blocks: [
        {
          type: "list",
          items: [
            "1) 로그인 폼 제출 → Server Action 또는 /api/login route handler",
            "2) 자격 증명 검증 → 세션/JWT 생성 → cookies().set(...)",
            "3) 보호된 페이지에서 cookies().get으로 세션 조회 → 없으면 redirect",
            "4) 로그아웃 → cookies().delete('session') + redirect('/')",
          ],
        },
      ],
    },
    {
      id: "auth-js",
      title: "4. Auth.js (NextAuth) 빠른 시작",
      blocks: [
        {
          type: "code",
          lang: "bash",
          code: "npm install next-auth@beta",
        },
        {
          type: "code",
          lang: "ts",
          filename: "auth.ts",
          code: `import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
});`,
        },
        {
          type: "code",
          lang: "ts",
          filename: "app/api/auth/[...nextauth]/route.ts",
          code: `export { GET, POST } from '@/auth';`,
        },
        {
          type: "code",
          lang: "tsx",
          filename: "app/dashboard/page.tsx",
          code: `import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/login');
  return <p>Hi {session.user?.name}</p>;
}`,
        },
      ],
    },
    {
      id: "route-handler-protect",
      title: "5. 보호된 Route Handler",
      blocks: [
        {
          type: "code",
          lang: "ts",
          filename: "app/api/admin/route.ts",
          code: `import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  return NextResponse.json({ ok: true });
}`,
        },
      ],
    },
  ],
  exercises: [
    "middleware로 /admin/* 접근 시 쿠키 없는 사용자를 /login?next=...로 리다이렉트하세요.",
    "Auth.js + GitHub OAuth로 로그인/로그아웃을 구현하세요.",
    "Server Action 안에서 await cookies()를 사용해 ‘다크 모드’ 토글을 구현하고 새로고침에도 유지되는지 확인하세요.",
  ],
  references: [
    { label: "Middleware", url: "https://nextjs.org/docs/app/building-your-application/routing/middleware" },
    { label: "Authentication", url: "https://nextjs.org/docs/app/building-your-application/authentication" },
    { label: "Auth.js", url: "https://authjs.dev/" },
  ],
};
