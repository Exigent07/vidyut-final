"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import MenuButton from "./MenuButton";
import Image from "next/image";
import logo from "../../public/images/logo.svg";

export default function NavBar() {
  const logoRef = useRef(null);
  const centerRef = useRef(null);
  const menuRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const logoEl = logoRef.current;
    const menuEl = menuRef.current;

    const logoHover = () => {
      gsap.to(logoEl, {
        background: "var(--color-hover)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const logoLeave = () => {
      gsap.to(logoEl, {
        background: "transparent",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const menuHover = () => {
      gsap.to(menuEl, {
        background: "var(--color-hover)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(menuEl.querySelectorAll(".cube-outer"), {
        background: "var(--color-background)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(menuEl.querySelectorAll(".cube-inner"), {
        background: "var(--color-hover)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const menuLeave = () => {
      gsap.to(menuEl, {
        background: "transparent",
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(menuEl.querySelectorAll(".cube-outer"), {
        background: "var(--color-stroke)",
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(menuEl.querySelectorAll(".cube-inner"), {
        background: "var(--color-background)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    logoEl?.addEventListener("mouseenter", logoHover);
    logoEl?.addEventListener("mouseleave", logoLeave);
    menuEl?.addEventListener("mouseenter", menuHover);
    menuEl?.addEventListener("mouseleave", menuLeave);

    return () => {
      logoEl?.removeEventListener("mouseenter", logoHover);
      logoEl?.removeEventListener("mouseleave", logoLeave);
      menuEl?.removeEventListener("mouseenter", menuHover);
      menuEl?.removeEventListener("mouseleave", menuLeave);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if user is near the bottom of the page (footer)
      const isAtBottom = scrollY + windowHeight >= documentHeight - 100;
      
      // Show navbar if at top or at bottom (footer)
      if ((scrollY <= 200 || isAtBottom) && scrolled) {
        setScrolled(false);
        gsap.to(logoRef.current, {
          y: "0%",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(centerRef.current, {
          y: "0%",
          duration: 0.25,
          ease: "power2.out",
        });
      } 
      // Hide navbar when scrolling through middle of page
      else if (scrollY > 200 && !isAtBottom && !scrolled) {
        setScrolled(true);
        gsap.to(logoRef.current, {
          y: "-100%",
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(centerRef.current, {
          y: "-100%",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav className="w-full h-24 md:h-36 fixed top-0 left-0 z-50 bg-transparent flex select-none">
      <div
        ref={logoRef}
        className="w-[26%] h-full flex items-center justify-center bg-background border-border border-b border-r"
      >
        <div className="h-20 flex items-center justify-center">
          <Image
            alt="Logo"
            src={logo}
            className="w-10 sm:w-14 md:w-auto h-full object-contain mix-blend-difference"
            priority
          />
        </div>
      </div>
      <div
        ref={centerRef}
        className="w-[48%] md:w-[62%] h-full flex items-center bg-background justify-center border-border border-b border-r"
      />
      <div
        ref={menuRef}
        className="w-[26%] md:w-[12%] h-full flex items-center bg-background justify-center border-border border-b border-l require-pointer"
      >
        <MenuButton />
      </div>
    </nav>
  );
}