"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";

const patroniteUrl = "https://patronite.pl/stowarzyszeniemaxime";

const ultraSmoothSpring = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.8
} as const;


const shineAnimation = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1]
} as const;

interface PatroniteLinkProps {
  isMobile?: boolean;
  onClick?: () => void;
}

export const PatroniteLink = ({
  isMobile = false,
  onClick,
}: PatroniteLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefetchedRef = useRef(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (!prefetchedRef.current && typeof window !== "undefined") {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = patroniteUrl;
      document.head.appendChild(link);
      prefetchedRef.current = true;
    }
  };

  const baseClasses = "relative flex items-center gap-x-2.5 rounded-full font-semibold overflow-hidden transition-all duration-500 ease-out";
  const mobileClasses = "border-2 border-arylideYellow/50 px-7 py-3.5 text-xl";
  const desktopClasses = "border border-arylideYellow/40 px-5 py-2.5 text-sm";

  return (
    <m.div
      whileHover={!isMobile ? { scale: 1.04 } : undefined}
      whileTap={{ scale: 0.96 }}
      transition={ultraSmoothSpring}
      className="will-change-transform"
    >
      <Link
        href={patroniteUrl}
        target="_blank"
        rel="noopener noreferrer"
        referrerPolicy="no-referrer"
        className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
        onClick={onClick}
        prefetch={false}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered 
            ? isMobile 
              ? "0 0 24px rgba(233,215,88,0.35), 0 0 48px rgba(233,215,88,0.15)"
              : "0 0 20px rgba(233,215,88,0.3), 0 0 40px rgba(233,215,88,0.12)"
            : "none",
          transition: "box-shadow 0.5s ease-out"
        }}
      >
        {/* Animowane tło */}
        <m.span
          className="absolute inset-0 bg-linear-to-r from-arylideYellow/95 via-arylideYellow to-arylideYellow/95 will-change-transform"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "0%" } : { x: "-100%" }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        />

        {/* Tekst linku */}
        <m.span
          className="relative z-10"
          animate={{ 
            color: isHovered ? "#1a1a2e" : "#e9d758",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Wesprzyj nas
        </m.span>

        {/* Animowana ikona serca */}
        <m.span
          className="relative z-10"
          animate={
            isHovered
              ? { 
                  scale: [1, 1.15, 1.05], 
                  rotate: [0, -8, 8, -5, 0],
                  color: "#1a1a2e"
                }
              : { 
                  scale: 1, 
                  rotate: 0,
                  color: "#e9d758"
                }
          }
          transition={{ 
            duration: 0.8, 
            ease: [0.34, 1.56, 0.64, 1],
            color: { duration: 0.4, ease: "easeOut" }
          }}
        >
          <FaHeart aria-hidden="true" />
        </m.span>

        {/* Animacja połysku - subtelniejsza */}
        <m.span
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent will-change-transform"
          initial={{ x: "-150%", skewX: -15 }}
          animate={isHovered ? { x: "250%" } : { x: "-150%" }}
          transition={shineAnimation}
        />
      </Link>
    </m.div>
  );
};

PatroniteLink.displayName = "PatroniteLink";