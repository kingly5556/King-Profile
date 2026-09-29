// Server components — no "use client". Only the charts (eda-charts.tsx) and the tab
// switcher (project-tabs.tsx) ship JavaScript; everything here is rendered to HTML on the server.
import type { ReactNode } from "react";
import type { Translate } from "@/app/features/home/content/translations";
import type { ProjectAccent, ProjectDetailSection } from "@/app/features/home/model/types";
import { MaterialIcon } from "@/app/features/home/ui/material-icon";
import {
  CorrelationChart,
  GPAByGenderChart,
  GPADistributionChart,
  MissingValuesChart,
  ScatterOldGPAChart,
} from "./eda-charts";

export type SectionCtx = {
  t: Translate;
  /** text colour class for the project accent */
  text: string;
  /** border colour class for the project accent */
  border: string;
};

type SectionOf<K extends ProjectDetailSection["kind"]> = Extract<ProjectDetailSection, { kind: K }>;

export function accentClasses(accent: ProjectAccent): Pick<SectionCtx, "text" | "border"> {
  return {
    text: accent === "blue" ? "text-accent-blue" : accent === "orange" ? "text-orange-400" : "text-accent-purple",
    border:
      accent === "blue" ? "border-accent-blue" : accent === "orange" ? "border-orange-500/40" : "border-accent-purple",
  };
}

/* ---------- shared building blocks ---------- */

const LABEL = "font-label-mono text-[10px] uppercase tracking-widest text-secondary";

function Th({ children, className = "", right = false }: { children: ReactNode; className?: string; right?: boolean }) {
  return <th className={`${right ? "text-right" : "text-left"} ${LABEL} ${className}`}>{children}</th>;
}

