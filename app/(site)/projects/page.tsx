import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/common/project-card";
import { H1, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { sanityClient } from "@/lib/sanity/client";
import { allProjectsQuery } from "@/lib/sanity/queries";
import { generatePageMetadata } from "@/lib/seo/metadata";
import type { Project } from "@/lib/sanity/types";

export const metadata = generatePageMetadata({
  title: "Projects",
  description: "Browse all my projects and work including web applications, mobile apps, and more.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await sanityClient.fetch<Project[]>(allProjectsQuery);
  const validProjects = projects.filter((project) => project.slug?.current);

  return (
    <main className="py-16">
      <Container className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div>
            <H1>All Projects</H1>
            <Text className="mt-2 text-muted-foreground">
              A collection of projects I&apos;ve worked on.
            </Text>
          </div>
        </div>

        {/* Projects Grid */}
        {validProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {validProjects.map((project) => (
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
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <Text className="text-muted-foreground">
              No projects yet. Add some in Sanity Studio.
            </Text>
          </div>
        )}
      </Container>
    </main>
  );
}
