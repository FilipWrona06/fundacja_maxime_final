// Plik: src/components/news/NewsNewsletter.client.tsx

"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { premiumEase } from "@/lib/animations";

// Definicja typów propsów
interface NewsNewsletterProps {
  heading: string;
  text: string;
  buttonLabel: string;
}

export const NewsNewsletterClient = ({
  heading,
  text,
  buttonLabel,
}: NewsNewsletterProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="mt-32">
        <div className="container mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-arylideYellow/10 via-transparent to-oxfordBlue/20 p-12 text-center backdrop-blur-sm md:p-20 shadow-2xl"
          >
            {/* Decorations */}
            <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">{heading}</h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
                {text}
              </p>
              <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Twój adres e-mail"
                  required
                  className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/50 focus:border-arylideYellow focus:outline-none focus:ring-1 focus:ring-arylideYellow/50 transition-all"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-arylideYellow px-8 py-4 font-bold text-raisinBlack transition-all duration-300 hover:scale-105 hover:bg-arylideYellow/90 shadow-lg shadow-arylideYellow/20"
                >
                  {buttonLabel}
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};
