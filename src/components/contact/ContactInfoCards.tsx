"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { ContactData } from "@/lib/types";

export const ContactInfoCardsClient = ({
  contactData,
}: {
  contactData: ContactData;
}) => {
  const cards = [
    {
      icon: <FiMail size={24} />,
      title: "Email",
      content: contactData.email,
      link: `mailto:${contactData.email}`,
    },
    {
      icon: <FiPhone size={24} />,
      title: "Telefon",
      content: contactData.phone,
      link: `tel:${contactData.phone.replace(/\s/g, "")}`,
    },
    {
      icon: <FiMapPin size={24} />,
      title: "Adres",
      content: contactData.address,
      link: contactData.googleMapsLink,
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {cards.map((info, index) => (
          <m.a
            key={info.title}
            href={info.link}
            target={info.link.startsWith("http") ? "_blank" : undefined}
            rel={
              info.link.startsWith("http") ? "noopener noreferrer" : undefined
            }
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30 hover:bg-white/10"
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-arylideYellow/5 blur-3xl transition-all duration-500 group-hover:bg-arylideYellow/10" />

            <div className="relative">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-arylideYellow/20 bg-arylideYellow/10 text-arylideYellow transition-all duration-300 group-hover:scale-110 group-hover:border-arylideYellow/40">
                {info.icon}
              </div>

              <h3 className="mb-2 text-lg font-bold text-white/80">
                {info.title}
              </h3>
              <p className="text-xl font-semibold transition-colors duration-300 group-hover:text-arylideYellow">
                {info.content}
              </p>
            </div>
          </m.a>
        ))}
      </div>
    </LazyMotion>
  );
};