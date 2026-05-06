import Link from "next/link";
import { weeks } from "@/content/weeks";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-2xl border border-ink-100 bg-gradient-to-br from-brand-50 via-white to-emerald-50 p-6 sm:p-8 md:p-12 dark:border-ink-800 dark:from-brand-900/30 dark:via-ink-900 dark:to-emerald-900/20">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-ink-900 px-3 py-1 text-xs font-mono text-white dark:bg-ink-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          App Router · React 19 · Next.js 15
        </p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-ink-900 dark:text-ink-50">
          Next.js 12주 부트캠프
          <br />
          <span className="text-brand-600 dark:text-brand-400">
            프런트엔드 개발자를 위한 풀 코스
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-7 text-ink-700 dark:text-ink-300">
          Next.js 공식 문서를 토대로, React 경험자가 App Router와 React Server
          Components를 익히고 실무까지 끌어올리도록 설계된 12주 커리큘럼입니다.
          기초 라우팅부터 캐싱·인증·스트리밍·배포까지 한 번에.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/curriculum/week-01"
            className="inline-flex items-center gap-2 rounded-lg bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100"
          >
            1주차부터 시작하기 →
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100 dark:hover:bg-ink-800"
          >
            학습 가이드 보기
          </Link>
        </div>
      </section>

      {/* 학습 목표 */}
      <section>
        <h2 className="mb-4 text-2xl font-bold dark:text-ink-50">
          이 코스를 마치면
        </h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "App Router의 라우팅·레이아웃·로딩·에러 시스템을 자유자재로 활용",
            "Server Components와 Client Components 경계를 의도적으로 설계",
            "fetch 캐시 / revalidate / unstable_cache로 캐싱 전략 직접 설계",
            "Server Actions로 폼·뮤테이션·낙관적 UI 구현",
            "Metadata API와 동적 OG 이미지로 SEO·공유 카드 완성",
            "Middleware·Auth.js로 인증·인가 흐름 구축",
            "Suspense·Streaming·PPR로 체감 성능 향상",
            "Vercel 또는 셀프 호스팅 배포 + Web Vitals 모니터링",
          ].map((t) => (
            <li
              key={t}
              className="rounded-lg border border-ink-100 bg-white px-4 py-3 text-[15px] text-ink-700 dark:border-ink-800 dark:bg-ink-800/50 dark:text-ink-200"
            >
              <span className="mr-2 text-brand-600 dark:text-brand-400">✓</span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* 주차 목록 */}
      <section>
        <h2 className="mb-4 text-2xl font-bold dark:text-ink-50">12주 커리큘럼</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {weeks.map((w) => (
            <Link
              key={w.slug}
              href={`/curriculum/${w.slug}`}
              className="group rounded-xl border border-ink-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm dark:border-ink-800 dark:bg-ink-800/50 dark:hover:border-brand-700"
            >
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-mono text-ink-500 dark:text-ink-400">
                  Week {String(w.number).padStart(2, "0")}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 font-medium ${
                    w.level === "기초"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200"
                      : w.level === "중급"
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200"
                  }`}
                >
                  {w.level}
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold text-ink-900 group-hover:text-brand-700 dark:text-ink-100 dark:group-hover:text-brand-300">
                {w.title}
              </h3>
              <p className="line-clamp-3 text-[13px] leading-6 text-ink-600 dark:text-ink-300">
                {w.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-ink-100 bg-ink-900 p-8 text-white dark:border-ink-700 dark:bg-ink-800">
        <h2 className="mb-2 text-2xl font-bold">바로 시작하세요</h2>
        <p className="mb-5 text-ink-200">
          매주 1.5~2시간씩 12주, 스스로 따라오기 좋은 분량입니다. 강의자료 →
          실습 → 회고 순서로 진행해 보세요.
        </p>
        <Link
          href="/curriculum/week-01"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 hover:bg-ink-100"
        >
          Week 01 시작 →
        </Link>
      </section>
    </div>
  );
}
