import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Translate } from "@/app/features/home/content/translations";
import type { PortfolioProject, ProjectDetailSection } from "@/app/features/home/model/types";
import { MaterialIcon } from "@/app/features/home/ui/material-icon";
import { SiteFooter } from "@/app/features/home/ui/site-footer";
import { SiteHeader } from "@/app/features/home/ui/site-header";
import {
  CleaningSection,
  DatasetSection,
  DeploymentSection,
  EDASection,
  FeatureEngineeringSection,
  PredictiveModelingSection,
  StackSection,
  StatisticalTestingSection,
  SummarySection,
  SystemDesignSection,
  SystemFeatureSection,
  accentClasses,
  type SectionCtx,
} from "./project-sections";
import { ProjectTabs, type ProjectTab } from "./project-tabs";

type TabDef = {
  id: string;
  labelKey: string;
  match: (section: ProjectDetailSection) => boolean;
  render: (section: ProjectDetailSection, ctx: SectionCtx, key: number) => ReactNode;
};

const featureTab = (id: string, labelKey: string, featureId: string): TabDef => ({
  id,
  labelKey,
  match: (s) => s.kind === "systemFeature" && s.id === featureId,
  render: (s, ctx, key) => s.kind === "systemFeature" && <SystemFeatureSection key={key} section={s} ctx={ctx} />,
});

// One entry per tab after "Overview", in display order. A tab only appears when the project
// has at least one section that matches — so adding a project needs no change here.
const TAB_DEFS: TabDef[] = [
  {
    id: "Metadata",
    labelKey: "metadata",
    match: (s) => s.kind === "dataset",
    render: (s, ctx, key) => s.kind === "dataset" && <DatasetSection key={key} section={s} ctx={ctx} />,
  },
  {
    id: "EDA",
    labelKey: "eda",
    match: (s) => s.kind === "eda",
    render: (s, ctx, key) => s.kind === "eda" && <EDASection key={key} section={s} ctx={ctx} />,
  },
  {
    id: "Cleaning",
    labelKey: "dataCleaning",
    match: (s) => s.kind === "cleaning",
    render: (s, ctx, key) => s.kind === "cleaning" && <CleaningSection key={key} section={s} ctx={ctx} />,
  },
  {
    id: "FeatureEng",
    labelKey: "featureEngineering",
    match: (s) => s.kind === "featureEngineering",
    render: (s, ctx, key) =>
      s.kind === "featureEngineering" && <FeatureEngineeringSection key={key} section={s} ctx={ctx} />,
  },
  {
    id: "StatTest",
    labelKey: "statisticalTesting",
    match: (s) => s.kind === "statisticalTesting",
    render: (s, ctx, key) =>
      s.kind === "statisticalTesting" && <StatisticalTestingSection key={key} section={s} ctx={ctx} />,
  },
  {
    id: "PredModel",
    labelKey: "predictiveModeling",
    match: (s) => s.kind === "predictiveModeling",
    render: (s, ctx, key) =>
      s.kind === "predictiveModeling" && <PredictiveModelingSection key={key} section={s} ctx={ctx} />,
  },
  {
    id: "SystemDesign",
    labelKey: "systemDesign",
    match: (s) => s.kind === "systemDesign",
    render: (s, ctx, key) => s.kind === "systemDesign" && <SystemDesignSection key={key} section={s} ctx={ctx} />,
  },
  featureTab("Auth", "authAndUsers", "auth"),
  featureTab("AI", "aiAssistant", "ai"),
  featureTab("Dataset", "datasetManagement", "dataset"),
  featureTab("Schema", "schemaManagement", "schema"),
  featureTab("Core", "platformFeatures", "core"),
  {
    id: "Deployment",
    labelKey: "deployment",
    match: (s) => s.kind === "deploymentPipeline",
    render: (s, ctx, key) => s.kind === "deploymentPipeline" && <DeploymentSection key={key} section={s} ctx={ctx} />,
  },
  {
    id: "Summary",
    labelKey: "projectSummary",
    match: (s) => s.kind === "summary",
    render: (s, ctx, key) => s.kind === "summary" && <SummarySection key={key} section={s} ctx={ctx} />,
  },
];

