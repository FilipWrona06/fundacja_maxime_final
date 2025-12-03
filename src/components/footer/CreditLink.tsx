import Link from "next/link";
import type { ReactNode } from "react";

export const CreditLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // 'group' pozwala dzieciom (spanom) reagować na hover rodzica (linku)
      className="group relative inline-block font-semibold transition-colors duration-300 hover:text-white"
    >
      {/* Tekst unoszący się do góry */}
      <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
        {children}
      </span>

      {/* 
        Podkreślenie rozwijające się od lewej.
        Używamy 'bg-arylideYellow' lub 'bg-current' w zależności od preferencji designu.
      */}
      <span className="absolute bottom-0 left-0 block h-px w-full bg-arylideYellow scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100" />
    </Link>
  );
};
