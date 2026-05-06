import Link from "next/link";
import { weeks } from "@/content/weeks";

export function Sidebar({ activeSlug }: { activeSlug?: string }) {
  const grouped = {
    기초: weeks.filter((w) => w.level === "기초"),
    중급: weeks.filter((w) => w.level === "중급"),
    고급: weeks.filter((w) => w.level === "고급"),
  } as const;

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-64 shrink-0 overflow-y-auto pr-4 lg:block">
      {(Object.keys(grouped) as (keyof typeof grouped)[]).map((level) => (
        <div key={level} className="mb-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
            {level}
          </p>
          <ul className="space-y-1">
            {grouped[level].map((w) => {
              const active = w.slug === activeSlug;
              return (
                <li key={w.slug}>
                  <Link
                    href={`/curriculum/${w.slug}`}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-brand-50 text-brand-700 font-medium"
                        : "text-ink-700 hover:bg-ink-50"
                    }`}
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded text-[11px] font-mono bg-ink-900 text-white">
                      {String(w.number).padStart(2, "0")}
                    </span>
                    <span className="truncate">{w.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
