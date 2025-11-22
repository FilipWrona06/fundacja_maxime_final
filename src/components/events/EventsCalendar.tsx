// Plik: src/components/events/EventsCalendar.client.tsx

"use client";

import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiTag, // Ikona ceny
} from "react-icons/fi";
import type { EventType } from "@/lib/types";

// --- STAŁE I KONFIGURACJA ---

const MONTHS_PL = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const DAYS_PL = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nie"];

const EVENT_COLORS = [
  "#F4D06F", // Żółty
  "#9DD9F3", // Niebieski
  "#FF9DBF", // Różowy
  "#B794F6", // Fioletowy
  "#6EE7B7", // Zielony
  "#FB923C", // Pomarańczowy
];

const getEventColor = (eventId: string) => {
  let hash = 0;
  for (let i = 0; i < eventId.length; i++) {
    hash = eventId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % EVENT_COLORS.length);
  return EVENT_COLORS[index];
};

// --- WARIANTY ANIMACJI (To tutaj był problem) ---

// 1. Animacja pojedynczego elementu (pojawienie się z dołu)
const fadeVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// 2. Animacja kontenera listy (kaskadowe pojawianie się dzieci)
const listContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1, // KLUCZOWE: Musi być 1, inaczej cała lista jest niewidoczna!
    transition: {
      staggerChildren: 0.1, // Opóźnienie między elementami
      when: "beforeChildren",
    },
  },
  exit: { opacity: 0 },
};

interface EventsCalendarClientProps {
  allEvents: EventType[];
  upcomingEvents: EventType[];
}

