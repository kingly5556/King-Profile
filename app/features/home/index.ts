/**
 * Public surface for the marketing home feature (colocated under `app/features`).
 * Routes should import from here, not deep paths into `ui/` or `content/`.
 */
export type {
  PortfolioProject,
  ProjectAccent,
  SiteNavLink,
  SkillItem,
  SocialLink,
} from "./model/types";
export {
  CONTACT_EMAIL,
  FOOTER_SOCIAL_LINKS,
  HERO_HEADLINE_NAME_LINES,
  HERO_HEADLINE_ROLE,
  HERO_PORTRAIT_SRC,
  HERO_SUBTITLE,
  NAV_SECTION_ORDER,
  PORTFOLIO_PROJECTS,
  SITE_BRAND,
  SITE_NAV,
  SKILL_ITEMS,
} from "./content/home";
export { HomePageContent } from "./ui/home-page-content";
export { HeroSection } from "./ui/hero-section";
export { ProjectCard } from "./ui/project-card";
export { SelectedWorksSection } from "./ui/selected-works-section";
export { SiteFooter } from "./ui/site-footer";
export { SiteHeader } from "./ui/site-header";
export { SkillsSection } from "./ui/skills-section";
