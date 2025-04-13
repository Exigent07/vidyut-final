"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Singer from "../../public/images/singer.jpg";
import Machine from "../../public/images/machine.jpg";
import Stage from "../../public/images/stage.jpg";

export default function EventsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const boxes = gsap.utils.selector(sectionRef);

    boxes(".box").forEach((el) => {
      const textElements = el.querySelectorAll("p, svg, span");

      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          backgroundColor: "var(--color-hover)",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(textElements, {
          color: "var(--color-background)",
          stroke: "var(--color-background)",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          backgroundColor: "transparent",
          duration: 0.4,
          ease: "power2.out",
        });
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
    <section
      ref={sectionRef}
      className="h-screen overflow-x-hidden w-full select-none"
    >
      <div
        className="grid h-screen w-full relative"
        style={{
          gridTemplateColumns: "26% 26% 26% 10% 12%",
          gridTemplateRows: "9rem auto",
        }}
      >
        <div className="relative h-screen row-span-2 col-span-1">
          <Image
            src={Stage}
            alt="Vidyut Stage"
            fill
            className="object-cover"
          />
        </div>

        <div className="box relative z-50 flex items-center justify-center col-span-3 border-border border-b border-r">
          <p className="text-center uppercase text-xl sm:text-3xl md:text-4xl tracking-widest font-frontage-regular">
            Looking back, <br /> Moving forward
          </p>
        </div>

        <div></div>

        <div className="relative">
          <Image
            src={Singer}
            alt="Performer"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative">
          <Image
            src={Machine}
            alt="Machine"
            fill
            className="object-cover"
          />
        </div>

        <div className="box flex items-center justify-center col-span-2 cursor-pointer">
          <p className="uppercase text-xl sm:text-3xl md:text-4xl lg:text-5xl font-frontage-bulb text-center text-foreground px-12">
            View Past Events
          </p>
        </div>

        <div className="opacity-0"></div>
      </div>
    </section>
  );
}
