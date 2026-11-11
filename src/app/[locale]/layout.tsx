import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dmSerifDisplay, dmSans } from "../fonts";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollEffects from "@/components/motion/ScrollEffects";
import PagePreloader from "@/components/motion/PagePreloader";
import MotionFailsafe from "@/components/motion/MotionFailsafe";
import Navbar from "@/components/ui/Navbar";
import { LOCALES, MESSAGES, isLocale } from "@/lib/i18n";
import "../globals.css";

// Only /en and /fr exist; both are prerendered as static pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { title, description } = MESSAGES[locale].meta;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", fr: "/fr", "x-default": "/en" },
    },
  };
}

const themeScript = `(function() {
  try {
    var stored = localStorage.getItem('helia-theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      document.documentElement.classList.add('js');
    }
  } catch (e) {}
})();`;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      data-theme="dark"
      suppressHydrationWarning
      className={`${dmSerifDisplay.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="color-scheme" content="dark light" />
        <meta
          name="theme-color"
          content="#070b08"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content="#ebf3ea"
          media="(prefers-color-scheme: light)"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-paper text-ink">
        <PagePreloader label="Helia Studio" />
        <Navbar locale={locale} />
        <SmoothScroll>
          <ScrollEffects>{children}</ScrollEffects>
        </SmoothScroll>
        <MotionFailsafe />
      </body>
    </html>
  );
}
