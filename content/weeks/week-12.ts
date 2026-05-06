import type { Week } from "../types";

export const week12: Week = {
  slug: "week-12",
  number: 12,
  level: "고급",
  title: "테스트 · 배포 · 모니터링",
  summary:
    "Vitest/Playwright로 테스트하고, Vercel(또는 셀프 호스팅)에 배포하며, OpenTelemetry/Web Vitals로 운영을 모니터링합니다.",
  objectives: [
    "단위 테스트와 E2E 테스트의 역할 분담을 정한다",
    "Vercel CLI로 프로덕션/프리뷰 배포를 한다",
    "next start와 Docker 셀프 호스팅 옵션을 안다",
    "Web Vitals를 수집해 분석한다",
  ],
  sections: [
    {
      id: "testing",
      title: "1. 테스트 전략",
      blocks: [
        {
          type: "list",
          items: [
            "Vitest + React Testing Library — 컴포넌트, hook, 유틸 단위 테스트",
            "Playwright — 핵심 사용자 시나리오 E2E (로그인, 주문 완료 등)",
            "Storybook — UI 컴포넌트 시각 문서 + visual regression",
            "Server Action 자체는 그냥 함수이므로 단위 테스트 가능",
          ],
        },
        {
          type: "code",
          lang: "ts",
          filename: "components/Button.test.tsx",
          code: `import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders label', () => {
  render(<Button>OK</Button>);
  expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
});`,
        },
      ],
    },
    {
      id: "vercel",
      title: "2. Vercel 배포",
      blocks: [
        {
          type: "list",
          items: [
            "GitHub repo 연결 → main 푸시 시 자동 프로덕션, PR마다 프리뷰 URL 자동 생성",
            "환경 변수: Project Settings → Environment Variables (Production/Preview/Development 분리)",
            "도메인: Settings → Domains에서 직접 추가",
            "함수 리전: Edge or 특정 리전(Tokyo, Seoul) 선택 가능",
          ],
        },
        {
          type: "code",
          lang: "bash",
          code: `# CLI로도 가능
npm i -g vercel
vercel           # 프리뷰 배포
vercel --prod    # 프로덕션 배포`,
        },
      ],
    },
    {
      id: "self-host",
      title: "3. 셀프 호스팅",
      blocks: [
        {
          type: "code",
          lang: "bash",
          code: `# 가장 단순한 방법
npm run build
npm run start    # PORT=3000 으로 next start`,
        },
        {
          type: "code",
          lang: "dockerfile",
          filename: "Dockerfile",
          code: `FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
        },
        {
          type: "callout",
          tone: "tip",
          body: "next.config의 output:'standalone' 옵션을 켜면 .next/standalone 디렉토리에 필요한 파일만 떨어져 도커 이미지가 훨씬 작아집니다.",
        },
      ],
    },
    {
      id: "telemetry",
      title: "4. 관측: Web Vitals & OpenTelemetry",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          filename: "app/_components/WebVitals.tsx",
          code: `'use client';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals(metric => {
    // Vercel Analytics, Google Analytics, 자체 API 등으로 전송
    fetch('/api/vitals', { method: 'POST', body: JSON.stringify(metric) });
  });
  return null;
}`,
        },
        {
          type: "p",
          text: "OpenTelemetry는 @vercel/otel 패키지를 instrumentation.ts에 등록하면 Server Component/Action의 트레이스를 그대로 수집할 수 있습니다.",
        },
      ],
    },
    {
      id: "deploy-checklist",
      title: "5. 배포 전 체크리스트",
      blocks: [
        {
          type: "list",
          items: [
            "환경 변수 분리, 시크릿은 절대 코드에 두지 않기",
            "next build 통과 + 타입 에러 0",
            "robots.txt / sitemap.xml 검증",
            "OG 이미지가 실제 트위터/슬랙에서 잘 보이는지",
            "404, 500 페이지 디자인",
            "Lighthouse 4지표(Performance/Accessibility/Best Practices/SEO) 90+ 권장",
          ],
        },
      ],
    },
  ],
  exercises: [
    "Vitest로 Button 컴포넌트와 Server Action 유틸의 단위 테스트를 각각 작성하세요.",
    "Playwright로 ‘로그인 → 글 작성 → 목록에 보임’ 시나리오를 한 케이스로 자동화하세요.",
    "이 부트캠프 사이트를 Vercel에 직접 배포하고, 본인의 도메인을 연결해 보세요.",
  ],
  references: [
    { label: "Deploying", url: "https://nextjs.org/docs/app/building-your-application/deploying" },
    { label: "Testing", url: "https://nextjs.org/docs/app/building-your-application/testing" },
    { label: "Web Vitals", url: "https://nextjs.org/docs/app/api-reference/functions/use-report-web-vitals" },
  ],
};
