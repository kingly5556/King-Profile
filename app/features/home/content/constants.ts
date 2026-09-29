// Language-independent constants. Safe to import from client components —
// unlike `home.ts`, this module does not pull in the EN/TH content.
export const SITE_BRAND = "Kongkat Thanalertrungroj";
export const HERO_PORTRAIT_SRC = "/hero-portrait.jpg";
export const NAV_SECTION_ORDER = ["about", "expertise", "work", "contact"] as const;

export { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, contactMailto } from "./contact";
