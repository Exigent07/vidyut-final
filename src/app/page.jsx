"use client";

import HeroSection from "@/components/HeroSection";
import Scene from "@/components/Scene";

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex items-center justify-center">
      <Scene />
      <HeroSection />
    </main>
  );
}
