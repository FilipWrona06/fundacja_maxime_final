import Link from "next/link";
import { memo } from "react";

interface LogoProps {
  className?: string;
}

export const Logo = memo(({ className = "" }: LogoProps) => {
  return (
    <Link
      href="/"
      aria-label="Fundacja Maxime - strona główna"
      // Dodajemy klasy transform, transition i hover/active scale
      className={`group relative inline-block font-youngest text-arylideYellow transition-all duration-500 ease-out ${className}`}
    >
      <span
        className="
          relative inline-block z-10
          transition-transform duration-300 ease-[cubic-bezier(0.6,0.01,0.05,0.9)] 
          group-hover:scale-105 
          group-active:scale-95
        "
      >
        Fundacja Maxime
        {/* Glow effect - działa tak samo na CSS */}
        <span className="absolute inset-0 blur-lg bg-arylideYellow/0 group-hover:bg-arylideYellow/20 transition-all duration-500 -z-10" />
      </span>
    </Link>
  );
});

Logo.displayName = "Logo";

export default Logo;
