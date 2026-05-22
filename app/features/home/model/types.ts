export type ProjectAccent = "blue" | "purple";

export type DatasetFeatureRow = {
  column: string;
  type: string;
  example: string;
  description: string;
};

export type DatasetFeatureGroup = {
  icon: string;
  groupLabel: string;
  columns: string;
  purpose: string;
  rows?: DatasetFeatureRow[];
  note?: string;
};

export type EDAStatCard = {
  label: string;
  value: string;
  sub?: string;
  icon: string;
};

export type EDAChart = {
  title: string;
  description: string;
  imagePath: string;
  insight: string;
};

export type CleaningStep = {
  step: number;
  title: string;
  why: string;
  what: string;
  result: string;
  badge?: string; // e.g. "✅", "⚠️", "🗑️"
};

export type CleaningStat = {
  label: string;
  before: string;
  after: string;
  icon: string;
};

export type FeatureEngineeringStep = {
  task: number;
  title: string;
  concept: string;
  what: string;
  result: string;
  badge?: string;
};

export type FeatureEngineeringStat = {
  label: string;
  value: string;
  icon: string;
};

export type ProjectDetailSection =
  | { kind: "dataset"; title: string; source: string; groups: DatasetFeatureGroup[] }
  | { kind: "pdpa"; title: string; piiColumns: string[]; principles: { label: string; detail: string }[] }
  | { kind: "stack"; title: string; items: { label: string; icon: string }[] }
  | { kind: "eda"; title: string; stats: EDAStatCard[]; charts: EDAChart[] }
  | { kind: "cleaning"; title: string; stats: CleaningStat[]; steps: CleaningStep[]; issues: { title: string; detail: string }[] }
  | { kind: "featureEngineering"; title: string; stats: FeatureEngineeringStat[]; steps: FeatureEngineeringStep[] };

export type PortfolioProject = {
  slug: string;
  category: "Website project" | "Data Project" | string;
  index: number;
  total: number;
  meta: string;
  title: string;
  description: string;
  /** Optional bullet highlights (e.g. resume achievements) */
  bullets?: readonly string[];
  /** Optional rich detail sections rendered on the project page */
  detailSections?: ProjectDetailSection[];
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "object-left-top" | "object-center";
  accent: ProjectAccent;
  /** Material Symbols Outlined ligature name */
  icon: string;
};

export type SiteNavLink = {
  label: string;
  href: string;
  icon: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export type SkillItem = {
  label: string;
  icon: string;
};
