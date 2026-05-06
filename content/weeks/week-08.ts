import type { Week } from "../types";

export const week08: Week = {
  slug: "week-08",
  number: 8,
  level: "중급",
  title: "스타일링 · 이미지 · 폰트 최적화",
  summary:
    "Tailwind/CSS Modules/CSS-in-JS 선택지를 비교하고, next/image와 next/font로 LCP/CLS를 잡습니다.",
  objectives: [
    "Tailwind, CSS Modules, CSS-in-JS의 장단점을 안다",
    "next/image로 자동 리사이즈/포맷 최적화를 활용한다",
    "next/font로 폰트 호스팅과 layout shift 방지를 적용한다",
    "PostCSS / globals.css 구조를 이해한다",
  ],
  sections: [
    {
      id: "styling",
      title: "1. 스타일링 옵션 비교",
      blocks: [
        {
          type: "list",
          items: [
            "Tailwind — 가장 널리 쓰임. 클래스 기반, 빌드 시점에 트리쉐이킹. RSC와 충돌 없음 ✅",
            "CSS Modules — 파일 스코프 클래스. 표준에 가깝고 별도 런타임 없음 ✅",
            "CSS-in-JS (styled-components, emotion) — RSC와 호환되려면 별도 설정 필요. 신규는 추천 ❌",
            "Vanilla Extract / Panda CSS — 빌드 타임 CSS-in-JS, RSC 친화적 ✅",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          body: "Server Component에서 styled-components를 import 하면 에러가 납니다. RSC 시대에는 ‘런타임 CSS-in-JS’가 큰 마이너스가 되어 가는 추세입니다.",
        },
      ],
    },
    {
      id: "tailwind",
      title: "2. Tailwind 설정 핵심",
      blocks: [
        {
          type: "code",
          lang: "ts",
          filename: "tailwind.config.ts",
          code: `import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { brand: '#1f74f7' } } },
  plugins: [],
} satisfies Config;`,
        },
        {
          type: "code",
          lang: "css",
          filename: "app/globals.css",
          code: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
        },
      ],
    },
    {
      id: "image",
      title: "3. next/image — 이미지 최적화",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          code: `import Image from 'next/image';
import hero from './hero.jpg';

// 정적 import는 width/height 자동 추정
<Image src={hero} alt="히어로" priority placeholder="blur" />

// 외부 URL은 next.config 설정이 필요
<Image src="https://cdn.example.com/a.jpg" alt="a" width={800} height={600} />`,
        },
        {
          type: "code",
          lang: "js",
          filename: "next.config.mjs",
          code: `export default {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.example.com' },
    ],
  },
};`,
        },
        {
          type: "list",
          items: [
            "자동 WebP/AVIF 변환, 디바이스 크기에 맞춘 srcset 생성",
            "above-the-fold 이미지엔 priority 추가 → LCP 향상",
            "blur 데이터 URL 또는 정적 import의 자동 placeholder로 CLS 방지",
            "fill 속성 + 부모 position:relative 조합으로 반응형 레이아웃",
          ],
        },
      ],
    },
    {
      id: "font",
      title: "4. next/font — 폰트 self-hosting",
      blocks: [
        {
          type: "code",
          lang: "ts",
          filename: "app/layout.tsx",
          code: `import { Inter, Pretendard } from 'next/font/google';
// ↑ Pretendard는 Google에 없으므로 보통 next/font/local 사용

import localFont from 'next/font/local';
const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}`,
        },
        {
          type: "callout",
          tone: "info",
          body: "next/font는 빌드 시점에 폰트를 자동으로 self-host 하고, font-display:swap과 size-adjust 메타데이터를 추가해 layout shift를 거의 0으로 만듭니다.",
        },
      ],
    },
    {
      id: "css-modules",
      title: "5. CSS Modules 한 줄 정리",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          code: `// button.module.css
.primary { background: black; color: white; }

// Button.tsx
import styles from './button.module.css';
export function Button() { return <button className={styles.primary}>OK</button>; }`,
        },
      ],
    },
  ],
  exercises: [
    "외부 API의 이미지 URL을 next/image로 표시하고 LCP 변화를 Lighthouse로 측정하세요.",
    "Pretendard를 next/font/local로 적용하고, 적용 전후 CLS 차이를 Performance 탭에서 확인하세요.",
    "Tailwind에 brand 색상 토큰을 추가하고, 디자인 시스템 컴포넌트(Button) 4종을 만드세요.",
  ],
  references: [
    { label: "next/image", url: "https://nextjs.org/docs/app/api-reference/components/image" },
    { label: "next/font", url: "https://nextjs.org/docs/app/api-reference/components/font" },
    { label: "Styling", url: "https://nextjs.org/docs/app/building-your-application/styling" },
  ],
};
