"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import type { NavLink as LinkItem } from "@/lib/types/index";
import { AnimatedNavLink } from "../ui/AnimatedNavLink";
import { PatroniteLink } from "./PatroniteLink";

const navTransition = { type: "spring", stiffness: 260, damping: 30 } as const;
const navBaseStyle = "flex items-center rounded-full py-5";

interface DesktopNavbarClientProps {
  leftLinks: readonly LinkItem[];
  rightLinks: readonly LinkItem[];
  logo: ReactNode;
}

export const DesktopNavbarClient = ({
  leftLinks,
  rightLinks,
  logo,
}: DesktopNavbarClientProps) => {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);

  // Optymalizacja scrolla: passive listener i requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Obliczenia wartości animacji
  const navbarY = Math.min(scrollY * 0.3, 20);
  const navbarBlur = Math.min(12 + scrollY * 0.05, 24);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="hidden lg:block rounded-full overflow-hidden will-change-transform"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: navbarY, opacity: 1 }}
        transition={navTransition}
        style={{
          backdropFilter: `blur(${navbarBlur}px)`,
          WebkitBackdropFilter: `blur(${navbarBlur}px)`,
        }}
      >
        <nav
          aria-label="Główna nawigacja"
          className={`gap-x-5 xl:gap-x-6 px-10 ${navBaseStyle} glass-effect`}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {/* Lewa strona linków */}
          <ul className="flex items-center gap-x-5 xl:gap-x-6">
            {leftLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <AnimatedNavLink
                  key={link.href}
                  {...link}
                  isActive={isActive}
                  className="text-sm"
                />
              );
            })}
          </ul>

          {/* Logo (wstrzyknięte z serwera!) */}
          {logo}

          {/* Prawa strona linków */}
          <ul className="flex items-center gap-x-5 xl:gap-x-6">
            {rightLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <AnimatedNavLink
                  key={link.href}
                  {...link}
                  isActive={isActive}
                  className="text-sm"
                />
              );
            })}
            <li>
              <PatroniteLink />
            </li>
          </ul>
        </nav>
      </m.div>
    </LazyMotion>
  );
};
