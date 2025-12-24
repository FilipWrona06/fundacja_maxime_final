"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { premiumEase, ultraSmoothSpring } from "@/lib/animations";

// Dynamiczny import Lightboxa (Lazy Loading)
const DynamicLightbox = dynamic(() =>
  import("./Lightbox").then((mod) => mod.Lightbox),
);

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  blurDataURL: string;
}

const imageRevealVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: premiumEase },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

export const GalleryImageGrid = ({
  images,
  isEven,
}: {
  images: ImageData[];
  isEven: boolean;
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative">
        {/* --- DESKTOP GRID --- */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainerVariant}
          className={`hidden lg:grid grid-cols-4 gap-4 auto-rows-[240px] ${
            !isEven ? "direction-rtl" : ""
          }`}
          style={!isEven ? { direction: "rtl" } : undefined}
        >
          {images.map((image, imageIndex) => {
            const isBig = imageIndex % 5 === 0;
            const gridClass = isBig
              ? "col-span-2 row-span-2"
              : "col-span-1 row-span-1";

            return (
              <m.button
                key={`${image.src}-${imageIndex}`}
                type="button"
                variants={imageRevealVariant}
                whileHover={{ y: -4, transition: ultraSmoothSpring }}
                onClick={() => setLightboxIndex(imageIndex)}
                className={`group relative overflow-hidden rounded-xl bg-raisinBlack/50 shadow-xl ${gridClass}`}
                style={!isEven ? { direction: "ltr" } : undefined}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={isBig ? "50vw" : "25vw"}
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full bg-black/60 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0 text-left">
                      <p className="text-sm text-white">{image.caption}</p>
                    </div>
                  )}
                </div>
              </m.button>
            );
          })}
        </m.div>

        {/* --- MOBILE SCROLL --- */}
        <div className="lg:hidden">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariant}
            className="relative -mx-4 px-4 sm:-mx-6 sm:px-6"
          >
            <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
              {images.map((image, imageIndex) => (
                <m.button
                  key={`${image.src}-${imageIndex}`}
                  type="button"
                  variants={imageRevealVariant}
                  onClick={() => setLightboxIndex(imageIndex)}
                  className="group relative shrink-0 snap-center"
                  style={{
                    width: imageIndex === 0 ? "85vw" : "70vw",
                    maxWidth: "400px",
                    aspectRatio: "4/5",
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg bg-raisinBlack">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 85vw, 50vw"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
                    {image.caption && (
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <p className="text-xs font-medium text-white/90 line-clamp-2">
                          {image.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </m.button>
              ))}
            </div>
          </m.div>
        </div>

        {/* --- LIGHTBOX --- */}
        {lightboxIndex !== null && (
          <DynamicLightbox
            images={images}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </div>
    </LazyMotion>
  );
};
