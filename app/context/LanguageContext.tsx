"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, UI_TRANSLATIONS } from "../features/home/content/translations";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  // Initialize language from localStorage on client mount to avoid hydration mismatches
  useEffect(() => {
    const savedLocale = localStorage.getItem("portfolio-locale") as Locale;
    if (savedLocale === "en" || savedLocale === "th") {
      setLocaleState(savedLocale);
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("portfolio-locale", newLocale);
  };

  const t = (key: string): string => {
    return UI_TRANSLATIONS[locale][key] || UI_TRANSLATIONS["en"][key] || key;
  };

  // Render a transparent shell or wait until mount if necessary, but returning the provider directly
  // with the default 'en' state avoids hydration mismatch and ensures SEO-friendly SSR html output.
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
