import type { ReactNode } from "react";
import type { NavLink as LinkItem } from "@/lib/types/index";
import { DesktopNavbarClient } from "./DesktopNavbar.client";

interface DesktopNavbarProps {
  navLinks: readonly LinkItem[];
  logo: ReactNode;
}

export const DesktopNavbar = ({ navLinks, logo }: DesktopNavbarProps) => {
  // Logika podziału tablicy wykonana raz na serwerze
  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  return (
    <DesktopNavbarClient
      leftLinks={leftLinks}
      rightLinks={rightLinks}
      logo={logo}
    />
  );
};
