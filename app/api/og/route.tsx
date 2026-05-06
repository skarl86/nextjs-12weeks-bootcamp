import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Next.js 12주 부트캠프";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0e336f 0%, #0f5ce0 50%, #1f74f7 100%)",
          color: "white",
          padding: 80,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            opacity: 0.85,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "white",
              color: "#0e336f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            N
          </div>
          <span>Next.js 12주 부트캠프</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 28,
            opacity: 0.75,
          }}
        >
          App Router · React Server Components · Vercel Deploy
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
