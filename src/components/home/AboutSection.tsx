import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { FiAward, FiMusic, FiUsers } from "react-icons/fi";
// Importujemy zaktualizowany wrapper
import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
// Typy i narzędzia
import type { Stat } from "@/lib/types/index";
import { urlFor } from "@/sanity/lib/image";
import { getAboutSectionData } from "@/sanity/lib/queries/home";

// --- KONFIGURACJA ---
const aboutPortableTextComponents: PortableTextComponents = {
  types: {
    horizontalRule: () => <hr className="my-8 border-white/20" />,
    spacer: () => <div className="h-8" aria-hidden="true" />,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-arylideYellow underline transition-colors hover:text-arylideYellow/80"
        >
          {children}
        </a>
      );
    },
  },
};

const ICONS_MAP: { [key: string]: React.ElementType } = {
  Koncertów: FiMusic,
  Widzów: FiUsers,
  Nagród: FiAward,
};

// --- HELPERY RENDERUJĄCE CZYSTY HTML ---

const renderStaticImage = (data: {
  image: SanityImageSource;
  imageAlt: string;
}) => (
  // Dodajemy group-hover na shadow, żeby reagował na MotionWrapper
  <div className="relative aspect-4/5 overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl transition-shadow duration-500 group-hover:shadow-arylideYellow/10">
    {data.image && (
      <Image
        src={urlFor(data.image).width(800).height(1000).quality(90).url()}
        alt={data.imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        placeholder="blur"
        blurDataURL={urlFor(data.image).width(20).height(25).blur(10).url()}
      />
    )}
    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/60 via-raisinBlack/20 to-transparent" />
  </div>
);

const renderMiniStats = (statsData: Stat[]) => (
  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-arylideYellow/30 hover:bg-white/8">
    <div className="grid grid-cols-3 divide-x divide-white/10">
      {statsData.map((stat) => {
        const Icon = ICONS_MAP[stat.label] || FiAward;
        return (
          <div
            key={stat.label}
            className="group/stat flex flex-col items-center justify-center px-3 py-4 text-center transition-colors duration-300 hover:bg-white/5 sm:px-4 sm:py-5"
          >
            <Icon
              size={16}
              className="mb-2 text-arylideYellow/70 transition-all duration-300 group-hover/stat:scale-110 group-hover/stat:text-arylideYellow sm:mb-3"
            />
            <p className="mb-1 bg-linear-to-br from-white to-white/80 bg-clip-text text-2xl font-bold text-transparent transition-transform duration-300 group-hover/stat:scale-105 sm:text-3xl">
              {stat.value}
            </p>
            <p className="text-[0.6rem] font-medium uppercase tracking-wider text-white/50 transition-colors duration-300 group-hover/stat:text-arylideYellow/60 sm:text-xs">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
    <div className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-arylideYellow/20" />
  </div>
);

// --- GŁÓWNY KOMPONENT (SERVER COMPONENT) ---
export async function AboutSection() {
  const aboutData = await getAboutSectionData();

  if (!aboutData || !aboutData.stats) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32 xl:pt-24 xl:pb-40"
      aria-labelledby="about-heading"
    >
      {/* Tła dekoracyjne (Statyczny HTML, zero JS) */}
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* --- KOLUMNA LEWA: TREŚĆ --- */}
          <div className="order-2 lg:order-1">
            <StaggerContainer staggerDelay={0.1} delayChildren={0.2}>
              {/* Mały nagłówek */}
              <MotionWrapper variant="fadeUp">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-arylideYellow sm:text-sm mb-6">
                  <span className="h-px w-8 bg-arylideYellow" />
                  {aboutData.smallHeading}
                </span>
              </MotionWrapper>

              {/* Główny nagłówek */}
              <MotionWrapper variant="fadeUp">
                <h2
                  id="about-heading"
                  className="space-y-2 text-[2rem] font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] mb-6"
                >
                  <span className="block text-white">
                    {aboutData.headingPart1}
                  </span>
                  <span className="block font-youngest text-arylideYellow">
                    {aboutData.headingPart2}
                  </span>
                  <span className="block text-white">
                    {aboutData.headingPart3}
                  </span>
                </h2>
              </MotionWrapper>

              {/* Tekst (PortableText) */}
              <MotionWrapper variant="fadeUp">
                <div className="prose prose-invert max-w-none space-y-4 text-base leading-relaxed text-white/70 sm:space-y-6 sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed">
                  <PortableText
                    value={aboutData.paragraph1}
                    components={aboutPortableTextComponents}
                  />
                  {aboutData.paragraph2 && (
                    <PortableText
                      value={aboutData.paragraph2}
                      components={aboutPortableTextComponents}
                    />
                  )}
                </div>
              </MotionWrapper>
            </StaggerContainer>
          </div>

          {/* --- KOLUMNA PRAWA: OBRAZ I STATYSTYKI --- */}
          <div className="order-1 lg:order-2 relative">
            {/* 
               Wrapper dla zdjęcia: 
               - variant="scale" (animacja wejścia)
               - enableHover={true} (sprężyste podniesienie przy hoverze)
               - className="group" (pozwala dzieciom reagować na hover)
            */}
            <MotionWrapper
              variant="scale"
              duration={0.8}
              delay={0.2}
              enableHover={true}
              className="group"
            >
              {renderStaticImage(aboutData)}

              {/* Statystyki pozycjonowane absolutnie na zdjęciu */}
              <div className="absolute -bottom-6 -left-4 right-4 sm:-bottom-8 sm:left-4 sm:right-8 md:-bottom-10 md:-left-8 md:right-12 lg:-left-12 lg:right-16 z-10">
                {/* Własna animacja wejścia dla statystyk + własny hover */}
                <MotionWrapper
                  variant="fadeUp"
                  delay={0.5}
                  duration={0.6}
                  enableHover={true}
                >
                  {renderMiniStats(aboutData.stats)}
                </MotionWrapper>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
