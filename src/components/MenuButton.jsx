"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MenuButton() {
  const containerRef = useRef(null);
  const squareRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      squareRefs.current.forEach((square) => {
        if (!square) return;

        const squareRect = square.getBoundingClientRect();
        const squareX = squareRect.left - rect.left + squareRect.width / 2;
        const squareY = squareRect.top - rect.top + squareRect.height / 2;

        const dx = squareX - mouseX;
        const dy = squareY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = 60;
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const x = (dx / distance) * force * 2;
          const y = (dy / distance) * force * 2;

          gsap.to(square, {
            x,
            y,
            duration: 0.2,
            ease: "power2.out",
          });
        } else {
          gsap.to(square, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    };

    const resetAll = () => {
      squareRefs.current.forEach((square) => {
        if (!square) return;
        gsap.to(square, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", resetAll);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", resetAll);
    };
  }, []);

  return (
    <div className="p-4">
      <div
        ref={containerRef}
        className="grid w-fit gap-2 md:gap-2.5"
        style={{
          gridTemplateColumns: `repeat(3, 10px)`,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (squareRefs.current[i] = el)}
            className="relative w-2 h-2 md:w-2.5 md:h-2.5 cursor-pointer"
          >
            <div className="absolute inset-0 bg-stroke cube-outer rounded-[2px]" />
            <div className="absolute inset-[2px] bg-background cube-inner rounded-[1px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
