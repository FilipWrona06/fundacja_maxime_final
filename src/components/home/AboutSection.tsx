import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { getAboutSectionData } from "@/sanity/lib/get-data";
import { urlFor } from "@/sanity/lib/image";
import { AboutSectionClient } from "./AboutSection.client";

// Helper function for content
const createStaticContent = (data: {
  smallHeading: string;
  headingPart1: string;
  headingPart2: string;
  headingPart3: string;
  paragraph1: string;
  paragraph2: string;
}) => (
  <div className="space-y-6">
    {/* Small heading with enhanced styling */}
    <span className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-arylideYellow sm:text-sm">
      <span className="h-px w-8 bg-arylideYellow transition-all duration-500 group-hover:w-12" />
      {data.smallHeading}
    </span>

    {/* Main heading with better responsiveness */}
    <h2
      id="about-heading"
      className="space-y-2 text-[2rem] font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]"
    >
      <span className="block text-white transition-colors duration-300 hover:text-white/90">
        {data.headingPart1}
      </span>
      <span className="block font-youngest text-arylideYellow drop-shadow-lg transition-all duration-300 hover:drop-shadow-2xl">
        {data.headingPart2}
      </span>
      <span className="block text-white transition-colors duration-300 hover:text-white/90">
        {data.headingPart3}
      </span>
    </h2>

    {/* Paragraphs with better spacing and typography */}
    <div className="space-y-4 pt-2 sm:space-y-6 sm:pt-4">
      <p className="text-base leading-relaxed text-white/70 transition-colors duration-300 hover:text-white/80 sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed">
        {data.paragraph1}
      </p>
      <p className="text-base leading-relaxed text-white/70 transition-colors duration-300 hover:text-white/80 sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed">
        {data.paragraph2}
      </p>
    </div>
  </div>
);

// Helper function for image
const createStaticImage = (data: {
  image: SanityImageSource;
  imageAlt: string;
}) => (
  <div className="group/image relative aspect-4/5 overflow-hidden rounded-2xl sm:rounded-3xl">
    {data.image && (
      <Image
        src={urlFor(data.image).width(800).height(1000).quality(90).url()}
        alt={data.imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
        className="object-cover transition-transform duration-700 group-hover/image:scale-105"
        loading="lazy"
        placeholder="blur"
        blurDataURL={urlFor(data.image).width(20).height(25).blur(10).url()}
      />
    )}

    {/* Enhanced gradient overlays */}
    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/80 via-raisinBlack/20 to-transparent opacity-80 transition-opacity duration-700 group-hover/image:opacity-60" />
    <div className="absolute inset-0 bg-linear-to-br from-arylideYellow/0 to-arylideYellow/10 opacity-0 transition-opacity duration-700 group-hover/image:opacity-100" />

    {/* Subtle noise texture overlay for depth */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 mix-blend-overlay" />
  </div>
);

// Helper function for stats bubble
const createStaticStatsBubble = () => (
  <div className="absolute -bottom-6 -left-2.5 w-auto sm:-bottom-8 sm:right-4 md:-bottom-8 md:-left-12 md:right-auto lg:-left-16 xl:-left-20">
    <div className="group/stats relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-arylideYellow/30 hover:bg-white/10 sm:rounded-2xl sm:p-6 md:p-8">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-arylideYellow/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/stats:opacity-100" />

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover/stats:translate-x-full" />

      {/* Content */}
      <div className="relative">
        <p className="bg-linear-to-br from-arylideYellow via-arylideYellow to-arylideYellow/80 bg-clip-text font-youngest text-[1.75rem] font-bold text-transparent drop-shadow-lg transition-all duration-500 group-hover/stats:scale-110 sm:mb-2 sm:text-5xl md:text-6xl lg:text-7xl">
          50+
        </p>
        <p className="whitespace-nowrap text-xs font-semibold sm:font-bold uppercase tracking-wider text-white/60 transition-colors duration-500 group-hover/stats:text-white/80 sm:text-sm">
          Zorganizowanych Koncertów
        </p>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-arylideYellow/20 transition-all duration-500 group-hover/stats:border-arylideYellow/40 sm:h-8 sm:w-8" />
    </div>
  </div>
);

export async function AboutSection() {
  const aboutData = await getAboutSectionData();

  if (!aboutData) {
    return null;
  }

  return (
    <AboutSectionClient
      staticContent={createStaticContent(aboutData)}
      staticImage={createStaticImage(aboutData)}
      staticStatsBubble={createStaticStatsBubble()}
    />
  );
}
