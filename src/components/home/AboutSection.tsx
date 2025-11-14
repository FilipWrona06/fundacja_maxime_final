import { getAboutSectionData } from "@/sanity/lib/get-data";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AboutSectionClient } from "./AboutSection.client";

/**
 * Asynchroniczny Komponent Serwerowy (RSC) dla sekcji "O nas".
 * 
 * Odpowiedzialności:
 * 1. Pobieranie danych z Sanity.
 * 2. Przygotowanie statycznych fragmentów JSX dla treści, obrazka i elementu statystyk.
 * 3. Przekazanie przygotowanych fragmentów do lekkiego Komponentu Klienckiego,
 *    który zajmie się wyłącznie warstwą interaktywną (animacje, eventy).
 */
export async function AboutSection() {
  const aboutData = await getAboutSectionData();

  if (!aboutData) {
    return null;
  }

  // Krok 1: Przygotowujemy statyczną treść tekstową.
  const staticContent = (
    <>
      <span className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow">
        {aboutData.smallHeading}
      </span>
      <h2
        id="about-heading"
        className="mb-8 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
      >
        <span className="block">{aboutData.headingPart1}</span>
        <span className="block font-youngest text-arylideYellow">
          {aboutData.headingPart2}
        </span>
        <span className="block">{aboutData.headingPart3}</span>
      </h2>
      <div className="space-y-6 text-lg leading-relaxed text-white/70">
        <p>{aboutData.paragraph1}</p>
        <p>{aboutData.paragraph2}</p>
      </div>
    </>
  );

  // Krok 2: Przygotowujemy statyczną część obrazka.
  const staticImage = (
    <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
      {aboutData.image && (
        <Image
          src={urlFor(aboutData.image).width(600).height(750).url()}
          alt={aboutData.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
          className="object-cover"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/60 via-transparent to-transparent" />
    </div>
  );
  
  // Krok 3: Przygotowujemy statyczny "dymek" ze statystyką.
  const staticStatsBubble = (
     <div className="absolute -bottom-8 -left-5 rounded-2xl border border-white/10 glass-effect p-8 md:-left-16 shadow-2xl">
        <p className="mb-2 font-youngest text-6xl text-arylideYellow">
          50+
        </p>
        <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
          Zorganizowanych Koncertów
        </p>
      </div>
  );

  // Krok 4: Renderujemy komponent kliencki, przekazując mu gotowe "klocki" JSX.
  return (
    <AboutSectionClient 
        staticContent={staticContent}
        staticImage={staticImage}
        staticStatsBubble={staticStatsBubble}
    />
  );
}