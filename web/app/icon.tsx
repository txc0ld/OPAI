import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#121414",
          color: "#f3fc85",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontSize: 18,
          letterSpacing: "-0.06em",
          lineHeight: 1,
        }}
      >
        <span style={{ fontWeight: 200, opacity: 0.5 }}>[</span>
        <span style={{ fontWeight: 800 }}>a</span>
        <span style={{ fontWeight: 200, opacity: 0.5 }}>]</span>
      </div>
    ),
    { ...size }
  );
}
