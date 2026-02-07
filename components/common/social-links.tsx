import { Mail, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type SocialLinksProps = {
  className?: string;
  variant?: "pill" | "icon";
};

const links = [
  { label: "Email", href: "taiyou04142001@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/taiyo-ishiyama", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/taiyo-ishiyama/", icon: Linkedin }
];

export function SocialLinks({ className, variant = "icon" }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-border/80 px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/60 hover:text-foreground",
              variant === "icon" && "h-9 w-9 justify-center p-0"
            )}
          >
            <Icon className="h-4 w-4" />
            {variant === "pill" ? link.label : null}
          </a>
        );
      })}
    </div>
  );
}
