import { ImageResponse } from "next/og";
import { PROJECT_SLUGS, getProject } from "@/app/features/home/content/home";
import { projectMetaTitle } from "./project-meta";

export const alt = "Project preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject("en", slug);
  const title = project ? projectMetaTitle(project) : "Project";
  const category = project?.category ?? "Portfolio";
  const meta = project?.meta ?? "";

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
          {category}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 30, color: "#94a3b8" }}>{meta}</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a78bfa" }}>Kongkat Thanalertrungroj · Programmer &amp; AI Engineer</div>
      </div>
    ),
    { ...size },
  );
}
