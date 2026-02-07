"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, GraduationCap, Briefcase } from "lucide-react";
import { Container } from "@/components/layout/container";
import { H2, H3, Small, Text } from "@/components/ui/typography";
import { urlFor } from "@/lib/sanity/image";
import type { Experience, Education } from "@/lib/sanity/types";

type BackgroundTabsSectionProps = {
  experiences: Experience[];
  educations: Education[];
};

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatPeriod(startDate?: string, endDate?: string, isCurrent?: boolean): string {
  const start = formatDate(startDate);
  const end = isCurrent ? "Present" : formatDate(endDate);
  if (!start && !end) return "";
  if (!start) return end;
  if (!end) return start;
  return `${start} - ${end}`;
}

const iconColors = [
  { color: "text-blue-600", bg: "bg-blue-100" },
  { color: "text-green-600", bg: "bg-green-100" },
  { color: "text-orange-600", bg: "bg-orange-100" },
  { color: "text-purple-600", bg: "bg-purple-100" },
  { color: "text-pink-600", bg: "bg-pink-100" },
];

export function BackgroundTabsSection({ experiences, educations }: BackgroundTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

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
              <div className="absolute left-6 top-2 bottom-2 w-px bg-border" />

              {activeTab === "work" ? (
                <div className="space-y-6">
                  {experiences.map((exp, index) => {
                    const iconStyle = iconColors[index % iconColors.length];
                    return (
                      <div key={exp._id} className="relative pl-16">
                        {/* Logo or Icon */}
                        <div
                          className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg overflow-hidden ${!exp.logo ? iconStyle.bg : "bg-white border border-border"}`}
                        >
                          {exp.logo ? (
                            <Image
                              src={urlFor(exp.logo).width(80).height(80).url()}
                              alt={`${exp.company} logo`}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          ) : index === 0 ? (
                            <Building2 className={`h-5 w-5 ${iconStyle.color}`} />
                          ) : (
                            <Briefcase className={`h-5 w-5 ${iconStyle.color}`} />
                          )}
                        </div>

                        {/* Content */}
                        <div>
                          <H3 className="text-lg font-semibold leading-tight">{exp.company}</H3>
                          <Text className="text-sm font-medium text-foreground/80">{exp.role}</Text>
                          <Small className="text-xs text-muted-foreground">
                            {formatPeriod(exp.startDate, exp.endDate, exp.isCurrent)}
                            {exp.location && ` · ${exp.location}`}
                          </Small>
                          {exp.bullets && exp.bullets.length > 0 && (
                            <ul className="mt-3 space-y-1.5">
                              {exp.bullets.map((bullet, bulletIndex) => (
                                <li
                                  key={bulletIndex}
                                  className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground/50" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {experiences.length === 0 && (
                    <Text className="text-muted-foreground">No work experience added yet.</Text>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {educations.map((edu, index) => {
                    const iconStyle = iconColors[index % iconColors.length];
                    return (
                      <div key={edu._id} className="relative pl-16">
                        {/* Logo or Icon */}
                        <div
                          className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg overflow-hidden ${!edu.logo ? iconStyle.bg : "bg-white border border-border"}`}
                        >
                          {edu.logo ? (
                            <Image
                              src={urlFor(edu.logo).width(80).height(80).url()}
                              alt={`${edu.school} logo`}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          ) : (
                            <GraduationCap className={`h-5 w-5 ${iconStyle.color}`} />
                          )}
                        </div>

                        {/* Content */}
                        <div>
                          <H3 className="text-lg font-semibold leading-tight">{edu.school}</H3>
                          <Text className="text-sm font-medium text-foreground/80">{edu.degree}</Text>
                          <div className="flex items-center gap-2">
                            <Small className="text-xs text-muted-foreground">
                              {formatPeriod(edu.startDate, edu.endDate)}
                              {edu.location && ` · ${edu.location}`}
                            </Small>
                            {edu.gpa && (
                              <>
                                <span className="text-muted-foreground/30">•</span>
                                <Small className="text-xs text-muted-foreground">
                                  GPA: {edu.gpa}
                                </Small>
                              </>
                            )}
                          </div>
                          {edu.description && (
                            <Text className="mt-2 text-sm text-muted-foreground leading-relaxed">
                              {edu.description}
                            </Text>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {educations.length === 0 && (
                    <Text className="text-muted-foreground">No education added yet.</Text>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
