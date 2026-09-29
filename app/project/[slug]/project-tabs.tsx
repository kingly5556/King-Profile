"use client";

import { useState, type ReactNode } from "react";

export type ProjectTab = {
  id: string;
  label: string;
  /** Rendered on the server; this component only decides which tab is visible. */
  content: ReactNode;
};

export function ProjectTabs({ tabs, accentBorderClass }: { tabs: ProjectTab[]; accentBorderClass: string }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  // Fall back to the first tab if the tab set changes (e.g. after a language switch).
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div className="w-full">
      <div className="mb-12 flex gap-8 border-b border-outline overflow-x-auto" role="tablist">
        {tabs.map((tab) => {
          const selected = tab.id === active?.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(tab.id)}
              className={`pb-4 font-label-mono text-sm uppercase tracking-widest transition-colors whitespace-nowrap ${
                selected
                  ? `border-b-2 ${accentBorderClass} text-primary`
                  : "text-secondary hover:text-primary border-b-2 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="min-h-[50vh]" role="tabpanel">
        {active?.content}
      </div>
    </div>
  );
}
