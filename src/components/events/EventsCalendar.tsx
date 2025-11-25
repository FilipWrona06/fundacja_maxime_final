"use client";

import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiTag,
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

// --- ELEGANCKIE WARIANTY ANIMACJI ---
const itemVariant: Variants = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

interface EventsCalendarClientProps {
  allEvents: EventType[];
}

export const EventsCalendarClient = ({
  allEvents,
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

  const futureEvents = useMemo(() => {
    if (!allEvents) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return allEvents
      .filter((event) => {
        const eventDate = new Date(event.date);
        if (Number.isNaN(eventDate.getTime())) return false;
        return eventDate >= today;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [allEvents]);

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

  // --- RENDEROWANIE SIDEBARA ---
  const renderSidebarContent = () => {
    if (selectedDate) {
      const eventsInSelectedDate = getEventsForDate(selectedDate);

      if (eventsInSelectedDate.length > 0) {
        return (
          <m.div
            key="selected"
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-full"
          >
            <p className="mb-6 border-b border-white/5 pb-3 text-sm font-semibold capitalize text-arylideYellow/90">
              {selectedDate.toLocaleDateString("pl-PL", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <div className="space-y-3">
              {eventsInSelectedDate.map((event, idx) => (
                <m.div
                  key={event._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <SidebarEventCard
                    event={event}
                    color={getEventColor(event._id)}
                  />
                </m.div>
              ))}
            </div>
          </m.div>
        );
      }

      return (
        <m.div
          key="empty-selected"
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex h-full flex-col items-center justify-center text-center text-white/40"
        >
          <div className="mb-6 rounded-2xl bg-white/3 p-6 backdrop-blur-sm">
            <FiCalendar size={40} className="opacity-40" />
          </div>
          <p className="mb-2 font-semibold text-white/50">
            Brak wydarzeń w tym dniu
          </p>
          <button
            type="button"
            onClick={() => setSelectedDate(null)}
            className="mt-6 text-sm font-semibold text-arylideYellow/80 transition-all duration-300 hover:text-arylideYellow"
          >
            Pokaż wszystkie nadchodzące →
          </button>
        </m.div>
      );
    }

    if (futureEvents.length > 0) {
      return (
        <m.div
          key="upcoming"
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-3"
        >
          {futureEvents.slice(0, 100).map((event, index) => (
            <m.div
              key={event._id}
              variants={itemVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.04 }}
            >
              <SidebarEventCard
                event={event}
                color={getEventColor(event._id)}
              />
            </m.div>
          ))}
        </m.div>
      );
    }

    return (
      <div className="flex h-full flex-col items-center justify-center text-center text-white/40">
        <div className="mb-6 rounded-2xl bg-white/3 p-6 backdrop-blur-sm">
          <FiCalendar size={40} className="opacity-40" />
        </div>
        <p className="font-semibold text-white/50">
          Brak zaplanowanych wydarzeń
        </p>
      </div>
    );
  };

  if (!isMounted) {
    return <section className="min-h-[600px]" />;
  }

  const { daysCount, startingDay } = getDaysInMonth(currentDate);

  // Generowanie tablicy dni, aby uniknąć używania indeksu jako klucza w mapowaniu
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);
  const emptyDaysArray = Array.from({ length: startingDay }, (_, i) => i);
  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  return (
    <LazyMotion features={domAnimation}>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-linear-to-r from-arylideYellow to-transparent" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-arylideYellow/70">
                Kalendarz
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Repertuar{" "}
              <span className="font-youngest text-arylideYellow">Wydarzeń</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/60 md:text-right">
            Wybierz datę, aby zobaczyć szczegóły, lub przeglądaj listę
            nadchodzących koncertów obok.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {/* KALENDARZ */}
          <div className="lg:col-span-2">
            <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-linear-to-br from-white/[0.07] to-white/2 shadow-2xl backdrop-blur-xl">
              {/* Subtelny gradient glow */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-arylideYellow/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative flex items-center justify-between border-b border-white/5 bg-white/2 p-6 sm:p-8 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-arylideYellow/30 hover:bg-arylideYellow/10 hover:text-arylideYellow"
                  aria-label="Poprzedni miesiąc"
                >
                  <FiChevronLeft size={20} />
                </button>
                <div className="text-center">
                  <AnimatePresence mode="wait">
                    <m.h3
                      key={currentDate.toISOString()}
                      initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="font-youngest text-3xl capitalize text-arylideYellow sm:text-4xl"
                    >
                      {MONTHS_PL[currentDate.getMonth()]}
                    </m.h3>
                  </AnimatePresence>
                  <p className="mt-1 text-xs font-semibold tracking-wider text-white/40">
                    {currentDate.getFullYear()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-arylideYellow/30 hover:bg-arylideYellow/10 hover:text-arylideYellow"
                  aria-label="Następny miesiąc"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 border-b border-white/5 bg-white/1 px-4 py-4 sm:px-8">
                {DAYS_PL.map((day) => (
                  <div
                    key={day}
                    className="text-center text-[10px] font-bold uppercase tracking-wider text-white/30"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 p-4 sm:gap-3 sm:p-8">
                {emptyDaysArray.map((i) => (
                  <div key={`empty-${monthKey}-${i}`} />
                ))}

                {daysArray.map((day) => {
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
                    <button
                      type="button"
                      // Poprawka: klucz zależy od wartości danych (dzień + miesiąc), a nie od indeksu pętli
                      key={`day-${monthKey}-${day}`}
                      onClick={() => handleDateClick(day)}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`
                        relative flex aspect-square flex-col items-center justify-center rounded-xl border transition-all duration-300
                        ${isSelected ? "border-arylideYellow/50 bg-linear-to-br from-arylideYellow to-arylideYellow/80 text-raisinBlack shadow-lg shadow-arylideYellow/20" : "border-transparent text-white/80"}
                        ${!isSelected && hasEvents ? "bg-white/8 hover:bg-white/12 hover:border-arylideYellow/20" : ""}
                        ${!isSelected && !hasEvents ? "bg-white/2 hover:bg-white/5" : ""}
                        ${isToday && !isSelected ? "ring-1 ring-arylideYellow/40" : ""}
                      `}
                    >
                      <span
                        className={`text-sm font-semibold transition-colors sm:text-base ${!isSelected && !hasEvents ? "text-white/20" : ""}`}
                      >
                        {day}
                      </span>
                      {hasEvents && (
                        <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1">
                          {events.slice(0, 3).map((event) => (
                            <div
                              key={event._id}
                              className="h-1 w-1 rounded-full transition-all duration-300 sm:h-1.5 sm:w-1.5"
                              style={{
                                backgroundColor: isSelected
                                  ? "rgba(26, 26, 26, 0.7)"
                                  : getEventColor(event._id),
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Tooltip elegancki */}
                      <AnimatePresence>
                        {hoveredDay === day && hasEvents && (
                          <m.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 hidden w-max max-w-[200px] -translate-x-1/2 rounded-xl border border-white/10 bg-raisinBlack/95 px-3 py-2 shadow-2xl backdrop-blur-xl lg:block"
                          >
                            {events.map((e, idx) => (
                              <div
                                key={e._id}
                                className={`truncate text-[11px] font-medium text-white/90 ${idx > 0 ? "mt-1" : ""}`}
                              >
                                • {e.title}
                              </div>
                            ))}
                          </m.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* LISTA WYDARZEŃ */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex h-[600px] flex-col overflow-hidden rounded-3xl border border-white/5 bg-linear-to-br from-white/[0.07] to-white/2 p-6 shadow-2xl backdrop-blur-xl lg:h-[730px]">
              <h3 className="mb-6 flex shrink-0 items-center gap-3 border-b border-white/5 pb-4 text-xl font-semibold text-white sm:text-2xl">
                <FiCalendar className="text-arylideYellow" size={22} />
                <span>{selectedDate ? "W tym dniu" : "Nadchodzące"}</span>
              </h3>
              <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
                <AnimatePresence mode="wait">
                  {renderSidebarContent()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

// KARTA WYDARZENIA - ELEGANCKA I MINIMALISTYCZNA
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
      className="group relative block overflow-hidden rounded-xl border border-white/5 bg-white/3 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-arylideYellow/20 hover:bg-white/6 hover:shadow-xl hover:shadow-black/10"
    >
      <div
        className="absolute bottom-0 left-0 top-0 w-[3px] rounded-r-full transition-all duration-300 group-hover:w-1"
        style={{
          background: `linear-gradient(to bottom, ${color}, transparent)`,
          opacity: 0.6,
        }}
      />
      <div className="pl-4">
        <h4 className="mb-3 line-clamp-1 text-base font-semibold text-white transition-colors duration-300 group-hover:text-arylideYellow">
          {event.title}
        </h4>
        <div className="space-y-2 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <FiCalendar className="shrink-0 text-arylideYellow/60" size={13} />
            <span className="font-medium">
              {event.dateDisplay || event.date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="shrink-0 text-arylideYellow/60" size={13} />
            <span className="font-medium">{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMapPin className="shrink-0 text-arylideYellow/60" size={13} />
            <span className="truncate font-medium">{event.location}</span>
          </div>
          {event.price && (
            <div className="flex items-center gap-2 pt-1 text-arylideYellow/80 font-semibold">
              <FiTag className="shrink-0" size={13} />
              <span>{event.price}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}