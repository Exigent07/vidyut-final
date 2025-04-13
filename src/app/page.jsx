"use client";

import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex items-center justify-center overflow-x-hidden">
      <NavBar />
      <HeroSection />
    </main>
  );
}
