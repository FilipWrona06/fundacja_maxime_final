// Plik: src/components/contact/ContactHeader.tsx
// (Usuń .client z nazwy pliku)

import { MotionWrapper } from "@/components/ui/MotionWrapper";

interface ContactHeaderProps {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
}

export const ContactHeader = ({
  badge,
  headingLine1,
  headingLine2,
  description,
}: ContactHeaderProps) => {
  return (
    <section className="mb-32">
      <div className="container mx-auto px-6">
        {/*
          Używamy MotionWrapper jako kontenera animacji.
          variant="fadeUp" idealnie odwzorowuje oryginalne y: 30 -> 0.
        */}
        <MotionWrapper variant="fadeUp" duration={0.8} className="text-center">
          {/* Badge */}
          <span className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow">
            {badge}
          </span>

          {/* Nagłówek */}
          <h1 className="mb-6 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl">
            <span className="font-youngest text-arylideYellow">
              {headingLine1}
            </span>
            <br />
            {headingLine2}
          </h1>

          {/* Opis */}
          <p className="mx-auto max-w-2xl text-xl text-white/60">
            {description}
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
};
