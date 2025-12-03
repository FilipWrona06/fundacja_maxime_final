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
import {
  blurValues,
  durations,
  premiumEase,
  staggerConfig,
} from "@/lib/animations";
import type { EventType } from "@/lib/types";

// --- STAŁE ---
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
  "#F4D06F",
  "#9DD9F3",
  "#FF9DBF",
  "#B794F6",
  "#6EE7B7",
  "#FB923C",
];

const getEventColor = (eventId: string) => {
  let hash = 0;
  for (let i = 0; i < eventId.length; i++)
    hash = eventId.charCodeAt(i) + ((hash << 5) - hash);
  const index = Math.abs(hash % EVENT_COLORS.length);
  return EVENT_COLORS[index];
};

// --- WARIANTY ANIMACJI WEWNĘTRZNYCH ---
const itemVariant: Variants = {
  hidden: { opacity: 0, y: 8, filter: blurValues.normal },
  visible: {
    opacity: 1,
    y: 0,
    filter: blurValues.none,
    transition: { duration: durations.slow, ease: premiumEase },
  },
};

const fadeVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.normal, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.normal, ease: premiumEase },
  },
};

export const EventsCalendarInteractive = ({
  allEvents,
}: {
  allEvents: EventType[];
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  useEffect(() => setIsMounted(true), []);

  // --- LOGIKA ---
  const futureEvents = useMemo(() => {
    if (!allEvents) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return allEvents
      .filter((event) => {
        const eventDate = new Date(event.date);
        return !Number.isNaN(eventDate.getTime()) && eventDate >= today;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [allEvents]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let startingDay = firstDay.getDay() - 1;
    if (startingDay === -1) startingDay = 6;
    return { daysCount: lastDay.getDate(), startingDay };
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return allEvents.filter((event) => event.date === dateStr);
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset),
    );
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelectedDate(
      selectedDate?.toDateString() === clickedDate.toDateString()
        ? null
        : clickedDate,
    );
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
            <p className="mb-6 border-b border-white/4 pb-3 text-sm font-semibold capitalize text-arylideYellow/90">
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
                  transition={{
                    delay: idx * staggerConfig.normal,
                    duration: durations.normal,
                    ease: premiumEase,
                  }}
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
          <div className="mb-6 rounded-2xl bg-linear-to-br from-white/4 to-white/1 p-8 backdrop-blur-xl">
            <FiCalendar size={40} className="opacity-40" />
          </div>
          <p className="mb-2 font-semibold text-white/50">
            Brak wydarzeń w tym dniu
          </p>
          <button
            type="button"
            onClick={() => setSelectedDate(null)}
            className="mt-6 text-sm font-semibold text-arylideYellow/80 transition-all duration-500 hover:text-arylideYellow"
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
              transition={{ delay: index * staggerConfig.fast }}
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
        <p className="font-semibold text-white/50">
          Brak zaplanowanych wydarzeń
        </p>
      </div>
    );
  };

  if (!isMounted) return <section className="min-h-[600px]" />;

  const { daysCount, startingDay } = getDaysInMonth(currentDate);
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);
  const emptyDaysArray = Array.from({ length: startingDay }, (_, i) => i);
  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  return (
    <LazyMotion features={domAnimation}>
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        {/* KALENDARZ */}
        <div className="lg:col-span-2">
          <div className="group relative overflow-hidden rounded-3xl border border-white/6 bg-linear-to-br from-white/8 to-white/2 shadow-premium backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-arylideYellow/3 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            {/* Header Kalendarza */}
            <div className="relative flex items-center justify-between border-b border-white/4 bg-linear-to-b from-white/3 to-transparent p-6 sm:p-8 backdrop-blur-xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-arylideYellow/20 to-transparent" />
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/6 bg-linear-to-br from-white/6 to-white/2 text-white/60 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/20 hover:from-arylideYellow/10 hover:to-arylideYellow/5 hover:text-arylideYellow hover:shadow-lg hover:shadow-arylideYellow/10 active:scale-95"
                aria-label="Poprzedni miesiąc"
              >
                <FiChevronLeft size={20} />
              </button>
              <div className="text-center">
                <AnimatePresence mode="wait">
                  <m.h3
                    key={currentDate.toISOString()}
                    initial={{ opacity: 0, y: -8, filter: blurValues.normal }}
                    animate={{ opacity: 1, y: 0, filter: blurValues.none }}
                    exit={{ opacity: 0, y: 8, filter: blurValues.normal }}
                    transition={{ duration: durations.fast, ease: premiumEase }}
                    className="font-youngest text-3xl capitalize text-arylideYellow sm:text-4xl drop-shadow-lg"
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
                onClick={() => changeMonth(1)}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/6 bg-linear-to-br from-white/6 to-white/2 text-white/60 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/20 hover:from-arylideYellow/10 hover:to-arylideYellow/5 hover:text-arylideYellow hover:shadow-lg hover:shadow-arylideYellow/10 active:scale-95"
                aria-label="Następny miesiąc"
              >
                <FiChevronRight size={20} />
              </button>
            </div>

            {/* Dni tygodnia */}
            <div className="grid grid-cols-7 gap-2 border-b border-white/4 bg-linear-to-b from-white/2 to-transparent px-4 py-4 sm:px-8">
              {DAYS_PL.map((day) => (
                <div
                  key={day}
                  className="text-center text-[10px] font-bold uppercase tracking-wider text-white/30"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Dni miesiąca */}
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
                    key={`day-${monthKey}-${day}`}
                    onClick={() => handleDateClick(day)}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`relative flex aspect-square flex-col items-center justify-center rounded-xl border transition-all duration-500 ease-out ${isSelected ? "border-arylideYellow/40 bg-linear-to-br from-arylideYellow/95 to-arylideYellow text-raisinBlack shadow-xl shadow-arylideYellow/15 scale-105" : "border-white/3 text-white/80"} ${!isSelected && hasEvents ? "bg-linear-to-br from-white/6 to-white/3 hover:from-white/10 hover:to-white/6 hover:border-arylideYellow/15 hover:shadow-lg hover:shadow-arylideYellow/5" : ""} ${!isSelected && !hasEvents ? "bg-white/1.5 hover:bg-white/4 hover:border-white/6" : ""} ${isToday && !isSelected ? "ring-1 ring-arylideYellow/30 ring-offset-2 ring-offset-raisinBlack/50" : ""}`}
                  >
                    <span
                      className={`text-sm font-semibold transition-colors duration-500 sm:text-base ${!isSelected && !hasEvents ? "text-white/20" : ""}`}
                    >
                      {day}
                    </span>
                    {hasEvents && (
                      <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1">
                        {events.slice(0, 3).map((event, idx) => (
                          <m.div
                            key={event._id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                            whileHover={{ scale: 1.3 }}
                            className="h-1 w-1 rounded-full transition-all duration-300 sm:h-1.5 sm:w-1.5"
                            style={{
                              backgroundColor: isSelected
                                ? "rgba(26, 26, 26, 0.7)"
                                : getEventColor(event._id),
                              boxShadow: !isSelected
                                ? `0 0 8px ${getEventColor(event._id)}40`
                                : "none",
                            }}
                          />
                        ))}
                      </div>
                    )}
                    <AnimatePresence>
                      {hoveredDay === day && hasEvents && (
                        <m.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{
                            duration: durations.normal,
                            ease: premiumEase,
                          }}
                          className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 hidden w-max max-w-[200px] -translate-x-1/2 lg:block"
                        >
                          <div className="relative rounded-2xl border border-white/8 bg-raisinBlack/98 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
                            {events.map((e, idx) => (
                              <div
                                key={e._id}
                                className={`truncate text-[11px] font-medium text-white/90 ${idx > 0 ? "mt-1.5" : ""}`}
                              >
                                • {e.title}
                              </div>
                            ))}
                            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/8 bg-raisinBlack/98" />
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* LISTA WYDARZEŃ (SIDEBAR) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 flex h-[600px] flex-col overflow-hidden rounded-3xl border border-white/6 bg-linear-to-br from-white/8 to-white/2 p-6 shadow-premium backdrop-blur-2xl lg:h-[730px]">
            <h3 className="mb-6 flex shrink-0 items-center gap-3 border-b border-white/4 pb-4 text-xl font-semibold text-white sm:text-2xl">
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
    </LazyMotion>
  );
};

// KARTA WYDARZENIA - ULTRA PREMIUM
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
      className="group relative block overflow-hidden rounded-xl border border-white/4 bg-linear-to-br from-white/4 to-white/1 p-4 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-arylideYellow/15 hover:from-white/8 hover:to-white/4 hover:shadow-2xl hover:shadow-arylideYellow/5"
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${color}15, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 top-0 w-[3px] rounded-r-full transition-all duration-500 group-hover:w-1"
        style={{
          background: `linear-gradient(to bottom, ${color}, transparent)`,
          opacity: 0.6,
        }}
      />
      <div className="relative pl-4">
        <h4 className="mb-3 line-clamp-1 text-base font-semibold text-white transition-colors duration-500 group-hover:text-arylideYellow">
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
