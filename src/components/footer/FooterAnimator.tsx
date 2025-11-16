"use client";

import { domAnimation, LazyMotion, m } from "framer-motion"; // ZMIANA: Zaktualizowany import
import type { ReactNode } from "react";
import { gentleSpring } from "@/lib/animations";

interface FooterAnimatorProps {
  children: ReactNode;
}

export const FooterAnimator = ({ children }: FooterAnimatorProps) => {
  return (
    // ZMIANA: Owinięcie całego komponentu w LazyMotion, aby dostarczyć kontekst animacji
    // dla siebie i wszystkich komponentów-dzieci w stopce.
    <LazyMotion features={domAnimation}>
      <m.footer // ZMIANA: motion.footer -> m.footer
        className="relative overflow-hidden glass-effect"
        initial={{ y: 50, opacity: 0 }}
        // POLECANA ZMIANA: Użycie `whileInView` zamiast `animate`
        // sprawia, że animacja stopki uruchomi się dopiero, gdy użytkownik do niej przewinie.
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }} // Animacja uruchomi się raz, gdy 20% stopki będzie widoczne
        transition={{ ...gentleSpring, delay: 0.2 }}
      >
        {children}
      </m.footer>
    </LazyMotion>
  );
};
