"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import MenuButton from "./MenuButton";
import Image from "next/image";
import logo from "../../public/images/logo.svg";

export default function NavBar() {
  const logoRef = useRef(null);
  const menuRef = useRef(null);

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

  return (
    <nav className="w-full h-24 md:h-36 fixed top-0 left-0 z-50 bg-transparent flex select-none">
      <div
        ref={logoRef}
        className="w-[26%] h-full flex items-center justify-center border-border border-b border-r"
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
      <div className="w-[48%] md:w-[62%] h-full flex items-center justify-center border-border border-b border-r" />
      <div
        ref={menuRef}
        className="w-[26%] md:w-[12%] h-full flex items-center justify-center border-border border-b cursor-pointer"
      >
        <MenuButton />
      </div>
    </nav>
  );
}
