"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useMemo } from "react";

import { useLanguage } from "@/app/context/LanguageContext";
import { PORTFOLIO_PROJECTS_EN, PORTFOLIO_PROJECTS_TH } from "../content/home";
import { MaterialIcon } from "./material-icon";
import { fadeUp, viewportScroll } from "./motion-variants";
import { ProjectCard } from "./project-card";

export function SelectedWorksSection() {
  const { locale, t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [activeTabKey, setActiveTabKey] = useState<"all" | "website" | "data">("all");

  const projects = locale === "en" ? PORTFOLIO_PROJECTS_EN : PORTFOLIO_PROJECTS_TH;

  const categories = useMemo(() => {
    return [
      { key: "all" as const, label: t("all") },
      { key: "website" as const, label: locale === "en" ? "Website project" : "โครงการเว็บไซต์" },
      { key: "data" as const, label: locale === "en" ? "Data Project" : "โครงการข้อมูล" },
    ];
  }, [locale, t]);

  const filteredProjects = useMemo(() => {
    if (activeTabKey === "all") return projects;

    const activeCategoryLabel =
      activeTabKey === "website"
        ? (locale === "en" ? "Website project" : "โครงการเว็บไซต์")
        : (locale === "en" ? "Data Project" : "โครงการข้อมูล");

    return projects.filter((p) => p.category === activeCategoryLabel);
  }, [activeTabKey, locale, projects]);

  return (
    <section id="work" className="px-margin-mobile py-section-gap md:px-margin-desktop">
      <motion.div
        className="mb-12 flex items-center gap-4 border-b border-outline pb-8"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={viewportScroll}
        variants={fadeUp}
      >
        <motion.span
          className="flex h-12 w-12 items-center justify-center border border-outline bg-surface-container-low text-primary"
          whileHover={reduceMotion ? undefined : { scale: 1.05, borderColor: "rgba(59, 130, 246, 0.6)" }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
        >
          <MaterialIcon name="analytics" sizeClass="text-xl text-primary" />
        </motion.span>
        <div className="flex flex-col justify-center">
          <h3 className="font-label-mono text-label-mono uppercase tracking-widest text-primary">
            {t("selectedWorks")}
          </h3>
        </div>
      </motion.div>
      <motion.div 
        className="mb-16 flex flex-wrap items-center gap-4"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={viewportScroll}
        variants={fadeUp}
      >
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveTabKey(cat.key)}
            className={`rounded-full border px-6 py-2 font-label-mono text-xs uppercase tracking-widest transition-colors ${
              activeTabKey === cat.key 
                ? "border-accent-blue bg-accent-blue text-background" 
                : "border-outline text-secondary hover:border-primary hover:text-primary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 text-center font-body-lg text-secondary border border-dashed border-outline">
            {t("noProjects")}
          </div>
        )}
      </div>
    </section>
  );
}
