import { notFound } from "next/navigation";
import HeroSection from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/Problem";
import ShiftSection from "@/components/sections/Shift";
import OffersSection from "@/components/sections/Offers";
import WorkSection from "@/components/sections/Work";
import ProcessSection from "@/components/sections/Process";
import AboutSection from "@/components/sections/About";
import PricingSection from "@/components/sections/Pricing";
import FaqSection from "@/components/sections/Faq";
import FinalCtaSection from "@/components/sections/FinalCta";
import Footer from "@/components/ui/Footer";
import { isLocale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <main className="flex-1 w-full">
        <HeroSection locale={locale} />
        <ProblemSection locale={locale} />
        <ShiftSection locale={locale} />
        <OffersSection locale={locale} />
        <WorkSection locale={locale} />
        <ProcessSection locale={locale} />
        <AboutSection locale={locale} />
        <PricingSection locale={locale} />
        <FaqSection locale={locale} />
        <FinalCtaSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
