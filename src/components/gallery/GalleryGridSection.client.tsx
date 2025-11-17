"use client";

import { domAnimation, LazyMotion, m, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { premiumEase, ultraSmoothSpring, viewportConfig } from "@/lib/animations";
import { Lightbox } from "./Lightbox";

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  blurDataURL: string;
}

interface GalleryGridData {
  title: string;
  date: string;
  location: string;
  images: ImageData[];
}

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const imageRevealVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: premiumEase,
    },
  },
};

export const GalleryGridSectionClient = ({
  galleryData,
  index,
}: {
  galleryData: GalleryGridData;
  index: number;
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blurY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const blurOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const formattedDate = new Date(galleryData.date).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={sectionRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ ...viewportConfig.once, margin: "-100px" }}
        variants={staggerContainerVariant}
        aria-labelledby={`gallery-${index}`}
        className="relative"
      >
        {/* Decorative blur - alternating sides */}
        <m.div
          style={{ y: blurY, opacity: blurOpacity }}
          className={`pointer-events-none absolute ${
            index % 2 === 0 ? "right-0" : "left-0"
          } top-1/3 h-80 w-80 rounded-full bg-arylideYellow/6 blur-3xl`}
        />

        <div className="relative z-10">
          {/* Event Header - compact & elegant */}
          <m.div variants={fadeInUpVariant} className="mb-10 sm:mb-12">
            {/* Title */}
            <h2
              id={`gallery-${index}`}
              className="mb-4 font-youngest text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight text-arylideYellow"
            >
              {galleryData.title}
            </h2>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-arylideYellow" size={16} />
                <time dateTime={galleryData.date}>{formattedDate}</time>
              </div>
              <span className="h-1 w-1 rounded-full bg-arylideYellow/40" />
              <div className="flex items-center gap-2">
                <FiMapPin className="text-arylideYellow" size={16} />
                <span>{galleryData.location}</span>
              </div>
            </div>
          </m.div>

          {/* Images Grid - Masonry style */}
          <m.div
            variants={staggerContainerVariant}
            className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6"
          >
            {galleryData.images.map((image, imageIndex) => {
              // First image is hero - takes 2x2 grid
              const isHero = imageIndex === 0;
              const gridClass = isHero ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : "col-span-1";
              const aspectClass = isHero ? "aspect-square" : "aspect-square";

              return (
                <m.button
                  key={image.src}
                  type="button"
                  variants={imageRevealVariant}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={ultraSmoothSpring}
                  onClick={() => setLightboxIndex(imageIndex)}
                  className={`group relative overflow-hidden rounded-2xl shadow-xl ${gridClass}`}
                  aria-label={`Otwórz zdjęcie: ${image.alt}`}
                >
                  {/* Glow effect */}
                  <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-linear-to-br from-arylideYellow/20 to-transparent opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Image container */}
                  <div className={`relative h-full w-full overflow-hidden rounded-2xl ${aspectClass}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={
                        isHero
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "(max-width: 768px) 50vw, 25vw"
                      }
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading={imageIndex === 0 ? "eager" : "lazy"}
                      priority={imageIndex === 0}
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/80 via-raisinBlack/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Caption on hover */}
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-sm font-medium text-white drop-shadow-lg">
                          {image.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </m.button>
              );
            })}
          </m.div>
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <Lightbox
            images={galleryData.images}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </m.section>
    </LazyMotion>
  );
};