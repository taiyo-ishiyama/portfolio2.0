import { Container } from "@/components/layout/container";
import { Small } from "@/components/ui/typography";

export function Footer() {
  return (
    <footer className="border-t border-border/70 py-8">
      <Container className="flex flex-col items-center justify-between gap-3 text-center md:flex-row">
        <Small>Built with Next.js + Sanity</Small>
        <Small>© 2026 Stitch. All rights reserved.</Small>
      </Container>
    </footer>
  );
}
