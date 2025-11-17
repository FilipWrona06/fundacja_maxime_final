import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { getAboutSectionData, getStatsSectionData } from "@/sanity/lib/get-data";
import { urlFor } from "@/sanity/lib/image";
import { AboutSectionClient } from "./AboutSection.client";
import { FiAward, FiMusic, FiUsers } from "react-icons/fi";
import type { Stat } from "@/lib/types";

const ICONS_MAP: { [key: string]: React.ElementType } = {
  Koncertów: FiMusic,
  Widzów: FiUsers,
  Nagród: FiAward,
};

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

const createMiniStats = (statsData: Stat[]) => (
  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-arylideYellow/30 hover:bg-white/8">
    <div className="grid grid-cols-3 divide-x divide-white/10">
      {statsData.map((stat) => {
        const Icon = ICONS_MAP[stat.label] || FiAward;
        return (
          <div
            key={stat.label}
            className="group/stat flex flex-col items-center justify-center px-3 py-4 text-center transition-colors duration-300 hover:bg-white/5 sm:px-4 sm:py-5"
          >
            {/* Icon */}
            <Icon
              size={16}
              className="mb-2 text-arylideYellow/70 transition-all duration-300 group-hover/stat:scale-110 group-hover/stat:text-arylideYellow sm:mb-3"
              aria-hidden="true"
            />
            
            {/* Number */}
            <p className="mb-1 bg-linear-to-br from-white to-white/80 bg-clip-text text-2xl font-bold text-transparent transition-transform duration-300 group-hover/stat:scale-105 sm:text-3xl">
              {stat.value}
            </p>
            
            {/* Label */}
            <p className="text-[0.6rem] font-medium uppercase tracking-wider text-white/50 transition-colors duration-300 group-hover/stat:text-arylideYellow/60 sm:text-xs">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
    
    {/* Corner accent */}
    <div className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-arylideYellow/20" />
  </div>
);

export async function AboutSection() {
  const aboutData = await getAboutSectionData();
  const statsData = await getStatsSectionData();

  if (!aboutData || !statsData) {
    return null;
  }

  return (
    <AboutSectionClient
      staticContent={createStaticContent(aboutData)}
      staticImage={createStaticImage(aboutData)}
      miniStats={createMiniStats(statsData)}
    />
  );
}