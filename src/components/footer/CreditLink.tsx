import Link from "next/link";
import type { ReactNode } from "react";
// Zakładam, że Underline da się dostosować lub zastąpić prostym div-em w CSS
// Jeśli Underline wymaga propa isHovered (JS), lepiej go tu zastąpić zwykłym CSS.

export const CreditLink = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // "group" pozwala dzieciom reagować na hover rodzica
      className="group relative font-semibold inline-block"
    >
      <span
        // Zastępujemy animate={{ y: -2 }} klasami Tailwinda
        // transition-transform + ease-out symuluje płynny ruch
        className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
      >
        {children}
      </span>
      
      {/* 
         Zamiast komponentu <Underline isHovered={...} /> 
         robimy to w CSS (lub dostosowujemy Underline, by reagował na grupę)
      */}
      <span 
        className="absolute left-0 bottom-0 block h-px w-full bg-current 
                   scale-x-0 transition-transform duration-300 ease-out 
                   origin-left group-hover:scale-x-100" 
      />
    </Link>
  );
};