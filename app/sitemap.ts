import type { MetadataRoute } from "next";
import { PROJECT_SLUGS } from "@/app/features/home/content/home";
import { SITE_URL } from "@/app/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...PROJECT_SLUGS.map((slug) => ({
      url: `${SITE_URL}/project/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
