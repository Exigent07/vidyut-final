"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Carousel from "./Carousel";

export default function EventsSection() {
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
        className="grid grid-cols-2 grid-rows-2 h-screen w-full relative"
        style={{ gridTemplateColumns: "88% 12%", gridTemplateRows: "92% 8%"}}
      >
        <div className="flex flex-col items-center justify-center relative border-border border-r">
          <Carousel />
        </div>

        <div className="box flex w-full h-[calc(100%-6rem)] md:h-[calc(100%-9rem)] relative mt-24 md:mt-36 items-center justify-center row-span-2 cursor-pointer">
          <p className="uppercase h-full w-full flex items-center justify-center -rotate-90 text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            View Events
          </p>
        </div>

        <div className="box border-border border-t border-r border-b flex flex-col items-center justify-center">
          <p className="text-center text-4xl text-text-secondary font-proxima px-48 xs:px-22">
            The present in motion — experience it now.
          </p>
        </div>
      </div>
    </section>
  );
}
