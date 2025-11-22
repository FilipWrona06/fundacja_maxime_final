// Plik: src/components/ui/MotionWrapper.client.tsx

"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
// Importujemy Twój easing. Jeśli ścieżka jest inna, dostosuj ją.
// Jeśli nie masz tego pliku, na dole dodałem fallback.
import { premiumEase } from "@/lib/animations";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /**
   * Czy animacja ma się wykonać tylko raz? (Domyślnie: true)
   */
  once?: boolean;
  /**
   * Ile % elementu musi być widoczne, aby odpalić animację (0-1)
   */
  amount?: number;
}

// Domyślny wariant animacji (Fade Up)
const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20, // Lekkie przesunięcie w dół
    filter: "blur(4px)", // Opcjonalnie: delikatny blur na start wygląda bardzo "premium"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      // Używamy Twojego premiumEase lub fallbacka
      ease: premiumEase || [0.25, 1, 0.5, 1],
    },
  },
};

export const MotionWrapper = ({
  children,
  className = "",
  delay = 0,
  once = true,
  amount = 0.2, // Element zacznie się animować, gdy 20% będzie widoczne
}: MotionWrapperProps) => {
  return (
    // LazyMotion drastycznie zmniejsza rozmiar bundle'a JS,
    // ładując tylko funkcje potrzebne do animacji DOM.
    <LazyMotion features={domAnimation}>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount, margin: "0px 0px -50px 0px" }}
        transition={{ delay }}
        variants={defaultVariants}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};
