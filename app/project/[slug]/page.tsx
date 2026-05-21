import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PORTFOLIO_PROJECTS } from "@/app/features/home/content/home";
import type { ProjectDetailSection } from "@/app/features/home/model/types";
import { MaterialIcon } from "@/app/features/home/ui/material-icon";
import { SiteFooter } from "@/app/features/home/ui/site-footer";
import { SiteHeader } from "@/app/features/home/ui/site-header";
import {
  CorrelationChart,
  CohortTrendChart,
  GPAByGenderChart,
  GPADistributionChart,
  MissingValuesChart,
  ScatterOldGPAChart,
} from "./eda-charts";
import { ProjectTabs } from "./project-tabs";

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

function DatasetSection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "dataset" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {
  return (
    <div className="mt-16">
      <h2 className="mb-2 font-headline-md text-headline-md text-primary">{section.title}</h2>
      <p className="mb-8 font-body-md text-body-md text-secondary">{section.source}</p>
      <div className="flex flex-col gap-6">
        {section.groups.map((group) => (
          <div key={group.groupLabel} className={`border ${accentBorderClass} bg-surface-container-low p-6`}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-2xl">{group.icon}</span>
              <span className={`font-label-mono text-sm uppercase tracking-widest ${accentColorClass}`}>{group.groupLabel}</span>
              <span className="ml-auto font-label-mono text-[10px] uppercase text-secondary">{group.purpose}</span>
            </div>
            <p className="mb-4 font-mono text-xs text-secondary break-all">{group.columns}</p>
            {group.rows && group.rows.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-outline">
                      <th className="pb-2 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">Column</th>
                      <th className="pb-2 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">Type</th>
                      <th className="pb-2 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">Example</th>
                      <th className="pb-2 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row) => (
                      <tr key={row.column} className="border-b border-outline/40 last:border-0">
                        <td className={`py-2 pr-4 font-mono text-xs font-bold ${accentColorClass}`}>{row.column}</td>
                        <td className="py-2 pr-4 font-mono text-xs text-secondary">{row.type}</td>
                        <td className="py-2 pr-4 font-mono text-xs text-secondary">{row.example}</td>
                        <td className="py-2 font-body-md text-xs text-secondary">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {group.note && (
              <p className="mt-4 border-l-2 border-yellow-500 pl-3 font-body-md text-xs text-yellow-400">
                ⚠️ {group.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PdpaSection({ section }: {
  section: Extract<ProjectDetailSection, { kind: "pdpa" }>;
}) {
  return (
    <div className="mt-16">
      <h2 className="mb-8 font-headline-md text-headline-md text-primary">{section.title}</h2>
      <div className="mb-8 border border-red-500/40 bg-red-950/20 p-6">
        <p className="mb-3 font-label-mono text-[10px] uppercase tracking-widest text-red-400">
          🔒 Personally Identifiable Information (PII) — Excluded from Analysis
        </p>
        <div className="flex flex-wrap gap-2">
          {section.piiColumns.map((col) => (
            <span key={col} className="border border-red-500/50 bg-red-950/30 px-3 py-1 font-mono text-xs text-red-300">
              {col}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {section.principles.map((p) => (
          <div key={p.label} className="border border-outline bg-surface-container-low p-6">
            <h4 className="mb-2 font-label-mono text-xs uppercase tracking-widest text-primary">
              {p.label}
            </h4>
            <p className="font-body-md text-sm text-secondary leading-relaxed">{p.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackSection({ section, accentColorClass }: {
  section: Extract<ProjectDetailSection, { kind: "stack" }>;
  accentColorClass: string;
}) {
  return (
    <div className="mt-16">
      <h2 className="mb-8 font-headline-md text-headline-md text-primary">{section.title}</h2>
      <div className="flex flex-wrap gap-3">
        {section.items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 border border-outline bg-surface-container-low px-4 py-3">
            <MaterialIcon name={item.icon} sizeClass="text-base" className={accentColorClass} />
            <span className="font-label-mono text-xs uppercase tracking-widest text-primary">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CleaningSection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "cleaning" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {
  return (
    <div className="flex flex-col gap-16">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {section.stats.map((stat) => (
          <div key={stat.label} className={`border ${accentBorderClass} bg-surface-container-low p-5 flex flex-col gap-3`}>
            <div className="flex items-center gap-2">
              <MaterialIcon name={stat.icon} sizeClass="text-base" className={accentColorClass} />
              <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary">{stat.label}</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-mono text-sm text-secondary line-through">{stat.before}</span>
              <span className="font-label-mono text-xs text-secondary">→</span>
              <span className={`font-headline-md text-xl font-bold ${accentColorClass}`}>{stat.after}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-8">
        <h3 className="font-headline-sm text-headline-sm text-primary">What We Did — Step by Step</h3>
        {section.steps.map((s) => (
          <div key={s.step} className={`border ${accentBorderClass} bg-surface-container-low`}>
            {/* Step header */}
            <div className={`flex items-center gap-4 border-b ${accentBorderClass} px-6 py-4`}>
              <span className={`font-label-mono text-xs uppercase tracking-widest ${accentColorClass}`}>
                Step {s.step}
              </span>
              <span className="font-headline-sm text-sm text-primary font-semibold">{s.title}</span>
              <span className="ml-auto text-lg">{s.badge}</span>
            </div>
            {/* Step body */}
            <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
              <div className="border-b border-outline/40 p-5 md:border-b-0 md:border-r">
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">Why</p>
                <p className="font-body-md text-sm text-secondary leading-relaxed">{s.why}</p>
              </div>
              <div className="border-b border-outline/40 p-5 md:border-b-0 md:border-r">
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">What</p>
                <p className="font-body-md text-sm text-secondary leading-relaxed">{s.what}</p>
              </div>
              <div className="p-5">
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">Result</p>
                <p className={`font-body-md text-sm leading-relaxed ${accentColorClass}`}>{s.result}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function EDASection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "eda" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {

  const CHART_MAP: Record<string, React.ReactNode> = {
    "GPA Distribution": <GPADistributionChart />,
    "High School GPA vs. University GPA": <ScatterOldGPAChart />,
    "GPA by Gender": <GPAByGenderChart />,
    "GPA Trend by Admission Year (Cohort Analysis)": <CohortTrendChart />,
    "Correlation Heatmap": <CorrelationChart />,
    "Missing Value Analysis": <MissingValuesChart />,
  };

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mb-16">
        {section.stats.map((stat) => (
          <div key={stat.label} className={`flex flex-col gap-2 border ${accentBorderClass} bg-surface-container-low p-5`}>
            <div className="flex items-center gap-2">
              <MaterialIcon name={stat.icon} sizeClass="text-base" className={accentColorClass} />
              <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary">{stat.label}</span>
            </div>
            <span className={`font-headline-md text-2xl font-bold ${accentColorClass}`}>{stat.value}</span>
            {stat.sub && <span className="font-body-md text-xs text-secondary">{stat.sub}</span>}
          </div>
        ))}
      </div>

      {/* Recharts Charts */}
      <div className="flex flex-col gap-16">
        {section.charts
          .filter((c) => c.title !== "GPA by Prior Education Level") // no recharts yet
          .map((chart, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-headline-sm text-headline-sm text-primary">{chart.title}</h3>
              <p className="font-body-md text-sm text-secondary">{chart.description}</p>
            </div>
            <div className={`p-4 border ${accentBorderClass} bg-[#12121a]`}>
              {CHART_MAP[chart.title] ?? (
                <p className="py-8 text-center font-label-mono text-xs uppercase text-secondary">Chart coming soon</p>
              )}
            </div>
            <div className="flex gap-3 border-l-2 border-accent-purple pl-4">
              <p className="font-body-md text-sm text-secondary leading-relaxed">
                <span className={`font-semibold ${accentColorClass}`}>Key Insight: </span>
                {chart.insight}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const accentColorClass =
    project.accent === "blue" ? "text-accent-blue" : "text-accent-purple";
  const accentBorderClass =
    project.accent === "blue" ? "border-accent-blue" : "border-accent-purple";

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
            Back to Home
          </Link>

          <div className="mb-12 flex flex-col gap-4">
            <p className="flex items-center gap-2 font-label-mono text-sm uppercase text-secondary">
              <MaterialIcon name={project.icon} sizeClass="text-base" className={accentColorClass} />
              {project.meta}
            </p>
            <h1 className="font-headline-xl text-headline-xl uppercase text-primary md:text-[clamp(3rem,5vw,5rem)]">
              {project.title}
            </h1>
          </div>

          <div className={`relative mb-16 w-full overflow-hidden border ${accentBorderClass} bg-surface-container-low`}>
            <Image
              src={project.imageSrc}
              alt={project.imageAlt}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              priority
              className="block"
            />
          </div>

          <ProjectTabs
            accentBorderClass={accentBorderClass}
            overviewContent={
              <>
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <h2 className="mb-6 font-headline-md text-headline-md text-primary">Overview</h2>
                    <p className="font-body-lg text-body-lg text-secondary leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {project.bullets && project.bullets.length > 0 && (
                      <>
                        <h3 className="mb-6 font-headline-sm text-headline-sm text-primary">Key Highlights</h3>
                        <ul className={`list-disc space-y-4 pl-5 font-body-md text-body-md text-secondary marker:${accentColorClass}`}>
                          {project.bullets.map((bullet, idx) => (
                            <li key={idx} className="pl-2">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <div>
                    <div className="sticky top-32 flex flex-col gap-6 border border-outline bg-surface p-8">
                      <h3 className="font-label-mono text-sm uppercase tracking-widest text-primary">
                        Project Details
                      </h3>
                      <div className="h-px w-full bg-outline" />
                      <div className="flex flex-col gap-2">
                        <span className="font-label-mono text-[10px] uppercase text-secondary">Category</span>
                        <span className="font-body-md text-primary">{project.category}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-label-mono text-[10px] uppercase text-secondary">Tags</span>
                        <span className="font-body-md text-primary">{project.meta}</span>
                      </div>
                      <a
                        href={project.ctaHref}
                        className={`mt-4 inline-flex items-center justify-center gap-2 border border-outline px-6 py-4 font-label-mono text-label-mono uppercase tracking-widest transition-colors hover:border-primary hover:bg-primary hover:text-background`}
                      >
                        {project.ctaLabel} <MaterialIcon name="arrow_outward" sizeClass="text-sm" />
                      </a>
                    </div>
                  </div>
                </div>

                {project.detailSections?.map((section, idx) => {
                  if (section.kind === "stack") {
                    return <StackSection key={idx} section={section} accentColorClass={accentColorClass} />;
                  }
                  return null;
                })}
              </>
            }
            metadataContent={
              <>
                {project.detailSections?.map((section, idx) => {
                  if (section.kind === "dataset") {
                    return <DatasetSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                  }
                  return null;
                })}
              </>
            }
            edaContent={
              <>
                {project.detailSections?.map((section, idx) => {
                  if (section.kind === "eda") {
                    return <EDASection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                  }
                  return null;
                })}
              </>
            }
            cleaningContent={
              <>
                {project.detailSections?.map((section, idx) => {
                  if (section.kind === "cleaning") {
                    return <CleaningSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                  }
                  return null;
                })}
              </>
            }
          />

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
