// Plik: src/components/events/slug/EventSidebar.tsx
// (Zmień rozszerzenie usuwając .client i usuń "use client" z góry)

import Link from "next/link";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiTag,
} from "react-icons/fi";

// Importujemy Twój wrapper (Island)
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import type { EventType } from "@/lib/types";

export const EventSidebar = ({ event }: { event: EventType }) => {
  // --- LOGIKA (wykonywana na serwerze) ---
  const eventDate = new Date(`${event.date}T${event.time}:00`);
  const now = new Date();
  const isPastEvent = eventDate < now;

  const hasTicketLink = !!event.ticketLink;

  const isFree =
    event.price?.toLowerCase().includes("wstęp wolny") ||
    event.price?.toLowerCase().includes("bezpłatne") ||
    event.price === "0";

  const buttonHref =
    hasTicketLink && event.ticketLink ? event.ticketLink : "/kontakt";

  const buttonLabel = hasTicketLink
    ? "Kup bilety online"
    : isFree
      ? "Zarezerwuj miejsce"
      : "Skontaktuj się z nami";

  // --- RENDEROWANIE (HTML wysyłany z serwera) ---
  return (
    // Animujemy wejście całego sidebara
    <MotionWrapper variant="slideLeft" delay={0.3} className="w-full">
      <aside>
        <div className="relative overflow-hidden rounded-3xl border border-white/6 bg-linear-to-br from-white/8 to-white/2 p-6 shadow-premium backdrop-blur-2xl sm:p-8">
          {/* Top accent line */}
          <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-arylideYellow/20 to-transparent" />

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-arylideYellow/4 blur-[80px]" />

          <h3 className="relative z-10 mb-8 border-b border-white/6 pb-4 text-xl font-bold text-white">
            Szczegóły <span className="text-arylideYellow">wydarzenia</span>
          </h3>

          <ul className="relative z-10 space-y-5">
            <DetailRow
              icon={<FiCalendar />}
              label="Data"
              value={event.dateDisplay || event.date}
            />
            <DetailRow icon={<FiClock />} label="Godzina" value={event.time} />
            <li className="group flex gap-4 transition-all duration-500">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-white/8 to-white/3 text-arylideYellow transition-all duration-500 group-hover:from-arylideYellow/15 group-hover:to-arylideYellow/5 group-hover:shadow-lg group-hover:shadow-arylideYellow/10">
                <FiMapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/50 transition-colors duration-300 group-hover:text-white/70">
                  Lokalizacja
                </p>
                <p className="font-bold text-white transition-colors duration-300 group-hover:text-arylideYellow">
                  {event.location}
                </p>
                {event.address && (
                  <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                    {event.address}
                  </p>
                )}
              </div>
            </li>
            <DetailRow
              icon={<FiTag />}
              label="Bilety"
              value={event.price}
              highlight={!isPastEvent}
            />
          </ul>

          {/* --- SEKCJA CTA --- */}
          <div className="relative z-10 mt-8 border-t border-white/6 pt-8">
            {isPastEvent ? (
              <div className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/6 bg-white/4 py-4 font-bold text-white/50 backdrop-blur-sm">
                <FiAlertCircle size={20} />
                <span>Wydarzenie zakończone</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  href={buttonHref}
                  target={hasTicketLink ? "_blank" : "_self"}
                  rel={hasTicketLink ? "noopener noreferrer" : undefined}
                  className="group/btn relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-linear-to-r from-arylideYellow to-arylideYellow/90 px-6 py-4 font-bold text-raisinBlack shadow-lg shadow-arylideYellow/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-arylideYellow/30 active:scale-100"
                >
                  {/* Hover overlay effect (CSS) */}
                  <span className="absolute inset-0 bg-linear-to-r from-white to-white/90 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />

                  <span className="relative z-10 transition-transform duration-300">
                    {buttonLabel}
                  </span>
                  <FiArrowRight className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-1" />
                </Link>

                <p className="flex items-center justify-center gap-2.5 text-center text-xs text-white/40">
                  <FiCheckCircle className="text-green-400" size={14} />
                  <span>
                    {hasTicketLink
                      ? "Bezpieczna transakcja zewnętrzna"
                      : "Gwarancja kontaktu z organizatorem"}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Bottom accent */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
        </div>

        {/* Contact link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/50">
            Masz pytania?{" "}
            <Link
              href="/kontakt"
              className="font-semibold text-arylideYellow transition-all duration-300 hover:text-arylideYellow/80 hover:underline"
            >
              Skontaktuj się z nami
            </Link>
          </p>
        </div>
      </aside>
    </MotionWrapper>
  );
};

// Helper jako zwykła funkcja zwracająca HTML (Server)
function DetailRow({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <li className="group flex items-center gap-4 transition-all duration-500">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
          highlight
            ? "bg-linear-to-br from-arylideYellow/20 to-arylideYellow/10 text-arylideYellow shadow-lg shadow-arylideYellow/10 group-hover:shadow-xl group-hover:shadow-arylideYellow/20"
            : "bg-linear-to-br from-white/8 to-white/3 text-arylideYellow group-hover:from-white/12 group-hover:to-white/6"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-white/50 transition-colors duration-300 group-hover:text-white/70">
          {label}
        </p>
        <p
          className={`font-bold transition-colors duration-300 ${
            highlight
              ? "text-xl text-arylideYellow"
              : "text-white group-hover:text-arylideYellow"
          }`}
        >
          {value}
        </p>
      </div>
    </li>
  );
}
