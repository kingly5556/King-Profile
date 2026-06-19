"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { PORTFOLIO_PROJECTS_EN, PORTFOLIO_PROJECTS_TH } from "@/app/features/home/content/home";
import type { ProjectDetailSection } from "@/app/features/home/model/types";
import { MaterialIcon } from "@/app/features/home/ui/material-icon";
import { SiteFooter } from "@/app/features/home/ui/site-footer";
import { SiteHeader } from "@/app/features/home/ui/site-header";
import {
  CorrelationChart,
  GPAByGenderChart,
  GPADistributionChart,
  MissingValuesChart,
  ScatterOldGPAChart,
} from "./eda-charts";
import { ProjectTabs } from "./project-tabs";

function DatasetSection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "dataset" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {
  const { t } = useLanguage();
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
                      <th className="pb-2 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("column")}</th>
                      <th className="pb-2 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("type")}</th>
                      <th className="pb-2 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("example")}</th>
                      <th className="pb-2 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("description")}</th>
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
  const { t } = useLanguage();
  return (
    <div className="mt-16">
      <h2 className="mb-8 font-headline-md text-headline-md text-primary">{section.title}</h2>
      <div className="mb-8 border border-red-500/40 bg-red-950/20 p-6">
        <p className="mb-3 font-label-mono text-[10px] uppercase tracking-widest text-red-400">
          🔒 {t("piiTitle")}
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
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-16">
      {/* Stats */}
      {section.stats && section.stats.length > 0 && (
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
      )}

      {/* Steps */}
      <div className="flex flex-col gap-8">
        <h3 className="font-headline-sm text-headline-sm text-primary">{t("whatWeDid")}</h3>
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
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("why")}</p>
                <p className="font-body-md text-sm text-secondary leading-relaxed">{s.why}</p>
              </div>
              <div className="border-b border-outline/40 p-5 md:border-b-0 md:border-r">
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("what")}</p>
                <p className="font-body-md text-sm text-secondary leading-relaxed">{s.what}</p>
              </div>
              <div className="p-5">
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("result")}</p>
                <p className={`font-body-md text-sm leading-relaxed ${accentColorClass}`}>{s.result}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureEngineeringSection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "featureEngineering" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-16">
      {/* Stats */}
      {section.stats && section.stats.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {section.stats.map((stat) => (
            <div key={stat.label} className={`border ${accentBorderClass} bg-surface-container-low p-5 flex flex-col gap-3`}>
              <div className="flex items-center gap-2">
                <MaterialIcon name={stat.icon} sizeClass="text-base" className={accentColorClass} />
                <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary">{stat.label}</span>
              </div>
              <span className={`font-headline-md text-2xl font-bold ${accentColorClass}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Steps */}
      <div className="flex flex-col gap-8">
        <h3 className="font-headline-sm text-headline-sm text-primary">{t("whatWeDid")}</h3>
        {section.steps.map((s) => (
          <div key={s.task} className={`border ${accentBorderClass} bg-surface-container-low`}>
            {/* Step header */}
            <div className={`flex items-center gap-4 border-b ${accentBorderClass} px-6 py-4`}>
              <span className={`font-label-mono text-xs uppercase tracking-widest ${accentColorClass}`}>
                Task {s.task}
              </span>
              <span className="font-headline-sm text-sm text-primary font-semibold">{s.title}</span>
              <span className="ml-auto text-lg">{s.badge}</span>
            </div>
            {/* Step body */}
            <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
              <div className="border-b border-outline/40 p-5 md:border-b-0 md:border-r">
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("concept")}</p>
                <p className="font-body-md text-sm text-secondary leading-relaxed">{s.concept}</p>
              </div>
              <div className="border-b border-outline/40 p-5 md:border-b-0 md:border-r">
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("whatWasDone")}</p>
                <p className="font-body-md text-sm text-secondary leading-relaxed">{s.what}</p>
              </div>
              <div className="p-5">
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("result")}</p>
                <p className={`font-body-md text-sm leading-relaxed ${accentColorClass}`}>{s.result}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatisticalTestingSection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "statisticalTesting" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-16">
      <p className="font-body-lg text-body-lg text-secondary leading-relaxed border-l-4 border-accent-purple pl-6">
        {section.summary}
      </p>

      {section.groups.map((group, gi) => (
        <div key={gi} className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{group.icon}</span>
            <h3 className={`font-headline-sm text-headline-sm ${accentColorClass}`}>{group.groupTitle}</h3>
          </div>
          <p className="font-body-md text-sm text-secondary italic">{group.question}</p>
          <div className="flex flex-col gap-3">
            {group.results.map((res, ri) => (
              <div key={ri} className={`border ${accentBorderClass} bg-surface-container-low`}>
                <div className={`flex flex-wrap items-center gap-3 border-b ${accentBorderClass} px-5 py-3`}>
                  <span className="font-mono text-xs bg-surface px-2 py-0.5 text-secondary">{res.test}</span>
                  <span className={`font-mono text-sm font-bold ${accentColorClass}`}>{res.feature}</span>
                  <span className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 font-label-mono text-[10px] uppercase tracking-widest ${
                    res.verdict === "significant"
                      ? "bg-green-950/40 text-green-400 border border-green-500/40"
                      : "bg-red-950/40 text-red-400 border border-red-500/40"
                  }`}>
                    {res.verdict === "significant" ? "✅" : "❌"} {res.verdict === "significant" ? t("significant") : t("notSignificant")}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
                  <div className="border-b border-outline/40 p-4 md:border-b-0 md:border-r">
                    <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("testResult")}</p>
                    <p className="font-mono text-xs text-primary">{res.statistic}</p>
                  </div>
                  <div className="border-b border-outline/40 p-4 md:border-b-0 md:border-r">
                    <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("pValue")}</p>
                    <p className="font-mono text-xs text-primary">{res.pValue}</p>
                  </div>
                  <div className="border-b border-outline/40 p-4 md:border-b-0 md:border-r">
                    <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("effectSize")}</p>
                    <p className="font-mono text-xs text-primary">{res.effectSize}</p>
                  </div>
                  <div className="p-4">
                    <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("keyInsight")}</p>
                    <p className="font-body-md text-xs text-secondary leading-relaxed">{res.insight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={`border ${accentBorderClass} bg-surface-container-low p-6`}>
        <h3 className={`mb-4 font-label-mono text-sm uppercase tracking-widest ${accentColorClass}`}>🔑 {t("keyFindings")}</h3>
        <ul className="flex flex-col gap-3">
          {section.keyFindings.map((finding, i) => (
            <li key={i} className="flex gap-3 text-sm text-secondary font-body-md leading-relaxed">
              <span className={`mt-0.5 shrink-0 ${accentColorClass}`}>→</span>
              {finding}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PredictiveModelingSection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "predictiveModeling" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {
  const { t } = useLanguage();
  const winner = section.models.find(m => m.isWinner) ?? section.models[0];
  const improvement = ((section.baselineMae - winner.mae) / section.baselineMae * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-16">
      <p className="font-body-lg text-body-lg text-secondary leading-relaxed border-l-4 border-accent-purple pl-6">
        {section.summary}
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {section.stats.map((stat) => (
          <div key={stat.label} className={`border ${accentBorderClass} bg-surface-container-low p-5 flex flex-col gap-2`}>
            <div className="flex items-center gap-2">
              <MaterialIcon name={stat.icon} sizeClass="text-base" className={accentColorClass} />
              <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary">{stat.label}</span>
            </div>
            <span className={`font-headline-md text-2xl font-bold ${accentColorClass}`}>{stat.value}</span>
            {stat.sub && <span className="font-body-md text-xs text-secondary">{stat.sub}</span>}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-headline-sm text-headline-sm text-primary">🏆 {t("modelRanking")}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`border-b ${accentBorderClass}`}>
                <th className="py-3 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">Rank</th>
                <th className="py-3 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">Model</th>
                <th className="py-3 pr-4 text-right font-label-mono text-[10px] uppercase tracking-widest text-secondary">MAE ↓</th>
                <th className="py-3 pr-4 text-right font-label-mono text-[10px] uppercase tracking-widest text-secondary">RMSE ↓</th>
                <th className="py-3 text-right font-label-mono text-[10px] uppercase tracking-widest text-secondary">R² ↑</th>
              </tr>
            </thead>
            <tbody>
              {section.models.map((m) => (
                <tr key={m.name} className={`border-b border-outline/40 last:border-0 ${m.isWinner ? "bg-surface-container" : ""}`}>
                  <td className="py-3 pr-4 font-mono text-xs text-secondary">{m.isWinner ? "🏆" : `#${m.rank}`}</td>
                  <td className={`py-3 pr-4 font-mono text-xs font-semibold ${m.isWinner ? accentColorClass : "text-primary"}`}>
                    {m.name}{m.isWinner && " ★"}
                  </td>
                  <td className={`py-3 pr-4 text-right font-mono text-xs ${m.isWinner ? accentColorClass : "text-secondary"}`}>{m.mae.toFixed(4)}</td>
                  <td className={`py-3 pr-4 text-right font-mono text-xs ${m.isWinner ? accentColorClass : "text-secondary"}`}>{m.rmse.toFixed(4)}</td>
                  <td className={`py-3 text-right font-mono text-xs ${m.isWinner ? accentColorClass : "text-secondary"}`}>{m.r2.toFixed(4)}</td>
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
        <div className={`inline-flex items-center gap-2 self-start border ${accentBorderClass} bg-surface-container-low px-4 py-2`}>
          <MaterialIcon name="trending_up" sizeClass="text-sm" className={accentColorClass} />
          <span className="font-label-mono text-xs uppercase tracking-widest text-secondary">{t("improvement")}:</span>
          <span className={`font-mono text-sm font-bold ${accentColorClass}`}>+{improvement}%</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-headline-sm text-headline-sm text-primary">📊 {t("featureSelection")}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`border-b ${accentBorderClass}`}>
                <th className="py-2 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">Feature</th>
                <th className="py-2 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("whySelected")}</th>
                <th className="py-2 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("phase3Evidence")}</th>
              </tr>
            </thead>
            <tbody>
              {section.features.map((f, i) => (
                <tr key={i} className="border-b border-outline/40 last:border-0">
                  <td className={`py-3 pr-4 font-mono text-xs font-bold ${accentColorClass}`}>{f.name}</td>
                  <td className="py-3 pr-4 font-body-md text-xs text-secondary">{f.reason}</td>
                  <td className="py-3 font-mono text-xs text-secondary">{f.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`border ${accentBorderClass} bg-surface-container-low p-6`}>
        <h3 className={`mb-3 font-label-mono text-sm uppercase tracking-widest ${accentColorClass}`}>🔁 {t("crossValidation")}</h3>
        <p className="font-body-md text-sm text-secondary leading-relaxed">{section.cvSummary}</p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-headline-sm text-headline-sm text-primary">🔎 {t("residualAnalysis")}</h3>
        <ul className="flex flex-col gap-3">
          {section.residualInsights.map((insight, i) => (
            <li key={i} className="flex gap-3 text-sm text-secondary font-body-md leading-relaxed">
              <span className={`mt-0.5 shrink-0 ${accentColorClass}`}>→</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EDASection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "eda" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {
  const { t } = useLanguage();

  const CHART_MAP: Record<string, React.ReactNode> = {
    "GPA Distribution": <GPADistributionChart />,
    "High School GPA vs. University GPA": <ScatterOldGPAChart />,
    "GPA by Gender": <GPAByGenderChart />,
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
                <p className="py-8 text-center font-label-mono text-xs uppercase text-secondary">{t("chartComingSoon")}</p>
              )}
            </div>
            <div className="flex gap-3 border-l-2 border-accent-purple pl-4">
              <p className="font-body-md text-sm text-secondary leading-relaxed">
                <span className={`font-semibold ${accentColorClass}`}>{t("keyInsight")}</span>
                {chart.insight}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummarySection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "summary" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <h3 className="font-headline-sm text-headline-sm text-primary">🎯 {t("goalAchievement")}</h3>
        <p className={`font-body-lg text-body-lg text-secondary leading-relaxed border-l-4 ${accentBorderClass} pl-6`}>
          {section.goalAchievement}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="font-headline-sm text-headline-sm text-primary">📝 {t("stepByStepSummary")}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`border-b ${accentBorderClass}`}>
                <th className="py-3 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("phase")}</th>
                <th className="py-3 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("action")}</th>
                <th className="py-3 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("result")}</th>
              </tr>
            </thead>
            <tbody>
              {section.steps.map((step, idx) => (
                <tr key={idx} className="border-b border-outline/40 last:border-0">
                  <td className={`py-4 pr-4 font-label-mono text-xs uppercase tracking-widest ${accentColorClass}`}>{step.phase}</td>
                  <td className="py-4 pr-4 font-body-md text-sm text-secondary leading-relaxed">{step.action}</td>
                  <td className="py-4 font-body-md text-sm text-primary leading-relaxed">{step.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-headline-sm text-headline-sm text-primary">⭐ {t("qualityAssessment")}</h3>
        <p className={`font-body-lg text-body-lg text-secondary leading-relaxed border-l-4 ${accentBorderClass} pl-6`}>
          {section.qualityAssessment}
        </p>
      </div>

      <div className={`border ${accentBorderClass} bg-surface-container-low p-6`}>
        <h3 className={`mb-4 font-label-mono text-sm uppercase tracking-widest ${accentColorClass}`}>✨ {t("benefitsAndImpact")}</h3>
        <ul className="flex flex-col gap-3">
          {section.benefits.map((benefit, i) => (
            <li key={i} className="flex gap-3 text-sm text-secondary font-body-md leading-relaxed">
              <span className={`mt-0.5 shrink-0 ${accentColorClass}`}>→</span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SystemDesignSection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "systemDesign" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-16">
      {section.problems && section.problems.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-headline-sm text-headline-sm text-primary">💡 {t("problemsSolved") || "Problems Solved"}</h3>
          <ul className="flex flex-col gap-3">
            {section.problems.map((problem, i) => (
              <li key={i} className="flex gap-3 text-sm text-secondary font-body-md leading-relaxed">
                <span className={`mt-0.5 shrink-0 ${accentColorClass}`}>→</span>
                {problem}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-6">
        <h3 className="font-headline-sm text-headline-sm text-primary">🧩 {t("coreModules") || "Core Modules"}</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {section.modules.map((m, i) => (
            <div key={i} className={`border ${accentBorderClass} bg-surface-container-low p-6 flex flex-col gap-3`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{m.icon}</span>
                <span className={`font-label-mono text-xs uppercase tracking-widest ${accentColorClass}`}>{m.title}</span>
              </div>
              <p className="font-body-md text-sm text-secondary">{m.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-headline-sm text-headline-sm text-primary">🔐 {t("rbac") || "Role-Based Access Control"}</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className={`border-b ${accentBorderClass}`}>
                <th className="py-2 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("role") || "Role"}</th>
                <th className="py-2 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("permissions") || "Permissions"}</th>
              </tr>
            </thead>
            <tbody>
              {section.roles.map((r, i) => (
                <tr key={i} className="border-b border-outline/40 last:border-0">
                  <td className={`py-3 pr-4 font-mono text-xs font-bold ${accentColorClass}`}>{r.role}</td>
                  <td className="py-3 font-body-md text-sm text-secondary">{r.permissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {section.architectureDiagram && (
        <div className="flex flex-col gap-4">
          <h3 className="font-headline-sm text-headline-sm text-primary">🏗️ {t("architecture") || "Architecture"}</h3>
          <div className={`border ${accentBorderClass} bg-[#12121a] p-6 flex justify-center overflow-x-auto`}>
             <pre className={`font-mono text-xs md:text-sm ${accentColorClass}`}>{section.architectureDiagram}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

function SystemFeatureSection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "systemFeature" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {section.stats.map((stat) => (
          <div key={stat.label} className={`border ${accentBorderClass} bg-surface-container-low p-5 flex flex-col gap-3`}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{stat.icon}</span>
              <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary">{stat.label}</span>
            </div>
            <span className={`font-headline-md text-xl font-bold ${accentColorClass}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="font-headline-sm text-headline-sm text-primary">{t("features") || "Features"}</h3>
        {section.steps.map((s, i) => (
          <div key={i} className={`border ${accentBorderClass} bg-surface-container-low`}>
            <div className={`flex items-center gap-4 border-b ${accentBorderClass} px-6 py-4`}>
              <span className={`font-label-mono text-xs uppercase tracking-widest ${accentColorClass}`}>
                {typeof s.step === 'number' ? `Step ${s.step}` : s.step}
              </span>
              <span className="font-headline-sm text-sm text-primary font-semibold">{s.title}</span>
            </div>
            <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
              <div className="border-b border-outline/40 p-5 md:border-b-0 md:border-r">
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("concept") || "Concept"}</p>
                <p className="font-body-md text-sm text-secondary leading-relaxed">{s.concept}</p>
              </div>
              <div className="border-b border-outline/40 p-5 md:border-b-0 md:border-r">
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("whatWasDone") || "What was done"}</p>
                <p className="font-body-md text-sm text-secondary leading-relaxed">{s.what}</p>
              </div>
              <div className="p-5">
                <p className="mb-1 font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("result") || "Result"}</p>
                <p className={`font-body-md text-sm leading-relaxed ${accentColorClass}`}>{s.result}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeploymentSection({ section, accentColorClass, accentBorderClass }: {
  section: Extract<ProjectDetailSection, { kind: "deploymentPipeline" }>;
  accentColorClass: string;
  accentBorderClass: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {section.stats.map((stat) => (
          <div key={stat.label} className={`border ${accentBorderClass} bg-surface-container-low p-4 flex flex-col gap-2`}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{stat.icon}</span>
              <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary break-words">{stat.label}</span>
            </div>
            <span className={`font-headline-md text-lg font-bold ${accentColorClass}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="font-headline-sm text-headline-sm text-primary">🚀 {t("deploymentPipeline") || "Deployment Pipeline"}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`border-b ${accentBorderClass}`}>
                <th className="py-3 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("phase") || "Phase"}</th>
                <th className="py-3 pr-4 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("action") || "Action"}</th>
                <th className="py-3 text-left font-label-mono text-[10px] uppercase tracking-widest text-secondary">{t("detail") || "Detail"}</th>
              </tr>
            </thead>
            <tbody>
              {section.phases.map((p, idx) => (
                <tr key={idx} className="border-b border-outline/40 last:border-0">
                  <td className={`py-4 pr-4 font-label-mono text-xs uppercase tracking-widest ${accentColorClass}`}>{p.phase}</td>
                  <td className="py-4 pr-4 font-body-md text-sm text-primary font-semibold">{p.action}</td>
                  <td className="py-4 font-body-md text-sm text-secondary leading-relaxed">{p.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`border ${accentBorderClass} bg-surface-container-low p-6`}>
        <h3 className={`mb-4 font-label-mono text-sm uppercase tracking-widest ${accentColorClass}`}>☸️ {t("k8sManifests") || "Kubernetes Manifests"}</h3>
        <ul className="flex flex-col gap-3">
          {section.k8sSummary.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-secondary font-body-md leading-relaxed">
              <span className={`mt-0.5 shrink-0 ${accentColorClass}`}>→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ProjectDetailClient({ slug }: { slug: string }) {
  const { locale, t } = useLanguage();
  
  const projects = locale === "th" ? PORTFOLIO_PROJECTS_TH : PORTFOLIO_PROJECTS_EN;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const accentColorClass =
    project.accent === "blue" ? "text-accent-blue" :
    project.accent === "orange" ? "text-orange-400" :
    "text-accent-purple";
  const accentBorderClass =
    project.accent === "blue" ? "border-accent-blue" :
    project.accent === "orange" ? "border-orange-500/40" :
    "border-accent-purple";

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
              <MaterialIcon name={project.icon} sizeClass="text-base" className={accentColorClass} />
              {project.meta}
            </p>
            <h1 className="font-headline-xl text-headline-xl uppercase text-primary md:text-[clamp(3rem,5vw,5rem)]">
              {project.title}
            </h1>
          </div>

          {project.imageSrc && (
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
          )}

          <ProjectTabs
            accentBorderClass={accentBorderClass}
            overviewContent={
              <>
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <h2 className="mb-6 font-headline-md text-headline-md text-primary">{t("overview")}</h2>
                    <p className="font-body-lg text-body-lg text-secondary leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {project.bullets && project.bullets.length > 0 && (
                      <>
                        <h3 className="mb-6 font-headline-sm text-headline-sm text-primary">{t("keyHighlights")}</h3>
                        <ul className={`list-disc space-y-4 pl-5 font-body-md text-body-md text-secondary marker:${accentColorClass}`}>
                          {project.bullets.map((bullet, idx) => (
                            <li key={idx} className="pl-2">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {project.overviewImage && (
                      <div className={`mt-12 w-full overflow-hidden border border-outline bg-surface p-2`}>
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
                      <h3 className="font-label-mono text-sm uppercase tracking-widest text-primary">
                        {t("projectDetails")}
                      </h3>
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
              project.detailSections?.some(s => s.kind === "dataset") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "dataset") {
                      return <DatasetSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
            edaContent={
              project.detailSections?.some(s => s.kind === "eda") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "eda") {
                      return <EDASection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
            cleaningContent={
              project.detailSections?.some(s => s.kind === "cleaning") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "cleaning") {
                      return <CleaningSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
            featureEngineeringContent={
              project.detailSections?.some(s => s.kind === "featureEngineering") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "featureEngineering") {
                      return <FeatureEngineeringSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
            statisticalTestingContent={
              project.detailSections?.some(s => s.kind === "statisticalTesting") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "statisticalTesting") {
                      return <StatisticalTestingSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
            predictiveModelingContent={
              project.detailSections?.some(s => s.kind === "predictiveModeling") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "predictiveModeling") {
                      return <PredictiveModelingSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
            systemDesignContent={
              project.detailSections?.some(s => s.kind === "systemDesign") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "systemDesign") {
                      return <SystemDesignSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
            authContent={
              project.detailSections?.some(s => s.kind === "systemFeature" && (s as any).id === "auth") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "systemFeature" && (section as any).id === "auth") {
                      return <SystemFeatureSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
            datasetContent={
              project.detailSections?.some(s => s.kind === "systemFeature" && (s as any).id === "dataset") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "systemFeature" && (section as any).id === "dataset") {
                      return <SystemFeatureSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
            schemaContent={
              project.detailSections?.some(s => s.kind === "systemFeature" && (s as any).id === "schema") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "systemFeature" && (section as any).id === "schema") {
                      return <SystemFeatureSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
            deploymentContent={
              project.detailSections?.some(s => s.kind === "deploymentPipeline") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "deploymentPipeline") {
                      return <DeploymentSection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
            summaryContent={
              project.detailSections?.some(s => s.kind === "summary") ? (
                <>
                  {project.detailSections.map((section, idx) => {
                    if (section.kind === "summary") {
                      return <SummarySection key={idx} section={section} accentColorClass={accentColorClass} accentBorderClass={accentBorderClass} />;
                    }
                    return null;
                  })}
                </>
              ) : undefined
            }
          />

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
