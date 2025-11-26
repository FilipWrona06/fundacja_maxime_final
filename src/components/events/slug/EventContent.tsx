// Plik: src/components/events/slug/EventContent.tsx

import { PortableText } from "@portabletext/react";
import { FiUser } from "react-icons/fi";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import type { EventType } from "@/lib/types/index";

export const EventContent = ({ event }: { event: EventType }) => {
  return (
    <MotionWrapper delay={0.2} variant="fadeUp">
      <div className="group relative overflow-hidden rounded-3xl border border-white/6 bg-linear-to-br from-white/8 to-white/2 p-6 shadow-premium backdrop-blur-2xl transition-all duration-500 hover:border-white/12 hover:shadow-2xl sm:p-10">
        {/* Multi-layer decorative glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-arylideYellow/4 blur-[100px] transition-opacity duration-700 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-oxfordBlue/6 blur-[120px]" />

        {/* Top accent line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-arylideYellow/20 to-transparent" />

        {/* Nagłówek sekcji z ikoną */}
        <div className="relative z-10 mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-arylideYellow/10 to-arylideYellow/5 border border-arylideYellow/20">
            <FiUser className="text-arylideYellow" size={20} />
          </div>
          <h2 className="font-youngest text-3xl text-white sm:text-4xl">
            O <span className="text-arylideYellow">wydarzeniu</span>
          </h2>
        </div>

        {/* Rich text content z premium prose styling */}
        <div className="prose prose-invert relative z-10 max-w-none text-lg leading-relaxed text-white/80 prose-p:my-5 prose-p:text-white/75 prose-headings:font-youngest prose-headings:text-arylideYellow prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-3xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-2xl prose-a:font-semibold prose-a:text-arylideYellow prose-a:no-underline prose-a:transition-all prose-a:duration-300 hover:prose-a:text-arylideYellow/80 hover:prose-a:underline prose-strong:font-bold prose-strong:text-white prose-ul:my-6 prose-ul:list-none prose-ul:space-y-3 prose-li:relative prose-li:pl-6 prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-2 prose-li:before:h-1.5 prose-li:before:w-1.5 prose-li:before:rounded-full prose-li:before:bg-arylideYellow/60">
          <PortableText value={event.description} />
        </div>

        {/* Sekcja Artysty - premium card */}
        {(event.artist || event.artistRole) && (
          <div className="relative z-10 mt-12 overflow-hidden rounded-2xl border border-white/6 bg-linear-to-br from-white/6 to-white/2 p-6 backdrop-blur-xl transition-all duration-500 hover:border-arylideYellow/20 hover:from-white/8 hover:to-white/4">
            {/* Subtle accent gradient */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-arylideYellow/2 via-transparent to-transparent" />

            <div className="relative flex items-start gap-5 sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-arylideYellow/30 bg-linear-to-br from-arylideYellow/15 to-arylideYellow/5 text-arylideYellow shadow-lg shadow-arylideYellow/10 transition-transform duration-500 hover:scale-110">
                <FiUser size={26} />
              </div>

              <div className="flex flex-col">
                {event.artist && (
                  <h3 className="text-2xl font-bold text-white transition-colors duration-300 hover:text-arylideYellow">
                    {event.artist}
                  </h3>
                )}
                {event.artistRole && (
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.15em] text-white/50">
                    {event.artistRole}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom subtle glow */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
      </div>
    </MotionWrapper>
  );
};
