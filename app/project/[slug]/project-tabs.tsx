"use client";

import { useState } from "react";

export function ProjectTabs({
  overviewContent,
  metadataContent,
  edaContent,
  cleaningContent,
  accentBorderClass,
}: {
  overviewContent: React.ReactNode;
  metadataContent: React.ReactNode;
  edaContent: React.ReactNode;
  cleaningContent?: React.ReactNode;
  accentBorderClass: string;
}) {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    { id: "Overview", label: "Overview" },
    { id: "Metadata", label: "Metadata" },
    { id: "EDA", label: "EDA" },
    ...(cleaningContent ? [{ id: "Cleaning", label: "Data Cleaning" }] : []),
  ];

  return (
    <div className="w-full">
      <div className="mb-12 flex gap-8 border-b border-outline overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 font-label-mono text-sm uppercase tracking-widest transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? `border-b-2 ${accentBorderClass} text-primary`
                : "text-secondary hover:text-primary border-b-2 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="min-h-[50vh]">
        {activeTab === "Overview" && overviewContent}
        {activeTab === "Metadata" && metadataContent}
        {activeTab === "EDA" && edaContent}
        {activeTab === "Cleaning" && cleaningContent}
      </div>
    </div>
  );
}
