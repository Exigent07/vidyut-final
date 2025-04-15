"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function CustomPointer() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverText, setHoverText] = useState("");
  const [showPointerEffect, setShowPointerEffect] = useState(false);
  const pointerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      setPosition({ x: clientX, y: clientY });

      gsap.to(pointerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseClick = () => {
      gsap.timeline()
        .to(pointerRef.current, {
          scale: 1.5,
          duration: 0.2,
          ease: "power1.out",
        })
        .to(pointerRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)",
        });
    };

    const handleMouseEnter = (event) => {
      const el = event.target;

      if (el.hasAttribute("require-text")) {
        setHoverText(el.getAttribute("require-text"));
        gsap.to(pointerRef.current, {
          scale: 4,
          paddingLeft: 20,
          paddingRight: 20,
          duration: 0.3,
        });
      } else if (el.hasAttribute("require-pointer")) {
        setShowPointerEffect(true);
        gsap.to(pointerRef.current, {
          scale: 1.2,
          duration: 0.3,
        });
      } else {
        gsap.to(pointerRef.current, {
          scale: 1.2,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      setHoverText("");
      setShowPointerEffect(false);

      gsap.to(pointerRef.current, {
        scale: 1,
        duration: 0.3,
        paddingLeft: 0,
        paddingRight: 0,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"]'
    );
    const allElements = document.querySelectorAll("*");

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    allElements.forEach((el) => {
      if (
        el.hasAttribute("require-text") ||
        el.hasAttribute("require-pointer")
      ) {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      }
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      allElements.forEach((el) => {
        if (
          el.hasAttribute("require-text") ||
          el.hasAttribute("require-pointer")
        ) {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
        }
      });
    };
  }, []);

  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={pointerRef}
      className={`pointer-events-none z-[100] fixed flex items-center justify-center 
                 mix-blend-difference h-4 w-4 rounded-full shadow-md
                 ${showPointerEffect ? "border-2" : ""}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        backgroundColor: "var(--color-foreground)",
        borderColor: showPointerEffect ? "var(--color-border)" : "transparent",
      }}
    >
      {hoverText && (
        <span
          className="text-[0.5rem] text-background text-center font-bold whitespace-nowrap"
          style={{ fontFamily: "var(--font-sf)" }}
        >
          {hoverText}
        </span>
      )}
    </div>
  );
}
