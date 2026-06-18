"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import type { PortfolioProject } from "../model/types";
import { MaterialIcon } from "./material-icon";
import { staggerItem, viewportScroll } from "./motion-variants";

const accentBorderHover: Record<PortfolioProject["accent"], string> = {
  blue: "group-hover:border-accent-blue/60",
  purple: "group-hover:border-accent-purple/60",
  orange: "group-hover:border-orange-500/60",
};

const accentOverlay: Record<PortfolioProject["accent"], string> = {
  blue: "bg-accent-blue/10",
  purple: "bg-accent-purple/10",
  orange: "bg-orange-500/10",
};

const accentIcon: Record<PortfolioProject["accent"], string> = {
  blue: "text-accent-blue",
  purple: "text-accent-purple",
  orange: "text-orange-500",
};

export function ProjectCard({ project }: { project: PortfolioProject }) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={staggerItem}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? "visible" : undefined}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={viewportScroll}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Link
        href={`/project/${project.slug}`}
        className={`group flex h-full flex-col gap-4 border border-outline bg-surface p-4 transition-colors duration-300 ${accentBorderHover[project.accent]}`}
      >
        <div className="relative aspect-video w-full overflow-hidden border border-outline bg-surface-container-low">
          <div
            className={`pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100 ${accentOverlay[project.accent]}`}
          />
          {project.imageSrc && (
            <Image
              src={project.imageSrc}
              alt={project.imageAlt}
              fill
              className={`object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100 ${project.imagePosition}`}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <p className="flex items-center gap-2 font-label-mono text-[10px] uppercase text-secondary">
            <MaterialIcon name={project.icon} sizeClass="text-sm" className={accentIcon[project.accent]} />
            <span className="truncate">{project.meta}</span>
          </p>
          <h4 className="font-headline-sm text-headline-sm uppercase text-primary line-clamp-1">{project.title}</h4>
          <p className="font-body-sm text-body-sm text-secondary line-clamp-2">{project.description}</p>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4 font-label-mono text-[10px] uppercase text-primary transition-colors group-hover:text-accent-blue">
          <span>{t("viewDetails")}</span>
          <MaterialIcon name="arrow_forward" sizeClass="text-sm" />
        </div>
      </Link>
    </motion.div>
  );
}
