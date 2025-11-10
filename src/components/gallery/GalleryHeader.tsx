"use client";

import { motion } from "framer-motion";
import { gentleSpring } from "@/lib/animations";

interface Props {
  id: string;
  title: string;
  date: string;
  location: string;
  index: number;
}

export default function GalleryHeader({
  id,
  title,
  date,
  location,
  index,
}: Props) {
  const formattedDate = new Date(date).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...gentleSpring, delay: index * 0.1 }}
      className="mb-8"
    >
      <h2 id={id} className="mb-3 text-4xl font-bold md:text-5xl">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4 text-sm text-white/60">
        <span className="flex items-center gap-2">
          <span
            className="h-1 w-1 rounded-full bg-arylideYellow"
            aria-hidden="true"
          />
          <time dateTime={date}>{formattedDate}</time>
        </span>
        <span className="flex items-center gap-2">
          <span
            className="h-1 w-1 rounded-full bg-arylideYellow"
            aria-hidden="true"
          />
          {location}
        </span>
      </div>
    </motion.div>
  );
}
