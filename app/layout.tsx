import "./globals.css";
import type { ReactNode } from "react";
import { StyledComponentsRegistry } from "@/components/providers/styled-components-registry";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
