import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { H1, Lead, Text } from "@/components/ui/typography";
import { SocialLinks } from "@/components/common/social-links";

export function HeroSection() {
  return (
    <section id="hero" className="py-16">
      <Container className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Open to opportunities
          </div>
          <H1>
            Hi, I&apos;m Stitch
            <span className="block text-primary">Full Stack Software Engineer</span>
          </H1>
          <Lead>
            I build accessible, high-impact products and streamline operations with
            modern web engineering.
          </Lead>
          <Text className="text-muted-foreground">
            Specializing in Next.js, Node, and automation workflows that help teams
            ship faster.
          </Text>
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
              src="/images/placeholder-avatar.svg"
              alt="Profile"
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
