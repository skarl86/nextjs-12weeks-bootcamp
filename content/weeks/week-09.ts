import type { Week } from "../types";

export const week09: Week = {
  slug: "week-09",
  number: 9,
  level: "고급",
  title: "메타데이터 · SEO · 동적 OG 이미지",
  summary:
    "Metadata API, generateMetadata, opengraph-image, sitemap.ts, robots.ts로 검색 엔진과 소셜 공유 카드를 모두 챙깁니다.",
  objectives: [
    "정적/동적 메타데이터를 구분해서 정의한다",
    "타이틀 템플릿과 OpenGraph 이미지를 설정한다",
    "ImageResponse로 동적 OG 이미지를 만든다",
    "sitemap.ts / robots.ts로 크롤러를 안내한다",
  ],
  sections: [
    {
      id: "static",
      title: "1. 정적 metadata",
      blocks: [
        {
          type: "code",
          lang: "ts",
          filename: "app/layout.tsx",
          code: `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'My Blog', template: '%s | My Blog' },
  description: 'Next.js로 만든 개인 블로그',
  metadataBase: new URL('https://my-blog.com'),
  openGraph: {
    title: 'My Blog',
    images: ['/og-default.png'],
    type: 'website',
  },
};`,
        },
      ],
    },
    {
      id: "dynamic",
      title: "2. 동적 메타데이터",
      blocks: [
        {
          type: "code",
          lang: "ts",
          filename: "app/blog/[slug]/page.tsx",
          code: `import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.summary,
    openGraph: { images: [\`/blog/\${slug}/opengraph-image\`] },
  };
}`,
        },
      ],
    },
    {
      id: "og-image",
      title: "3. 동적 OG 이미지 (opengraph-image.tsx)",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          filename: "app/blog/[slug]/opengraph-image.tsx",
          code: `import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return new ImageResponse(
    (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        width: '100%', height: '100%', background: '#0e336f', color: 'white',
        padding: 80, fontSize: 64, fontWeight: 700,
      }}>
        {post.title}
      </div>
    ),
    { ...size }
  );
}`,
        },
        {
          type: "callout",
          tone: "tip",
          body: "ImageResponse는 React JSX를 1200×630 PNG로 변환합니다. 트위터/슬랙/페이스북에서 동적인 OG 카드를 보여줄 수 있어요.",
        },
      ],
    },
    {
      id: "sitemap",
      title: "4. sitemap.ts / robots.ts",
      blocks: [
        {
          type: "code",
          lang: "ts",
          filename: "app/sitemap.ts",
          code: `import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  return [
    { url: 'https://my-blog.com', lastModified: new Date() },
    ...posts.map(p => ({
      url: \`https://my-blog.com/blog/\${p.slug}\`,
      lastModified: p.updatedAt,
    })),
  ];
}`,
        },
        {
          type: "code",
          lang: "ts",
          filename: "app/robots.ts",
          code: `import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
    sitemap: 'https://my-blog.com/sitemap.xml',
  };
}`,
        },
      ],
    },
    {
      id: "checklist",
      title: "5. SEO 체크리스트",
      blocks: [
        {
          type: "list",
          items: [
            "<title>은 페이지마다 다르게, 60자 이내",
            "description 150~160자, 키워드 자연스럽게 포함",
            "metadataBase로 절대 URL 자동 생성",
            "OG 이미지 1200×630, 텍스트는 가운데 안전영역에",
            "구조화 데이터(JSON-LD)는 <script type='application/ld+json'>으로 RSC에서 직접",
          ],
        },
      ],
    },
  ],
  exercises: [
    "블로그 글마다 generateMetadata로 제목과 설명을 동적으로 생성하세요.",
    "글 제목을 그대로 1200×630 OG 이미지로 그리는 opengraph-image.tsx를 작성하세요.",
    "sitemap.ts에 모든 글 URL을 포함시키고 /sitemap.xml을 직접 확인하세요.",
  ],
  references: [
    { label: "Metadata", url: "https://nextjs.org/docs/app/building-your-application/optimizing/metadata" },
    { label: "OG Image", url: "https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image" },
    { label: "Sitemap & Robots", url: "https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap" },
  ],
};
