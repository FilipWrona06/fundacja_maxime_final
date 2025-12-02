"use client";

import { domAnimation, LazyMotion, m, type Transition } from "framer-motion";
import Link from "next/link";
import { type FC, type SVGProps, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
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

const hoverTransition: Transition = {
  duration: 0.4,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const shineTransition: Transition = {
  duration: 0.7,
  ease: "circOut",
  delay: 0.1,
};

export const SocialsAndMapClient = ({
  socialLinks,
}: {
  socialLinks: readonly SocialLink[];
}) => {
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 gap-4"
      >
        {socialLinks.map((social, index) => {
          const IconComponent = ICON_MAP[social.icon];
          return (
            <m.div
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
                <m.span
                  className={`absolute inset-0 ${social.colorClasses.background}`}
                  initial={{ x: "-100%" }}
                  animate={
                    hoveredSocial === index ? { x: "0%" } : { x: "-100%" }
                  }
                  transition={hoverTransition}
                />
                <m.span
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-150%", skewX: -20 }}
                  animate={
                    hoveredSocial === index ? { x: "150%" } : { x: "-150%" }
                  }
                  transition={shineTransition}
                />
                <div className="relative z-10 flex items-center gap-4">
                  <m.div
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
                    {IconComponent && <IconComponent size={24} />}
                  </m.div>
                  <span className="font-semibold text-white">
                    {social.name}
                  </span>
                </div>
              </Link>
            </m.div>
          );
        })}
      </m.div>
    </LazyMotion>
  );
};
