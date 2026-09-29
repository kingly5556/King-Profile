import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local tooling / agent worktrees (contain full copies of the project).
    ".kilo/**",
    ".qodo/**",
  ]),
  {
    // Client components must not import the localized content modules: they hold both
    // languages and would ship EN + TH to every visitor. Read `useLanguage().content`, take
    // props from a server component, or import language-independent values from
    // content/constants instead. (Server code — layout, pages — may import content/home.)
    files: [
      "app/features/home/ui/**",
      "app/context/**",
      "app/project/[[]slug]/project-tabs.tsx",
      "app/project/[[]slug]/eda-charts.tsx",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "(^|/)content/(home|home_en|home_th)$",
              message:
                "Client code must not import localized content; use useLanguage().content or props from a server component.",
            },
            {
              regex: "^\./home(_en|_th)?$",
              message: "Client code must not import localized content.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
