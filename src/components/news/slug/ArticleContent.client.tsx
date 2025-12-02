"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { premiumEase } from "@/lib/animations";

export const ArticleContentClient = ({ children }: { children: ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="container relative z-20 mx-auto mt-[-50px] px-6">
        {/* Przycisk powrotu */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: premiumEase }}
          className="mb-8"
        >
          <Link
            href="/aktualnosci"
            className="group inline-flex items-center gap-3 rounded-xl border border-white/5 bg-raisinBlack/50 px-5 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-md transition-all duration-300 hover:border-arylideYellow/30 hover:bg-raisinBlack/80 hover:text-white"
          >
            <FiArrowLeft className="text-arylideYellow transition-transform duration-300 group-hover:-translate-x-1" />
            Wróć do listy
          </Link>
        </m.div>

        {/* Kontener treści - tutaj wstrzykujemy gotowy HTML z serwera */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: premiumEase }}
          className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl lg:p-12"
        >
          {children}
        </m.div>
      </div>
    </LazyMotion>
  );
};
