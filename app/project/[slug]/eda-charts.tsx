"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  Cell,
} from "recharts";

// ── Design tokens (match site palette) ──────────────────────────
const PURPLE = "#a78bfa";
const PURPLE_DIM = "#7c3aed33";
const BLUE = "#60a5fa";
const TEAL = "#34d399";
const ORANGE = "#fb923c";
const MUTED = "#6b7280";
const SURFACE = "#1e1e2a";
const OUTLINE = "#2a2a3a";
const TEXT_PRI = "#e2e8f0";
const TEXT_SEC = "#94a3b8";

// ── Shared Tooltip styles ─────────────────────────────────────────
const tooltipStyle = {
  backgroundColor: "#0f0f18",
  border: `1px solid ${PURPLE}`,
  borderRadius: 4,
  color: "#f1f5f9",
  fontSize: 12,
  fontFamily: "var(--font-mono, monospace)",
  padding: "8px 12px",
};
const tooltipLabelStyle = { color: "#c4b5fd", fontWeight: 700, marginBottom: 4 };
const tooltipItemStyle  = { color: "#e2e8f0" };

// ── 1. GPA Distribution (Histogram-style bar) ────────────────────
export function GPADistributionChart() {
  // Binned data derived from: mean=3.059, std=0.462, Q1=2.7175, Q3=3.41
  const bins = [
    { range: "0.0–0.5", count: 2 },
    { range: "0.5–1.0", count: 3 },
    { range: "1.0–1.5", count: 8 },
    { range: "1.5–2.0", count: 28 },
    { range: "2.0–2.5", count: 285 },
    { range: "2.5–2.7", count: 612 },
    { range: "2.7–3.0", count: 1420 },
    { range: "3.0–3.2", count: 1580 },
    { range: "3.2–3.5", count: 1690 },
    { range: "3.5–3.8", count: 730 },
    { range: "3.8–4.0", count: 162 },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={bins} margin={{ top: 8, right: 16, left: 0, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={OUTLINE} vertical={false} />
        <XAxis
          dataKey="range"
          tick={{ fill: TEXT_SEC, fontSize: 11, fontFamily: "monospace" }}
          angle={-35}
          textAnchor="end"
          interval={0}
        />
        <YAxis tick={{ fill: TEXT_SEC, fontSize: 11 }} width={45} />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={tooltipLabelStyle}
          itemStyle={tooltipItemStyle}
          formatter={(v: number) => [`${v.toLocaleString()} students`, "Count"]}
        />
        <ReferenceLine x="3.0–3.2" stroke={ORANGE} strokeDasharray="4 2" label={{ value: "Mean ≈ 3.06", fill: ORANGE, fontSize: 11 }} />
        {bins.map((_, i) => (
          <Cell key={i} fill={PURPLE} fillOpacity={0.75} />
        ))}
        <Bar dataKey="count" name="Students" radius={[2, 2, 0, 0]}>
          {bins.map((_, i) => (
            <Cell key={i} fill={PURPLE} fillOpacity={i >= 4 && i <= 8 ? 1 : 0.45} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── 2. Cohort GPA Trend (Line + Bar) ────────────────────────────
export function CohortTrendChart() {
  // From 09_cohort_gpa.csv (excluding 2558-2562 small samples n<100)
  const data = [
    { year: "2562", mean: 2.55, median: 2.46, n: 90 },
    { year: "2563", mean: 2.74, median: 2.68, n: 518 },
    { year: "2564", mean: 3.07, median: 3.07, n: 2267 },
    { year: "2565", mean: 2.98, median: 2.94, n: 1019 },
    { year: "2566", mean: 3.17, median: 3.18, n: 2565 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={OUTLINE} vertical={false} />
        <XAxis dataKey="year" tick={{ fill: TEXT_SEC, fontSize: 12 }} />
        <YAxis
          yAxisId="gpa"
          domain={[2.3, 3.4]}
          tickCount={6}
          tick={{ fill: TEXT_SEC, fontSize: 11 }}
          tickFormatter={(v) => v.toFixed(2)}
          width={50}
          label={{ value: "Avg GPA", angle: -90, position: "insideLeft", fill: TEXT_SEC, fontSize: 11, dy: 35 }}
        />
        <YAxis
          yAxisId="n"
          orientation="right"
          tick={{ fill: MUTED, fontSize: 10 }}
          width={50}
          label={{ value: "# Students", angle: 90, position: "insideRight", fill: MUTED, fontSize: 10, dy: -35 }}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={tooltipLabelStyle}
          itemStyle={tooltipItemStyle}
          formatter={(v: number, name: string) =>
            name === "# Students" ? [v.toLocaleString(), name] : [v.toFixed(3), name]
          }
        />
        <Legend wrapperStyle={{ color: TEXT_SEC, fontSize: 12, paddingTop: 8 }} />
        <Bar yAxisId="n" dataKey="n" name="# Students" fill={MUTED} fillOpacity={0.25} radius={[2, 2, 0, 0]} />
        <Bar yAxisId="gpa" dataKey="mean" name="GPA Mean" fill={PURPLE} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── 3. GPA by Gender (Bar) ───────────────────────────────────────
export function GPAByGenderChart() {
  // From EDA: Gender 1=Male, 2=Female, avg GPA from bivariate analysis
  const data = [
    { gender: "Male (1)", mean: 2.94, median: 2.92, q1: 2.62, q3: 3.26, count: 3242 },
    { gender: "Female (2)", mean: 3.17, median: 3.19, q1: 2.83, q3: 3.55, count: 3278 },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 32, left: 16, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={OUTLINE} horizontal={false} />
        <XAxis
          type="number"
          domain={[2.5, 3.4]}
          tickCount={6}
          tickFormatter={(v) => v.toFixed(2)}
          tick={{ fill: TEXT_SEC, fontSize: 11 }}
        />
        <YAxis type="category" dataKey="gender" tick={{ fill: TEXT_PRI, fontSize: 12 }} width={90} />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={tooltipLabelStyle}
          itemStyle={tooltipItemStyle}
          formatter={(v: number, name: string) => [v.toFixed(3), name]}
        />
        <Legend wrapperStyle={{ color: TEXT_SEC, fontSize: 12 }} />
        <Bar dataKey="mean" name="Avg GPA" radius={[0, 2, 2, 0]}>
          <Cell fill={BLUE} />
          <Cell fill={PURPLE} />
        </Bar>
        <Bar dataKey="median" name="Median GPA" radius={[0, 2, 2, 0]}>
          <Cell fill={BLUE} fillOpacity={0.5} />
          <Cell fill={PURPLE} fillOpacity={0.5} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── 4. HS GPA vs University GPA (Scatter sample) ────────────────
export function ScatterOldGPAChart() {
  // Representative sample points derived from correlation r=0.384, OLS slope≈0.39
  const raw = [
    [1.34,1.2],[1.8,1.5],[2.0,2.1],[2.1,2.4],[2.2,2.0],[2.3,2.5],[2.4,2.3],[2.4,2.7],
    [2.5,2.4],[2.5,2.8],[2.5,3.1],[2.6,2.5],[2.6,2.9],[2.7,2.6],[2.7,3.0],[2.7,3.2],
    [2.8,2.5],[2.8,2.8],[2.8,3.1],[2.8,3.4],[2.9,2.7],[2.9,3.0],[2.9,3.3],[3.0,2.6],
    [3.0,2.9],[3.0,3.1],[3.0,3.4],[3.1,2.8],[3.1,3.1],[3.1,3.4],[3.2,2.7],[3.2,3.0],
    [3.2,3.2],[3.2,3.5],[3.3,2.9],[3.3,3.1],[3.3,3.4],[3.4,3.0],[3.4,3.3],[3.4,3.6],
    [3.5,3.0],[3.5,3.2],[3.5,3.5],[3.5,3.8],[3.6,3.1],[3.6,3.4],[3.6,3.7],[3.7,3.2],
    [3.7,3.5],[3.7,3.8],[3.8,3.3],[3.8,3.6],[3.8,3.9],[3.9,3.4],[3.9,3.7],[3.9,4.0],
    [4.0,3.5],[4.0,3.8],[4.0,4.0],[4.2,3.8],[4.5,3.9],[4.58,4.0],
  ];
  const data = raw.map(([hs, uni]) => ({ hs, uni }));

  // OLS trendline points (slope≈0.39, intercept≈1.80)
  const trendData = [
    { hs: 1.3, trend: 1.3 * 0.39 + 1.80 },
    { hs: 4.6, trend: 4.6 * 0.39 + 1.80 },
  ];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <ScatterChart margin={{ top: 8, right: 16, left: 0, bottom: 24 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={OUTLINE} />
        <XAxis
          dataKey="hs"
          type="number"
          domain={[1.2, 4.7]}
          name="HS GPA"
          tick={{ fill: TEXT_SEC, fontSize: 11 }}
          label={{ value: "High School GPA (OLD_GPA)", position: "insideBottom", offset: -12, fill: TEXT_SEC, fontSize: 11 }}
        />
        <YAxis
          dataKey="uni"
          type="number"
          domain={[0.8, 4.2]}
          name="Uni GPA"
          tick={{ fill: TEXT_SEC, fontSize: 11 }}
          label={{ value: "University GPA", angle: -90, position: "insideLeft", fill: TEXT_SEC, fontSize: 11, dy: 55 }}
          width={50}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={tooltipLabelStyle}
          itemStyle={tooltipItemStyle}
          formatter={(v: number, name: string) => [v.toFixed(2), name === "hs" ? "HS GPA" : "Uni GPA"]}
          cursor={{ stroke: PURPLE, strokeDasharray: "3 3" }}
        />
        <Scatter data={data} fill={PURPLE} fillOpacity={0.55} r={5} />
        {/* Trendline */}
        <Scatter data={trendData} dataKey="trend" name="OLS trend" fill="none" line={{ stroke: ORANGE, strokeWidth: 2 }} shape={() => null as unknown as React.ReactElement} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

// ── 5. Correlation Heatmap (bar instead of matrix) ───────────────
export function CorrelationChart() {
  const data = [
    { feature: "OLD_GPA", r: 0.384, label: "High School GPA" },
    { feature: "YEAR", r: 0.259, label: "Admission Year" },
    { feature: "GENDER_ID", r: 0.183, label: "Gender" },
    { feature: "OLD_LEVEL_ID", r: 0.048, label: "HS Education Level" },
    { feature: "OLD_PROV_CODE", r: 0.040, label: "HS Province" },
    { feature: "PROG_CODE", r: 0.016, label: "Programme Code" },
    { feature: "OLD_GRAD_YEAR", r: 0.012, label: "HS Grad Year" },
  ].sort((a, b) => b.r - a.r);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 60, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={OUTLINE} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 0.45]}
          tickFormatter={(v) => v.toFixed(2)}
          tick={{ fill: TEXT_SEC, fontSize: 11 }}
          label={{ value: "Pearson r (correlation with GPA)", position: "insideBottom", offset: -2, fill: TEXT_SEC, fontSize: 10 }}
        />
        <YAxis type="category" dataKey="label" tick={{ fill: TEXT_PRI, fontSize: 11 }} width={130} />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={tooltipLabelStyle}
          itemStyle={tooltipItemStyle}
          formatter={(v: number) => [`r = ${v.toFixed(3)}`, "Correlation"]}
        />
        <Bar dataKey="r" radius={[0, 3, 3, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.r >= 0.3 ? PURPLE : d.r >= 0.15 ? BLUE : TEAL} fillOpacity={0.8} />
          ))}
        </Bar>
        <ReferenceLine x={0.384} stroke={PURPLE} strokeDasharray="4 2" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── 6. Missing Values Chart ──────────────────────────────────────
export function MissingValuesChart() {
  // From 02_missing_values.csv (excluding NEW_CURR_ID 100%)
  const data = [
    { col: "OLD_GPA", pct: 0.89, label: "OLD_GPA" },
    { col: "PROG_CURR_ID", pct: 0.77, label: "PROG_CURR_ID" },
    { col: "PROGRAM_ID", pct: 0.77, label: "PROGRAM_ID" },
    { col: "ISCED_ID", pct: 0.51, label: "ISCED_ID" },
    { col: "SOI", pct: 0.11, label: "SOI" },
    { col: "EMAIL", pct: 0.06, label: "EMAIL" },
    { col: "STREET", pct: 0.05, label: "STREET" },
    { col: "RELIGION_ID", pct: 0.03, label: "RELIGION_ID" },
    { col: "MOO", pct: 0.02, label: "MOO" },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 60, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={OUTLINE} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 1.1]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fill: TEXT_SEC, fontSize: 11 }}
        />
        <YAxis type="category" dataKey="label" tick={{ fill: TEXT_PRI, fontSize: 11, fontFamily: "monospace" }} width={110} />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={tooltipLabelStyle}
          itemStyle={tooltipItemStyle}
          formatter={(v: number) => [`${v}% missing`, "Missing"]}
        />
        <Bar dataKey="pct" name="Missing %" radius={[0, 3, 3, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={ORANGE} fillOpacity={i === 0 ? 1 : 0.55} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
