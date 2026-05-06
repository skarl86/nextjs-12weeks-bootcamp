import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Nanum_Gothic_Coding } from "next/font/google";
import { ThemeToggle } from "@/components/ThemeToggle";

const codeFont = Nanum_Gothic_Coding({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextjs-bootcamp.vercel.app"),
  title: {
    default: "Next.js 12주 부트캠프",
    template: "%s | Next.js 12주 부트캠프",
  },
  description:
    "React 경험자를 위한 Next.js App Router 12주 부트캠프 커리큘럼과 강의자료. 공식 문서를 토대로 기초부터 어드밴스 스킬까지.",
  keywords: [
    "Next.js",
    "App Router",
    "React Server Components",
    "프런트엔드 부트캠프",
    "강의자료",
    "커리큘럼",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "Next.js 12주 부트캠프",
    description: "App Router 기준 풀 코스 강의자료",
    images: ["/api/og?title=Next.js 12주 부트캠프"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js 12주 부트캠프",
    description: "App Router 기준 풀 코스 강의자료",
  },
};

const themeBootstrap = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={codeFont.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeBootstrap }}
        />
      </head>
      <body className="min-h-screen bg-white text-ink-900 antialiased dark:bg-ink-900 dark:text-ink-50">
        <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/80 backdrop-blur dark:border-ink-800 dark:bg-ink-900/80">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3 sm:px-4">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 font-bold"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-ink-900 text-white dark:bg-white dark:text-ink-900">
                N
              </span>
              <span className="hidden sm:inline">Next.js 부트캠프</span>
            </Link>
            <nav className="flex items-center gap-3 text-[13px] sm:gap-5 sm:text-sm">
              <Link
                href="/"
                className="hover:text-brand-600 dark:hover:text-brand-400"
              >
                홈
              </Link>
              <Link
                href="/curriculum/week-01"
                className="hover:text-brand-600 dark:hover:text-brand-400"
              >
                강의자료
              </Link>
              <Link
                href="/about"
                className="hover:text-brand-600 dark:hover:text-brand-400"
              >
                안내
              </Link>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noreferrer"
                className="hidden hover:text-brand-600 sm:inline dark:hover:text-brand-400"
              >
                공식 문서 ↗
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mt-16 border-t border-ink-100 py-8 text-center text-sm text-ink-500 dark:border-ink-800 dark:text-ink-400">
          © {new Date().getFullYear()} Next.js 12주 부트캠프 · App Router
          기반 · Built with Next.js & Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
