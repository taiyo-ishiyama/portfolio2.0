"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { H1, Lead } from "@/components/ui/typography";
import { SocialLinks } from "@/components/common/social-links";
import { urlFor } from "@/lib/sanity/image";
import type { Profile } from "@/lib/sanity/types";

type HeroSectionProps = {
  profile: Profile | null;
};

export function HeroSection({ profile }: HeroSectionProps) {
  const name = profile?.name || "Taiyo Ishiyama";
  const role = profile?.role || "Full Stack Software Engineer";
  const summary = profile?.summary || "I build accessible, high-impact products and streamline operations with modern web engineering.";
  const photoUrl = profile?.photo
    ? urlFor(profile.photo).width(400).height(400).url()
    : "/images/placeholder-avatar.svg";

  return (
    <section id="hero" className="py-16">
      <Container className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <H1>
              Hi, I&apos;m {name}
              <motion.span
                className="block text-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                {role}
              </motion.span>
            </H1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <Lead>{summary}</Lead>
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Button asChild size="lg">
              <a href="#projects">View Projects</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="/api/resume" target="_blank" rel="noopener noreferrer">Download Resume</a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <SocialLinks />
          </motion.div>
        </div>
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className="group relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Gradient border ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-primary/50 to-transparent opacity-70 blur-sm transition-opacity duration-300 group-hover:opacity-100" />

            {/* Profile image */}
            <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-background bg-muted shadow-lg sm:h-56 sm:w-56">
              <Image
                src={photoUrl}
                alt={`${name} profile photo`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 192px, 224px"
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
