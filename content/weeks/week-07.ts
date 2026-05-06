import type { Week } from "../types";

export const week07: Week = {
  slug: "week-07",
  number: 7,
  level: "중급",
  title: "Server Actions & 폼 / 뮤테이션",
  summary:
    "‘use server’ 지시어로 만드는 Server Actions, useFormState/useOptimistic으로 만드는 매끄러운 폼, 그리고 캐시 재검증을 묶어 풀스택 뮤테이션 흐름을 완성합니다.",
  objectives: [
    "Server Action을 정의하고 폼 action에 직접 바인딩한다",
    "useFormState로 검증 결과를 UI에 반영한다",
    "useOptimistic으로 응답 전 UI를 미리 갱신한다",
    "revalidatePath/Tag와 redirect를 액션 안에서 조합한다",
  ],
  sections: [
    {
      id: "what",
      title: "1. Server Action이란",
      blocks: [
        {
          type: "p",
          text: "Server Action은 클라이언트가 호출할 수 있는, 서버에서만 실행되는 비동기 함수입니다. 함수 상단(혹은 파일 상단)에 'use server'를 적으면 됩니다. 폼의 action 속성에 그대로 넘길 수 있어 fetch 핸들러를 따로 만들 필요가 없습니다.",
        },
        {
          type: "code",
          lang: "tsx",
          filename: "app/posts/new/page.tsx",
          code: `import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

async function createPost(formData: FormData) {
  'use server';
  const title = String(formData.get('title') ?? '');
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
  redirect('/posts');
}

export default function NewPostPage() {
  return (
    <form action={createPost} className="flex gap-2">
      <input name="title" required className="border px-2" />
      <button className="bg-black text-white px-3">생성</button>
    </form>
  );
}`,
        },
      ],
    },
    {
      id: "useFormState",
      title: "2. useFormState — 검증 결과를 UI에",
      blocks: [
        {
          type: "p",
          text: "리액트 19의 useFormState (Next.js 15 + React 19에서는 useActionState로 통일)는 액션의 반환값을 상태로 받습니다.",
        },
        {
          type: "code",
          lang: "ts",
          filename: "app/login/actions.ts",
          code: `'use server';

export type LoginState = { error?: string };

export async function login(prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '');
  if (!email.includes('@')) return { error: '이메일 형식이 아닙니다' };
  // ... 인증 로직
  return {};
}`,
        },
        {
          type: "code",
          lang: "tsx",
          filename: "app/login/page.tsx",
          code: `'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { login, type LoginState } from './actions';

const initial: LoginState = {};

function Submit() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? '로그인 중...' : '로그인'}</button>;
}

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initial);
  return (
    <form action={formAction}>
      <input name="email" />
      {state.error && <p className="text-red-500">{state.error}</p>}
      <Submit />
    </form>
  );
}`,
        },
        {
          type: "callout",
          tone: "info",
          body: "useFormStatus는 같은 폼 안의 자식에서만 동작합니다. 반드시 form 안의 별도 컴포넌트에서 호출하세요.",
        },
      ],
    },
    {
      id: "useOptimistic",
      title: "3. useOptimistic — 응답 전 UI 미리 갱신",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          code: `'use client';
import { useOptimistic } from 'react';

export function Likes({ initial, like }: { initial: number; like: () => Promise<void> }) {
  const [optimistic, addOptimistic] = useOptimistic(initial, (s, n: number) => s + n);
  return (
    <button onClick={async () => { addOptimistic(1); await like(); }}>
      ❤️ {optimistic}
    </button>
  );
}`,
        },
      ],
    },
    {
      id: "non-form",
      title: "4. 폼 외에서도 호출 가능",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          code: `'use client';
import { deletePost } from './actions';

<button onClick={() => deletePost(post.id)}>삭제</button>`,
        },
        {
          type: "p",
          text: "버튼 onClick에서도, useTransition과 함께도 사용 가능합니다. progressive enhancement(자바스크립트 비활성 환경)도 자동으로 지원됩니다.",
        },
      ],
    },
    {
      id: "patterns",
      title: "5. 추천 패턴",
      blocks: [
        {
          type: "list",
          items: [
            "유효성 검증은 Zod 같은 스키마 라이브러리로 액션 첫 줄에서",
            "성공 시 revalidatePath 또는 revalidateTag → redirect 순서",
            "에러는 throw 대신 return { error }로 (useFormState로 받기 쉬움)",
            "민감한 액션은 헤더의 next-action 검증 + 인증 미들웨어로 보호",
          ],
        },
      ],
    },
  ],
  exercises: [
    "Todo CRUD 4종(생성/수정/삭제/토글)을 Server Action으로 구현하고 revalidatePath로 즉시 반영하세요.",
    "useOptimistic으로 좋아요 버튼을 만들고, 액션이 실패했을 때 롤백 동작을 확인하세요.",
    "Zod 스키마로 검증 실패 메시지를 useFormState 상태로 노출하세요.",
  ],
  references: [
    { label: "Server Actions and Mutations", url: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations" },
    { label: "React — useActionState", url: "https://react.dev/reference/react/useActionState" },
    { label: "React — useOptimistic", url: "https://react.dev/reference/react/useOptimistic" },
  ],
};
