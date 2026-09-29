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
  SiteContent,
  ProjectSummary,
} from "./model/types";
export {
  CONTACT_EMAIL,
  HERO_PORTRAIT_SRC,
  NAV_SECTION_ORDER,
  SITE_BRAND,
} from "./content/constants";
export { HomePageContent } from "./ui/home-page-content";
export { HeroSection } from "./ui/hero-section";
export { ProjectCard } from "./ui/project-card";
export { SelectedWorksSection } from "./ui/selected-works-section";
export { SiteFooter } from "./ui/site-footer";
export { SiteHeader } from "./ui/site-header";
export { SkillsSection } from "./ui/skills-section";
