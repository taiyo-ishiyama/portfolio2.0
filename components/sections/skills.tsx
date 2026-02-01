"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/container";
import { SkillChip } from "@/components/common/skill-chip";
import { Button } from "@/components/ui/button";
import { H2, Small } from "@/components/ui/typography";

const categories = [
  {
    title: "Frontend",
    skills: ["Next.js", "TypeScript", "Tailwind", "Radix", "React Query", "Framer Motion"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Postgres", "Prisma", "REST", "GraphQL", "Redis"]
  },
  {
    title: "Cloud",
    skills: ["Vercel", "AWS", "Docker", "CI/CD", "S3"]
  },
  {
    title: "Tools",
    skills: ["Figma", "Linear", "Notion", "Playwright", "Vitest"]
  }
];

export function SkillsSection() {
  const [showMore, setShowMore] = useState(false);
  const sliced = useMemo(() => {
    if (showMore) return categories;
    return categories.map((category) => ({
      ...category,
      skills: category.skills.slice(0, 4)
    }));
  }, [showMore]);

  return (
    <section id="skills" className="py-16">
      <Container className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <H2>Technical Skills</H2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore ? "Show less" : "Show more"}
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {sliced.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <Small className="mb-3 uppercase tracking-[0.2em]">
                {category.title}
              </Small>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillChip key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
