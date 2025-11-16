"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiGrid,
  FiList,
  FiMapPin,
  FiMusic,
} from "react-icons/fi";
import type { EventType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

const filters = ["Nadchodzące", "Zakończone"];

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

const getEventFullDate = (event: EventType) =>
  new Date(`${event.date}T${event.time}:00`);
const now = new Date();

export default function WydarzeniaClientPage({
  allEvents,
}: {
  allEvents: EventType[];
}) {
  const upcomingEvents = allEvents
    .filter((event) => getEventFullDate(event) >= now)
    .sort(
      (a, b) => getEventFullDate(a).getTime() - getEventFullDate(b).getTime(),
    );

  const pastEvents = allEvents
    .filter((event) => getEventFullDate(event) < now)
    .sort(
      (a, b) => getEventFullDate(b).getTime() - getEventFullDate(a).getTime(),
    );

  const [activeFilter, setActiveFilter] = useState("Nadchodzące");
  const [viewMode, setViewMode] = useState<"Lista" | "Kalendarz">("Lista");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const eventsToDisplay =
    activeFilter === "Nadchodzące" ? upcomingEvents : pastEvents;
  const heroEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  // Calendar functions
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

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelectedDate(clickedDate);
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  // Get event color based on index (using _id for consistency)
  const getEventColor = (eventId: string) => {
    const colors = [
      "#F4D06F",
      "#9DD9F3",
      "#FF6B9D",
      "#B794F6",
      "#4ADE80",
      "#FB923C",
    ];
    // Simple hash function to get a color based on the event's ID string
    let hash = 0;
    for (let i = 0; i < eventId.length; i++) {
      hash = eventId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      {heroEvent && (
        <section className="relative mb-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl"
            >
              <div className="relative h-[600px]">
                <Image
                  src={urlFor(heroEvent.image).url()}
                  alt={heroEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-12 md:p-16">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-4 inline-flex items-center gap-2 rounded-full border border-arylideYellow/40 bg-arylideYellow/10 px-4 py-2 text-sm font-semibold text-arylideYellow backdrop-blur-md"
                >
                  <FiMusic size={16} />
                  Najbliższe wydarzenie
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl"
                >
                  {heroEvent.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-8 text-xl text-white/80 md:text-2xl"
                >
                  {heroEvent.subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mb-8 flex flex-wrap gap-6 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <FiCalendar className="text-arylideYellow" />
                    {heroEvent.dateDisplay}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiClock className="text-arylideYellow" />
                    {heroEvent.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiMapPin className="text-arylideYellow" />
                    {heroEvent.location}
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Link
                    href={`/wydarzenia/${heroEvent.slug.current}`}
                    className="group inline-flex items-center gap-3 rounded-full bg-arylideYellow px-8 py-4 font-bold text-raisinBlack shadow-2xl shadow-arylideYellow/30 transition-all duration-500 hover:scale-105 hover:shadow-arylideYellow/50"
                  >
                    Kup bilety
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* MAIN CONTENT SECTION */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
            {activeFilter === "Nadchodzące" ? "Nadchodzące" : "Archiwum"}
            <br />
            <span className="font-youngest text-arylideYellow">Wydarzenia</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-white/60">
            {activeFilter === "Nadchodzące"
              ? "Odkryj naszą pełną ofertę koncertów i wydarzeń muzycznych"
              : "Przeglądaj minione wydarzenia i magiczne momenty z naszej historii"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex flex-wrap justify-center gap-4"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-6 py-3 font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? "border-arylideYellow bg-arylideYellow text-raisinBlack"
                  : "border-white/20 bg-white/5 text-white hover:border-arylideYellow/50 hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* VIEW MODE SWITCH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 flex justify-center"
        >
          <div className="relative inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setViewMode("Lista")}
              className={`relative flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                viewMode === "Lista"
                  ? "bg-arylideYellow text-raisinBlack"
                  : "text-white"
              }`}
            >
              <FiList size={18} />
              <span>Lista</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("Kalendarz")}
              className={`relative flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                viewMode === "Kalendarz"
                  ? "bg-arylideYellow text-raisinBlack"
                  : "text-white"
              }`}
            >
              <FiGrid size={18} />
              <span>Kalendarz</span>
            </button>
          </div>
        </motion.div>

        {/* CALENDAR VIEW */}
        <AnimatePresence mode="wait">
          {viewMode === "Kalendarz" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-3 gap-8 mb-32">
                {/* Calendar */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    {/* Calendar Header */}
                    <div className="bg-linear-to-r from-arylideYellow/20 to-arylideYellow/10 p-6 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={previousMonth}
                          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <FiChevronLeft size={24} />
                        </motion.button>

                        <div className="text-center">
                          <motion.h3
                            key={currentDate.toISOString()}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold"
                          >
                            {MONTHS_PL[currentDate.getMonth()]}
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white/60"
                          >
                            {currentDate.getFullYear()}
                          </motion.p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={nextMonth}
                          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <FiChevronRight size={24} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-2 p-6 pb-3">
                      {DAYS_PL.map((day) => (
                        <div
                          key={day}
                          className="text-center text-sm font-semibold text-white/50"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 p-6 pt-3">
                      {[...Array(startingDayOfWeek)].map((_, index) => (
                        <div
                          key={`empty-start-${
                            // biome-ignore lint/suspicious/noArrayIndexKey: Te elementy to statyczne wypełniacze, indeks jest jedynym stabilnym kluczem.
                            index
                          }`}
                          className="aspect-square"
                        />
                      ))}

                      {[...Array(daysInMonth)].map((_, index) => {
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
                          <motion.button
                            key={`day-${day}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.01 }}
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDateClick(day)}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`
                              aspect-square rounded-2xl relative transition-all duration-300
                              ${isSelected ? "bg-arylideYellow text-raisinBlack shadow-lg shadow-arylideYellow/30" : ""}
                              ${!isSelected && hasEvents ? "bg-white/10 hover:bg-white/20" : ""}
                              ${!isSelected && !hasEvents ? "bg-white/5 hover:bg-white/10" : ""}
                              ${isToday ? "ring-2 ring-arylideYellow ring-offset-2 ring-offset-raisinBlack" : ""}
                            `}
                          >
                            <span className="text-lg font-semibold">{day}</span>

                            {hasEvents && (
                              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                                {events.slice(0, 3).map((event, idx) => (
                                  <motion.div
                                    key={event._id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                      backgroundColor: getEventColor(event._id),
                                    }}
                                  />
                                ))}
                              </div>
                            )}

                            <AnimatePresence>
                              {hoveredDay === day && hasEvents && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-raisinBlack/90 backdrop-blur-sm rounded-lg p-2 shadow-xl z-50 whitespace-nowrap text-xs border border-white/10"
                                >
                                  <div className="flex items-center gap-2">
                                    <FiMusic
                                      size={12}
                                      className="text-arylideYellow"
                                    />
                                    <span>
                                      {events.length}{" "}
                                      {events.length === 1
                                        ? "wydarzenie"
                                        : "wydarzenia"}
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Events Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl lg:sticky lg:top-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <FiCalendar className="text-arylideYellow" />
                      {selectedDate ? "Wybrana data" : "Nadchodzące"}
                    </h3>

                    <AnimatePresence mode="wait">
                      {selectedDate && selectedDateEvents.length > 0 ? (
                        <motion.div
                          key="selected-events"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <p className="text-white/60 mb-4 text-sm">
                            {selectedDate.toLocaleDateString("pl-PL", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })}
                          </p>
                          <div className="space-y-4">
                            {selectedDateEvents.map((event) => (
                              <motion.div
                                key={event._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.01, x: 3 }}
                              >
                                <Link
                                  href={`/wydarzenia/${event.slug.current}`}
                                  className="block bg-white/5 rounded-xl p-4 border border-white/10 hover:border-arylideYellow/50 transition-all cursor-pointer"
                                >
                                  <div
                                    className="w-full h-1 rounded-full mb-3"
                                    style={{
                                      backgroundColor: getEventColor(event._id),
                                    }}
                                  />
                                  <h4 className="font-bold mb-2">
                                    {event.title}
                                  </h4>
                                  <p className="text-xs text-white/50 mb-2">
                                    {event.subtitle}
                                  </p>
                                  <div className="space-y-1 text-sm text-white/60">
                                    <div className="flex items-center gap-2">
                                      <FiClock size={14} />
                                      {event.time}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <FiMapPin size={14} />
                                      {event.location}
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ) : selectedDate && selectedDateEvents.length === 0 ? (
                        <motion.div
                          key="no-events"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center py-8 text-white/40"
                        >
                          <FiCalendar
                            size={48}
                            className="mx-auto mb-4 opacity-30"
                          />
                          <p>Brak wydarzeń tego dnia</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="all-events"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-4 max-h-[600px] overflow-y-auto pr-2"
                          style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "#F4D06F rgba(255, 255, 255, 0.05)",
                          }}
                        >
                          <style jsx>{`
                            .space-y-4::-webkit-scrollbar { width: 8px; }
                            .space-y-4::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
                            .space-y-4::-webkit-scrollbar-thumb { background: #F4D06F; border-radius: 10px; }
                            .space-y-4::-webkit-scrollbar-thumb:hover { background: #f5d98a; }
                          `}</style>
                          {upcomingEvents.slice(0, 6).map((event, index) => (
                            <motion.div
                              key={event._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.01, x: 3 }}
                            >
                              <Link
                                href={`/wydarzenia/${event.slug.current}`}
                                className="block bg-white/5 rounded-xl p-4 border border-white/10 hover:border-arylideYellow/50 transition-all cursor-pointer"
                              >
                                <div
                                  className="w-full h-1 rounded-full mb-3"
                                  style={{
                                    backgroundColor: getEventColor(event._id),
                                  }}
                                />
                                <h4 className="font-bold mb-2">
                                  {event.title}
                                </h4>
                                <p className="text-xs text-white/50 mb-2">
                                  {event.subtitle}
                                </p>
                                <div className="space-y-1 text-sm text-white/60">
                                  <div className="flex items-center gap-2">
                                    <FiCalendar size={14} />
                                    {event.dateDisplay}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <FiClock size={14} />
                                    {event.time}
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* LIST VIEW */}
          {viewMode === "Lista" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {eventsToDisplay.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {eventsToDisplay.map((event, index) => (
                    <motion.div
                      key={event._id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30 hover:bg-white/10"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={urlFor(event.image).url()}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/80 via-raisinBlack/20 to-transparent" />
                        {heroEvent && event._id === heroEvent._id && (
                          <span className="absolute right-4 top-4 rounded-full border border-arylideYellow/40 bg-arylideYellow/20 px-3 py-1 text-xs font-semibold text-arylideYellow backdrop-blur-md">
                            Najbliższe
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-2 text-2xl font-bold transition-colors duration-300 group-hover:text-arylideYellow">
                          {event.title}
                        </h3>
                        <p className="mb-4 text-sm text-white/60">
                          {event.subtitle}
                        </p>
                        <div className="mb-4 space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-white/80">
                            <FiCalendar
                              size={16}
                              className="text-arylideYellow"
                            />
                            {event.dateDisplay}
                          </div>
                          <div className="flex items-center gap-2 text-white/80">
                            <FiClock size={16} className="text-arylideYellow" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2 text-white/80">
                            <FiMapPin
                              size={16}
                              className="text-arylideYellow"
                            />
                            {event.location}
                          </div>
                        </div>
                        <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-white/60">
                          {event.description}
                        </p>

                        <div className="mt-auto border-t border-white/10 pt-4">
                          {activeFilter === "Nadchodzące" ? (
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-lg font-bold text-arylideYellow">
                                {event.price}
                              </span>
                              <div className="flex items-center gap-4">
                                <Link
                                  href={`/wydarzenia/${event.slug.current}`}
                                  className="group/btn hidden items-center gap-2 text-sm font-semibold text-arylideYellow transition-all duration-300 hover:gap-3 md:inline-flex"
                                >
                                  Zobacz więcej
                                  <FiArrowRight className="transition-transform duration-300" />
                                </Link>
                                <Link
                                  href={`/wydarzenia/${event.slug.current}`}
                                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-arylideYellow px-4 py-2 text-sm font-bold text-raisinBlack transition-all duration-300 hover:scale-105"
                                >
                                  {event.price === "Wstęp wolny"
                                    ? "Rezerwuj"
                                    : "Kup bilet"}
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-end">
                              <Link
                                href={`/wydarzenia/${event.slug.current}`}
                                className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-arylideYellow transition-all duration-300 hover:gap-3"
                              >
                                Zobacz więcej
                                <FiArrowRight className="transition-transform duration-300" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-white/60"
                >
                  <p>Brak wydarzeń w tej kategorii.</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <section className="mt-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-arylideYellow/10 via-transparent to-oxfordBlue/20 p-12 text-center backdrop-blur-sm md:p-20"
          >
            <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl" />
            <div className="relative">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                Nie przegap żadnego
                <br />
                <span className="font-youngest text-arylideYellow">
                  Wydarzenia
                </span>
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
                Zapisz się, a jako pierwszy dowiesz się o nowych koncertach,
                specjalnych ofertach i kulisach naszych przygotowań.
              </p>
              <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Twój adres e-mail"
                  required
                  className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/50 focus:border-arylideYellow focus:outline-none"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-arylideYellow px-8 py-4 font-bold text-raisinBlack transition-all duration-300 hover:scale-105"
                >
                  Zapisz się
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
