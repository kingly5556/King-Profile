import {
  HeroSection,
  HomePageContent,
  SelectedWorksSection,
  SiteFooter,
  SiteHeader,
  SkillsSection,
} from "@/app/features/home";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HomePageContent>
        <HeroSection />
        <SkillsSection />
        <SelectedWorksSection />
      </HomePageContent>
      <SiteFooter />
    </>
  );
}
