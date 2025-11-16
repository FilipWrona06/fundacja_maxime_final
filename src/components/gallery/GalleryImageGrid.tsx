"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { softSpring } from "@/lib/animations";
import Lightbox from "./Lightbox";

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  blurDataURL: string;
}

interface Props {
  galleryId: string;
  images: ImageData[];
}

export default function GalleryImageGrid({ galleryId, images }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => {
          const isHero = index === 0 && images.length > 2;

          return (
            <motion.button
              key={`${galleryId}-${index}`}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...softSpring, delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLightboxIndex(index)}
              className={`group relative overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack ${
                isHero
                  ? "md:col-span-2 md:row-span-2 aspect-16/10"
                  : "aspect-square"
              }`}
              aria-label={`Otwórz zdjęcie: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  isHero
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
                placeholder="blur"
                blurDataURL={image.blurDataURL}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading={index < 3 ? "eager" : "lazy"}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/80 via-raisinBlack/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-semibold text-white">
                  {image.caption || "Zobacz pełny rozmiar"}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Lightbox - tylko gdy otwarty */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
