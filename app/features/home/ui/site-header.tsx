"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { useLanguage } from "@/app/context/LanguageContext";
import {
  CONTACT_EMAIL,
  NAV_SECTION_ORDER,
  SITE_BRAND_EN,
  SITE_BRAND_TH,
  SITE_NAV_EN,
  SITE_NAV_TH,
} from "../content/home";
import { MaterialIcon } from "./material-icon";
import { navItem, staggerContainer } from "./motion-variants";

const SCROLL_SPY_OFFSET = 96;

function readActiveSectionId(): (typeof NAV_SECTION_ORDER)[number] {
  if (typeof document === "undefined") return NAV_SECTION_ORDER[0];

  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  const docEl = document.documentElement;
  const docHeight = Math.max(docEl.scrollHeight, docEl.clientHeight);

  let active: (typeof NAV_SECTION_ORDER)[number] = NAV_SECTION_ORDER[0];
  for (const id of NAV_SECTION_ORDER) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= SCROLL_SPY_OFFSET) active = id;
  }

  const contactId = NAV_SECTION_ORDER[NAV_SECTION_ORDER.length - 1];
  const contactEl = document.getElementById(contactId);
  if (contactEl && docHeight > vh + 48) {
    const cr = contactEl.getBoundingClientRect();
    const nearDocumentEnd = scrollY + vh >= docHeight - 48;
    const footerMeaningfullyVisible =
      cr.top < vh * 0.72 && cr.bottom > vh * 0.28;
    if (nearDocumentEnd || footerMeaningfullyVisible) {
      return contactId;
    }
  }

  return active;
}

