// Plik: src/components/contact/SocialsAndMap.tsx
// (Usuń .client z nazwy pliku i usuń "use client")

import Link from "next/link";
import type { FC, SVGProps } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

// Importujemy Twój wrapper (Island) dla animacji wejścia
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import type { SocialLink } from "@/lib/types";

// Definicja typów dla Ikon
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

// Ikona Patronite (SVG)
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

// Mapa ikon dostępnych w systemie
const ICON_MAP: Record<string, FC<IconProps>> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  patronite: PatroniteIcon,
};

export const SocialsAndMap = ({
  socialLinks,
}: {
  socialLinks: readonly SocialLink[];
}) => {
  return (
    // Używamy MotionWrapper tylko do animacji wejścia (viewport)
    <MotionWrapper delay={0.2}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {socialLinks.map((social) => {
          const IconComponent = ICON_MAP[social.icon];
          return (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/20 bg-white/5 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-white/30 active:scale-95"
            >
              {/* TŁO: Slide-in effect przy użyciu CSS group-hover */}
              <span
                className={`absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 ${social.colorClasses.background}`}
              />

              {/* SHINE: Przesuwający się błysk przy użyciu CSS group-hover */}
              <span className="absolute inset-0 -translate-x-[150%] -skew-x-20 bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />

              {/* TREŚĆ */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {IconComponent && <IconComponent size={24} />}
                </div>
                <span className="font-semibold text-white transition-colors duration-300">
                  {social.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </MotionWrapper>
  );
};
