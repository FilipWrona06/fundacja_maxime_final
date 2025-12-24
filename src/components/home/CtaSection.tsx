import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { FiCamera, FiHeart } from "react-icons/fi";
// Używamy naszych uniwersalnych wrapperów
import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import type { PortableTextContent } from "@/lib/types/index";
import { getCTASectionData } from "@/sanity/lib/queries/home";

// --- KONFIGURACJA ---
const ctaPortableTextComponents: PortableTextComponents = {
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

// --- HELPERY DLA PRZYCISKÓW (Statyczny HTML + Wrapper) ---

const PrimaryButton = ({ label, link }: { label: string; link: string }) => (
  // enableHover/enableTap daje nam sprężystość przy interakcji
  <MotionWrapper enableHover={true} enableTap={true}>
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-arylideYellow px-6 py-3 text-sm font-bold text-raisinBlack shadow-lg transition-all duration-300 hover:shadow-arylideYellow/30 sm:w-auto sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg"
    >
      <FiHeart className="h-4 w-4 sm:h-5 sm:w-5" />
      <span>{label}</span>
    </Link>
  </MotionWrapper>
);

const SecondaryButton = ({ label, link }: { label: string; link: string }) => (
  <MotionWrapper enableHover={true} enableTap={true}>
    <Link
      href={link}
      className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-arylideYellow/40 bg-transparent px-6 py-3 text-sm font-bold text-arylideYellow backdrop-blur-sm transition-all duration-300 hover:border-arylideYellow hover:bg-arylideYellow/10 sm:w-auto sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg"
    >
      <FiCamera className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  </MotionWrapper>
);

// --- GŁÓWNY KOMPONENT ---
export async function CTASection() {
  const ctaData = await getCTASectionData();

  if (!ctaData || !ctaData.heading || !ctaData.primaryButton) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-20 md:py-24 lg:py-32 xl:py-40"
      aria-labelledby="cta-heading"
    >
      {/* Tła statyczne */}
      <div className="absolute left-1/4 top-25 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        {/* Karta CTA z animacją wejścia */}
        <MotionWrapper
          variant="fadeUp"
          duration={0.7}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-arylideYellow/10 via-transparent to-oxfordBlue/20 p-8 text-center shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-12 md:p-16 lg:p-20 xl:p-24"
        >
          <StaggerContainer staggerDelay={0.1} delayChildren={0.2}>
            {/* Nagłówek */}
            <MotionWrapper variant="fadeUp">
              <h2
                id="cta-heading"
                className="font-youngest text-[2rem] leading-tight text-arylideYellow drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8"
              >
                {ctaData.heading}
              </h2>
            </MotionWrapper>

            {/* Tekst */}
            {ctaData.text && (
              <MotionWrapper variant="fadeUp">
                <div className="prose prose-invert mx-auto max-w-2xl text-[0.95rem] leading-relaxed text-white/80 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl mb-8">
                  <PortableText
                    value={ctaData.text as PortableTextContent}
                    components={ctaPortableTextComponents}
                  />
                </div>
              </MotionWrapper>
            )}

            {/* Przyciski */}
            <MotionWrapper variant="fadeUp">
              <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 md:gap-6">
                <PrimaryButton
                  label={ctaData.primaryButton.label}
                  link={ctaData.primaryButton.link}
                />

                {ctaData.secondaryButton && (
                  <SecondaryButton
                    label={ctaData.secondaryButton.label}
                    link={ctaData.secondaryButton.link}
                  />
                )}
              </div>
            </MotionWrapper>
          </StaggerContainer>
        </MotionWrapper>
      </div>
    </section>
  );
}