export const EventsCalendarClient = ({
  allEvents,
  upcomingEvents,
}: EventsCalendarClientProps) => {
  // --- STAN ---
  const [isMounted, setIsMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setCurrentDate(new Date());
  }, []);

  // --- LOGIKA KALENDARZA ---
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysCount = lastDay.getDate();

    let startingDay = firstDay.getDay() - 1;
    if (startingDay === -1) startingDay = 6;

    return { daysCount, startingDay };
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return allEvents.filter((event) => event.date === dateStr);
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    if (selectedDate?.toDateString() === clickedDate.toDateString()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(clickedDate);
    }
  };

  if (!isMounted) {
    return (
      <section className="container mx-auto min-h-[600px] px-4 sm:px-6 lg:px-8">
        {/* Placeholder zapobiegający skokom layoutu */}
      </section>
    );
  }

  const { daysCount, startingDay } = getDaysInMonth(currentDate);
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <LazyMotion features={domAnimation}>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* NAGŁÓWEK SEKCJI */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-arylideYellow" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-arylideYellow">
                Kalendarz
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Repertuar{" "}
              <span className="font-youngest text-arylideYellow">Wydarzeń</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-white/70 md:text-right">
            Wybierz datę, aby zobaczyć szczegóły, lub przeglądaj listę
            nadchodzących koncertów obok.
          </p>
        </m.div>

        {/* GRID GŁÓWNY */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {/* --- LEWA KOLUMNA: KALENDARZ --- */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
              {/* Header Kalendarza */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-6 sm:p-8">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:scale-110 hover:border-arylideYellow/50 hover:bg-white/10 hover:text-arylideYellow"
                  aria-label="Poprzedni miesiąc"
                >
                  <FiChevronLeft size={24} />
                </button>

                <div className="text-center">
                  <AnimatePresence mode="wait">
                    <m.h3
                      key={currentDate.toISOString()}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="font-youngest text-3xl capitalize text-arylideYellow sm:text-4xl"
                    >
                      {MONTHS_PL[currentDate.getMonth()]}
                    </m.h3>
                  </AnimatePresence>
                  <p className="text-sm font-medium tracking-widest text-white/50">
                    {currentDate.getFullYear()}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:scale-110 hover:border-arylideYellow/50 hover:bg-white/10 hover:text-arylideYellow"
                  aria-label="Następny miesiąc"
                >
                  <FiChevronRight size={24} />
                </button>
              </div>

              {/* Dni Tygodnia */}
              <div className="grid grid-cols-7 gap-2 border-b border-white/5 bg-white/2 px-4 py-4 sm:px-8">
                {DAYS_PL.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-bold uppercase tracking-wider text-white/40"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Siatka Dni */}
              <div className="grid grid-cols-7 gap-2 p-4 sm:gap-4 sm:p-8">
                {[...Array(startingDay)].map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static spacers
                  <div key={`empty-${i}`} />
                ))}

                {[...Array(daysCount)].map((_, index) => {
                  const day = index + 1;
                  const date = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day,
                  );
                  const events = getEventsForDate(date);
                  const isToday =
                    new Date().toDateString() === date.toDateString();
                  const isSelected =
                    selectedDate?.toDateString() === date.toDateString();
                  const hasEvents = events.length > 0;

                  return (
                    <m.button
                      key={`day-${day}`}
                      onClick={() => handleDateClick(day)}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        relative flex aspect-square flex-col items-center justify-center rounded-xl border transition-all duration-300
                        ${
                          isSelected
                            ? "border-arylideYellow bg-arylideYellow text-raisinBlack shadow-lg shadow-arylideYellow/30"
                            : "border-transparent text-white"
                        }
                        ${
                          !isSelected && hasEvents
                            ? "bg-white/10 hover:border-arylideYellow/30 hover:bg-white/20"
                            : ""
                        }
                        ${
                          !isSelected && !hasEvents
                            ? "bg-white/2 hover:bg-white/5"
                            : ""
                        }
                        ${
                          isToday && !isSelected
                            ? "ring-1 ring-arylideYellow ring-inset"
                            : ""
                        }
                      `}
                    >
                      <span
                        className={`text-sm font-bold sm:text-lg ${
                          !isSelected && !hasEvents ? "text-white/20" : ""
                        }`}
                      >
                        {day}
                      </span>

                      {hasEvents && (
                        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                          {events.slice(0, 3).map((event) => (
                            <div
                              key={event._id}
                              className="h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5"
                              style={{
                                backgroundColor: isSelected
                                  ? "#1A1A1A"
                                  : getEventColor(event._id),
                              }}
                            />
                          ))}
                        </div>
                      )}

                      <AnimatePresence>
                        {hoveredDay === day && hasEvents && (
                          <m.div
                            initial={{ opacity: 0, y: 5, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[180px] -translate-x-1/2 rounded-lg border border-white/20 bg-raisinBlack/95 p-2 shadow-xl backdrop-blur-md hidden lg:block"
                          >
                            {events.map((e) => (
                              <div
                                key={e._id}
                                className="truncate text-[10px] text-white/90 mb-0.5 last:mb-0"
                              >
                                • {e.title}
                              </div>
                            ))}
                            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/20 bg-raisinBlack/95" />
                          </m.div>
                        )}
                      </AnimatePresence>
                    </m.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* --- PRAWA KOLUMNA: LISTA WYDARZEŃ (SIDEBAR) --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex h-[600px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm lg:h-[730px]">
              <h3 className="mb-6 flex shrink-0 items-center gap-3 text-xl font-bold text-white sm:text-2xl">
                <FiCalendar className="text-arylideYellow" />
                <span>{selectedDate ? "W tym dniu" : "Nadchodzące"}</span>
              </h3>

              <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
                <AnimatePresence mode="wait">
                  {selectedDate && selectedDateEvents.length > 0 ? (
                    // PRZYPADEK 1: Wybrano dzień z wydarzeniami
                    <m.div
                      key="selected-list"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeVariant}
                    >
                      <p className="mb-4 border-b border-white/10 pb-2 text-sm font-medium capitalize text-arylideYellow">
                        {selectedDate.toLocaleDateString("pl-PL", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                      <div className="space-y-3">
                        {selectedDateEvents.map((event) => (
                          <SidebarEventCard
                            key={event._id}
                            event={event}
                            color={getEventColor(event._id)}
                          />
                        ))}
                      </div>
                    </m.div>
                  ) : selectedDate && selectedDateEvents.length === 0 ? (
                    // PRZYPADEK 2: Wybrano pusty dzień
                    <m.div
                      key="empty-list"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeVariant}
                      className="flex h-full flex-col items-center justify-center text-center text-white/50"
                    >
                      <div className="mb-4 rounded-full bg-white/5 p-4">
                        <FiCalendar size={32} className="opacity-50" />
                      </div>
                      <p className="font-medium">Brak wydarzeń w tym dniu</p>
                      <button
                        type="button"
                        onClick={() => setSelectedDate(null)}
                        className="mt-4 text-sm font-bold text-arylideYellow underline transition-colors hover:text-white"
                      >
                        Pokaż wszystkie nadchodzące
                      </button>
                    </m.div>
                  ) : upcomingEvents.length > 0 ? (
                    // PRZYPADEK 3: Lista nadchodzących (Domyślny widok)
                    // Zmiana: Używamy listContainerVariant, który ma opacity: 1
                    <m.div
                      key="upcoming-list"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={listContainerVariant}
                      className="space-y-3"
                    >
                      {upcomingEvents.slice(0, 10).map((event) => (
                        <m.div key={event._id} variants={fadeVariant}>
                          <SidebarEventCard
                            event={event}
                            color={getEventColor(event._id)}
                          />
                        </m.div>
                      ))}
                    </m.div>
                  ) : (
                    // PRZYPADEK 4: Brak jakichkolwiek nadchodzących wydarzeń (Pusta baza)
                    <m.div
                      key="no-data"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeVariant}
                      className="flex h-full flex-col items-center justify-center text-center text-white/50"
                    >
                      <div className="mb-4 rounded-full bg-white/5 p-4">
                        <FiCalendar size={32} className="opacity-50" />
                      </div>
                      <p className="font-medium">Brak zaplanowanych wydarzeń</p>
                      <p className="mt-2 text-xs text-white/30">
                        Zajrzyj do nas wkrótce!
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

// --- KOMPONENT KARTY (Sidebar) ---
function SidebarEventCard({
  event,
  color,
}: {
  event: EventType;
  color: string;
}) {
  return (
    <Link
      href={`/wydarzenia/${event.slug.current}`}
      className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-1 hover:border-arylideYellow/30 hover:bg-white/10 hover:shadow-lg"
    >
      <div
        className="absolute bottom-0 left-0 top-0 w-1 transition-all duration-300 group-hover:w-1.5"
        style={{ backgroundColor: color }}
      />
      <div className="pl-3">
        <h4 className="mb-2 line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-arylideYellow">
          {event.title}
        </h4>
        <div className="space-y-1.5 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <FiCalendar className="shrink-0 text-arylideYellow/70" size={14} />
            <span>{event.dateDisplay || event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="shrink-0 text-arylideYellow/70" size={14} />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMapPin className="shrink-0 text-arylideYellow/70" size={14} />
            <span className="truncate">{event.location}</span>
          </div>
          {event.price && (
            <div className="flex items-center gap-2 text-arylideYellow/90 font-medium">
              <FiTag className="shrink-0" size={14} />
              <span>{event.price}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}