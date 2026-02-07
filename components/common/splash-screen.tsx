"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type SplashScreenProps = {
  onComplete?: () => void;
  duration?: number;
};

export function SplashScreen({ onComplete, duration = 2800 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const hasCompleted = useRef(false);

  const completeSplash = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    setIsVisible(false);
    onComplete?.();
  }, [onComplete]);

  // Fallback timer - always complete after duration even if animation doesn't load
  useEffect(() => {
    const timer = setTimeout(completeSplash, duration);
    return () => clearTimeout(timer);
  }, [duration, completeSplash]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="w-72 h-72 md:w-96 md:h-96">
            <DotLottieReact
              src="/lottie/splash.json"
              autoplay
              loop={false}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
