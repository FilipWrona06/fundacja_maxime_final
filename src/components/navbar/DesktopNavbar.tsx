// Plik: components/navigation/DesktopNavbar.tsx
'use client';

// Importy React i Next.js
import { useState, useEffect, type ReactNode } from 'react';
// ZMIANA: Usunięto import `usePathname`

// Importy animacji i komponentów
import { motion } from 'framer-motion';
import type { NavLink as LinkItem } from '@/data/siteData';
import { AnimatedNavLink } from '../ui/AnimatedNavLink';
import { PatroniteLink } from './PatroniteLink';
// ZMIANA: Usunięto import `Logo`

// --- Definicje typów i stałe ---
const navTransition = { type: 'spring', stiffness: 260, damping: 30 } as const;
const navBaseStyle = "flex items-center rounded-full py-5";

// ZMIANA: Zaktualizowany interfejs propsów
interface EnrichedLinkItem extends LinkItem {
  isActive: boolean;
}
interface DesktopNavbarProps {
  navLinks: readonly EnrichedLinkItem[];
  logo: ReactNode;
}

/**
 * Komponent kliencki ("wyspa") dla nawigacji desktopowej.
 * ZMIANY:
 * - Odbiera `logo` jako gotowy do wyrenderowania prop (ReactNode).
 * - Odbiera `navLinks` z już ustawioną flagą `isActive`.
 * - Usunięto hook `usePathname`, co zmniejsza bundle JS.
 */
export const DesktopNavbar = ({ navLinks, logo }: DesktopNavbarProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  const navbarY = Math.min(scrollY * 0.3, 20);
  const navbarBlur = Math.min(12 + scrollY * 0.05, 24);

  return (
    <motion.div
      className="hidden lg:block"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: navbarY, opacity: 1 }}
      transition={navTransition}
      style={{ backdropFilter: `blur(${navbarBlur}px)` }}
    >
      <nav aria-label="Główna nawigacja" className={`gap-x-5 xl:gap-x-6 px-10 ${navBaseStyle} glass-effect`} style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
        <ul className="flex items-center gap-x-5 xl:gap-x-6">
          {leftLinks.map((link) => (
            <AnimatedNavLink
              key={link.href}
              {...link}
              // ZMIANA: Używamy przekazanej flagi `isActive`
              isActive={link.isActive}
              className="text-sm"
            />
          ))}
        </ul>
        
        {/* ZMIANA: Renderujemy logo przekazane jako prop */}
        {logo}
        
        <ul className="flex items-center gap-x-5 xl:gap-x-6">
          {rightLinks.map((link) => (
            <AnimatedNavLink
              key={link.href}
              {...link}
              // ZMIANA: Używamy przekazanej flagi `isActive`
              isActive={link.isActive}
              className="text-sm"
            />
          ))}
          <li><PatroniteLink /></li>
        </ul>
      </nav>
    </motion.div>
  );
};