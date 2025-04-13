"use client";

import { ClockFading, CalendarDays, ArrowUpRight, ExternalLink, Tickets, Shirt } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Cube from "@/models/Cube";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


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
    <div className="flex justify-end items-center gap-7">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center justify-center">
          <span className="text-6xl font-sf">{value}</span>
          <span className="text-lg uppercase font-frontage-regular">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default function HeroSection() {
  const [cubeColor, setCubeColor] = useState("#f2f2f2");
  const sectionRef = useRef(null);

  useGSAP(() => {
    const boxes = gsap.utils.selector(sectionRef);
  
    boxes(".box").forEach((el) => {
      const textElements = el.querySelectorAll("p, svg, span");
    
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { backgroundColor: "var(--color-hover)", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-background)",
          stroke: "var(--color-background)",
          duration: 0.4,
          ease: "power2.out",
        });
    
        if (el.querySelector("canvas")) {
          setCubeColor("#0d0d0d");
        }
      });
    
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { backgroundColor: "transparent", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-foreground)",
          stroke: "var(--color-foreground)",
          duration: 0.4,
          ease: "power2.out",
        });
    
        if (el.querySelector("canvas")) {
          setCubeColor("#f2f2f2");
        }
      });
    });    
  }, [cubeColor]);  

  return (
    <section ref={sectionRef} className="h-screen w-full select-none">
      <div className="h-36 w-full" />
      <div 
        className="grid grid-cols-4 grid-rows-2 h-[calc(100%-9rem)] w-full relative"
        style={{ gridTemplateColumns: "26% 26% auto 12%", gridTemplateRows: "70% auto" }}
      >
        <div className="box border-border border-r border-b flex items-center justify-center relative cursor-pointer">
          <ClockFading className="w-20 h-20 stroke-[0.5px] text-foreground" />
          <div className="flex items-end justify-between w-full absolute bottom-3 right px-6">
            <p className="text-3xl font-frontage-regular">PAST VIDYUT'S</p>
            <ArrowUpRight className="w-12 h-12 stroke-1 text-foreground" />
          </div>
        </div>
        
        <div className="box border-border border-r border-b flex items-center justify-center relative cursor-pointer">
          <CalendarDays className="w-20 h-20 stroke-[0.5px] text-foreground" />
          <div className="flex items-end justify-between w-full absolute bottom-3 right px-6">
            <p className="text-3xl font-frontage-regular">VIEW EVENTS</p>
            <ArrowUpRight className="w-12 h-12 stroke-1 text-foreground" />
          </div>
        </div>
        
        <div className="box border-border border-b border-r row-span-2 flex flex-col justify-between">
          <p className="text-center h-[14%] flex items-center justify-center text-foreground text-7xl font-light border-border border-b">
            VIDYUT
          </p>
          <div className="flex flex-col items-center justify-center flex-grow">
            <Cube color={cubeColor} />
          </div>
          <div className="flex flex-col gap-12 px-12 py-6">
            <p className="text-foreground text-6xl font-frontage-regular">
              COMING
              <br />
              SOON
            </p>
            <div>
              <Countdown targetDate={new Date([2025, 5, 23])} />
            </div>
          </div>
        </div>

        <div className="box flex items-center justify-center row-span-2 cursor-pointer">
          <p className="uppercase -rotate-90 text-foreground font-frontage-bulb text-nowrap text-6xl">Register Now</p>
        </div>
        
        <div className="box border-border border-b border-r flex items-center justify-center relative w-full cursor-pointer">
          <Tickets className="h-32 w-30 stroke-[0.25px]" />
          <div className="absolute bottom-3 right-6">
            <ExternalLink className="h-7 w-7 stroke-1 text-foreground" />
          </div>
        </div>
        
        <div className="box border-border border-b border-r flex items-center justify-center relative w-full cursor-pointer">
          <Shirt className="h-32 w-30 stroke-[0.25px]" />
          <div className="absolute bottom-3 right-6">
            <ExternalLink className="h-7 w-7 stroke-1 text-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}
