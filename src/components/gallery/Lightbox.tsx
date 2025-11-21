"use client";

import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom"; // IMPORTUJEMY PORTAL
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { gentleSpring, premiumEase } from "@/lib/animations";

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  blurDataURL: string;
}

interface LightboxProps {
  images: ImageData[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) => {
  const [mounted, setMounted] = useState(false);
  const currentImage = images[currentIndex];

  // 1. Upewniamy się, że jesteśmy po stronie klienta (DOM istnieje)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Blokujemy scroll strony

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Odblokowujemy scroll
    };
  }, [handleNext, handlePrev, onClose, mounted]);

  // Jeśli komponent nie jest zamontowany (SSR), nic nie renderujemy
  if (!mounted) return null;

  // 2. Używamy createPortal, aby wrzucić Lightbox bezpośrednio do <body>
  // Dzięki temu ignorujemy z-index i transform rodzica (sekcji)
  return createPortal(
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <m.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: premiumEase }}
          // Z-index 99999 na poziomie body gwarantuje przykrycie navbara
          className="fixed inset-0 z-99999 flex items-center justify-center bg-raisinBlack/95 backdrop-blur-xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Lightbox ze zdjęciami"
        >
          {/* --- PRZYCISKI STERUJĄCE --- */}

          {/* PRZYCISK ZAMKNIĘCIA (X) */}
          <m.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={gentleSpring}
            className="pointer-events-auto absolute right-4 top-4 z-100000 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:right-8 sm:top-8"
            aria-label="Zamknij lightbox"
          >
            <FiX size={28} />
          </m.button>

          {/* LEWA STRZAŁKA */}
          {images.length > 1 && (
            <m.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={gentleSpring}
              className="pointer-events-auto absolute left-2 top-1/2 z-100000 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:left-8"
              aria-label="Poprzednie zdjęcie"
            >
              <FiChevronLeft size={32} />
            </m.button>
          )}

          {/* PRAWA STRZAŁKA */}
          {images.length > 1 && (
            <m.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              transition={gentleSpring}
              className="pointer-events-auto absolute right-2 top-1/2 z-100000 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:right-8"
              aria-label="Następne zdjęcie"
            >
              <FiChevronRight size={32} />
            </m.button>
          )}

          {/* --- GŁÓWNE ZDJĘCIE --- */}
          <m.div
            key={currentIndex}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={gentleSpring}
            className="relative z-99999 h-[80vh] w-[85vw] max-w-6xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="90vw"
              className="object-contain drop-shadow-2xl"
              priority
              placeholder="blur"
              blurDataURL={currentImage.blurDataURL}
            />
          </m.div>

          {/* --- LICZNIK I PODPIS --- */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 z-100000 -translate-x-1/2 max-w-[90vw] text-center space-y-2">
            <div className="inline-block rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
              <p className="text-sm font-medium text-white/90">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
            {currentImage.caption && (
              <p className="text-sm text-white/80 drop-shadow-md px-4">
                {currentImage.caption}
              </p>
            )}
          </div>
        </m.div>
      </AnimatePresence>
    </LazyMotion>,
    document.body, // <-- KLUCZOWA ZMIANA: Renderujemy do body
  );
};
