"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export function ProjectTabs({
  overviewContent,
  metadataContent,
  edaContent,
  cleaningContent,
  featureEngineeringContent,
  accentBorderClass,
}: {
  overviewContent: React.ReactNode;
  metadataContent?: React.ReactNode;
  edaContent?: React.ReactNode;
  cleaningContent?: React.ReactNode;
  featureEngineeringContent?: React.ReactNode;
  accentBorderClass: string;
}) {
  const [activeTab, setActiveTab] = useState("Overview");
  const { t } = useLanguage();

  const tabs = [
    { id: "Overview", label: t("overview") },
    ...(metadataContent ? [{ id: "Metadata", label: t("metadata") }] : []),
    ...(edaContent ? [{ id: "EDA", label: t("eda") }] : []),
    ...(cleaningContent ? [{ id: "Cleaning", label: t("dataCleaning") }] : []),
    ...(featureEngineeringContent ? [{ id: "FeatureEng", label: t("featureEngineering") }] : []),
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
        {activeTab === "FeatureEng" && featureEngineeringContent}
      </div>
    </div>
  );
}
