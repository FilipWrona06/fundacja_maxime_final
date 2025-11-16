"use client";

import { motion, type Transition } from "framer-motion";
import Link from "next/link";
// ZMIANA: Import FC i SVGProps do typowania ikon SVG
import { type FC, type FormEvent, type SVGProps, useState } from "react";
// ZMIANA: Import konkretnych ikon z react-icons
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiCheck, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";

// Import danych z scentralizowanego pliku
import { contactData, faqItems, socialLinks } from "@/data/siteData";

// ZMIANA: Dodanie komponentu PatroniteIcon i mapowania ikon (ICON_MAP)
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

const PatroniteIcon: FC<IconProps> = ({ size, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size || "1em"}
    height={size || "1em"}
    {...props}
  >
    <title>Patronite</title>
    <path d="M16.48.5H3.03v23h4.91v-9.42h8.54c4.14 0 7.52-3.38 7.52-7.54S20.62.5 16.48.5z" />
  </svg>
);

const ICON_MAP: Record<string, FC<IconProps>> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  patronite: PatroniteIcon,
};

const hoverTransition: Transition = {
  duration: 0.4,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const shineTransition: Transition = {
  duration: 0.7,
  ease: "circOut",
  delay: 0.1,
};

const contactInfoCards = [
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

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Sekcja nagłówka */}
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow"
            >
              Jesteśmy do Twojej dyspozycji
            </motion.span>
            <h1 className="mb-6 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl">
              <span className="font-youngest text-arylideYellow">
                Skontaktuj się
              </span>
              <br />z nami
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/60">
              Masz pytania? Chcesz współpracować? Napisz do nas - odpowiemy
              najszybciej jak to możliwe
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sekcja z kartami kontaktowymi */}
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {contactInfoCards.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                target={info.link.startsWith("http") ? "_blank" : undefined}
                rel={
                  info.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
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
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja z formularzem, mediami społecznościowymi i mapą */}
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-8 text-4xl font-bold md:text-5xl">
                Napisz do
                <br />
                <span className="font-youngest text-arylideYellow">Nas</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-white/80"
                  >
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 focus:border-arylideYellow focus:outline-none focus:ring-2 focus:ring-arylideYellow/20"
                    placeholder="Jan Kowalski"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-white/80"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 focus:border-arylideYellow focus:outline-none focus:ring-2 focus:ring-arylideYellow/20"
                    placeholder="jan@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-white/80"
                  >
                    Temat
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 focus:border-arylideYellow focus:outline-none focus:ring-2 focus:ring-arylideYellow/20"
                    placeholder="Pytanie o koncert"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-white/80"
                  >
                    Wiadomość
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 focus:border-arylideYellow focus:outline-none focus:ring-2 focus:ring-arylideYellow/20"
                    placeholder="Twoja wiadomość..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-arylideYellow px-8 py-4 font-bold text-raisinBlack transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitted ? (
                    <>
                      <FiCheck size={20} />
                      Wysłano!
                    </>
                  ) : (
                    <>
                      Wyślij wiadomość
                      <FiSend
                        size={20}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="mb-6 text-2xl font-bold">
                  Znajdź nas w mediach społecznościowych
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    // ZMIANA: Wyszukanie komponentu ikony w ICON_MAP
                    const IconComponent = ICON_MAP[social.icon];
                    return (
                      <motion.div
                        key={social.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setHoveredSocial(index)}
                          onMouseLeave={() => setHoveredSocial(null)}
                          className="relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/20 bg-white/5 p-6 transition-colors duration-300"
                        >
                          <motion.span
                            // ZMIANA: Użycie właściwej klasy z obiektu colorClasses
                            className={`absolute inset-0 ${social.colorClasses.background}`}
                            initial={{ x: "-100%" }}
                            animate={
                              hoveredSocial === index
                                ? { x: "0%" }
                                : { x: "-100%" }
                            }
                            transition={hoverTransition}
                          />
                          <motion.span
                            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: "-150%", skewX: -20 }}
                            animate={
                              hoveredSocial === index
                                ? { x: "150%" }
                                : { x: "-150%" }
                            }
                            transition={shineTransition}
                          />
                          <div className="relative z-10 flex items-center gap-4">
                            <motion.div
                              animate={
                                hoveredSocial === index
                                  ? {
                                      scale: [1, 1.2, 1],
                                      rotate: [0, 10, -5, 0],
                                    }
                                  : {}
                              }
                              transition={{ duration: 0.4 }}
                              className="text-white"
                            >
                              {/* ZMIANA: Renderowanie komponentu, jeśli został znaleziony */}
                              {IconComponent && <IconComponent size={24} />}
                            </motion.div>
                            <span className="font-semibold text-white">
                              {social.name}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="h-96 overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2553.868728518987!2d19.29290131572236!3d50.21332997944357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716da4614457787%3A0x67c25c3855a7322!2sMireckiego%2070%2C%2041-310%20D%C4%85browa%20G%C3%B3rnicza!5e0!3m2!1spl!2spl!4v1672522556272!5m2!1spl!2spl"
                  className="h-full w-full"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa lokalizacji Fundacji Maxime"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sekcja FAQ */}
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Najczęściej zadawane
              <br />
              <span className="font-youngest text-arylideYellow">Pytania</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              Znajdź odpowiedzi na popularne pytania
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl space-y-4"
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveQuestion(activeQuestion === index ? null : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-white/5"
                >
                  <span className="pr-8 text-lg font-semibold">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeQuestion === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-arylideYellow"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <title>Rozwiń / Zwiń</title>
                      <path
                        d="M19 9l-7 7-7-7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: activeQuestion === index ? "auto" : 0,
                    opacity: activeQuestion === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-relaxed text-white/70">
                    {item.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sekcja "Nie znalazłeś odpowiedzi?" */}
      <section>
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
                Nie znalazłeś odpowiedzi?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
                Skontaktuj się z nami bezpośrednio - chętnie odpowiemy na
                wszystkie Twoje pytania
              </p>

              <Link
                href={`mailto:${contactData.email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-arylideYellow px-8 py-4 font-bold text-raisinBlack transition-all duration-300 hover:scale-105"
              >
                Napisz do nas
                <FiMail className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
