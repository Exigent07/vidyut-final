"use client";

import EventsSection from "@/components/EventsSection";
import ExplainSection from "@/components/ExplainSection";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import PastSection from "@/components/PastSection";

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <ExplainSection />
      <EventsSection />
      <PastSection />
      <FAQSection />
    </main>
  );
}
