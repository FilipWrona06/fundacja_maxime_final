import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { getAboutSectionData } from "@/sanity/lib/get-data";
import { urlFor } from "@/sanity/lib/image";
import { AboutSectionClient } from "./AboutSection.client";

const createStaticContent = (data: {
  smallHeading: string;
  headingPart1: string;
  headingPart2: string;
  headingPart3: string;
  paragraph1: string;
  paragraph2: string;
}) => (
  <div className="space-y-6">
    {/* Small heading */}
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-arylideYellow sm:text-sm">
      <span className="h-px w-8 bg-arylideYellow" />
      {data.smallHeading}
    </span>

    {/* Main heading */}
    <h2
      id="about-heading"
      className="space-y-2 text-[2rem] font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]"
    >
      <span className="block text-white">{data.headingPart1}</span>
      <span className="block font-youngest text-arylideYellow">
        {data.headingPart2}
      </span>
      <span className="block text-white">{data.headingPart3}</span>
    </h2>

    {/* Paragraphs */}
    <div className="space-y-4 pt-2 sm:space-y-6 sm:pt-4">
      <p className="text-base leading-relaxed text-white/70 sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed">
        {data.paragraph1}
      </p>
      <p className="text-base leading-relaxed text-white/70 sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed">
        {data.paragraph2}
      </p>
    </div>
  </div>
);

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

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/60 via-raisinBlack/20 to-transparent" />
  </div>
);

const createStaticStatsBubble = () => (
  <div className="absolute -bottom-6 -left-2.5 w-auto sm:-bottom-8 sm:right-4 md:-bottom-8 md:-left-12 md:right-auto lg:-left-16 xl:-left-20">
    <div className="group/stats relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-arylideYellow/30 hover:bg-white/8 sm:rounded-2xl sm:p-6 md:p-8">
      {/* Content */}
      <div className="relative">
        <p className="bg-linear-to-br from-arylideYellow to-arylideYellow/80 bg-clip-text font-youngest text-[1.75rem] font-bold text-transparent sm:mb-2 sm:text-5xl md:text-6xl lg:text-7xl">
          50+
        </p>
        <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-white/60 transition-colors duration-300 group-hover/stats:text-white/80 sm:text-sm sm:font-bold">
          Zorganizowanych Koncertów
        </p>
      </div>
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