function OverviewTab({ project, ctx }: { project: PortfolioProject; ctx: SectionCtx }) {
  const { t } = ctx;
  return (
    <>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-6 font-headline-md text-headline-md text-primary">{t("overview")}</h2>
          <p className="font-body-lg text-body-lg text-secondary leading-relaxed mb-8">{project.description}</p>

          {project.bullets && project.bullets.length > 0 && (
            <>
              <h3 className="mb-6 font-headline-sm text-headline-sm text-primary">{t("keyHighlights")}</h3>
              <ul className={`list-disc space-y-4 pl-5 font-body-md text-body-md text-secondary marker:${ctx.text}`}>
                {project.bullets.map((bullet, idx) => (
                  <li key={idx} className="pl-2">
                    {bullet}
                  </li>
                ))}
              </ul>
            </>
          )}

          {project.overviewImage && (
            <div className="mt-12 w-full overflow-hidden border border-outline bg-surface p-2">
              <div className="relative w-full aspect-video">
                <Image
                  src={project.overviewImage.src}
                  alt={project.overviewImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
              {project.overviewImage.caption && (
                <p className="mt-4 pb-2 text-center font-label-mono text-xs uppercase tracking-widest text-secondary">
                  {project.overviewImage.caption}
                </p>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="sticky top-32 flex flex-col gap-6 border border-outline bg-surface p-8">
            <h3 className="font-label-mono text-sm uppercase tracking-widest text-primary">{t("projectDetails")}</h3>
            <div className="h-px w-full bg-outline" />
            <div className="flex flex-col gap-2">
              <span className="font-label-mono text-[10px] uppercase text-secondary">{t("category")}</span>
              <span className="font-body-md text-primary">{project.category}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-label-mono text-[10px] uppercase text-secondary">{t("tags")}</span>
              <span className="font-body-md text-primary">{project.meta}</span>
            </div>
            <a
              href={project.ctaHref}
              className="mt-4 inline-flex items-center justify-center gap-2 border border-outline px-6 py-4 font-label-mono text-label-mono uppercase tracking-widest transition-colors hover:border-primary hover:bg-primary hover:text-background"
            >
              {project.ctaLabel} <MaterialIcon name="arrow_outward" sizeClass="text-sm" />
            </a>
          </div>
        </div>
      </div>

      {project.detailSections?.map(
        (section, idx) => section.kind === "stack" && <StackSection key={idx} section={section} ctx={ctx} />,
      )}
    </>
  );
}

export function ProjectDetail({ project, t }: { project: PortfolioProject; t: Translate }) {
  const ctx: SectionCtx = { t, ...accentClasses(project.accent) };
  const sections = project.detailSections ?? [];

  const tabs: ProjectTab[] = [
    { id: "Overview", label: t("overview"), content: <OverviewTab project={project} ctx={ctx} /> },
    ...TAB_DEFS.flatMap((def) => {
      const matching = sections.map((section, idx) => ({ section, idx })).filter(({ section }) => def.match(section));
      if (matching.length === 0) return [];
      return [
        {
          id: def.id,
          label: t(def.labelKey),
          content: matching.map(({ section, idx }) => def.render(section, ctx, idx)),
        },
      ];
    }),
  ];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen px-margin-mobile pt-32 pb-section-gap md:px-margin-desktop">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 font-label-mono text-xs uppercase tracking-widest text-secondary transition-colors hover:text-primary"
          >
            <MaterialIcon name="arrow_back" sizeClass="text-sm" />
            {t("backToHome")}
          </Link>

          <div className="mb-12 flex flex-col gap-4">
            <p className="flex items-center gap-2 font-label-mono text-sm uppercase text-secondary">
              <MaterialIcon name={project.icon} sizeClass="text-base" className={ctx.text} />
              {project.meta}
            </p>
            <h1 className="font-headline-xl text-headline-xl uppercase text-primary md:text-[clamp(3rem,5vw,5rem)]">
              {project.title}
            </h1>
          </div>

          {project.imageSrc && (
            <div className={`relative mb-16 w-full overflow-hidden border ${ctx.border} bg-surface-container-low`}>
              <Image
                src={project.imageSrc}
                alt={project.imageAlt}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                priority
                className="block"
              />
            </div>
          )}

          <ProjectTabs tabs={tabs} accentBorderClass={ctx.border} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
