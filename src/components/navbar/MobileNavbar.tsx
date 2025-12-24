// Plik: src/components/navbar/MobileNavbar.tsx
// (Scalony kod, zachowujemy "use client")

"use client";

import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  type Variants,
} from "framer-motion";
import { usePathname } from "next/navigation";
import {
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { NavLink as LinkItem } from "@/lib/types/index";
import { AnimatedNavLink } from "../ui/AnimatedNavLink"; // Upewnij się, że ścieżka jest poprawna
import { AnimatedMenuButton } from "./AnimatedMenuButton"; // Upewnij się, że ścieżka jest poprawna
import { PatroniteLink } from "./PatroniteLink"; // Upewnij się, że ścieżka jest poprawna

// --- STAŁE ---

const ultraSmoothTransition = {
  type: "spring",
  stiffness: 180,
  damping: 28,
  mass: 0.9,
} as const;

const skipLinkClasses =
  "sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-arylideYellow focus:text-raisinBlack focus:rounded-lg focus:shadow-lg focus:font-bold focus:outline-none focus:ring-2 focus:ring-arylideYellow/50";

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
      when: "afterChildren",
      duration: 0.3,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.08,
      staggerDirection: 1,
      when: "beforeChildren",
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

// --- HOOK POMOCNICZY (można go wynieść do osobnego pliku src/hooks/useOnClickOutside.ts dla czystości) ---
const useOnClickOutside = (
  refs: ReadonlyArray<RefObject<HTMLElement | null>>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  const savedHandler = useRef(handler);
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const listener = (event: MouseEvent | TouchEvent) => {
      if (refs.some((ref) => ref.current?.contains(event.target as Node)))
        return;
      savedHandler.current(event);
    };
    document.addEventListener("mousedown", listener, { passive: true });
    document.addEventListener("touchstart", listener, { passive: true });
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs]);
};

// --- GŁÓWNY KOMPONENT ---

interface MobileNavbarProps {
  navLinks: readonly LinkItem[];
  logo: ReactNode;
}

export const MobileNavbar = ({ navLinks, logo }: MobileNavbarProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announceMessage, setAnnounceMessage] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const MOBILE_MENU_ID = "mobile-menu";
  const MOBILE_MENU_HEADING_ID = "mobile-menu-heading";

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setAnnounceMessage("Menu zamknięte");
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev;
      setAnnounceMessage(newState ? "Menu otwarte" : "Menu zamknięte");
      return newState;
    });
  }, []);

  useOnClickOutside([mobileMenuRef, menuButtonRef], closeMobileMenu);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const lastActiveElement = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    // Pobieramy elementy bezpiecznie wewnątrz useEffect
    const mainContent = document.querySelector<HTMLElement>("#main-content");
    const footer = document.querySelector<HTMLElement>("footer");

    if (mainContent) mainContent.setAttribute("inert", "");
    if (footer) footer.setAttribute("inert", "");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        setTimeout(() => menuButtonRef.current?.focus(), 100);
        return;
      }
      if (event.key === "Tab") {
        const menuNode = mobileMenuRef.current;
        if (!menuNode) return;
        const focusableElements = Array.from(
          menuNode.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          ),
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      if (mainContent) mainContent.removeAttribute("inert");
      if (footer) footer.removeAttribute("inert");
      document.removeEventListener("keydown", handleKeyDown);
      setTimeout(() => lastActiveElement?.focus(), 100);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="lg:hidden w-full">
        <a href="#main-content" className={skipLinkClasses}>
          Przejdź do treści
        </a>
        <output aria-live="polite" aria-atomic="true" className="sr-only">
          {announceMessage}
        </output>

        <m.nav
          aria-label="Główna nawigacja mobilna"
          className="relative z-50 w-full justify-between px-4 sm:px-6 md:px-10 flex items-center rounded-full py-2.5 glass-effect overflow-hidden"
          initial={{ y: -100, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={ultraSmoothTransition}
        >
          {/* Logo przekazane z serwera */}
          {logo}

          <AnimatedMenuButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            buttonRef={menuButtonRef}
          />
        </m.nav>

        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <m.div
              key="mobile-menu"
              ref={mobileMenuRef}
              id={MOBILE_MENU_ID}
              role="dialog"
              aria-modal="true"
              aria-labelledby={MOBILE_MENU_HEADING_ID}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden glass-effect backdrop-blur-xl"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              onAnimationComplete={(definition) => {
                if (definition === "visible") {
                  const firstFocusable =
                    mobileMenuRef.current?.querySelector<HTMLElement>(
                      "a[href], button:not([disabled])",
                    );
                  setTimeout(() => {
                    firstFocusable?.focus();
                  }, 50);
                }
              }}
            >
              <h2 id={MOBILE_MENU_HEADING_ID} className="sr-only">
                Nawigacja mobilna
              </h2>

              <ul className="flex flex-col items-center space-y-5 sm:space-y-7 relative z-10 px-6">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <AnimatedNavLink
                      key={link.href}
                      {...link}
                      isActive={isActive}
                      isMobile
                      onClick={closeMobileMenu}
                    />
                  );
                })}
                <m.div
                  className="pt-5 sm:pt-7"
                  initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: navLinks.length * 0.08 + 0.15,
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <PatroniteLink isMobile onClick={closeMobileMenu} />
                </m.div>
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
};
