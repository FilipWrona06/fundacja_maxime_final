// Plik: src/components/navbar/PatroniteLink.tsx

import Link from "next/link";
import { FaHeart } from "react-icons/fa";

const patroniteUrl = "https://patronite.pl/stowarzyszeniemaxime";

interface PatroniteLinkProps {
  isMobile?: boolean;
  onClick?: () => void;
}

export const PatroniteLink = ({
  isMobile = false,
  onClick,
}: PatroniteLinkProps) => {
  // Style bazowe
  const baseClasses =
    "group relative flex items-center gap-x-2.5 rounded-full font-semibold overflow-hidden transition-all duration-300 ease-out active:scale-95"; // active:scale-95 zastępuje whileTap

  // Style wariantów
  const mobileClasses =
    "border-2 border-arylideYellow/50 px-7 py-3.5 text-xl hover:border-arylideYellow hover:bg-arylideYellow/10";

  const desktopClasses =
    "border border-arylideYellow/40 px-5 py-2.5 text-sm hover:border-arylideYellow hover:bg-arylideYellow/10 hover:scale-105 hover:-translate-y-0.5"; // Zastępuje whileHover

  return (
    <Link
      href={patroniteUrl}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="no-referrer"
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
      onClick={onClick}
    >
      {/* Tekst Linku */}
      <span className="relative z-10 text-arylideYellow">Wesprzyj nas</span>

      {/* Ikona Serca - animacja w CSS */}
      {/* group-hover:scale-125 zastępuje animację serca z framer-motion */}
      <span className="relative z-10 text-arylideYellow transition-transform duration-300 ease-out group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(239,213,111,0.5)]">
        <FaHeart aria-hidden="true" />
      </span>
    </Link>
  );
};

PatroniteLink.displayName = "PatroniteLink";
