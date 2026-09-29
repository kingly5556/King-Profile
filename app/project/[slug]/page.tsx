import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECT_SLUGS, getProject } from "@/app/features/home/content/home";
import { getTranslator } from "@/app/features/home/content/translations";
import { getRequestLocale } from "@/app/locale";
import { ProjectDetail } from "./project-detail";
import { projectMetaDescription, projectMetaTitle } from "./project-meta";

export async function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

// Crawlers send no cookie, so metadata is always English (see REVIEW.md).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject("en", slug);
  if (!project) return {};

  const title = projectMetaTitle(project);
  const description = projectMetaDescription(project);
  const url = `/project/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const project = getProject(locale, slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} t={getTranslator(locale)} />;
}
