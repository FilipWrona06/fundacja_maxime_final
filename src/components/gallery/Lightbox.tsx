"use client";

import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect } from "react";
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
  const currentImage = images[currentIndex];

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleNext, handlePrev, onClose]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: premiumEase }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-raisinBlack/95 backdrop-blur-xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Lightbox ze zdjęciami"
        >
          {/* Navigation buttons */}
          <div className="absolute inset-x-0 top-6 flex justify-between px-6 z-10">
            {images.length > 1 && (
              <m.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={gentleSpring}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
                aria-label="Poprzednie zdjęcie"
              >
                <FiChevronLeft size={24} />
              </m.button>
            )}

            <m.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={gentleSpring}
              className="ml-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
              aria-label="Zamknij lightbox"
            >
              <FiX size={24} />
            </m.button>
          </div>

          {images.length > 1 && (
            <m.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={gentleSpring}
              className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20 z-10"
              aria-label="Następne zdjęcie"
            >
              <FiChevronRight size={24} />
            </m.button>
          )}

          {/* Main image */}
          <m.div
            key={currentIndex}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={gentleSpring}
            className="relative h-[70vh] w-[90vw] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
              placeholder="blur"
              blurDataURL={currentImage.blurDataURL}
            />
          </m.div>

          {/* Counter and caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-2xl text-center space-y-2">
            <div className="inline-block rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm">
              <p className="text-sm font-semibold" aria-live="polite">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
            {currentImage.caption && (
              <p className="text-sm text-white/80 px-4">
                {currentImage.caption}
              </p>
            )}
          </div>
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
};
