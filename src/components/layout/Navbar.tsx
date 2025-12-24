// Plik: components/layout/Navbar.tsx

import { navLinks } from "@/data/siteData";
import { DesktopNavbar } from "../navbar/DesktopNavbar";
import { MobileNavbar } from "../navbar/MobileNavbar";
import { Logo } from "../ui/Logo";

/**
 * Główny komponent nawigacji (Server Component).
 * Składa razem osobne komponenty dla widoku desktopowego i mobilnego.
 * Nie wykonuje żadnej logiki - tylko przekazuje dane.
 */
const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center p-4 md:pt-5">
      {/* Przekazujemy surową listę linków i komponent Logo */}
      <DesktopNavbar
        navLinks={navLinks}
        logo={<Logo className="text-4xl shrink-0" />}
      />
      <MobileNavbar
        navLinks={navLinks}
        logo={<Logo className="text-[1.59rem] sm:text-3xl" />}
      />
    </header>
  );
};

export default Navbar;
