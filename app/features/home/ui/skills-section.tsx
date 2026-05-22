"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/app/context/LanguageContext";
import { SKILL_ITEMS_EN, SKILL_ITEMS_TH } from "../content/home";
import { MaterialIcon } from "./material-icon";
import { staggerContainer, staggerItem, viewportScroll } from "./motion-variants";

export function SkillsSection() {
  const { locale } = useLanguage();
  const reduceMotion = useReducedMotion();

  const skills = locale === "en" ? SKILL_ITEMS_EN : SKILL_ITEMS_TH;

  return (
    <section id="expertise" className="relative overflow-hidden border-y border-outline bg-surface-container-lowest py-20">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />
      <motion.div
        className="relative z-10 flex flex-col items-end gap-12 px-margin-mobile md:px-margin-desktop"
        variants={staggerContainer}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={viewportScroll}
      >
        {skills.map((item) => (
          <motion.div
            key={item.label}
            variants={staggerItem}
            className="group flex w-full items-center justify-end gap-5 md:w-3/4"
          >
            <motion.h2
              className="text-right font-headline-lg text-[45px] uppercase leading-tight transition-colors duration-300 group-hover:text-accent-blue"
              whileHover={reduceMotion ? undefined : { x: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              {item.label}
            </motion.h2>
            <motion.span
              className="flex shrink-0 items-center justify-center border border-outline bg-surface-container-low p-2 text-secondary transition-colors duration-300 group-hover:border-accent-blue group-hover:text-accent-blue"
              whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: -4 }}
              transition={{ type: "spring", stiffness: 420, damping: 20 }}
            >
              <MaterialIcon name={item.icon} sizeClass="text-xl md:text-2xl" />
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
