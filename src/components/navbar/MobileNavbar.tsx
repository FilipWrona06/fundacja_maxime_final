import type { NavLink as LinkItem } from "@/lib/types/index";
import type { ReactNode } from "react";
import { MobileNavbarClient } from "./MobileNavbar.client";

interface MobileNavbarProps {
  navLinks: readonly LinkItem[];
  logo: ReactNode;
}

export const MobileNavbar = (props: MobileNavbarProps) => {
  // Przekazujemy propsy 1:1, ale ten plik działa jako
  // "Server Component Wrapper", co pozwala na renderowanie logo na serwerze.
  return <MobileNavbarClient {...props} />;
};