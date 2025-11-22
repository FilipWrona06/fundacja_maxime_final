// Plik: src/components/events/slug/EventContent.tsx

import { FiUser } from "react-icons/fi";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import type { EventType } from "@/lib/types/index";

export const EventContent = ({ event }: { event: EventType }) => {
  return (
    <MotionWrapper delay={0.2}>
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-white/20 sm:p-8">
        {/* Dekoracyjna poświata w tle (opcjonalnie) */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-arylideYellow/5 blur-[80px] transition-opacity duration-500 group-hover:opacity-70" />

        {/* Nagłówek sekcji */}
        <h2 className="relative z-10 mb-6 font-youngest text-3xl text-arylideYellow sm:text-4xl">
          O wydarzeniu
        </h2>

        {/* Treść opisu */}
        {/* whitespace-pre-wrap zapewnia, że entery z CMS są respektowane */}
        <div className="relative z-10 whitespace-pre-wrap text-lg leading-relaxed text-white/80">
          {event.description}
        </div>

        {/* Sekcja Artysty (wyświetlamy tylko jeśli dane istnieją) */}
        {(event.artist || event.artistRole) && (
          <div className="relative z-10 mt-10 border-t border-white/10 pt-8">
            <div className="flex items-start gap-4 sm:items-center">
              {/* Ikona artysty */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-arylideYellow/20 bg-arylideYellow/10 text-arylideYellow">
                <FiUser size={24} />
              </div>

              <div className="flex flex-col">
                {event.artist && (
                  <h3 className="text-2xl font-bold text-white">
                    {event.artist}
                  </h3>
                )}
                {event.artistRole && (
                  <p className="text-sm font-medium uppercase tracking-widest text-white/50">
                    {event.artistRole}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MotionWrapper>
  );
};
