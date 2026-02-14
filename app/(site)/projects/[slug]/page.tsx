import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Github, ExternalLink, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { H1, Text } from "@/components/ui/typography";
import { sanityClient } from "@/lib/sanity/client";
import { projectBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/lib/sanity/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await sanityClient.fetch<Project | null>(projectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  return (
    <main className="py-16">
      <Container className="max-w-4xl">
        <div className="space-y-8">
          {/* Back Button */}
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          {/* Thumbnail */}
          {project.thumbnail && (
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={urlFor(project.thumbnail).width(1200).height(675).url()}
                alt={project.title}
                width={1200}
                height={675}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          )}

          {/* Header */}
          <div className="space-y-4">
            <H1>{project.title}</H1>
            {project.shortDescription && (
              <Text className="text-lg text-muted-foreground">
                {project.shortDescription}
              </Text>
            )}
          </div>

          {/* Tech Stack */}
          {project.techStacks && project.techStacks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.techStacks.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          {(project.githubUrl || project.demoUrl || project.liveUrl) && (
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild size="sm">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Site
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button asChild variant="secondary" size="sm">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Watch Demo
                  </a>
                </Button>
              )}
            </div>
          )}

          {/* Full Description (Markdown) */}
          {project.fullDescription && (
            <div className="border-t border-border pt-8">
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="mt-8 mb-4 text-3xl font-bold">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-8 mb-4 text-2xl font-semibold">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-6 mb-3 text-xl font-semibold">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-muted-foreground">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      {children}
                    </a>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="block overflow-x-auto rounded-lg bg-muted p-4 text-sm font-mono">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="mb-4 border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  hr: () => <hr className="my-8 border-border" />,
                }}
              >
                {project.fullDescription}
              </Markdown>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
