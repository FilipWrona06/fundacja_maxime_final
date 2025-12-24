import { FiCalendar } from "react-icons/fi";
import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import {
  FloatingMusicIcon,
  HeroBackgroundAnimator,
  ScrollIndicator,
} from "./WydarzeniaHeroDecorators";

interface WydarzeniaHeroProps {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  badgeText: string;
}

export const WydarzeniaHeroSection = ({
  titleLine1,
  titleLine2,
  subtitle,
  badgeText,
}: WydarzeniaHeroProps) => {
  return (
    <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* 1. Animowane tło (Wyspa Kliencka) */}
      <HeroBackgroundAnimator />

      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6">
        <StaggerContainer staggerDelay={0.15} delayChildren={0.1}>
          {/* Badge */}
          <MotionWrapper variant="fadeUp" className="mb-8 flex justify-center">
            <div className="group relative flex items-center gap-3 rounded-full border border-arylideYellow/20 bg-linear-to-r from-arylideYellow/8 to-arylideYellow/4 px-5 py-2 backdrop-blur-xl transition-all duration-500 hover:border-arylideYellow/40 hover:from-arylideYellow/12 hover:to-arylideYellow/6 hover:shadow-lg hover:shadow-arylideYellow/10">
              {/* Inner glow (CSS only) */}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-arylideYellow/0 via-arylideYellow/5 to-arylideYellow/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span className="relative flex items-center justify-center text-arylideYellow">
                <FiCalendar className="mr-2 h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  {badgeText}
                </span>
              </span>
            </div>
          </MotionWrapper>

          {/* Nagłówek H1 */}
          <MotionWrapper variant="fadeUp" className="relative mb-8">
            <h1 className="block">
              <span className="block font-youngest text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-white drop-shadow-2xl transition-all duration-700 hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                {titleLine1}
              </span>
              <span className="block font-youngest text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight bg-linear-to-r from-arylideYellow via-arylideYellow to-arylideYellow/80 bg-clip-text text-transparent drop-shadow-2xl transition-all duration-700 hover:drop-shadow-[0_0_30px_rgba(239,213,111,0.4)]">
                {titleLine2}
              </span>
            </h1>

            {/* Ikona nuty (Wyspa Kliencka) */}
            <FloatingMusicIcon />
          </MotionWrapper>

          {/* Opis */}
          <MotionWrapper variant="fadeUp">
            <p className="mx-auto max-w-2xl whitespace-pre-wrap text-lg leading-relaxed text-white/70 transition-colors duration-500 hover:text-white/85 sm:text-xl">
              {subtitle}
            </p>
          </MotionWrapper>

          {/* Wskaźnik scrolla (Wyspa Kliencka) */}
          <MotionWrapper
            variant="fadeUp"
            className="mt-20 flex justify-center sm:mt-24"
          >
            <ScrollIndicator />
          </MotionWrapper>
        </StaggerContainer>
      </div>
    </section>
  );
};
