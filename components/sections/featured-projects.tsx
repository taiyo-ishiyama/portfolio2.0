import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/common/project-card";
import { H2, Text } from "@/components/ui/typography";
import type { Project } from "@/lib/sanity/types";

type FeaturedProjectsSectionProps = {
  projects: Project[];
};

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section id="projects" className="py-16">
      <Container className="space-y-8">
        <div className="flex items-center justify-between">
          <H2>Featured Projects</H2>
          <Link href="/projects" className="text-sm font-medium text-primary">
            View all
          </Link>
        </div>
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {projects
              .filter((project) => project.slug?.current)
              .map((project) => (
                <ProjectCard
                  key={project._id}
                  title={project.title}
                  description={project.shortDescription || ""}
                  tags={project.techStacks || []}
                  href={`/projects/${project.slug.current}`}
                  thumbnail={project.thumbnail}
                />
              ))}
          </div>
        ) : (
          <Text className="text-muted-foreground">
            No featured projects yet. Mark projects as &quot;Featured&quot; in Sanity Studio.
          </Text>
        )}
      </Container>
    </section>
  );
}
