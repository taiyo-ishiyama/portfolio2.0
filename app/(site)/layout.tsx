import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SplashProvider } from "@/components/providers/splash-provider";

export default function SiteLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <SplashProvider>
      <div className="min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </SplashProvider>
  );
}
