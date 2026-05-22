import { notFound } from "next/navigation";
import { PORTFOLIO_PROJECTS } from "@/app/features/home/content/home";
import { ProjectDetailClient } from "./project-detail-client";

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient slug={slug} />;
}
