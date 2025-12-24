/**
 * @file Przechowuje statyczne dane i konfigurację dla całej witryny.
 * Dane te nie pochodzą z CMS i są stałe w kodzie, a ich struktura
 * jest weryfikowana przez typy importowane z `lib/types.ts`.
 */

// Importujemy typy, aby zapewnić spójność i bezpieczeństwo danych
import type {
  ContactData,
  FaqItem,
  NavLink,
  SocialLink,
} from "@/lib/types/index";

// Linki nawigacyjne (używane w Navbar i Footer)
export const navLinks: readonly NavLink[] = [
  { name: "Strona główna", href: "/" },
  { name: "Galeria", href: "/galeria" },
  { name: "Wydarzenia", href: "/wydarzenia" },
  { name: "Aktualności", href: "/aktualnosci" },
  { name: "Kontakt", href: "/kontakt" },
];

// Dane kontaktowe
export const contactData: ContactData = {
  address: "ul. Mireckiego 70, 41-310 Dąbrowa Górnicza",
  email: "kontakt@stowarzyszeniemaxime.com.pl",
  phone: "+48 123 456 789",
  googleMapsLink:
    "https://maps.google.com/?q=ul.+Mireckiego+70,+41-310+Dąbrowa+Górnicza",
};

// Linki do mediów społecznościowych
export const socialLinks: readonly SocialLink[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/stowarzyszeniemaxime/",
    icon: "facebook",
    colorClasses: { background: "bg-[#1877F2]", hover: "hover:bg-[#1877F2]" },
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/maxime.orchestra/",
    icon: "instagram",
    colorClasses: {
      background: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]",
      hover:
        "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCB045]",
    },
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@stowarzyszeniemaxime",
    icon: "youtube",
    colorClasses: { background: "bg-[#FF0000]", hover: "hover:bg-[#FF0000]" },
  },
  {
    name: "Patronite",
    href: "https://patronite.pl/stowarzyszeniemaxime",
    icon: "patronite",
    colorClasses: { background: "bg-[#F96854]", hover: "hover:bg-[#F96854]" },
  },
];

// Pytania i odpowiedzi (FAQ)
export const faqItems: readonly FaqItem[] = [
  {
    question: "Jak mogę kupić bilet na koncert?",
    answer:
      'Bilety dostępne są w zakładce Wydarzenia. Wybierz interesujący Cię koncert i kliknij "Kup bilety". Zostaniesz przekierowany do systemu sprzedaży biletów.',
  },
  {
    question: "Czy mogę zwrócić bilet?",
    answer:
      "Tak, bilety można zwrócić do 7 dni przed wydarzeniem. Skontaktuj się z nami przez formularz kontaktowy lub email, podając numer zamówienia.",
  },
  {
    question: "Jak mogę wesprzeć fundację?",
    answer:
      'Możesz wesprzeć nas poprzez Patronite, zakup biletów na koncerty lub bezpośredni przelew na nasze konto. Szczegóły dostępne w zakładce "Wesprzyj nas".',
  },
  {
    question: "Czy organizujecie koncerty dla szkół?",
    answer:
      "Tak! Prowadzimy program edukacyjny dla szkół. Skontaktuj się z nami, aby omówić szczegóły współpracy i dostępne terminy.",
  },
];
