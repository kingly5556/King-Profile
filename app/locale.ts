import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/app/features/home/content/translations";

/** The visitor's language, from the `portfolio-locale` cookie (server components only). */
export async function getRequestLocale(): Promise<Locale> {
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(saved) ? saved : DEFAULT_LOCALE;
}
