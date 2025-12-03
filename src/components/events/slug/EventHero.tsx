import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import { FloatingMusicIcon, HeroProgressBar } from "./EventHeroDecorators";

interface EventHeroProps {
  children: React.ReactNode;
}

export const EventHero = ({ children }: EventHeroProps) => {
  return (
    <div className="relative z-10 h-full w-full">
      {/* Kontener layoutu (Renderowany na serwerze) */}
      <div className="container mx-auto flex h-full flex-col items-start justify-end px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8">
        {/* Wrapper treści */}
        <div className="relative max-w-5xl">
          {/* Wyspa: Pływająca ikona */}
          <FloatingMusicIcon />

          {/* Statyczny Glow Effect (CSS) */}
          <div className="pointer-events-none absolute -left-10 top-0 -z-10 h-full w-[120%] bg-linear-to-r from-arylideYellow/3 via-transparent to-transparent blur-3xl" />

          {/* Animacja wejścia tekstu (H1, P) */}
          <StaggerContainer staggerDelay={0.15}>
            <MotionWrapper variant="fadeUp" duration={0.8}>
              {children}
            </MotionWrapper>
          </StaggerContainer>
        </div>

        {/* Wyspa: Pasek postępu */}
        <HeroProgressBar />
      </div>
    </div>
  );
};
