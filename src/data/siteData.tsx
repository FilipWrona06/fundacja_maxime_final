// ZMIEŃ NAZWĘ TEGO PLIKU NA siteData.tsx

import type { SVGProps } from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

// Ikona Patronite
interface PatroniteIconProps extends SVGProps<SVGSVGElement> {
	size?: string | number;
}
export const PatroniteIcon = ({ size, ...props }: PatroniteIconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		width={size || '1em'}
		height={size || '1em'}
		{...props}
	>
		<title>Patronite</title>
		<path d="M16.48.5H3.03v23h4.91v-9.42h8.54c4.14 0 7.52-3.38 7.52-7.54S20.62.5 16.48.5z" />
	</svg>
);

// Dane kontaktowe
export const contactData = {
  address: 'ul. Mireckiego 70, 41-310 Dąbrowa Górnicza',
  email: 'kontakt@stowarzyszeniemaxime.com.pl',
  phone: '+48 123 456 789',
  googleMapsLink: 'https://maps.google.com/?q=ul.+Mireckiego+70,+41-310+Dąbrowa+Górnicza',
};

// Linki do mediów społecznościowych
export const socialLinks = [
  { 
    name: 'Facebook', 
    href: 'https://www.facebook.com/stowarzyszeniemaxime/', 
    icon: FaFacebook,
    color: 'hover:bg-[#1877F2]' 
  },
  { 
    name: 'Instagram', 
    href: 'https://www.instagram.com/maxime.orchestra/', 
    icon: FaInstagram,
    color: 'hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCB045]'
  },
  { 
    name: 'YouTube', 
    href: 'https://www.youtube.com/@stowarzyszeniemaxime', 
    icon: FaYoutube,
    color: 'hover:bg-[#FF0000]'
  },
  { 
    name: 'Patronite', 
    href: 'https://patronite.pl/stowarzyszeniemaxime', 
    icon: PatroniteIcon,
    color: 'hover:bg-[#F96854]'
  },
];

// Linki w nawigacji (używane w stopce)
export const footerLinks = [
  { name: 'Strona główna', href: '/' },
  { name: 'Galeria', href: '/galeria' },
  { name: 'Wydarzenia', href: '/wydarzenia' },
  { name: 'Aktualności', href: '/aktualnosci' },
  { name: 'Kontakt', href: '/kontakt' },
];

// Pytania i odpowiedzi (FAQ)
export const faqItems = [
    {
        question: 'Jak mogę kupić bilet na koncert?',
        answer: 'Bilety dostępne są w zakładce Wydarzenia. Wybierz interesujący Cię koncert i kliknij "Kup bilety". Zostaniesz przekierowany do systemu sprzedaży biletów.',
    },
    {
        question: 'Czy mogę zwrócić bilet?',
        answer: 'Tak, bilety można zwrócić do 7 dni przed wydarzeniem. Skontaktuj się z nami przez formularz kontaktowy lub email, podając numer zamówienia.',
    },
    {
        question: 'Jak mogę wesprzeć fundację?',
        answer: 'Możesz wesprzeć nas poprzez Patronite, zakup biletów na koncerty lub bezpośredni przelew na nasze konto. Szczegóły dostępne w zakładce "Wesprzyj nas".',
    },
    {
        question: 'Czy organizujecie koncerty dla szkół?',
        answer: 'Tak! Prowadzimy program edukacyjny dla szkół. Skontaktuj się z nami, aby omówić szczegóły współpracy i dostępne terminy.',
    },
];