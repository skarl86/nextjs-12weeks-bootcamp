import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <p className="font-mono text-sm text-ink-400 dark:text-ink-500">404</p>
      <h1 className="mt-2 text-3xl font-bold dark:text-ink-50">
        페이지를 찾을 수 없어요
      </h1>
      <p className="mt-2 text-ink-600 dark:text-ink-300">
        주소가 잘못되었거나 삭제된 콘텐츠일 수 있어요.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-lg bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
