"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiReactquery,
  SiNodedotjs,
  SiSharp,
  SiDotnet,
  SiPython,
  SiCplusplus,
  SiPrisma,
  SiMysql,
  SiMongodb,
  SiVercel,
  SiAmazonwebservices,
  SiDocker,
  SiGithubactions,
  SiFigma,
  SiLinear,
  SiPostman,
  SiJest,
  SiApachejmeter,
} from "react-icons/si";
import { TbApi, TbTestPipe, TbNetwork } from "react-icons/tb";
import type { IconType } from "react-icons";
import { Container } from "@/components/layout/container";
import { H2, Small } from "@/components/ui/typography";

type Skill = {
  name: string;
  icon: IconType;
};

type Category = {
  id: string;
  title: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React.js", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "React Query", icon: SiReactquery },
      { name: "React Native", icon: SiReact },
    ]
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "C#", icon: SiSharp },
      { name: ".NET", icon: SiDotnet },
      { name: "Python", icon: SiPython },
      { name: "C++", icon: SiCplusplus },
      { name: "REST", icon: TbApi },
      { name: "gRPC", icon: TbNetwork },
      { name: "Prisma", icon: SiPrisma },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
    ]
  },
  {
    id: "cloud",
    title: "Cloud / Deployment",
    skills: [
      { name: "Vercel", icon: SiVercel },
      { name: "AWS", icon: SiAmazonwebservices },
      { name: "Docker", icon: SiDocker },
      { name: "CI/CD", icon: SiGithubactions },
    ]
  },
  {
    id: "tools",
    title: "Tools / Others",
    skills: [
      { name: "Figma", icon: SiFigma },
      { name: "Linear", icon: SiLinear },
      { name: "Playwright", icon: TbTestPipe },
      { name: "Postman", icon: SiPostman },
      { name: "Jest", icon: SiJest },
      { name: "JMeter", icon: SiApachejmeter },
    ]
  }
];

const INITIAL_SHOW_COUNT = 4;

export function SkillsSection() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  return (
    <section id="skills" className="py-16">
      <Container className="space-y-8">
        <H2>Technical Skills</H2>
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category) => {
            const isExpanded = expandedCategories.has(category.id);
            const hasMore = category.skills.length > INITIAL_SHOW_COUNT;
            const displayedSkills = isExpanded
              ? category.skills
              : category.skills.slice(0, INITIAL_SHOW_COUNT);
            const hiddenCount = category.skills.length - INITIAL_SHOW_COUNT;

            return (
              <div
                key={category.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <Small className="mb-3 uppercase tracking-[0.2em]">
                  {category.title}
                </Small>
                <div className="flex flex-wrap gap-2">
                  {displayedSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-medium"
                    >
                      <skill.icon className="h-4 w-4" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
                {hasMore && (
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="mt-3 flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-3.5 w-3.5" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3.5 w-3.5" />
                        Show {hiddenCount} more
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
