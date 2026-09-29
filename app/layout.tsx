import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { getSiteContent } from "@/app/features/home/content/home";
import { getRequestLocale } from "@/app/locale";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/app/site-config";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Kongkat Thanalertrungroj" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Kongkat Thanalertrungroj",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html
      lang={locale}
      className={`dark ${spaceGrotesk.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/*
          Site-wide background + grid: see @layer base `html` in globals.css.
          Do not put `bg-background` on body here — it resets `background-image`.
        */}
        <LanguageProvider initialLocale={locale} content={getSiteContent(locale)}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
