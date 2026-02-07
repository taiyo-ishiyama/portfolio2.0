import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { H2, Text } from "@/components/ui/typography";
import { SocialLinks } from "@/components/common/social-links";

export function ContactSection() {
  return (
    <section id="contact" className="py-16">
      <Container className="space-y-6 text-center">
        <H2>Contact</H2>
        <Text className="text-muted-foreground">
          Feel free to reach out if you want to collaborate or chat about product work.
        </Text>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <SocialLinks variant="pill" />
        </div>
      </Container>
    </section>
  );
}
