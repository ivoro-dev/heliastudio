import PagePreloader from "@/components/motion/PagePreloader";
import HeroSection from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/Problem";
import ShiftSection from "@/components/sections/Shift";

export default function HomePage() {
  return (
    <>
      <PagePreloader />
      <main className="flex-1 w-full">
        <HeroSection />
        <ProblemSection locale="en" />
        <ShiftSection locale="en" />
      </main>
    </>
  );
}
