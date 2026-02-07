"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navItems } from "@/lib/config/nav";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="relative py-1">
      <motion.span
        className="relative inline-block"
        whileHover="hover"
        initial="initial"
      >
        <motion.span
          className="inline-block"
          variants={{
            initial: { color: "var(--muted-foreground)" },
            hover: { color: "var(--foreground)" },
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
        <motion.span
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-primary"
          variants={{
            initial: { scaleX: 0 },
            hover: { scaleX: 1 },
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </motion.span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-lg font-semibold">
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Taiyo's Portfolio
          </motion.span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button asChild variant="secondary" size="sm">
              <Link href="/resume/Resume.pdf">Resume</Link>
            </Button>
          </motion.div>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
