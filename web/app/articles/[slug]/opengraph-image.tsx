import { ImageResponse } from "next/og";
import { getArticleSlugs, listArticles } from "@/lib/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "OperateAI article";

// Pre-generate the OG image for every article at build time.
export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = listArticles().find((a) => a.slug === slug)?.title ?? "OperateAI";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0e0e",
          color: "#e9e7e4",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#f3fc85",
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f3fc85" }} />
          OperateAI · Article
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#c2c0b8" }}>
          <span>Get found, recommended and booked by AI</span>
          <span>operateai.com.au</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
