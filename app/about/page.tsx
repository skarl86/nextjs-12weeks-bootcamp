import type { Metadata } from "next";
import Link from "next/link";
import { weeks } from "@/content/weeks";

export const metadata: Metadata = {
  title: "학습 가이드",
  description: "Next.js 12주 부트캠프를 효과적으로 진행하는 방법",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight dark:text-ink-50">
          학습 가이드
        </h1>
        <p className="mt-2 text-ink-600 dark:text-ink-300">
          이 부트캠프를 효과적으로 진행하는 방법과 학습 루틴을 안내합니다.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-xl font-bold dark:text-ink-50">사전 준비</h2>
        <ul className="ml-5 list-disc space-y-1.5 text-[15px] leading-7 text-ink-700 dark:text-ink-200">
          <li>Node.js 20 LTS 이상 설치</li>
          <li>VS Code (또는 선호하는 에디터) + ESLint·Prettier 확장</li>
          <li>GitHub 계정과 Git 기본 사용 능력</li>
          <li>JavaScript ES2020+, React 함수형 컴포넌트와 hooks 기본 이해</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold dark:text-ink-50">
          권장 학습 루틴 (주 5–7시간)
        </h2>
        <div className="overflow-x-auto rounded-lg border border-ink-100 dark:border-ink-800">
          <table className="w-full text-[14px]">
            <thead className="bg-ink-50 dark:bg-ink-800">
              <tr>
                <th className="whitespace-nowrap px-3 py-2 text-left font-semibold dark:text-ink-100">
                  요일
                </th>
                <th className="px-3 py-2 text-left font-semibold dark:text-ink-100">
                  활동
                </th>
                <th className="whitespace-nowrap px-3 py-2 text-left font-semibold dark:text-ink-100">
                  시간
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 dark:divide-ink-800 dark:text-ink-200">
              <tr>
                <td className="whitespace-nowrap px-3 py-2">월</td>
                <td className="px-3 py-2">강의자료 정독 + 공식 문서 1회 통독</td>
                <td className="whitespace-nowrap px-3 py-2">90분</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-3 py-2">수</td>
                <td className="px-3 py-2">코드 예제 따라 치고 변형해 보기</td>
                <td className="whitespace-nowrap px-3 py-2">90분</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-3 py-2">금</td>
                <td className="px-3 py-2">과제 풀이 → 깃 커밋/PR</td>
                <td className="whitespace-nowrap px-3 py-2">120분</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-3 py-2">일</td>
                <td className="px-3 py-2">짧은 회고 노트 1쪽</td>
                <td className="whitespace-nowrap px-3 py-2">30분</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold dark:text-ink-50">캡스톤 프로젝트</h2>
        <p className="text-[15px] leading-7 text-ink-700 dark:text-ink-200">
          12주 동안 한 가지 앱을 점진적으로 키우길 권합니다. 매주 새로 배운
          개념을 본인의 캡스톤에 한 가지씩 녹여 넣으면, 12주 후 자연스럽게
          포트폴리오급 풀스택 앱이 완성됩니다.
        </p>
        <ul className="mt-2 ml-5 list-disc space-y-1 text-[15px] leading-7 text-ink-700 dark:text-ink-200">
          <li>블로그 + 댓글 시스템 (MDX, 동적 라우팅, Server Actions, 인증)</li>
          <li>쇼핑 카탈로그 (병렬 라우트, 모달 인터셉트, ISR, OG 이미지)</li>
          <li>대시보드 (스트리밍, Suspense, 미들웨어 기반 RBAC)</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold dark:text-ink-50">진행 트래킹</h2>
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {weeks.map((w) => (
            <li
              key={w.slug}
              className="text-[14px] text-ink-700 dark:text-ink-200"
            >
              <Link
                href={`/curriculum/${w.slug}`}
                className="hover:text-brand-600 dark:hover:text-brand-400"
              >
                <span className="mr-2 font-mono text-ink-400 dark:text-ink-500">
                  W{String(w.number).padStart(2, "0")}
                </span>
                {w.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold dark:text-ink-50">
          한눈에 보는 핵심 도구
        </h2>
        <ul className="ml-5 list-disc space-y-1 text-[15px] leading-7 text-ink-700 dark:text-ink-200">
          <li>Next.js 15 / React 19 (App Router · RSC)</li>
          <li>TypeScript 5+, Tailwind CSS 3+</li>
          <li>Auth.js, Prisma (선택), Vitest, Playwright</li>
          <li>Vercel(권장) 또는 Docker 셀프 호스팅</li>
        </ul>
      </section>

      <section className="rounded-xl border border-ink-100 bg-ink-50 p-5 text-[15px] leading-7 text-ink-700 dark:border-ink-800 dark:bg-ink-800/50 dark:text-ink-200">
        <p>
          준비됐다면{" "}
          <Link
            href="/curriculum/week-01"
            className="font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            Week 01 — Next.js 소개 & 환경 세팅
          </Link>
          부터 시작하세요!
        </p>
      </section>
    </article>
  );
}
