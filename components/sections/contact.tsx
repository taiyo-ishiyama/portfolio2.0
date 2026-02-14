"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { H2, Text } from "@/components/ui/typography";
import { SocialLinks } from "@/components/common/social-links";

export function ContactSection() {
  return (
    <section id="contact" className="py-16">
      <Container className="space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <H2>Contact</H2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <Text className="text-muted-foreground">
            Feel free to reach out if you want to collaborate or chat about product work.
          </Text>
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <SocialLinks variant="pill" />
        </motion.div>
      </Container>
    </section>
  );
}
