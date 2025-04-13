"use client";

import ExplainSection from "@/components/ExplainSection";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <ExplainSection />
    </main>
  );
}
