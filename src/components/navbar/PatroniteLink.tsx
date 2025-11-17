"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import {
  ultraSmoothSpring,
  tapScales,
} from "@/lib/animations";

const patroniteUrl = "https://patronite.pl/stowarzyszeniemaxime";

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

  const baseClasses =
    "relative flex items-center gap-x-2.5 rounded-full font-semibold overflow-hidden transition-all duration-300 ease-out";
  const mobileClasses =
    "border-2 border-arylideYellow/50 px-7 py-3.5 text-xl hover:border-arylideYellow hover:bg-arylideYellow/10";
  const desktopClasses =
    "border border-arylideYellow/40 px-5 py-2.5 text-sm hover:border-arylideYellow hover:bg-arylideYellow/10";

  return (
    <m.div
      whileHover={!isMobile ? { scale: 1.02, y: -2 } : undefined}
      whileTap={{ scale: tapScales.normal }}
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
      >
        {/* Link text */}
        <span className="relative z-10 text-arylideYellow">
          Wesprzyj nas
        </span>

        {/* Heart icon */}
        <m.span
          className="relative z-10 text-arylideYellow"
          animate={
            isHovered
              ? {
                  scale: [1, 1.15, 1],
                }
              : {
                  scale: 1,
                }
          }
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <FaHeart aria-hidden="true" />
        </m.span>
      </Link>
    </m.div>
  );
};

PatroniteLink.displayName = "PatroniteLink";