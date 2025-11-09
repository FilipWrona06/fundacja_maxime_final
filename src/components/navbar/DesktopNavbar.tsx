// Plik: components/navbar/DesktopNavbar.tsx
'use client';

// Importy React i Next.js
import { useState, useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Importy animacji i komponentów
import { motion } from 'framer-motion';
import type { NavLink as LinkItem } from '@/lib/types';
import { AnimatedNavLink } from '../ui/AnimatedNavLink';
import { PatroniteLink } from './PatroniteLink';

// --- Definicje typów i stałe ---
const navTransition = { type: 'spring', stiffness: 260, damping: 30 } as const;
const navBaseStyle = "flex items-center rounded-full py-5";

interface DesktopNavbarProps {
  navLinks: readonly LinkItem[];
  logo: ReactNode;
}

/**
 * Komponent kliencki dla nawigacji desktopowej.
 * Samodzielnie określa aktywny link za pomocą hooka `usePathname`.
 */
export const DesktopNavbar = ({ navLinks, logo }: DesktopNavbarProps) => {
  const pathname = usePathname();
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
      // POPRAWKA: Dodano `rounded-full` i `overflow-hidden` aby przyciąć efekt rozmycia
      className="hidden lg:block rounded-full overflow-hidden"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: navbarY, opacity: 1 }}
      transition={navTransition}
      style={{ backdropFilter: `blur(${navbarBlur}px)` }}
    >
      <nav aria-label="Główna nawigacja" className={`gap-x-5 xl:gap-x-6 px-10 ${navBaseStyle} glass-effect`} style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
        <ul className="flex items-center gap-x-5 xl:gap-x-6">
          {leftLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
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
        
        {logo}
        
        <ul className="flex items-center gap-x-5 xl:gap-x-6">
          {rightLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <AnimatedNavLink
                key={link.href}
                {...link}
                isActive={isActive}
                className="text-sm"
              />
            );
          })}
          <li><PatroniteLink /></li>
        </ul>
      </nav>
    </motion.div>
  );
};