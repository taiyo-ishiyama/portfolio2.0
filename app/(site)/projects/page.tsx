import { Container } from "@/components/layout/container";
import { H1, Text } from "@/components/ui/typography";

export default function ProjectsPage() {
  return (
    <Container className="py-16">
      <H1>Projects</H1>
      <Text className="mt-4 text-muted-foreground">
        Placeholder list page. This will show all projects from Sanity.
      </Text>
    </Container>
  );
}
