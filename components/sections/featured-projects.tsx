import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/common/project-card";
import { H2, Small } from "@/components/ui/typography";

const projects = [
  {
    title: "E-commerce Analytics Dashboard",
    description: "Track KPIs, funnel performance, and customer cohorts in one view.",
    tags: ["Next.js", "Postgres", "TypeScript", "Recharts"],
    href: "/projects/analytics-dashboard"
  },
  {
    title: "Real-time Collab Suite",
    description: "Presence-enabled docs with comments, mentions, and smart search.",
    tags: ["Next.js", "Supabase", "Redis", "Socket.io"],
    href: "/projects/collab-suite"
  }
];

export function FeaturedProjectsSection() {
  return (
    <section id="projects" className="py-16">
      <Container className="space-y-8">
        <div className="flex items-center justify-between">
          <H2>Featured Projects</H2>
          <Link href="/projects" className="text-sm font-medium text-primary">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
        <Small className="text-muted-foreground">
          All projects are placeholders until Sanity is wired up.
        </Small>
      </Container>
    </section>
  );
}
