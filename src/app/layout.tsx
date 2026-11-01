import type { Metadata } from "next";
import { dmSerifDisplay, dmSans } from "./fonts";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Helia Studio — LinkedIn ghostwriting by Héléna Clinckart",
  description:
    "Done-for-you LinkedIn content and profile optimization for founders and professionals.",
};

const themeScript = `(function() {
  try {
    var stored = localStorage.getItem('helia-theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
      return;
    }
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    document.documentElement.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
