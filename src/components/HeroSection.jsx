import Image from "next/image";
import HightechHelmet from "../../public/images/hightech-helmet.svg";
import { MapPin } from 'lucide-react';
import Scene from "./Scene";

const eventDates = ["25", "26", "27"];
const stats = [
  { value: "20K", label: "Footfall" },
  { value: "15Lakhs", label: "Worth Prizes" },
  { value: "30+", label: "Competitions" },
  { value: "20+", label: "Workshops" },
];

const DateBox = ({ day }) => (
  <div className="w-[37px] h-[30px] cursor-pointer border border-foreground inline-flex items-center justify-center transition-all hover:scale-110 hover:border-[#DE6604]">
    <span className="font-light text-foreground text-xl">{day}</span>
  </div>
);

const StatItem = ({ value, label }) => (
  <div className="flex items-center gap-3 group transition-all hover:scale-105">
    <span className="text-[32px] text-background group-hover:text-[#DE6604]">
      {value}
    </span>
    <div className="w-px h-8 bg-[#DE6604]" />
    <span className="text-base text-background group-hover:text-[#DE6604]">
      {label}
    </span>
  </div>
);

export default function HeroSection() {
  return (
    <section id="hero-section" className="relative flex items-center justify-center w-screen h-screen bg-background overflow-hidden">
      <div className="relative w-1/2 h-full flex flex-col items-center justify-center px-10">
        <Scene />

        <div
          className="text-2xl tracking-[12px] text-foreground mt-6"
        >
          NATIONAL LEVEL MULTIFEST
        </div>

        <div className="flex items-center mt-8 gap-4">
          <div className="w-[63px] h-[30px] bg-foreground flex cursor-pointer items-center transition-all hover:bg-accent justify-center">
            <span className="font-bold text-background text-2xl">MAR</span>
          </div>

          <div className="flex gap-2">
            {eventDates.map((day) => (
              <DateBox key={day} day={day} />
            ))}
          </div>

          <div className="flex items-center ml-6">
            <MapPin className="w-5 h-5 text-foreground" />
            <span className="text-foreground text-sm ml-2">
              Amritapuri Campus, Kollam, Kerala
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-[66px] bg-foreground">
        <div
          className="max-w-6xl mx-auto h-full flex justify-between items-center px-4 cursor-pointer"
        >
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};
