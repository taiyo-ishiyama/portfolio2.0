import { HeroSection } from "@/components/sections/hero";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { BackgroundTabsSection } from "@/components/sections/background-tabs";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";
import { sanityClient } from "@/lib/sanity/client";
import { profileQuery, experienceQuery, educationQuery } from "@/lib/sanity/queries";
import type { Profile, Experience, Education } from "@/lib/sanity/types";

export default async function HomePage() {
  const [profile, experiences, educations] = await Promise.all([
    sanityClient.fetch<Profile | null>(profileQuery),
    sanityClient.fetch<Experience[]>(experienceQuery),
    sanityClient.fetch<Education[]>(educationQuery),
  ]);

  return (
    <div>
      <HeroSection profile={profile} />
      <FeaturedProjectsSection />
      <BackgroundTabsSection experiences={experiences} educations={educations} />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
