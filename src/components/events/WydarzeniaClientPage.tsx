"use client";

import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiMusic,
} from "react-icons/fi";
import {
  premiumEase,
  staggerConfig,
  ultraSmoothSpring,
  viewportConfig,
} from "@/lib/animations";
import type { EventType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

// --- STALE I DANE POMOCNICZE ---

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

// Kolory znaczników (pastelowe, pasujące do dark mode)
const EVENT_COLORS = [
  "#F4D06F", // arylideYellow like
  "#9DD9F3",
  "#FF9DBF",
  "#B794F6",
  "#6EE7B7",
  "#FB923C",
];

const getEventFullDate = (event: EventType) =>
  new Date(`${event.date}T${event.time}:00`);
const now = new Date();

const getEventColor = (eventId: string) => {
  let hash = 0;
  for (let i = 0; i < eventId.length; i++) {
    hash = eventId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % EVENT_COLORS.length);
  return EVENT_COLORS[index];
};

// --- WARIANTY ANIMACJI ---

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: premiumEase },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: staggerConfig.normal },
  },
};

// --- KOMPONENT GŁÓWNY ---

export default function WydarzeniaClientPage({
  allEvents,
}: {
  allEvents: EventType[];
}) {
  // Logika filtrowania i kalendarza
  const upcomingEvents = allEvents
    .filter((event) => getEventFullDate(event) >= now)
    .sort(
      (a, b) => getEventFullDate(a).getTime() - getEventFullDate(b).getTime(),
    );

  const heroEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek =
      firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return allEvents.filter((event) => event.date === dateStr);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

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

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen overflow-hidden bg-raisinBlack pt-24 pb-20 sm:pt-32">
        {/* Dekoracyjne tła (Blob) - spójne z AboutSection/HeroSection */}
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-arylideYellow/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-arylideYellow/5 blur-3xl" />

        {/* --- HERO SECTION (Najbliższe wydarzenie) --- */}
        {heroEvent && (
          <section className="relative mb-16 sm:mb-24">
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig.once}
                variants={fadeInUpVariant}
                className="group relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <div className="relative h-[500px] w-full md:h-[600px] xl:h-[650px]">
                  <Image
                    src={urlFor(heroEvent.image).width(1920).quality(90).url()}
                    alt={heroEvent.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={urlFor(heroEvent.image)
                      .width(20)
                      .blur(10)
                      .url()}
                  />
                  {/* Overlay spójny z ImpactSection */}
                  <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/60 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-16">
                  <m.div variants={staggerContainerVariant} initial="hidden" animate="visible">
                    {/* Badge */}
                    <m.span
                      variants={fadeInUpVariant}
                      className="mb-4 inline-flex items-center gap-2 rounded-full border border-arylideYellow/30 bg-arylideYellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-arylideYellow backdrop-blur-md sm:text-sm"
                    >
                      <FiMusic size={14} />
                      Najbliższe wydarzenie
                    </m.span>

                    <m.h1
                      variants={fadeInUpVariant}
                      className="mb-4 max-w-4xl font-youngest text-4xl leading-none text-white drop-shadow-xl sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl"
                    >
                      {heroEvent.title}
                    </m.h1>

                    <m.div variants={fadeInUpVariant} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <Link
                        href={`/wydarzenia/${heroEvent.slug.current}`}
                        className="group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-arylideYellow px-8 py-4 text-base font-bold text-raisinBlack shadow-lg transition-all duration-300 hover:shadow-arylideYellow/30 hover:scale-105"
                      >
                        <span>Kup bilety</span>
                        <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </m.div>
                  </m.div>
                </div>
              </m.div>
            </div>
          </section>
        )}

        {/* --- NAGŁÓWEK SEKCJI KALENDARZA --- */}
        <div className="container relative z-10 mx-auto px-4 mb-12 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig.once}
            variants={staggerContainerVariant}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="space-y-4">
              <m.div variants={fadeInUpVariant} className="flex items-center gap-2">
                <span className="h-px w-8 bg-arylideYellow" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-arylideYellow">
                  Kalendarz
                </span>
              </m.div>
              <m.h2 variants={fadeInUpVariant} className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                Repertuar <span className="font-youngest text-arylideYellow">Wydarzeń</span>
              </m.h2>
            </div>
            <m.p variants={fadeInUpVariant} className="max-w-md text-base text-white/70 md:text-lg md:text-right">
              Wybierz datę w kalendarzu, aby zobaczyć szczegóły, lub przeglądaj nadchodzące koncerty na liście.
            </m.p>
          </m.div>
        </div>

        {/* --- GRID: KALENDARZ + SIDEBAR --- */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            
            {/* LEWA KOLUMNA: KALENDARZ */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig.once}
              variants={fadeInUpVariant}
              className="lg:col-span-2"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
                {/* Header Kalendarza */}
                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-6 sm:p-8">
                  <m.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={previousMonth}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-arylideYellow/50 hover:bg-white/10 hover:text-arylideYellow"
                    aria-label="Poprzedni miesiąc"
                  >
                    <FiChevronLeft size={24} />
                  </m.button>

                  <div className="text-center">
                    <m.h3
                      key={currentDate.toISOString()}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-youngest text-3xl capitalize text-arylideYellow sm:text-4xl"
                    >
                      {MONTHS_PL[currentDate.getMonth()]}
                    </m.h3>
                    <p className="text-sm font-medium tracking-widest text-white/50">
                      {currentDate.getFullYear()}
                    </p>
                  </div>

                  <m.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextMonth}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-arylideYellow/50 hover:bg-white/10 hover:text-arylideYellow"
                    aria-label="Następny miesiąc"
                  >
                    <FiChevronRight size={24} />
                  </m.button>
                </div>

                {/* Dni Tygodnia */}
                <div className="grid grid-cols-7 gap-2 border-b border-white/5 bg-white/2 px-4 py-4 sm:px-8">
                  {DAYS_PL.map((day) => (
                    <div key={day} className="text-center text-xs font-bold uppercase tracking-wider text-white/40">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Siatka Dni */}
                <div className="grid grid-cols-7 gap-2 p-4 sm:gap-4 sm:p-8">
                  {[...Array(startingDayOfWeek)].map((_, index) => (
                    <div key={`empty-${// biome-ignore lint/suspicious/noArrayIndexKey: tak
index}`} />
                  ))}

                  {[...Array(daysInMonth)].map((_, index) => {
                    const day = index + 1;
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const events = getEventsForDate(date);
                    const isToday = new Date().toDateString() === date.toDateString();
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    const hasEvents = events.length > 0;

                    return (
                      <m.button
                        key={`day-${day}`}
                        layout
                        onClick={() => handleDateClick(day)}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          relative flex aspect-square flex-col items-center justify-center rounded-xl border transition-all duration-300
                          ${isSelected 
                            ? "border-arylideYellow bg-arylideYellow text-raisinBlack shadow-lg shadow-arylideYellow/30" 
                            : "border-transparent text-white"
                          }
                          ${!isSelected && hasEvents ? "bg-white/10 hover:border-arylideYellow/30 hover:bg-white/20" : ""}
                          ${!isSelected && !hasEvents ? "bg-white/2 hover:bg-white/5" : ""}
                          ${isToday && !isSelected ? "ring-1 ring-arylideYellow ring-inset" : ""}
                        `}
                      >
                        <span className={`text-sm font-bold sm:text-lg ${!isSelected && !hasEvents ? "text-white/20" : ""}`}>
                          {day}
                        </span>

                        {hasEvents && (
                          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                            {events.slice(0, 3).map((event) => (
                              <div
                                key={event._id}
                                className="h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5"
                                style={{ backgroundColor: isSelected ? "#1A1A1A" : getEventColor(event._id) }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Tooltip (Desktop) */}
                        <AnimatePresence>
                          {hoveredDay === day && hasEvents && (
                            <m.div
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 min-w-40 -translate-x-1/2 rounded-xl border border-white/20 bg-raisinBlack/95 p-3 shadow-xl backdrop-blur-md"
                            >
                              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-arylideYellow">
                                {events.length} {events.length === 1 ? "wydarzenie" : "wydarzeń"}:
                              </div>
                              {events.map((e) => (
                                <div key={e._id} className="truncate text-xs text-white/80">
                                  • {e.title}
                                </div>
                              ))}
                              <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/20 bg-raisinBlack/95" />
                            </m.div>
                          )}
                        </AnimatePresence>
                      </m.button>
                    );
                  })}
                </div>
              </div>
            </m.div>

            {/* PRAWA KOLUMNA: LISTA WYDARZEŃ (SIDEBAR) */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig.once}
              variants={fadeInUpVariant}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 flex h-[600px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm lg:h-[730px]">
                <h3 className="mb-6 flex shrink-0 items-center gap-3 text-xl font-bold text-white sm:text-2xl">
                  <FiCalendar className="text-arylideYellow" />
                  <span>{selectedDate ? "Wybrany dzień" : "Nadchodzące"}</span>
                </h3>

                <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
                  <AnimatePresence mode="wait">
                    {selectedDate && selectedDateEvents.length > 0 ? (
                      <m.div
                        key="selected-events"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <p className="mb-4 border-b border-white/10 pb-2 text-sm font-medium capitalize text-arylideYellow">
                          {selectedDate.toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long" })}
                        </p>
                        <div className="space-y-3">
                          {selectedDateEvents.map((event) => (
                            <SidebarEventCard key={event._id} event={event} color={getEventColor(event._id)} />
                          ))}
                        </div>
                      </m.div>
                    ) : selectedDate && selectedDateEvents.length === 0 ? (
                      <m.div
                        key="no-events"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
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
                    ) : (
                      <m.div
                        key="all-events"
                        variants={staggerContainerVariant}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-3"
                      >
                        {upcomingEvents.slice(0, 10).map((event) => (
                          <SidebarEventCard key={event._id} event={event} color={getEventColor(event._id)} />
                        ))}
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </m.div>
          </div>
        </div>

        {/* --- NEWSLETTER (Spójny z CTA Section) --- */}
        <section className="mt-20 sm:mt-32">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig.once}
              variants={fadeInUpVariant}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-arylideYellow/10 via-transparent to-oxfordBlue/20 p-8 text-center shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-16 md:p-20"
            >
              <div className="relative z-10 mx-auto max-w-3xl">
                <h2 className="mb-6 font-youngest text-3xl text-arylideYellow sm:text-4xl md:text-5xl">
                  Zostań na bieżąco
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-white/80">
                  Zapisz się do newslettera, aby otrzymywać informacje o nowych koncertach i ekskluzywnych wydarzeniach.
                </p>
                <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row sm:gap-4">
                  <input
                    type="email"
                    placeholder="Twój adres e-mail"
                    required
                    className="w-full flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:border-arylideYellow focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-arylideYellow"
                  />
                  <m.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={ultraSmoothSpring}
                    type="submit"
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-arylideYellow px-8 py-4 font-bold text-raisinBlack shadow-lg transition-all hover:shadow-arylideYellow/30"
                  >
                    <span className="relative z-10">Zapisz się</span>
                  </m.button>
                </form>
              </div>
            </m.div>
          </div>
        </section>

        {/* Style dla Scrollbara (zachowane, ale dopasowane kolory) */}
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(233, 215, 88, 0.3); /* arylideYellow/30 */
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(233, 215, 88, 0.6);
          }
        `}</style>
      </div>
    </LazyMotion>
  );
}

// --- KOMPONENT POMOCNICZY: KARTA WYDARZENIA W SIDEBARZE ---

function SidebarEventCard({
  event,
  color,
}: {
  event: EventType;
  color: string;
}) {
  return (
    <m.div
      variants={fadeInUpVariant}
      whileHover={{ scale: 1.02, x: 4 }}
      transition={ultraSmoothSpring}
    >
      <Link
        href={`/wydarzenia/${event.slug.current}`}
        className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-arylideYellow/30 hover:bg-white/10"
      >
        {/* Kolorowy pasek akcentu */}
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
              <span>{event.dateDisplay}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="shrink-0 text-arylideYellow/70" size={14} />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin className="shrink-0 text-arylideYellow/70" size={14} />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
      </Link>
    </m.div>
  );
}