import { ImageResponse } from "next/og";

export const alt = "Kongkat Thanalertrungroj — Programmer & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0a0a0a 0%, #12162a 100%)",
          color: "#e2e8f0",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#60a5fa" }}>
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 300, lineHeight: 1 }}>Kongkat</div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 300, lineHeight: 1 }}>Thanalertrungroj</div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#a78bfa", marginTop: 12 }}>
            PROGRAMMER &amp; AI ENGINEER
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#94a3b8" }}>
          B.Sc. Computer Science · RMUTI · Data platforms, full-stack &amp; ML
        </div>
      </div>
    ),
    { ...size },
  );
}
