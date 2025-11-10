"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiTag,
  FiUser,
} from "react-icons/fi";
import { urlFor } from "@/sanity/lib/image";
import type { EventType } from "@/lib/types";

export default function EventDetailClient({
  event,
  otherUpcomingEvents,
}: {
  event: EventType;
  otherUpcomingEvents: EventType[];
}) {
  const now = new Date();
  const getEventFullDate = (e: EventType) => new Date(`${e.date}T${e.time}:00`);
  const isPastEvent = getEventFullDate(event) < now;

  const detailItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen pb-20">
      {/* SEKCJA HERO */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] min-h-[400px] w-full"
      >
        <div className="absolute inset-0">
          <Image
            src={urlFor(event.image).url()}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/70 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-end px-6 pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-3 text-5xl font-bold md:text-6xl lg:text-7xl"
          >
            {event.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl text-xl text-white/80 md:text-2xl"
          >
            {event.subtitle}
          </motion.p>
        </div>
      </motion.section>

      {/* GŁÓWNA TREŚĆ STRONY */}
      <div className="container relative z-20 mx-auto mt-[-50px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/wydarzenia"
            className="group inline-flex items-center gap-2 font-semibold text-white/60 transition-all duration-300 hover:gap-3 hover:text-white"
          >
            <FiArrowLeft className="text-arylideYellow transition-transform duration-300 group-hover:-translate-x-1" />
            Wróć do wszystkich wydarzeń
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* LEWA KOLUMNA - OPIS */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 className="mb-4 text-3xl font-bold text-arylideYellow">
                O wydarzeniu
              </h2>
              <p className="whitespace-pre-wrap text-lg leading-relaxed text-white/80">
                {event.description}
              </p>

              <div className="mt-8 border-t border-white/10 pt-8">
                <h3 className="mb-2 text-2xl font-bold">{event.artist}</h3>
                <p className="text-md text-white/60">{event.artistRole}</p>
              </div>
            </div>
          </motion.div>

          {/* PRAWA KOLUMNA - SZCZEGÓŁY I BILETY */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:sticky lg:top-28 lg:h-fit"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 className="mb-6 text-2xl font-bold">Szczegóły</h2>
              <ul className="space-y-4">
                <motion.li
                  variants={detailItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-start gap-4"
                >
                  <FiCalendar
                    size={20}
                    className="text-arylideYellow mt-1 shrink-0"
                  />
                  <span className="font-semibold">{event.dateDisplay}</span>
                </motion.li>
                <motion.li
                  variants={detailItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-4"
                >
                  <FiClock
                    size={20}
                    className="text-arylideYellow mt-1 shrink-0"
                  />
                  <span className="font-semibold">{event.time}</span>
                </motion.li>
                <motion.li
                  variants={detailItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-4"
                >
                  <FiMapPin
                    size={20}
                    className="text-arylideYellow mt-1 shrink-0"
                  />
                  <div>
                    <p className="font-semibold">{event.location}</p>
                    <p className="text-sm text-white/60">{event.address}</p>
                  </div>
                </motion.li>
                <motion.li
                  variants={detailItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <FiUser
                    size={20}
                    className="text-arylideYellow mt-1 shrink-0"
                  />
                  <span className="font-semibold">{event.artist}</span>
                </motion.li>
              </ul>

              <div className="mt-8 border-t border-white/10 pt-6">
                {isPastEvent ? (
                  <div className="rounded-full bg-white/10 py-3 text-center font-bold text-white/60">
                    Wydarzenie zakończone
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                      <FiTag size={22} className="text-arylideYellow" />
                      <span className="text-3xl font-bold">{event.price}</span>
                    </div>
                    <Link
                      href="#"
                      className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-arylideYellow px-8 py-4 font-bold text-raisinBlack shadow-2xl shadow-arylideYellow/30 transition-all duration-500 hover:scale-105 hover:shadow-arylideYellow/50"
                    >
                      {event.price === "Wstęp wolny"
                        ? "Zarezerwuj miejsce"
                        : "Kup bilety"}
                      <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SEKCJA "INNE WYDARZENIA" */}
      {otherUpcomingEvents.length > 0 && (
        <section className="mt-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center"
            >
              <h2 className="text-4xl font-bold md:text-5xl">
                Inne{" "}
                <span className="font-youngest text-arylideYellow">
                  Wydarzenia
                </span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherUpcomingEvents.map((otherEvent, index) => (
                <motion.div
                  key={otherEvent._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30 hover:bg-white/10"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={urlFor(otherEvent.image).url()}
                      alt={otherEvent.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/80 via-raisinBlack/20 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-arylideYellow">
                      {otherEvent.title}
                    </h3>
                    <p className="mb-4 text-sm text-white/60">
                      {otherEvent.dateDisplay}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="font-bold text-arylideYellow">
                        {otherEvent.price}
                      </span>
                      <Link
                        href={`/wydarzenia/${otherEvent.slug.current}`}
                        className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-arylideYellow transition-all duration-300 hover:gap-3"
                      >
                        Zobacz więcej
                        <FiArrowRight className="transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
