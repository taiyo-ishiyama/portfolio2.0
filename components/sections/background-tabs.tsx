"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { H2, H3, Small, Text } from "@/components/ui/typography";

type TimelineEntry = {
  period: string;
  title: string;
  role: string;
  details?: string;
  logo: string;
};

const work: TimelineEntry[] = [
  {
    period: "Aug 2024 - Present",
    title: "Northbridge Labs",
    role: "Software Engineer",
    details: "Building internal platforms for analytics and workflow automation.",
    logo: "NL"
  },
  {
    period: "May 2022 - Jul 2024",
    title: "Aurora Studio",
    role: "Frontend Developer",
    details: "Shipped responsive UI systems and reusable component libraries.",
    logo: "AS"
  },
  {
    period: "Sep 2021 - Apr 2022",
    title: "Pinecone Works",
    role: "Product Engineer (Intern)",
    details: "Prototyped web tools and handled QA for early-stage releases.",
    logo: "PW"
  },
  {
    period: "Jan 2021 - Aug 2021",
    title: "Stonefield Co.",
    role: "Software Developer (Intern)",
    details: "Maintained internal dashboards and assisted on customer sites.",
    logo: "SC"
  }
];

const education: TimelineEntry[] = [
  {
    period: "Sep 2020 - Jun 2024",
    title: "Riverside Institute of Technology",
    role: "B.Sc. in Software Engineering",
    logo: "RI"
  },
  {
    period: "Feb 2023 - Jun 2023",
    title: "Summit Exchange Program",
    role: "Study Abroad - Human-Centered Computing",
    logo: "SE"
  },
  {
    period: "Sep 2016 - Jun 2020",
    title: "Westbrook Technical School",
    role: "Technical Diploma in Systems & Networking",
    logo: "WT"
  }
];

export function BackgroundTabsSection() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");
  const entries = activeTab === "work" ? work : education;

  return (
    <section id="background" className="py-16">
      <Container className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <H2>Experience</H2>
          <div className="flex w-full max-w-sm rounded-full border border-border bg-card p-1">
            {(["work", "education"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-background text-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "work" ? "Work" : "Studies"}
              </button>
            ))}
          </div>
        </div>
        <div className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="absolute left-8 top-6 bottom-6 w-px bg-border" />
          <div className="space-y-8">
            {entries.map((entry) => (
              <div key={`${entry.title}-${entry.period}`} className="relative pl-16">
                <div className="absolute left-2 top-1 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-foreground">
                  {entry.logo}
                </div>
                <Small className="text-muted-foreground">{entry.period}</Small>
                <H3 className="mt-1 text-lg">{entry.title}</H3>
                <Text className="text-sm text-muted-foreground">{entry.role}</Text>
                {entry.details ? (
                  <Text className="mt-2 text-sm text-muted-foreground">
                    {entry.details}
                  </Text>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
