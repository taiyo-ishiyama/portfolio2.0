"use client";

import { useState, createContext, useContext, type ReactNode } from "react";
import { SplashScreen } from "@/components/common/splash-screen";

type SplashContextType = {
  isLoading: boolean;
};

const SplashContext = createContext<SplashContextType>({ isLoading: true });

export function useSplash() {
  return useContext(SplashContext);
}

export function SplashProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SplashContext.Provider value={{ isLoading }}>
      <SplashScreen
        duration={2500}
        onComplete={() => setIsLoading(false)}
      />
      <div
        style={{
          visibility: isLoading ? "hidden" : "visible",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {children}
      </div>
    </SplashContext.Provider>
  );
}
