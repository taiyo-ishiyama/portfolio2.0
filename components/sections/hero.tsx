import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { H1, Lead } from "@/components/ui/typography";
import { SocialLinks } from "@/components/common/social-links";
import { urlFor } from "@/lib/sanity/image";
import type { Profile } from "@/lib/sanity/types";

type HeroSectionProps = {
  profile: Profile | null;
};

export function HeroSection({ profile }: HeroSectionProps) {
  const name = profile?.name || "Taiyo Ishiyama";
  const role = profile?.role || "Full Stack Software Engineer";
  const summary = profile?.summary || "I build accessible, high-impact products and streamline operations with modern web engineering.";
  const photoUrl = profile?.photo
    ? urlFor(profile.photo).width(400).height(400).url()
    : "/images/placeholder-avatar.svg";

  return (
    <section id="hero" className="py-16">
      <Container className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <H1>
            Hi, I&apos;m {name}
            <span className="block text-primary">{role}</span>
          </H1>
          <Lead>{summary}</Lead>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#projects">View Projects</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="/resume/Resume.pdf">Download Resume</a>
            </Button>
          </div>
          <SocialLinks />
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative h-48 w-48 overflow-hidden rounded-full border border-border bg-muted shadow-soft sm:h-56 sm:w-56">
            <Image
              src={photoUrl}
              alt={`${name} profile photo`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 224px"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
