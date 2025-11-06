// Plik: components/layout/Navbar.tsx
// UWAGA: Ten komponent pozostaje w 100% na serwerze. BRAK 'use client'.

import { headers } from 'next/headers';
import { navLinks } from '@/data/siteData';
import { DesktopNavbar } from '../navbar/DesktopNavbar';
import { MobileNavbar } from '../navbar/MobileNavbar';
import { Logo } from '../ui/Logo';

/**
 * Główny komponent nawigacji (Server Component).
 * Składa razem osobne komponenty dla widoku desktopowego i mobilnego.
 */
const Navbar = async () => {
  const heads = await headers();
  const pathname = heads.get('next-url') || '/'; // Domyślnie ustawiamy na '/', aby uniknąć pustego stringa

  // ZMIANA: Zastosowano bardziej zaawansowaną logikę do sprawdzania aktywnego linku.
  const processedNavLinks = navLinks.map(link => {
    // Strona główna musi pasować dokładnie.
    if (link.href === '/') {
      return { ...link, isActive: pathname === '/' };
    }
    // Wszystkie inne linki sprawdzamy, czy pathname zaczyna się od ich href.
    // To obsługuje podstrony (np. /blog/post-1 dla linku /blog).
    return {
      ...link,
      isActive: pathname.startsWith(link.href),
    };
  });

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center p-4 md:pt-5">
      <DesktopNavbar
        navLinks={processedNavLinks}
        logo={<Logo className="text-4xl shrink-0" />}
      />
      <MobileNavbar
        navLinks={processedNavLinks}
        logo={<Logo className="text-3xl" />}
      />
    </header>
  );
};

export default Navbar;``