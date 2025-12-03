// Plik: src/components/contact/ContactInfoCards.tsx
// (Usuń .client z nazwy pliku)

import Link from "next/link";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

// Importujemy Twój wrapper (Island)
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import type { ContactData } from "@/lib/types";

export const ContactInfoCards = ({
  contactData,
}: {
  contactData: ContactData;
}) => {
  // Logika przygotowania danych (wykonywana na serwerze)
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
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {cards.map((info, index) => (
        // Używamy MotionWrapper do animacji wejścia.
        // Renderuje on <div>, wewnątrz którego umieszczamy nasz Link.
        <MotionWrapper
          key={info.title}
          delay={0.2 + index * 0.1} // Zachowujemy efekt stagger
          className="h-full" // Upewniamy się, że wrapper zajmuje pełną wysokość w gridzie
        >
          <Link
            href={info.link}
            target={info.link.startsWith("http") ? "_blank" : undefined}
            rel={
              info.link.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30 hover:bg-white/10"
          >
            {/* Dekoracyjne koło w tle */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-arylideYellow/5 blur-3xl transition-all duration-500 group-hover:bg-arylideYellow/10" />

            <div className="relative">
              {/* Ikona */}
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-arylideYellow/20 bg-arylideYellow/10 text-arylideYellow transition-all duration-300 group-hover:scale-110 group-hover:border-arylideYellow/40">
                {info.icon}
              </div>

              {/* Teksty */}
              <h3 className="mb-2 text-lg font-bold text-white/80">
                {info.title}
              </h3>
              <p className="text-xl font-semibold transition-colors duration-300 group-hover:text-arylideYellow">
                {info.content}
              </p>
            </div>
          </Link>
        </MotionWrapper>
      ))}
    </div>
  );
};
