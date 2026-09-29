// Canonical origin used for metadataBase, sitemap and robots.
// Set NEXT_PUBLIC_SITE_URL in the hosting environment (e.g. https://your-domain.com).
// On Vercel it falls back to the production domain automatically.
export const SITE_URL = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
})();

export const SITE_TITLE = "Kongkat Thanalertrungroj — Programmer & AI Engineer";
export const SITE_DESCRIPTION =
  "Portfolio of Kongkat Thanalertrungroj — programmer, AI engineer, B.Sc. Computer Science (RMUTI). Data platforms, full-stack, and ML.";
