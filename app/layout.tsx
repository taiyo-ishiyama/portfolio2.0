import "./globals.css";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { StyledComponentsRegistry } from "@/components/providers/styled-components-registry";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { defaultMetadata } from "@/lib/seo/metadata";

export const metadata = defaultMetadata;

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
