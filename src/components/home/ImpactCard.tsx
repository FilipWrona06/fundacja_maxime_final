// Plik: src/components/home/ImpactCard.tsx

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiCamera, FiFileText } from "react-icons/fi";
import type { SanityImage } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

// Definicja typu tutaj, aby była współdzielona
export interface ImpactCardItem {
  title: string;
  subtitle: string;
  description: string;
  image: SanityImage;
  link: string;
  // ZMIANA: icon to teraz string, a nie komponent
  iconName: "calendar" | "file" | "camera";
  color?: string;
}

const ICON_MAP = {
  calendar: FiCalendar,
  file: FiFileText,
  camera: FiCamera,
};

export const ImpactCard = ({ card }: { card: ImpactCardItem }) => {
  const IconComponent = ICON_MAP[card.iconName];

  return (
    <Link
      href={card.link}
      className="block h-full overflow-hidden rounded-3xl bg-raisinBlack shadow-xl transition-transform duration-300 hover:-translate-y-2 group"
    >
      <div className="relative aspect-4/5 w-full overflow-hidden">
        <Image
          src={urlFor(card.image).width(600).height(750).url()}
          alt={card.subtitle}
          fill
          sizes="(max-width: 640px) 85vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-linear-to-t ${card.color || ""} to-raisinBlack/90`}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-arylideYellow/0 transition-colors duration-300 group-hover:bg-arylideYellow/10" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          {IconComponent && (
            <IconComponent className="text-arylideYellow" size={20} />
          )}
          <span className="text-xs font-bold uppercase tracking-wider text-arylideYellow/80">
            {card.title}
          </span>
        </div>
        <h3 className="mb-3 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-arylideYellow line-clamp-2">
          {card.subtitle}
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-white/90 line-clamp-2 mb-4">
          {card.description}
        </p>
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-arylideYellow group-hover:gap-3 transition-all duration-300">
          Zobacz więcej <FiArrowRight />
        </div>
      </div>
    </Link>
  );
};
