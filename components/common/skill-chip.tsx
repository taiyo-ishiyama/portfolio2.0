import { cn } from "@/lib/utils/cn";

type SkillChipProps = {
  label: string;
  className?: string;
};

export function SkillChip({ label, className }: SkillChipProps) {
  return (
    <span
      className={cn(
        "rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      {label}
    </span>
  );
}
