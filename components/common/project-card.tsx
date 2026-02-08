import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { H3, Small, Text } from "@/components/ui/typography";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  thumbnail?: SanityImage;
  className?: string;
};

export function ProjectCard({
  title,
  description,
  tags,
  href,
  thumbnail,
  className
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:border-primary/40",
        className
      )}
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
        {thumbnail ? (
          <Image
            src={urlFor(thumbnail).width(600).height(450).url()}
            alt={title}
            width={600}
            height={450}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-2">
        <H3 className="text-lg">{title}</H3>
        <Text className="text-sm text-muted-foreground">{description}</Text>
        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          {tags.map((tag) => (
            <Small key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs">
              {tag}
            </Small>
          ))}
        </div>
      </div>
    </Link>
  );
}
