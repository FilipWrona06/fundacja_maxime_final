import Link from "next/link";
import type { FC, SVGProps } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import type { SocialLink } from "@/lib/types/index";

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

export const SocialIcon = ({ social }: { social: SocialLink }) => {
  const IconComponent = ICON_MAP[social.icon] || null;

  return (
    <Link
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      // 'group' - pozwala dziecku (span z ikoną) reagować na hover rodzica
      // hover:scale-105 - powiększenie całego przycisku
      // hover:-translate-y-0.5 - przesunięcie o 2px w górę (0.5 unit * 4px = 2px)
      // active:scale-95 - efekt wciśnięcia (tap)
      className={`group relative flex h-10 w-10 items-center justify-center rounded-full border border-philippineSilver/50 text-philippineSilver transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${social.colorClasses.hover}`}
    >
      {/* group-hover:scale-110 - ikona w środku rośnie dodatkowo przy najechaniu na rodzica */}
      <span className="transition-transform duration-300 ease-out group-hover:scale-110">
        {IconComponent && <IconComponent size={20} />}
      </span>
    </Link>
  );
};
