import {
  HeroSection,
  HomePageContent,
  SelectedWorksSection,
  SiteFooter,
  SiteHeader,
  SkillsSection,
} from "@/app/features/home";
import { getProjects, toProjectSummary } from "@/app/features/home/content/home";
import { getRequestLocale } from "@/app/locale";

export default async function Home() {
  const locale = await getRequestLocale();
  const projects = getProjects(locale).map(toProjectSummary);

  return (
    <>
      <SiteHeader />
      <HomePageContent>
        <HeroSection />
        <SkillsSection />
        <SelectedWorksSection projects={projects} />
      </HomePageContent>
      <SiteFooter />
    </>
  );
}
