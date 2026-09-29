"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useMemo, useState, useTransition } from "react";
import { LOCALE_COOKIE, Locale, UI_TRANSLATIONS } from "../features/home/content/translations";
import type { SiteContent } from "../features/home/model/types";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  /** Localized site chrome/hero content for the current locale (resolved on the server). */
  content: SiteContent;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// `initialLocale` and `content` come from the cookie read on the server (see app/layout.tsx),
// so the first HTML already matches the visitor's language — no flash of English, and only
// one language's content is ever sent to the browser.
export function LanguageProvider({
  initialLocale,
  content,
  children,
}: {
  initialLocale: Locale;
  content: SiteContent;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [, startTransition] = useTransition();

  const setLocale = useCallback(
    (newLocale: Locale) => {
      document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
      document.documentElement.lang = newLocale;
      // Update the locale and re-render the server components (which read the cookie) in one
      // transition, so UI strings and page content switch together when the new payload lands.
      startTransition(() => {
        setLocaleState(newLocale);
        router.refresh();
      });
    },
    [router],
  );

  const value = useMemo<LanguageContextType>(
    () => ({
      locale,
      setLocale,
      content,
      t: (key) => UI_TRANSLATIONS[locale][key] || UI_TRANSLATIONS.en[key] || key,
    }),
    [locale, setLocale, content],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
