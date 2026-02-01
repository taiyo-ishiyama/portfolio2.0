import { Container } from "@/components/layout/container";
import { H1, Text } from "@/components/ui/typography";

export default function ProjectDetailPage() {
  return (
    <Container className="py-16">
      <H1>Project Title</H1>
      <Text className="mt-4 text-muted-foreground">
        Placeholder project detail page. Content will come from Sanity.
      </Text>
    </Container>
  );
}