function ArrowList({ items, ctx }: { items: string[]; ctx: SectionCtx }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm text-secondary font-body-md leading-relaxed">
          <span className={`mt-0.5 shrink-0 ${ctx.text}`}>→</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function BoxedList({ title, items, ctx }: { title: string; items: string[]; ctx: SectionCtx }) {
  return (
    <div className={`border ${ctx.border} bg-surface-container-low p-6`}>
      <h3 className={`mb-4 font-label-mono text-sm uppercase tracking-widest ${ctx.text}`}>{title}</h3>
      <ArrowList items={items} ctx={ctx} />
    </div>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <h3 className="font-headline-sm text-headline-sm text-primary">{children}</h3>;
}

function Callout({ children, borderClass }: { children: ReactNode; borderClass: string }) {
  return (
    <p className={`font-body-lg text-body-lg text-secondary leading-relaxed border-l-4 ${borderClass} pl-6`}>{children}</p>
  );
}

/** Icon is either a Material Symbols name (`material`) or an emoji already stored in the content. */
function StatCard({
  icon,
  label,
  ctx,
  padding = "p-5",
  children,
}: {
  icon: ReactNode;
  label: string;
  ctx: SectionCtx;
  padding?: string;
  children: ReactNode;
}) {
  return (
    <div className={`border ${ctx.border} bg-surface-container-low ${padding} flex flex-col gap-3`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className={`${LABEL} break-words`}>{label}</span>
      </div>
      {children}
    </div>
  );
}

const materialStatIcon = (name: string, ctx: SectionCtx) => (
  <MaterialIcon name={name} sizeClass="text-base" className={ctx.text} />
);
const emojiStatIcon = (emoji: string) => <span className="text-xl">{emoji}</span>;

/** Card with a header row and a three-column body (Why/What/Result, Concept/What/Result, …). */
function StepCard({
  label,
  title,
  badge,
  columns,
  ctx,
}: {
  label: string;
  title: string;
  badge?: string;
  columns: [string, string][];
  ctx: SectionCtx;
}) {
  return (
    <div className={`border ${ctx.border} bg-surface-container-low`}>
      <div className={`flex items-center gap-4 border-b ${ctx.border} px-6 py-4`}>
        <span className={`font-label-mono text-xs uppercase tracking-widest ${ctx.text}`}>{label}</span>
        <span className="font-headline-sm text-sm text-primary font-semibold">{title}</span>
        {badge && <span className="ml-auto text-lg">{badge}</span>}
      </div>
      <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
        {columns.map(([heading, text], i) => {
          const last = i === columns.length - 1;
          return (
            <div
              key={heading}
              className={last ? "p-5" : "border-b border-outline/40 p-5 md:border-b-0 md:border-r"}
            >
              <p className={`mb-1 ${LABEL}`}>{heading}</p>
              <p className={`font-body-md text-sm leading-relaxed ${last ? ctx.text : "text-secondary"}`}>{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- sections ---------- */

export function StackSection({ section, ctx }: { section: SectionOf<"stack">; ctx: SectionCtx }) {
  return (
    <div className="mt-16">
      <h2 className="mb-8 font-headline-md text-headline-md text-primary">{section.title}</h2>
      <div className="flex flex-wrap gap-3">
        {section.items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 border border-outline bg-surface-container-low px-4 py-3">
            <MaterialIcon name={item.icon} sizeClass="text-base" className={ctx.text} />
            <span className="font-label-mono text-xs uppercase tracking-widest text-primary">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DatasetSection({ section, ctx }: { section: SectionOf<"dataset">; ctx: SectionCtx }) {
  const { t } = ctx;
  return (
    <div className="mt-16">
      <h2 className="mb-2 font-headline-md text-headline-md text-primary">{section.title}</h2>
      <p className="mb-8 font-body-md text-body-md text-secondary">{section.source}</p>
      <div className="flex flex-col gap-6">
        {section.groups.map((group) => (
          <div key={group.groupLabel} className={`border ${ctx.border} bg-surface-container-low p-6`}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-2xl">{group.icon}</span>
              <span className={`font-label-mono text-sm uppercase tracking-widest ${ctx.text}`}>{group.groupLabel}</span>
              <span className="ml-auto font-label-mono text-[10px] uppercase text-secondary">{group.purpose}</span>
            </div>
            <p className="mb-4 font-mono text-xs text-secondary break-all">{group.columns}</p>
            {group.rows && group.rows.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-outline">
                      <Th className="pb-2 pr-4">{t("column")}</Th>
                      <Th className="pb-2 pr-4">{t("type")}</Th>
                      <Th className="pb-2 pr-4">{t("example")}</Th>
                      <Th className="pb-2">{t("description")}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row) => (
                      <tr key={row.column} className="border-b border-outline/40 last:border-0">
                        <td className={`py-2 pr-4 font-mono text-xs font-bold ${ctx.text}`}>{row.column}</td>
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
              <p className="mt-4 border-l-2 border-yellow-500 pl-3 font-body-md text-xs text-yellow-400">⚠️ {group.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CleaningSection({ section, ctx }: { section: SectionOf<"cleaning">; ctx: SectionCtx }) {
  const { t } = ctx;
  return (
    <div className="flex flex-col gap-16">
      {section.stats && section.stats.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {section.stats.map((stat) => (
            <StatCard key={stat.label} icon={materialStatIcon(stat.icon, ctx)} label={stat.label} ctx={ctx}>
              <div className="flex items-end gap-2">
                <span className="font-mono text-sm text-secondary line-through">{stat.before}</span>
                <span className="font-label-mono text-xs text-secondary">→</span>
                <span className={`font-headline-md text-xl font-bold ${ctx.text}`}>{stat.after}</span>
              </div>
            </StatCard>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-8">
        <Heading>{t("whatWeDid")}</Heading>
        {section.steps.map((s) => (
          <StepCard
            key={s.step}
            label={`Step ${s.step}`}
            title={s.title}
            badge={s.badge}
            columns={[
              [t("why"), s.why],
              [t("what"), s.what],
              [t("result"), s.result],
            ]}
            ctx={ctx}
          />
        ))}
      </div>
    </div>
  );
}

export function FeatureEngineeringSection({
  section,
  ctx,
}: {
  section: SectionOf<"featureEngineering">;
  ctx: SectionCtx;
}) {
  const { t } = ctx;
  return (
    <div className="flex flex-col gap-16">
      {section.stats && section.stats.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {section.stats.map((stat) => (
            <StatCard key={stat.label} icon={materialStatIcon(stat.icon, ctx)} label={stat.label} ctx={ctx}>
              <span className={`font-headline-md text-2xl font-bold ${ctx.text}`}>{stat.value}</span>
            </StatCard>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-8">
        <Heading>{t("whatWeDid")}</Heading>
        {section.steps.map((s) => (
          <StepCard
            key={s.task}
            label={`Task ${s.task}`}
            title={s.title}
            badge={s.badge}
            columns={[
              [t("concept"), s.concept],
              [t("whatWasDone"), s.what],
              [t("result"), s.result],
            ]}
            ctx={ctx}
          />
        ))}
      </div>
    </div>
  );
}

export function StatisticalTestingSection({
  section,
  ctx,
}: {
  section: SectionOf<"statisticalTesting">;
  ctx: SectionCtx;
}) {
  const { t } = ctx;
  return (
    <div className="flex flex-col gap-16">
      <Callout borderClass="border-accent-purple">{section.summary}</Callout>

      {section.groups.map((group, gi) => (
        <div key={gi} className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{group.icon}</span>
            <h3 className={`font-headline-sm text-headline-sm ${ctx.text}`}>{group.groupTitle}</h3>
          </div>
          <p className="font-body-md text-sm text-secondary italic">{group.question}</p>
          <div className="flex flex-col gap-3">
            {group.results.map((res, ri) => {
              const significant = res.verdict === "significant";
              return (
                <div key={ri} className={`border ${ctx.border} bg-surface-container-low`}>
                  <div className={`flex flex-wrap items-center gap-3 border-b ${ctx.border} px-5 py-3`}>
                    <span className="font-mono text-xs bg-surface px-2 py-0.5 text-secondary">{res.test}</span>
                    <span className={`font-mono text-sm font-bold ${ctx.text}`}>{res.feature}</span>
                    <span
                      className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 font-label-mono text-[10px] uppercase tracking-widest ${
                        significant
                          ? "bg-green-950/40 text-green-400 border border-green-500/40"
                          : "bg-red-950/40 text-red-400 border border-red-500/40"
                      }`}
                    >
                      {significant ? "✅" : "❌"} {significant ? t("significant") : t("notSignificant")}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
                    {(
                      [
                        [t("testResult"), res.statistic],
                        [t("pValue"), res.pValue],
                        [t("effectSize"), res.effectSize],
                      ] as const
                    ).map(([heading, value]) => (
                      <div key={heading} className="border-b border-outline/40 p-4 md:border-b-0 md:border-r">
                        <p className={`mb-1 ${LABEL}`}>{heading}</p>
                        <p className="font-mono text-xs text-primary">{value}</p>
                      </div>
                    ))}
                    <div className="p-4">
                      <p className={`mb-1 ${LABEL}`}>{t("keyInsight")}</p>
                      <p className="font-body-md text-xs text-secondary leading-relaxed">{res.insight}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <BoxedList title={`🔑 ${t("keyFindings")}`} items={section.keyFindings} ctx={ctx} />
    </div>
  );
}

export function PredictiveModelingSection({
  section,
  ctx,
}: {
  section: SectionOf<"predictiveModeling">;
  ctx: SectionCtx;
}) {
  const { t } = ctx;
  const winner = section.models.find((m) => m.isWinner) ?? section.models[0];
  const improvement = (((section.baselineMae - winner.mae) / section.baselineMae) * 100).toFixed(1);
  const metric = (isWinner?: boolean) => (isWinner ? ctx.text : "text-secondary");

  return (
    <div className="flex flex-col gap-16">
      <Callout borderClass="border-accent-purple">{section.summary}</Callout>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {section.stats.map((stat) => (
          <StatCard key={stat.label} icon={materialStatIcon(stat.icon, ctx)} label={stat.label} ctx={ctx}>
            <span className={`font-headline-md text-2xl font-bold ${ctx.text}`}>{stat.value}</span>
            {stat.sub && <span className="font-body-md text-xs text-secondary">{stat.sub}</span>}
          </StatCard>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Heading>🏆 {t("modelRanking")}</Heading>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`border-b ${ctx.border}`}>
                <Th className="py-3 pr-4">Rank</Th>
                <Th className="py-3 pr-4">Model</Th>
                <Th className="py-3 pr-4" right>MAE ↓</Th>
                <Th className="py-3 pr-4" right>RMSE ↓</Th>
                <Th className="py-3" right>R² ↑</Th>
              </tr>
            </thead>
            <tbody>
              {section.models.map((m) => (
                <tr key={m.name} className={`border-b border-outline/40 last:border-0 ${m.isWinner ? "bg-surface-container" : ""}`}>
                  <td className="py-3 pr-4 font-mono text-xs text-secondary">{m.isWinner ? "🏆" : `#${m.rank}`}</td>
                  <td className={`py-3 pr-4 font-mono text-xs font-semibold ${m.isWinner ? ctx.text : "text-primary"}`}>
                    {m.name}
                    {m.isWinner && " ★"}
                  </td>
                  <td className={`py-3 pr-4 text-right font-mono text-xs ${metric(m.isWinner)}`}>{m.mae.toFixed(4)}</td>
                  <td className={`py-3 pr-4 text-right font-mono text-xs ${metric(m.isWinner)}`}>{m.rmse.toFixed(4)}</td>
                  <td className={`py-3 text-right font-mono text-xs ${metric(m.isWinner)}`}>{m.r2.toFixed(4)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-outline/60 opacity-60">
                <td className="py-3 pr-4 font-mono text-xs text-secondary">—</td>
                <td className="py-3 pr-4 font-mono text-xs text-secondary italic">Baseline (Predict Mean)</td>
                <td className="py-3 pr-4 text-right font-mono text-xs text-secondary">{section.baselineMae.toFixed(4)}</td>
                <td className="py-3 pr-4 text-right font-mono text-xs text-secondary">—</td>
                <td className="py-3 text-right font-mono text-xs text-secondary">0.0000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`inline-flex items-center gap-2 self-start border ${ctx.border} bg-surface-container-low px-4 py-2`}>
          <MaterialIcon name="trending_up" sizeClass="text-sm" className={ctx.text} />
          <span className="font-label-mono text-xs uppercase tracking-widest text-secondary">{t("improvement")}:</span>
          <span className={`font-mono text-sm font-bold ${ctx.text}`}>+{improvement}%</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Heading>📊 {t("featureSelection")}</Heading>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`border-b ${ctx.border}`}>
                <Th className="py-2 pr-4">Feature</Th>
                <Th className="py-2 pr-4">{t("whySelected")}</Th>
                <Th className="py-2">{t("phase3Evidence")}</Th>
              </tr>
            </thead>
            <tbody>
              {section.features.map((f, i) => (
                <tr key={i} className="border-b border-outline/40 last:border-0">
                  <td className={`py-3 pr-4 font-mono text-xs font-bold ${ctx.text}`}>{f.name}</td>
                  <td className="py-3 pr-4 font-body-md text-xs text-secondary">{f.reason}</td>
                  <td className="py-3 font-mono text-xs text-secondary">{f.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`border ${ctx.border} bg-surface-container-low p-6`}>
        <h3 className={`mb-3 font-label-mono text-sm uppercase tracking-widest ${ctx.text}`}>🔁 {t("crossValidation")}</h3>
        <p className="font-body-md text-sm text-secondary leading-relaxed">{section.cvSummary}</p>
      </div>

      <div className="flex flex-col gap-4">
        <Heading>🔎 {t("residualAnalysis")}</Heading>
        <ArrowList items={section.residualInsights} ctx={ctx} />
      </div>
    </div>
  );
}

export function EDASection({ section, ctx }: { section: SectionOf<"eda">; ctx: SectionCtx }) {
  const { t } = ctx;

  const chartMap: Record<string, ReactNode> = {
    "GPA Distribution": <GPADistributionChart />,
    "High School GPA vs. University GPA": <ScatterOldGPAChart />,
    "GPA by Gender": <GPAByGenderChart />,
    "Correlation Heatmap": <CorrelationChart />,
    "Missing Value Analysis": <MissingValuesChart />,
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mb-16">
        {section.stats.map((stat) => (
          <StatCard key={stat.label} icon={materialStatIcon(stat.icon, ctx)} label={stat.label} ctx={ctx}>
            <span className={`font-headline-md text-2xl font-bold ${ctx.text}`}>{stat.value}</span>
            {stat.sub && <span className="font-body-md text-xs text-secondary">{stat.sub}</span>}
          </StatCard>
        ))}
      </div>

      <div className="flex flex-col gap-16">
        {section.charts
          .filter((c) => c.title !== "GPA by Prior Education Level") // no recharts yet
          .map((chart, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="font-headline-sm text-headline-sm text-primary">{chart.title}</h3>
                <p className="font-body-md text-sm text-secondary">{chart.description}</p>
              </div>
              <div className={`p-4 border ${ctx.border} bg-[#12121a]`}>
                {chartMap[chart.title] ?? (
                  <p className="py-8 text-center font-label-mono text-xs uppercase text-secondary">{t("chartComingSoon")}</p>
                )}
              </div>
              <div className="flex gap-3 border-l-2 border-accent-purple pl-4">
                <p className="font-body-md text-sm text-secondary leading-relaxed">
                  <span className={`font-semibold ${ctx.text}`}>{t("keyInsight")}</span>
                  {chart.insight}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export function SummarySection({ section, ctx }: { section: SectionOf<"summary">; ctx: SectionCtx }) {
  const { t } = ctx;
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <Heading>🎯 {t("goalAchievement")}</Heading>
        <Callout borderClass={ctx.border}>{section.goalAchievement}</Callout>
      </div>

      <div className="flex flex-col gap-8">
        <Heading>📝 {t("stepByStepSummary")}</Heading>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`border-b ${ctx.border}`}>
                <Th className="py-3 pr-4">{t("phase")}</Th>
                <Th className="py-3 pr-4">{t("action")}</Th>
                <Th className="py-3">{t("result")}</Th>
              </tr>
            </thead>
            <tbody>
              {section.steps.map((step, idx) => (
                <tr key={idx} className="border-b border-outline/40 last:border-0">
                  <td className={`py-4 pr-4 font-label-mono text-xs uppercase tracking-widest ${ctx.text}`}>{step.phase}</td>
                  <td className="py-4 pr-4 font-body-md text-sm text-secondary leading-relaxed">{step.action}</td>
                  <td className="py-4 font-body-md text-sm text-primary leading-relaxed">{step.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Heading>⭐ {t("qualityAssessment")}</Heading>
        <Callout borderClass={ctx.border}>{section.qualityAssessment}</Callout>
      </div>

      <BoxedList title={`✨ ${t("benefitsAndImpact")}`} items={section.benefits} ctx={ctx} />
    </div>
  );
}

export function SystemDesignSection({ section, ctx }: { section: SectionOf<"systemDesign">; ctx: SectionCtx }) {
  const { t } = ctx;
  return (
    <div className="flex flex-col gap-16">
      {section.problems && section.problems.length > 0 && (
        <div className="flex flex-col gap-4">
          <Heading>💡 {t("problemsSolved")}</Heading>
          <ArrowList items={section.problems} ctx={ctx} />
        </div>
      )}

      <div className="flex flex-col gap-6">
        <Heading>🧩 {t("coreModules")}</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {section.modules.map((m, i) => (
            <div key={i} className={`border ${ctx.border} bg-surface-container-low p-6 flex flex-col gap-3`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{m.icon}</span>
                <span className={`font-label-mono text-xs uppercase tracking-widest ${ctx.text}`}>{m.title}</span>
              </div>
              <p className="font-body-md text-sm text-secondary">{m.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Heading>🔐 {t("rbac")}</Heading>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className={`border-b ${ctx.border}`}>
                <Th className="py-2 pr-4">{t("role")}</Th>
                <Th className="py-2">{t("permissions")}</Th>
              </tr>
            </thead>
            <tbody>
              {section.roles.map((r, i) => (
                <tr key={i} className="border-b border-outline/40 last:border-0">
                  <td className={`py-3 pr-4 font-mono text-xs font-bold ${ctx.text}`}>{r.role}</td>
                  <td className="py-3 font-body-md text-sm text-secondary">{r.permissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {section.architectureDiagram && (
        <div className="flex flex-col gap-4">
          <Heading>🏗️ {t("architecture")}</Heading>
          <div className={`border ${ctx.border} bg-[#12121a] p-6 flex justify-center overflow-x-auto`}>
            <pre className={`font-mono text-xs md:text-sm ${ctx.text}`}>{section.architectureDiagram}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export function SystemFeatureSection({ section, ctx }: { section: SectionOf<"systemFeature">; ctx: SectionCtx }) {
  const { t } = ctx;
  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {section.stats.map((stat) => (
          <StatCard key={stat.label} icon={emojiStatIcon(stat.icon)} label={stat.label} ctx={ctx}>
            <span className={`font-headline-md text-xl font-bold ${ctx.text}`}>{stat.value}</span>
          </StatCard>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        <Heading>{t("features")}</Heading>
        {section.steps.map((s, i) => (
          <StepCard
            key={i}
            label={typeof s.step === "number" ? `Step ${s.step}` : s.step}
            title={s.title}
            columns={[
              [t("concept"), s.concept],
              [t("whatWasDone"), s.what],
              [t("result"), s.result],
            ]}
            ctx={ctx}
          />
        ))}
      </div>
    </div>
  );
}

export function DeploymentSection({ section, ctx }: { section: SectionOf<"deploymentPipeline">; ctx: SectionCtx }) {
  const { t } = ctx;
  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {section.stats.map((stat) => (
          <StatCard key={stat.label} icon={emojiStatIcon(stat.icon)} label={stat.label} ctx={ctx} padding="p-4">
            <span className={`font-headline-md text-lg font-bold ${ctx.text}`}>{stat.value}</span>
          </StatCard>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        <Heading>🚀 {t("deploymentPipeline")}</Heading>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`border-b ${ctx.border}`}>
                <Th className="py-3 pr-4">{t("phase")}</Th>
                <Th className="py-3 pr-4">{t("action")}</Th>
                <Th className="py-3">{t("detail")}</Th>
              </tr>
            </thead>
            <tbody>
              {section.phases.map((p, idx) => (
                <tr key={idx} className="border-b border-outline/40 last:border-0">
                  <td className={`py-4 pr-4 font-label-mono text-xs uppercase tracking-widest ${ctx.text}`}>{p.phase}</td>
                  <td className="py-4 pr-4 font-body-md text-sm text-primary font-semibold">{p.action}</td>
                  <td className="py-4 font-body-md text-sm text-secondary leading-relaxed">{p.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BoxedList title={`☸️ ${t("k8sManifests")}`} items={section.k8sSummary} ctx={ctx} />
    </div>
  );
}