export function SiteHeader() {
  const { locale, setLocale, t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<(typeof NAV_SECTION_ORDER)[number]>(NAV_SECTION_ORDER[0]);

  const syncActive = useCallback(() => {
    setActiveSectionId(readActiveSectionId());
  }, []);

  const brand = locale === "en" ? SITE_BRAND_EN : SITE_BRAND_TH;
  const nav = locale === "en" ? SITE_NAV_EN : SITE_NAV_TH;

  useMotionValueEvent(scrollY, "change", syncActive);

  useEffect(() => {
    const frame = requestAnimationFrame(() => syncActive());
    window.addEventListener("resize", syncActive);
    window.addEventListener("hashchange", syncActive);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncActive);
      window.removeEventListener("hashchange", syncActive);
    };
  }, [syncActive]);

  const navBg = useTransform(scrollY, [0, 100], ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.88)"]);
  const navBorder = useTransform(scrollY, [0, 80], ["rgba(51, 51, 51, 0)", "rgba(51, 51, 51, 0.85)"]);
  const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(14px)"]);

  const LanguageToggle = () => (
    <div className="flex h-10 items-center rounded-full border border-outline bg-surface-container-low/40 p-1 shadow-[0_0_12px_rgba(0,0,0,0.2)] backdrop-blur-md">
      {(["en", "th"] as const).map((lang) => {
        const active = locale === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLocale(lang)}
            className={`relative z-10 flex h-full w-10 items-center justify-center font-label-mono text-[10px] font-bold uppercase transition-colors duration-300 ${
              active ? "text-background" : "text-secondary hover:text-primary"
            }`}
          >
            {lang}
            {active && (
              <motion.span
                layoutId="active-lang-bg"
                className="absolute inset-0 -z-10 rounded-full bg-accent-blue shadow-[0_2px_8px_-1px_rgba(59,130,246,0.5)]"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <motion.nav
        className="sticky top-0 z-50 mx-auto flex w-full items-center justify-between px-margin-mobile py-8 mix-blend-normal md:px-margin-desktop"
        style={
          reduceMotion
            ? {
                backgroundColor: "rgba(10, 10, 10, 0.92)",
                borderBottomColor: "rgba(51, 51, 51, 0.85)",
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                backdropFilter: "blur(14px)",
              }
            : {
                backgroundColor: navBg,
                borderBottomColor: navBorder,
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                backdropFilter: navBlur,
              }
        }
        initial={false}
      >
        <motion.a
          href="/"
          className="flex items-center gap-2 font-label-mono text-label-mono uppercase tracking-widest text-primary"
          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          onClick={() => setMobileOpen(false)}
        >
          <MaterialIcon name="token" sizeClass="text-lg text-accent-blue" />
          <span className="max-w-[min(100%,11rem)] leading-tight md:max-w-none">{brand}</span>
        </motion.a>
        <motion.ul
          className="hidden items-center gap-8 md:flex"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {nav.map((link) => {
            const id = link.href.replace(/^\/?#/, "");
            const isActive = activeSectionId === id;
            return (
              <motion.li key={link.label} variants={navItem} className="relative">
                <a
                  href={link.href}
                  className={`relative inline-flex items-center gap-2 pb-1.5 font-label-mono text-label-mono uppercase tracking-widest transition-colors duration-200 ${
                    isActive ? "font-semibold text-primary" : "font-normal text-secondary hover:text-primary"
                  }`}
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1.08 : 1,
                      opacity: isActive ? 1 : 0.65,
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  >
                    <MaterialIcon
                      name={link.icon}
                      sizeClass="text-base"
                      className={isActive ? "text-accent-blue" : ""}
                    />
                  </motion.span>
                  {link.label}
                  {isActive && !reduceMotion ? (
                    <motion.span
                      layoutId="desktop-nav-active-bar"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-accent-blue to-accent-purple"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : isActive ? (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
                  ) : null}
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
        <div className="hidden items-center gap-6 md:flex">
          <LanguageToggle />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 320, damping: 26 }}
          >
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 border border-outline px-6 py-3 font-label-mono text-label-mono uppercase tracking-widest transition-all duration-200 hover:bg-primary hover:text-on-primary"
            >
              <MaterialIcon name="forum" sizeClass="text-base" />
              {t("letsTalk")}
            </a>
          </motion.div>
        </div>
        <button
          type="button"
          className="relative z-60 text-primary md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? (locale === "en" ? "Close menu" : "ปิดเมนู") : (locale === "en" ? "Open menu" : "เปิดเมนู")}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MaterialIcon name="close" filled sizeClass="text-3xl" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MaterialIcon name="menu" filled sizeClass="text-3xl" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col bg-background/98 px-margin-mobile pb-12 pt-28 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              className="flex flex-col gap-2 font-label-mono text-label-mono uppercase tracking-widest"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {nav.map((link) => {
                const id = link.href.replace(/^\/?#/, "");
                const isActive = activeSectionId === id;
                return (
                  <motion.li key={link.label} variants={navItem}>
                    <a
                      href={link.href}
                      className={`flex items-center gap-4 border-b border-outline py-3 pl-1 transition-colors duration-200 ${
                        isActive
                          ? "border-l-2 border-l-accent-blue bg-accent-blue/5 pl-3 text-primary"
                          : "text-secondary hover:text-primary"
                      }`}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <motion.span
                        animate={{ scale: isActive ? 1.06 : 1, x: isActive ? 2 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 24 }}
                      >
                        <MaterialIcon
                          name={link.icon}
                          sizeClass="text-2xl"
                          className={isActive ? "text-accent-blue" : "text-primary"}
                        />
                      </motion.span>
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>
            <motion.div
              className="mt-8 flex flex-col gap-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
            >
              <div className="flex items-center justify-between border-t border-outline pt-6">
                <span className="font-label-mono text-[10px] uppercase text-secondary">Language / ภาษา</span>
                <LanguageToggle />
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex w-max items-center gap-2 border border-outline px-6 py-4 font-label-mono text-label-mono uppercase tracking-widest hover:bg-primary hover:text-on-primary"
                onClick={() => setMobileOpen(false)}
              >
                <MaterialIcon name="forum" sizeClass="text-xl" />
                {t("letsTalk")}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
