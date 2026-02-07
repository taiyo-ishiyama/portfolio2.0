"use client";

import { useState } from "react";
import { Building2, GraduationCap, Briefcase } from "lucide-react";
import { Container } from "@/components/layout/container";
import { H2, H3, Small, Text } from "@/components/ui/typography";

type TimelineEntry = {
  period: string;
  title: string;
  role: string;
  details?: string;
  iconColor: string;
  iconBg: string;
};

const work: TimelineEntry[] = [
  {
    period: "2021 - PRESENT",
    title: "TechCorp Inc.",
    role: "Senior Frontend Engineer",
    details:
      "Led the migration of legacy monolith to micro-frontends. Improved site performance by 40% and mentored junior developers. Spearheaded the adoption of new testing frameworks and CI/CD pipelines.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    period: "2019 - 2021",
    title: "Creative Agency",
    role: "Software Developer",
    details:
      "Developed custom CMS solutions for 20+ clients. Integrated payment gateways and complex animations using GSAP and Three.js. Collaborated closely with designers to ensure pixel-perfect implementation.",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    period: "2018 - 2019",
    title: "StartUp Lab",
    role: "Junior Developer (Intern)",
    details:
      "Assisted in building MVP for fintech products. Implemented responsive UI components and participated in daily stand-ups.",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },
];

const education: TimelineEntry[] = [
  {
    period: "2015 - 2019",
    title: "University of Technology",
    role: "B.Sc. in Computer Science",
    details: "Graduated with honors. Focus on software engineering and distributed systems.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    period: "2019 - 2020",
    title: "Online Academy",
    role: "Full Stack Development Certificate",
    details: "Completed intensive program covering React, Node.js, and cloud technologies.",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
];

export function BackgroundTabsSection() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");
  const entries = activeTab === "work" ? work : education;

  return (
    <section id="background" className="py-16">
      <Container className="space-y-8">
        <H2>Background</H2>

        {/* Tabs */}
        <div className="rounded-xl border border-border bg-card shadow-soft">
          <div className="flex border-b border-border">
            {(["work", "education"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative flex-1 px-6 py-4 text-sm font-medium transition ${
                  activeTab === tab
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "work" ? "Work" : "Education"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="p-6">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

              <div className="space-y-8">
                {entries.map((entry, index) => (
                  <div
                    key={`${entry.title}-${entry.period}`}
                    className="relative pl-10"
                  >
                    {/* Icon */}
                    <div
                      className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded ${entry.iconBg}`}
                    >
                      {activeTab === "work" ? (
                        index === 0 ? (
                          <Building2 className={`h-3.5 w-3.5 ${entry.iconColor}`} />
                        ) : (
                          <Briefcase className={`h-3.5 w-3.5 ${entry.iconColor}`} />
                        )
                      ) : (
                        <GraduationCap className={`h-3.5 w-3.5 ${entry.iconColor}`} />
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <Small className="text-muted-foreground">{entry.period}</Small>
                      <H3 className="mt-1 text-base font-semibold">{entry.title}</H3>
                      <Text className="text-sm text-muted-foreground">{entry.role}</Text>
                      {entry.details && (
                        <Text className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {entry.details}
                        </Text>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
