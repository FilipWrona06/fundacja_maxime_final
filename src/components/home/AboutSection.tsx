import { getAboutSectionData } from "@/sanity/lib/get-data";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { AboutSectionClient } from "./AboutSection.client";

// Lepsza organizacja przez funkcje pomocnicze
const createStaticContent = (data: any) => (
  <>
    <span className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow">
      {data.smallHeading}
    </span>
    <h2
      id="about-heading"
      className="mb-8 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
    >
      <span className="block">{data.headingPart1}</span>
      <span className="block font-youngest text-arylideYellow">
        {data.headingPart2}
      </span>
      <span className="block">{data.headingPart3}</span>
    </h2>
    {/* ZMIANA (RWD): Mniejszy tekst na mobile */}
    <div className="space-y-6 text-base leading-relaxed text-white/70 md:text-lg">
      <p>{data.paragraph1}</p>
      <p>{data.paragraph2}</p>
    </div>
  </>
);

const createStaticImage = (data: any) => (
  <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
    {data.image && (
      <Image
        src={urlFor(data.image).width(600).height(750).url()}
        alt={data.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
        className="object-cover"
        loading="lazy"
      />
    )}
    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/60 via-transparent to-transparent" />
  </div>
);

const createStaticStatsBubble = () => (
  // ZMIANA (RWD): Całkowicie zmieniono pozycjonowanie dla lepszej responsywności.
  // Teraz jest bezpiecznie wewnątrz kontenera na mobile i "wystaje" tylko na desktopie.
  <div className="absolute -bottom-8 right-4 w-auto rounded-2xl border border-white/10 p-6 shadow-2xl glass-effect md:-bottom-8 md:-left-16 md:right-auto md:p-8">
    {/* ZMIANA (RWD): Responsywna czcionka */}
    <p className="mb-2 font-youngest text-5xl text-arylideYellow md:text-6xl">
      50+
    </p>
    <p className="whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-white/60">
      Zorganizowanych Koncertów
    </p>
  </div>
);

export async function AboutSection() {
  const aboutData = await getAboutSectionData();

  if (!aboutData) {
    return null;
  }

  // Przekazujemy gotowe "klocki" JSX, tak jak wcześniej, ale tworzone przez czystsze funkcje.
  return (
    <AboutSectionClient
      staticContent={createStaticContent(aboutData)}
      staticImage={createStaticImage(aboutData)}
      staticStatsBubble={createStaticStatsBubble()}
    />
  );
}