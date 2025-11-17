"use client";

import { m } from "framer-motion";
import Link from "next/link";
import type { FC, SVGProps } from "react";
import { memo, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import {
  ultraSmoothSpring,
  tapScales,
} from "@/lib/animations";
import type { SocialLink } from "@/lib/types";

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

export const SocialIcon = memo(({ social }: { social: SocialLink }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = ICON_MAP[social.icon] || null;

  return (
    <m.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: tapScales.normal }}
      transition={ultraSmoothSpring}
    >
      <Link
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
        className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-philippineSilver/50 text-philippineSilver transition-all duration-300 ${social.colorClasses.hover}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon */}
        <m.span
          animate={
            isHovered
              ? {
                  scale: 1.1,
                }
              : { scale: 1 }
          }
          transition={{ duration: 0.3 }}
        >
          {IconComponent && <IconComponent size={20} />}
        </m.span>
      </Link>
    </m.div>
  );
});

SocialIcon.displayName = "SocialIcon";