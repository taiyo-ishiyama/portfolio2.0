import { HeroSection } from "@/components/sections/hero";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { BackgroundTabsSection } from "@/components/sections/background-tabs";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";
import { sanityClient } from "@/lib/sanity/client";
import { profileQuery, experienceQuery, educationQuery, featuredProjectsQuery } from "@/lib/sanity/queries";
import type { Profile, Experience, Education, Project } from "@/lib/sanity/types";

export default async function HomePage() {
  const [profile, experiences, educations, featuredProjects] = await Promise.all([
    sanityClient.fetch<Profile | null>(profileQuery),
    sanityClient.fetch<Experience[]>(experienceQuery),
    sanityClient.fetch<Education[]>(educationQuery),
    sanityClient.fetch<Project[]>(featuredProjectsQuery),
  ]);

  return (
    <div>
      <HeroSection profile={profile} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <BackgroundTabsSection experiences={experiences} educations={educations} />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
