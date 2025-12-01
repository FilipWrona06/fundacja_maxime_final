"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import Link from "next/link";
import { FiMail } from "react-icons/fi";

export const ContactCtaClient = ({ email }: { email: string }) => {
  return (
    <LazyMotion features={domAnimation}>
      <section>
        <div className="container mx-auto px-6">
          <m.div
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
                Nie znalazłeś odpowiedzi?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
                Skontaktuj się z nami bezpośrednio - chętnie odpowiemy na
                wszystkie Twoje pytania
              </p>

              <Link
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-arylideYellow px-8 py-4 font-bold text-raisinBlack transition-all duration-300 hover:scale-105"
              >
                Napisz do nas
                <FiMail className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};