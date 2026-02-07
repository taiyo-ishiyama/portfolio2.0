import { HeroSection } from "@/components/sections/hero";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { BackgroundTabsSection } from "@/components/sections/background-tabs";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";
import { sanityClient } from "@/lib/sanity/client";
import { profileQuery } from "@/lib/sanity/queries";
import type { Profile } from "@/lib/sanity/types";

export default async function HomePage() {
  const profile = await sanityClient.fetch<Profile | null>(profileQuery);

  return (
    <div>
      <HeroSection profile={profile} />
      <FeaturedProjectsSection />
      <BackgroundTabsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
