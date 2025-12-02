"use client"; // Zostawiamy, bo komponent obsługuje onClick (interakcję)

import Link from "next/link";
import { memo } from "react";

interface AnimatedNavLinkProps {
  href: string;
  name: string;
  isActive: boolean;
  isMobile?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AnimatedNavLink = memo(
  ({
    href,
    name,
    isActive,
    isMobile = false,
    className = "",
    onClick,
  }: AnimatedNavLinkProps) => {
    // Wspólne style dla paska (podkreślenia)
    const underlineBase =
      "absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full origin-center transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]";

    // Gradient paska
    const underlineGradient =
      "bg-gradient-to-r from-transparent via-arylideYellow to-transparent";

    // Stan aktywny paska
    const activeScale = isActive
      ? "scale-x-100 opacity-100"
      : "scale-x-0 opacity-0";

    if (isMobile) {
      return (
        // Usuwamy m.li - animację wejścia listy (stagger) najlepiej obsłużyć w rodzicu (MobileMenu)
        // lub dodać prostą klasę 'animate-in fade-in slide-in-from-bottom-2'
        <li className="block">
          <Link
            href={href}
            onClick={onClick}
            className={`
              relative block text-xl sm:text-2xl font-semibold 
              transition-colors duration-300 ease-out
              group w-fit
              ${className}
            `}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Tekst z efektem przesunięcia przy hover (imitacja whileHover={{ x: 6 }}) */}
            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-1.5 group-active:scale-95">
              {name}
            </span>

            {/* Mobile underline */}
            <span
              className={`${underlineBase} ${underlineGradient} ${activeScale}`}
            />
          </Link>
        </li>
      );
    }

    // Wersja desktopowa
    return (
      <li>
        <Link
          href={href}
          className={`
            group block py-1 relative transition-colors duration-300 ease-out
            ${isActive ? "font-semibold text-white" : "font-normal text-white/85 hover:text-white"}
            ${className}
          `}
          aria-current={isActive ? "page" : undefined}
        >
          <span className="inline-block relative">
            {name}

            {/* Premium underline z hover effectem */}
            <span
              className={`
                ${underlineBase} ${underlineGradient} shadow-lg shadow-arylideYellow/20
                scale-x-0 opacity-0
                group-hover:scale-x-100 group-hover:opacity-100
                ${isActive ? "scale-x-100! opacity-100!" : ""}
              `}
            />
          </span>
        </Link>
      </li>
    );
  },
);

AnimatedNavLink.displayName = "AnimatedNavLink";

export default AnimatedNavLink;
