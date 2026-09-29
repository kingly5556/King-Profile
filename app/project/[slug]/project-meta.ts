import type { PortfolioProject } from "@/app/features/home/model/types";

const SMALL_WORDS = new Set(["&", "and", "of", "the", "a", "an", "to", "in"]);

// Project titles are stored in ALL CAPS for the UI; search snippets read better in Title Case.
export function projectMetaTitle(project: Pick<PortfolioProject, "title">): string {
  return project.title
    .toLowerCase()
    .split(" ")
    .map((word, i) => (i > 0 && SMALL_WORDS.has(word) ? word : word.replace(/^\(?[a-z]/, (m) => m.toUpperCase())))
    .join(" ");
}

export function projectMetaDescription(
  project: Pick<PortfolioProject, "description">,
  max = 160,
): string {
  const text = project.description.trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
