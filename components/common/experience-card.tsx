import { H3, Small, Text } from "@/components/ui/typography";

type ExperienceCardProps = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
};

export function ExperienceCard({
  title,
  company,
  period,
  bullets
}: ExperienceCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <H3 className="text-lg">{title}</H3>
        <Small>{period}</Small>
      </div>
      <Text className="mt-1 text-sm text-muted-foreground">{company}</Text>
      <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-muted-foreground">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}
