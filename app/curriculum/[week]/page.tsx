import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { weeks, getWeekBySlug } from "@/content/weeks";
import { Sidebar } from "@/components/Sidebar";
import { BlockRenderer } from "@/components/BlockRenderer";

// 빌드 시 모든 주차를 정적으로 생성
export async function generateStaticParams() {
  return weeks.map((w) => ({ week: w.slug }));
}

// 잘못된 slug는 404
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string }>;
}): Promise<Metadata> {
  const { week } = await params;
  const w = getWeekBySlug(week);
  if (!w) return {};
  return {
    title: `Week ${String(w.number).padStart(2, "0")} · ${w.title}`,
    description: w.summary,
    openGraph: {
      title: `Week ${w.number} · ${w.title}`,
      description: w.summary,
      images: [
        `/api/og?title=${encodeURIComponent(`Week ${w.number} · ${w.title}`)}`,
      ],
    },
  };
}

export default async function WeekPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;
  const w = getWeekBySlug(week);
  if (!w) notFound();

  const idx = weeks.findIndex((x) => x.slug === w.slug);
  const prev = idx > 0 ? weeks[idx - 1] : null;
  const next = idx < weeks.length - 1 ? weeks[idx + 1] : null;

  return (
    <div className="flex gap-8">
      <Sidebar activeSlug={w.slug} />

      <article className="min-w-0 flex-1">
        {/* 헤더 */}
        <header className="border-b border-ink-100 pb-6 mb-6">
          <div className="mb-3 flex items-center gap-2 text-xs">
            <span className="rounded-full bg-ink-900 px-2.5 py-0.5 font-mono text-white">
              Week {String(w.number).padStart(2, "0")}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 font-medium ${
                w.level === "기초"
                  ? "bg-emerald-50 text-emerald-700"
                  : w.level === "중급"
                  ? "bg-brand-50 text-brand-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {w.level}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink-900">
            {w.title}
          </h1>
          <p className="mt-3 text-[16px] leading-7 text-ink-600">{w.summary}</p>
        </header>

        {/* 학습 목표 */}
        <section className="mb-8 rounded-xl border border-emerald-100 bg-emerald-50/50 p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">
            학습 목표
          </h2>
          <ul className="space-y-1.5 text-[15px] leading-7 text-emerald-900">
            {w.objectives.map((o, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden>✓</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 본문 섹션들 */}
        {w.sections.map((sec) => (
          <section key={sec.id} id={sec.id} className="mb-10 scroll-mt-24">
            <h2 className="mb-3 text-2xl font-bold text-ink-900">
              {sec.title}
            </h2>
            {sec.blocks.map((b, i) => (
              <BlockRenderer key={i} block={b} />
            ))}
          </section>
        ))}

        {/* 연습 과제 */}
        <section className="mb-10 rounded-xl border border-brand-100 bg-brand-50/40 p-5">
          <h2 className="mb-3 text-lg font-bold text-brand-900">📝 연습 과제</h2>
          <ol className="ml-5 list-decimal space-y-2 text-[15px] leading-7 text-brand-900">
            {w.exercises.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ol>
        </section>

        {/* 참고 링크 */}
        <section className="mb-10">
          <h2 className="mb-3 text-lg font-bold text-ink-900">🔗 참고 자료</h2>
          <ul className="space-y-1.5 text-[15px]">
            {w.references.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-600 underline-offset-2 hover:underline"
                >
                  {r.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* 이전/다음 */}
        <nav className="grid gap-3 border-t border-ink-100 pt-6 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/curriculum/${prev.slug}`}
              className="block rounded-lg border border-ink-100 p-4 text-left hover:border-brand-300 hover:bg-ink-50"
            >
              <p className="text-xs text-ink-500">← 이전</p>
              <p className="mt-1 font-semibold text-ink-900">
                Week {String(prev.number).padStart(2, "0")} · {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/curriculum/${next.slug}`}
              className="block rounded-lg border border-ink-100 p-4 text-right hover:border-brand-300 hover:bg-ink-50"
            >
              <p className="text-xs text-ink-500">다음 →</p>
              <p className="mt-1 font-semibold text-ink-900">
                Week {String(next.number).padStart(2, "0")} · {next.title}
              </p>
            </Link>
          ) : (
            <Link
              href="/"
              className="block rounded-lg border border-ink-100 p-4 text-right hover:border-brand-300 hover:bg-ink-50"
            >
              <p className="text-xs text-ink-500">완주! →</p>
              <p className="mt-1 font-semibold text-ink-900">홈으로 돌아가기</p>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
