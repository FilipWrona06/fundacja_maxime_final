// Plik: src/components/news/NewsHero.tsx

import { MotionWrapper } from "@/components/ui/MotionWrapper";

export interface NewsHeroProps {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
}

export const NewsHero = ({
  badge,
  titleLine1,
  titleLine2,
  description,
}: NewsHeroProps) => {
  return (
    <section className="mb-20">
      <div className="container mx-auto px-6">
        {/* 
          Używamy MotionWrapper jako kontenera animacji.
          Wszystko w środku jest renderowane na serwerze jako HTML.
          Klient tylko "przesuwa" ten HTML w górę przy wejściu.
        */}
        <MotionWrapper variant="fadeUp" duration={0.8} className="text-center">
          <span className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow">
            {badge}
          </span>

          <h1 className="mb-6 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl">
            <span className="font-youngest text-arylideYellow">
              {titleLine1}
            </span>
            <br />
            {titleLine2}
          </h1>

          <p className="mx-auto max-w-2xl text-xl text-white/60">
            {description}
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
};
