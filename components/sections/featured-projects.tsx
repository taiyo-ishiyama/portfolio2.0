"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/common/project-card";
import { H2, Text } from "@/components/ui/typography";
import type { Project } from "@/lib/sanity/types";

type FeaturedProjectsSectionProps = {
  projects: Project[];
};

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const validProjects = projects.filter((project) => project.slug?.current);

  return (
    <section id="projects" className="py-16">
      <Container className="space-y-8">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <H2>Featured Projects</H2>
          <Link href="/projects" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </motion.div>
        {validProjects.length > 0 ? (
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {validProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.shortDescription || ""}
                  tags={project.techStacks || []}
                  href={`/projects/${project.slug.current}`}
                  thumbnail={project.thumbnail}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Text className="text-muted-foreground">
            No featured projects yet. Mark projects as &quot;Featured&quot; in Sanity Studio.
          </Text>
        )}
      </Container>
    </section>
  );
}
