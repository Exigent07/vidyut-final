"use client";

import Image from "next/image";
import HightechHelmet from "../../public/images/hightech-helmet.svg";
import { MapPin } from 'lucide-react';
import Scene from "./Scene";
import { useEffect, useState } from "react";

const stats = [
  { value: "20K", label: "Footfall" },
  { value: "15Lakhs", label: "Worth Prizes" },
  { value: "30+", label: "Competitions" },
  { value: "20+", label: "Workshops" },
];

const StatItem = ({ value, label }) => (
  <div className="flex items-center gap-3 group transition-all hover:scale-105">
    <span className="text-[32px] text-background group-hover:text-hover">
      {value}
    </span>
    <div className="w-px h-8 bg-hover" />
    <span className="text-base text-background group-hover:text-hover">
      {label}
    </span>
  </div>
);

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: "--", hours: "--", minutes: "--", seconds: "--" });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0");
        const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0");
        const minutes = String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0");
        const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, "0");
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-3">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="w-[70px] h-[50px] flex flex-col items-center justify-center border border-foreground text-foreground transition-all hover:scale-110 hover:border-hover">
          <span className="text-xl font-semibold">{value}</span>
          <span className="text-xs uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default function HeroSection() {
  return (
    <section id="hero-section" className="relative flex items-center justify-center w-screen h-screen bg-background overflow-hidden">
      <div className="relative w-1/2 h-full flex flex-col items-center justify-center px-10">
        <Scene />

        <div className="text-2xl tracking-[12px] text-foreground mt-6">
          NATIONAL LEVEL MULTIFEST
        </div>

        <div className="flex items-center mt-8 gap-4">
          <div className="h-[50px] px-4 py-2 bg-foreground flex items-center justify-center text-background font-bold text-sm tracking-widest cursor-pointer hover:bg-accent transition-all">
            COMING SOON
          </div>

          <Countdown targetDate={new Date(2025, 3, 25, 0, 0, 0)} />

          <div className="flex items-center ml-6">
            <MapPin className="w-5 h-5 text-foreground" />
            <span className="text-foreground text-sm ml-2">
              Amritapuri Campus, Kollam, Kerala
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-[66px] bg-foreground">
        <div className="max-w-6xl mx-auto h-full flex justify-between items-center px-4 cursor-pointer">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
