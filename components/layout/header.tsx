"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navItems } from "@/lib/config/nav";

function AnimatedLogo() {
  const [showCat, setShowCat] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [animationKey, setAnimationKey] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCat(true);
      setAnimationKey((prev) => prev + 1);
      // Hide cat after animation completes (2 seconds at 30fps = 60 frames)
      timeoutRef.current = setTimeout(() => {
        setShowCat(false);
        // Toggle direction for next animation
        setDirection((prev) => (prev === "right" ? "left" : "right"));
      }, 2000);
    }, 8000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Link href="/" className="relative h-8 w-40 overflow-hidden">
      <motion.div
        className="relative w-full h-full flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <AnimatePresence mode="wait">
          {showCat ? (
            <motion.div
              key={`cat-${animationKey}-${direction}`}
              initial={{
                opacity: 0,
                x: direction === "right" ? -60 : 100,
              }}
              animate={{
                opacity: 1,
                x: direction === "right" ? 100 : -60,
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.15 },
                x: { duration: 2, ease: "linear" },
              }}
              className="absolute w-20 h-10"
            >
              <DotLottieReact
                key={`lottie-${animationKey}-${direction}`}
                src="/lottie/cat-walk.json"
                autoplay
                loop
                style={{
                  width: "100%",
                  height: "100%",
                  transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
                }}
              />
            </motion.div>
          ) : (
            <motion.span
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="font-heading text-lg font-semibold"
            >
              Taiyo&apos;s Portfolio
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

function PillNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="hidden md:flex">
      <div className="flex items-center rounded-full border border-border bg-muted p-1">
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative px-4 py-2 text-sm font-medium"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index && (
              <motion.span
                layoutId="navPill"
                className="absolute inset-0 rounded-full bg-background shadow-md dark:shadow-none dark:bg-foreground/10"
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  mass: 1
                }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-200 ${
                hoveredIndex === index ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <Container className="flex h-16 items-center justify-between">
        <AnimatedLogo />
        <PillNav />
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button asChild variant="secondary" size="sm">
              <a href="/api/resume" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
          </motion.div>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
