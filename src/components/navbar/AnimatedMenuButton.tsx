// Plik: src/components/navbar/AnimatedMenuButton.tsx

"use client";

import { memo, type Ref } from "react";

interface AnimatedMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  buttonRef: Ref<HTMLButtonElement>;
}

export const AnimatedMenuButton = memo(
  ({ isOpen, onClick, buttonRef }: AnimatedMenuButtonProps) => {
    // Wspólne style dla linii, w tym 'cubic-bezier' imitujący premiumEase
    const lineBaseClass =
      "block h-0.5 w-full bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.45,0,0.55,1)] origin-center";

    return (
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        // active:scale-95 zastępuje whileTap={{ scale: 0.96 }}
        className="z-50 p-3 relative rounded-xl transition-all duration-200 hover:bg-arylideYellow/10 active:scale-95"
        aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <div className="flex flex-col justify-between w-6 h-5 relative z-10 overflow-hidden">
          {/* Górna linia: Obrót i przesunięcie w dół */}
          <span
            className={`${lineBaseClass} ${
              isOpen ? "rotate-45 translate-y-[9px]" : ""
            }`}
          />

          {/* Środkowa linia: Zanikanie i skalowanie */}
          <span
            className={`${lineBaseClass} ${
              isOpen ? "opacity-0 translate-x-full" : "opacity-100"
            }`}
          />

          {/* Dolna linia: Obrót i przesunięcie w górę */}
          <span
            className={`${lineBaseClass} ${
              isOpen ? "-rotate-45 -translate-y-[9px]" : ""
            }`}
          />
        </div>
      </button>
    );
  },
);

AnimatedMenuButton.displayName = "AnimatedMenuButton";
