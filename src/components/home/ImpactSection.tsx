// Plik: src/components/home/ImpactSection.tsx

import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import { getImpactDynamicData } from "@/sanity/lib/queries/home";
import { ImpactCard, type ImpactCardItem } from "./ImpactCard"; // Importujemy typ z karty
import { ImpactCarouselClient } from "./ImpactCarousel";

export async function ImpactSection() {
  const impactData = await getImpactDynamicData();
  if (!impactData) return null;

  // LOGIKA PRZYGOTOWANIA DANYCH (SERVER SIDE)
  // ZMIANA: Zamiast ikon importowanych z react-icons, przekazujemy stringi
  const rawCards: (ImpactCardItem | null)[] = [
    impactData.upcomingEvent
      ? {
          title: "Najbliższe Wydarzenie",
          subtitle: impactData.upcomingEvent.title,
          description: `${impactData.upcomingEvent.dateDisplay} • ${impactData.upcomingEvent.location}`,
          image: impactData.upcomingEvent.image,
          link: `/wydarzenia/${impactData.upcomingEvent.slug.current}`,
          iconName: "calendar", // String zamiast funkcji
        }
      : null,
    impactData.latestNews
      ? {
          title: "Najnowszy Artykuł",
          subtitle: impactData.latestNews.title,
          description: `${impactData.latestNews.excerpt.slice(0, 80)}...`,
          image: impactData.latestNews.image,
          link: `/aktualnosci/${impactData.latestNews.slug.current}`,
          iconName: "file", // String zamiast funkcji
        }
      : null,
    impactData.latestGallery
      ? {
          title: "Ostatnie Wydarzenie",
          subtitle: impactData.latestGallery.title,
          description: `${new Date(impactData.latestGallery.date).toLocaleDateString("pl-PL")} • ${impactData.latestGallery.location}`,
          image: impactData.latestGallery.images?.[0],
          link: `/galeria#${impactData.latestGallery.slug.current}`,
          iconName: "camera", // String zamiast funkcji
        }
      : null,
  ];

  const cards = rawCards.filter((card): card is ImpactCardItem =>
    Boolean(card),
  );

  if (cards.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
      {/* Tła */}
      <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />
      <div className="absolute bottom-1/3 left-0 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        {/* NAGŁÓWEK */}
        <MotionWrapper
          variant="fadeUp"
          duration={0.7}
          className="mb-10 text-center sm:mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {impactData.headingPrefix && `${impactData.headingPrefix} `}
            <span className="font-youngest text-arylideYellow drop-shadow-lg">
              {impactData.headingHighlighted}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
            {impactData.subheading}
          </p>
        </MotionWrapper>

        {/* WIDOK MOBILNY (CLIENT SIDE - KARUZELA) */}
        {/* Teraz możemy bezpiecznie przekazać 'cards', bo to czysty JSON */}
        <ImpactCarouselClient cards={cards} />

        {/* WIDOK DESKTOP (SERVER SIDE - GRID) */}
        <StaggerContainer
          staggerDelay={0.1}
          className="hidden lg:grid grid-cols-3 gap-8"
        >
          {cards.map((card) => (
            <MotionWrapper key={card.title} variant="fadeUp" duration={0.6}>
              <ImpactCard card={card} />
            </MotionWrapper>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
