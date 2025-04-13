"use client";

import { ClockFading, CalendarDays, ArrowUpRight, ExternalLink, Tickets, Shirt } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ExplainSection() {
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
      });
    
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { backgroundColor: "transparent", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-foreground)",
          stroke: "var(--color-foreground)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });    
  }, []);  

  return (
    <section ref={sectionRef} className="h-screen overflow-x-hidden w-full select-none">
      <div 
        className="hidden md:grid grid-cols-3 grid-rows-1 h-screen w-full relative"
        style={{ gridTemplateColumns: "26% 62% 12%"}}
      >
        <div className="box border-border border-r border-b flex items-center justify-center relative">
          <p className="text-center text-3xl text-foreground font-frontage-regular">
            Converging Ideas, Creating Tomorrow.
          </p>
        </div>

        <div className="box border-border border-b border-r row-span-2 flex flex-col items-center justify-center">
          <p className="text-center text-4xl text-foreground font-frontage-bold px-48 xs:px-22">flex flex-col items-center justify-center
            Vidyut, a national multi-fest by Amrita Vishwa Vidyapeetham, fosters creativity with its 2025 theme, Echos of the future
          </p>
        </div>

        <div className="box flex w-full h-[calc(100%-6rem)] md:h-[calc(100%-9rem)] relative mt-24 md:mt-36 items-center justify-center row-span-2 cursor-pointer">
          <p className="uppercase h-full w-full flex items-center justify-center -rotate-90 text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            View Events
          </p>
        </div>
      </div>
    </section>
  );
}
