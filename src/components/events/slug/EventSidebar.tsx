// Plik: src/components/events/slug/EventSidebar.client.tsx

"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
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
import { premiumEase } from "@/lib/animations"; // Upewnij się, że masz ten import lub użyj "easeOut"
import type { EventType } from "@/lib/types";

// --- WARIANTY ANIMACJI ---
const containerVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase || "easeOut",
      staggerChildren: 0.1, // Elementy listy pojawią się kaskadowo
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export const EventSidebar = ({ event }: { event: EventType }) => {
  // Sprawdzamy, czy wydarzenie już się odbyło
  const eventDate = new Date(`${event.date}T${event.time}:00`);
  const now = new Date();
  const isPastEvent = eventDate < now;

  // Logika ceny (czy darmowe?)
  const isFree =
    event.price?.toLowerCase().includes("wstęp wolny") ||
    event.price?.toLowerCase().includes("bezpłatne") ||
    event.price === "0";

  return (
    <LazyMotion features={domAnimation}>
      <m.aside
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <h3 className="mb-6 border-b border-white/10 pb-4 text-xl font-bold text-white">
            Szczegóły wydarzenia
          </h3>

          {/* --- LISTA SZCZEGÓŁÓW --- */}
          <ul className="space-y-6">
            {/* DATA */}
            <DetailRow
              icon={<FiCalendar />}
              label="Data"
              value={event.dateDisplay || event.date}
            />

            {/* GODZINA */}
            <DetailRow icon={<FiClock />} label="Godzina" value={event.time} />

            {/* LOKALIZACJA */}
            <m.li variants={itemVariants} className="flex gap-4">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-arylideYellow">
                <FiMapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-white/50">Lokalizacja</p>
                <p className="font-semibold text-white">{event.location}</p>
                {event.address && (
                  <p className="mt-1 text-xs text-white/60">{event.address}</p>
                )}
              </div>
            </m.li>

            {/* CENA (Wyświetlana w liście) */}
            <DetailRow
              icon={<FiTag />}
              label="Bilety"
              value={event.price}
              highlight={!isPastEvent} // Wyróżniamy cenę kolorem żółtym jeśli aktywne
            />
          </ul>

          {/* --- SEKCJA CTA (PRZYCISKI) --- */}
          <m.div
            variants={itemVariants}
            className="mt-8 border-t border-white/10 pt-6"
          >
            {isPastEvent ? (
              // STATUS: ZAKOŃCZONE
              <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-4 font-bold text-white/60 grayscale">
                <FiAlertCircle />
                <span>Wydarzenie zakończone</span>
              </div>
            ) : (
              // STATUS: AKTYWNE
              <div className="flex flex-col gap-3">
                <Link
                  href={isFree ? "#rezerwacja" : "#bilety"} // Tutaj podlinkuj swój system biletowy
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-arylideYellow px-6 py-4 font-bold text-raisinBlack transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(233,215,88,0.4)]"
                >
                  <span className="relative z-10">
                    {isFree ? "Zarezerwuj miejsce" : "Kup bilety teraz"}
                  </span>
                  <FiArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

                  {/* Efekt połysku na przycisku */}
                  <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>

                <p className="flex items-center justify-center gap-2 text-center text-xs text-white/40">
                  <FiCheckCircle className="text-green-500" />
                  <span>Gwarancja bezpiecznej transakcji</span>
                </p>
              </div>
            )}
          </m.div>
        </div>

        {/* Opcjonalnie: Dodatkowy widget pomocy lub kontaktu pod spodem */}
        <m.div variants={itemVariants} className="mt-6 text-center">
          <p className="text-sm text-white/50">
            Masz pytania?{" "}
            <Link
              href="/kontakt"
              className="text-arylideYellow hover:underline"
            >
              Skontaktuj się z nami
            </Link>
          </p>
        </m.div>
      </m.aside>
    </LazyMotion>
  );
};

// --- KOMPONENT POMOCNICZY WIERSZA TABELI ---
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
    <m.li variants={itemVariants} className="flex items-center gap-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
          highlight
            ? "bg-arylideYellow/20 text-arylideYellow"
            : "bg-white/10 text-arylideYellow"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-white/50">{label}</p>
        <p
          className={`font-semibold ${
            highlight ? "text-xl text-arylideYellow" : "text-white"
          }`}
        >
          {value}
        </p>
      </div>
    </m.li>
  );
}
