"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { easeOutExpo } from "./motion-variants";
import { ScrollProgress } from "./scroll-progress";

type HomePageContentProps = {
  children: ReactNode;
};

export function HomePageContent({ children }: HomePageContentProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <ScrollProgress />
      <motion.main
        id="main-content"
        className="mx-auto w-full max-w-[1920px]"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: easeOutExpo, delay: reduceMotion ? 0 : 0.06 }}
      >
        {children}
      </motion.main>
    </>
  );
}
