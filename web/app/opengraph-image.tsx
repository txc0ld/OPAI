import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/business";

export const alt = "OperateAI. Get found, recommended and booked by AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#121414",
          color: "#e2e2e2",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <div
            style={{
              fontSize: 132,
              lineHeight: 1,
              letterSpacing: "-0.05em",
              fontFamily: "sans-serif",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <span style={{ fontWeight: 800, color: "#f3fc85" }}>OperateAI</span>
          </div>
          <div
            style={{
              marginTop: 22,
              paddingTop: 18,
              borderTop: "1px solid #e2e2e2",
              fontSize: 22,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              opacity: 0.55,
              fontFamily: "monospace",
            }}
          >
            Get found, recommended & booked by AI
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 56,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
              fontFamily: "sans-serif",
              fontWeight: 500,
              color: "#e2e2e2",
            }}
          >
            {BUSINESS.tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.5,
            fontFamily: "sans-serif",
          }}
        >
          <span>Free AI Visibility Check</span>
          <span>operateai.com.au</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
