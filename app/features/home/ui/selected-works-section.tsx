"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useMemo } from "react";

import { PORTFOLIO_PROJECTS } from "../content/home";
import { MaterialIcon } from "./material-icon";
import { fadeUp, viewportScroll } from "./motion-variants";
import { ProjectCard } from "./project-card";

export function SelectedWorksSection() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = new Set(PORTFOLIO_PROJECTS.map((p) => p.category).filter(Boolean));
    cats.add("Website project");
    cats.add("Data Project");
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.category === activeTab);
  }, [activeTab]);

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
            SELECTED WORKS
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
            key={cat}
            onClick={() => setActiveTab(cat as string)}
            className={`rounded-full border px-6 py-2 font-label-mono text-xs uppercase tracking-widest transition-colors ${
              activeTab === cat 
                ? "border-accent-blue bg-accent-blue text-background" 
                : "border-outline text-secondary hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 text-center font-body-lg text-secondary border border-dashed border-outline">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
