"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/app/context/LanguageContext";
import {
  CONTACT_EMAIL,
  FOOTER_SOCIAL_LINKS_EN,
  FOOTER_SOCIAL_LINKS_TH,
  SITE_BRAND_EN,
  SITE_BRAND_TH,
} from "../content/home";
import { MaterialIcon } from "./material-icon";
import { fadeUp, staggerContainer, staggerItem, viewportScroll } from "./motion-variants";

export function SiteFooter() {
  const { locale, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const brand = locale === "en" ? SITE_BRAND_EN : SITE_BRAND_TH;
  const links = locale === "en" ? FOOTER_SOCIAL_LINKS_EN : FOOTER_SOCIAL_LINKS_TH;

  return (
    <footer
      id="contact"
      className="relative mx-auto flex w-full flex-col items-center justify-center overflow-hidden border-t border-outline bg-background px-margin-mobile py-section-gap text-primary md:px-margin-desktop"
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)`,
          backgroundSize: "50px 50px",
        }}
        aria-hidden
      />
      <div className="relative z-10 flex w-full flex-col items-center gap-12">
        <motion.ul
          className="flex flex-col items-center gap-4 text-center"
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportScroll}
        >
          {links.map((item) => (
            <motion.li key={item.label} variants={staggerItem}>
              <motion.a
                href={item.href}
                className="group inline-flex items-center justify-center gap-3 font-body-lg text-body-lg text-secondary decoration-1 underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
                whileHover={reduceMotion ? undefined : { x: -6 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              >
                <MaterialIcon
                  name={item.icon}
                  sizeClass="text-xl opacity-60 transition-opacity group-hover:opacity-100"
                />
                {item.label}{" "}
                <MaterialIcon name="arrow_outward" sizeClass="text-sm opacity-70 group-hover:opacity-100" />
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
        <motion.p
          className="mt-12 flex items-center justify-center gap-2 text-center font-label-mono text-label-mono uppercase tracking-widest text-secondary opacity-50"
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportScroll}
        >
          <MaterialIcon name="copyright" sizeClass="text-sm" />
          2026 {brand} — {t("allRightsReserved")}
        </motion.p>
      </div>
    </footer>
  );
}
