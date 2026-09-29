// Server-only entry point for the localized content.
//
// The EN/TH modules are large. They must only be imported from server code (layout, pages,
// metadata routes) so that a visitor downloads one language, never both. Client components
// receive the already-selected content as props / via `useLanguage().content`, and import
// constants from `./constants`. ESLint enforces this (see eslint.config.mjs).
import type { PortfolioProject, ProjectSummary, SiteContent } from "../model/types";
import type { Locale } from "./translations";
import {
  FOOTER_SOCIAL_LINKS_EN,
  HERO_HEADLINE_NAME_LINES_EN,
  HERO_HEADLINE_ROLE_EN,
  HERO_SUBTITLE_EN,
  PORTFOLIO_PROJECTS_EN,
  SITE_BRAND_EN,
  SITE_NAV_EN,
  SKILL_ITEMS_EN,
} from "./home_en";
import {
  FOOTER_SOCIAL_LINKS_TH,
  HERO_HEADLINE_NAME_LINES_TH,
  HERO_HEADLINE_ROLE_TH,
  HERO_SUBTITLE_TH,
  PORTFOLIO_PROJECTS_TH,
  SITE_BRAND_TH,
  SITE_NAV_TH,
  SKILL_ITEMS_TH,
} from "./home_th";

export * from "./constants";

const SITE_CONTENT: Record<Locale, SiteContent> = {
  en: {
    brand: SITE_BRAND_EN,
    nav: SITE_NAV_EN,
    social: FOOTER_SOCIAL_LINKS_EN,
    skills: SKILL_ITEMS_EN,
    hero: {
      nameLines: HERO_HEADLINE_NAME_LINES_EN,
      role: HERO_HEADLINE_ROLE_EN,
      subtitle: HERO_SUBTITLE_EN,
    },
  },
  th: {
    brand: SITE_BRAND_TH,
    nav: SITE_NAV_TH,
    social: FOOTER_SOCIAL_LINKS_TH,
    skills: SKILL_ITEMS_TH,
    hero: {
      nameLines: HERO_HEADLINE_NAME_LINES_TH,
      role: HERO_HEADLINE_ROLE_TH,
      subtitle: HERO_SUBTITLE_TH,
    },
  },
};

const PROJECTS: Record<Locale, PortfolioProject[]> = {
  en: PORTFOLIO_PROJECTS_EN,
  th: PORTFOLIO_PROJECTS_TH,
};

export function getSiteContent(locale: Locale): SiteContent {
  return SITE_CONTENT[locale];
}

export function getProjects(locale: Locale): PortfolioProject[] {
  return PROJECTS[locale];
}

export function getProject(locale: Locale, slug: string): PortfolioProject | undefined {
  return PROJECTS[locale].find((p) => p.slug === slug);
}

/** Card-sized view of a project (no detail sections) — what the home page sends to the client. */
export function toProjectSummary(project: PortfolioProject): ProjectSummary {
  return {
    slug: project.slug,
    category: project.category,
    meta: project.meta,
    title: project.title,
    description: project.description,
    imageSrc: project.imageSrc,
    imageAlt: project.imageAlt,
    imagePosition: project.imagePosition,
    accent: project.accent,
    icon: project.icon,
  };
}

// Slugs are identical in every language, so EN is the canonical source for routing/sitemap.
export const PROJECT_SLUGS: string[] = PORTFOLIO_PROJECTS_EN.map((p) => p.slug);
