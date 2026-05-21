"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { HERO_HEADLINE_NAME_LINES, HERO_HEADLINE_ROLE, HERO_PORTRAIT_SRC, HERO_SUBTITLE } from "../content/home";
import { MaterialIcon } from "./material-icon";
import { easeOutExpo, fadeUp, springSoft } from "./motion-variants";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitInnerY = useTransform(scrollYProgress, [0, 1], [0, -32]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-[819px] flex-col items-center justify-between px-margin-mobile pb-section-gap pt-20 md:flex-row md:px-margin-desktop"
    >
      <div className="z-10 w-full min-w-0 max-w-7xl md:w-3/5">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.11, delayChildren: reduceMotion ? 0 : 0.12 },
            },
          }}
        >
          <motion.h1
            variants={fadeUp}
            className="hero-headline-wrap w-full min-w-0 text-pretty font-display-lg-mobile text-[clamp(2rem,7.5vw+0.5rem,4rem)] uppercase leading-[0.92] md:font-display-lg md:text-[clamp(2.5rem,3.8vw+1.25rem,7.5rem)] md:leading-[0.92]"
          >
            <span className="hero-headline-line-1 block font-light tracking-[-0.04em] md:tracking-[-0.055em]">
              {HERO_HEADLINE_NAME_LINES[0]}
            </span>
            <span className="hero-headline-line-1 mt-0.5 block font-light tracking-[-0.04em] md:mt-1 md:tracking-[-0.055em]">
              {HERO_HEADLINE_NAME_LINES[1]}
            </span>
            <span className="mt-2 flex min-w-0 items-center gap-3 md:mt-3 md:gap-4">
              <span
                className="hidden h-[0.65em] w-px shrink-0 bg-linear-to-b from-accent-blue via-accent-purple to-transparent opacity-80 sm:block"
                aria-hidden
              />
              <span className="hero-headline-line-2 block min-w-0 flex-1 font-bold tracking-[-0.03em] md:tracking-[-0.045em]">
                {HERO_HEADLINE_ROLE}
              </span>
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl min-w-0 font-body-md text-body-md text-secondary md:font-body-lg md:text-body-lg"
          >
            {HERO_SUBTITLE}
          </motion.p>
        </motion.div>
      </div>
      <div className="relative z-10 mt-12 flex w-full justify-center md:mt-0 md:w-2/5 md:justify-end">
        <motion.div
          className="group relative h-[400px] w-[300px] md:h-[500px] md:w-[400px]"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.75, ease: easeOutExpo, delay: reduceMotion ? 0 : 0.06 }}
        >
          <motion.div
            className="relative h-full w-full overflow-hidden border border-outline transition-all duration-700"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 36 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...springSoft, delay: reduceMotion ? 0 : 0.08 }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px overflow-hidden">
              <span className="block h-full w-1/2 animate-shimmer-line bg-linear-to-r from-transparent via-accent-blue to-transparent opacity-80" />
            </div>
            <motion.div
              className="relative h-full w-full"
              style={reduceMotion ? undefined : { y: portraitInnerY }}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <Image
                src={HERO_PORTRAIT_SRC}
                alt="Kongkat Thanalertrungroj"
                width={400}
                height={500}
                className="h-full w-full object-cover"
                priority
                sizes="(min-width: 768px) 400px, 300px"
              />
            </motion.div>
            <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-accent-blue to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-accent-purple to-transparent opacity-50" />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute right-margin-mobile top-[20%] z-10 flex items-center gap-4 text-secondary md:right-margin-desktop"
        initial={reduceMotion ? false : { opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: easeOutExpo, delay: reduceMotion ? 0 : 0.28 }}
      >
        <div className="text-right">
          <p className="flex items-center justify-end gap-2 font-label-mono text-label-mono uppercase tracking-widest text-primary">
            <MaterialIcon name="work_history" sizeClass="text-base text-accent-blue" />
            OPEN TO OPPORTUNITIES
          </p>
          <p className="mt-1 flex items-center justify-end gap-1.5 font-label-mono text-label-mono text-[10px] opacity-60">
            <MaterialIcon name="location_on" sizeClass="text-sm" />
            Based in Thailand
          </p>
        </div>
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-outline/60 bg-surface-container-low/80">
          <span className="absolute inset-0 rounded-full animate-pulse-ring opacity-40" aria-hidden />
          <MaterialIcon name="memory" className="animate-spin-slow text-accent-blue" sizeClass="text-2xl" />
        </span>
      </motion.div>
      <motion.a
        href="#expertise"
        aria-label="Scroll to expertise section"
        className="absolute bottom-16 left-margin-mobile z-10 flex cursor-pointer flex-col items-center gap-3 rounded-sm text-primary no-underline outline-none ring-offset-background transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-accent-blue md:left-margin-desktop"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 0.72, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.5, duration: 0.55, ease: easeOutExpo }}
        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      >
        <div
          className="relative flex h-12 w-7 shrink-0 items-start justify-center overflow-hidden rounded-full border-2 border-primary/40 bg-surface-container-low/30 pt-2 shadow-[0_0_28px_-6px_rgba(59,130,246,0.35)] backdrop-blur-sm"
          aria-hidden
        >
          <motion.span
            className="block h-2 w-2 rounded-full bg-accent-blue"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, 18, 0],
                    opacity: [1, 0.35, 1],
                  }
            }
            transition={{ duration: 1.85, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
          />
        </div>
        <span className="font-label-mono text-[9px] uppercase tracking-[0.42em] text-primary/55">Scroll</span>
      </motion.a>
    </section>
  );
}
