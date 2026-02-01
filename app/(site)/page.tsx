import { HeroSection } from "@/components/sections/hero";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { BackgroundTabsSection } from "@/components/sections/background-tabs";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedProjectsSection />
      <BackgroundTabsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
