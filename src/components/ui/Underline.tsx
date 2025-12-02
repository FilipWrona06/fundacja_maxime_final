import { memo } from "react";

// Zakładam, że durations.normal to np. 300ms, wpisuję tutaj klasę duration-300
// Jeśli premiumEase to cubic-bezier, można go wpisać w ease-[...]

interface UnderlineProps {
  isActive?: boolean;
  isHovered?: boolean;
  variant?: "default" | "prominent" | "subtle" | "gradient" | "glow";
}

export const Underline = memo(
  ({ isActive, isHovered, variant = "default" }: UnderlineProps) => {
    const isVisible = isActive || isHovered;

    const heightVariants = {
      default: "h-0.5",
      prominent: "h-0.5",
      subtle: "h-px",
      gradient: "h-0.5",
      glow: "h-0.5",
    };

    const variantStyles = {
      default:
        "bg-gradient-to-r from-transparent via-arylideYellow to-transparent",
      prominent:
        "bg-gradient-to-r from-transparent via-arylideYellow to-transparent",
      subtle: "bg-arylideYellow/60",
      gradient:
        "bg-gradient-to-r from-arylideYellow/60 via-arylideYellow to-arylideYellow/60",
      glow: "bg-gradient-to-r from-transparent via-arylideYellow to-transparent shadow-lg shadow-arylideYellow/30",
    };

    return (
      <span
        className={`
          absolute -bottom-0.5 left-0 w-full rounded-full origin-center
          transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]
          ${heightVariants[variant]} 
          ${variantStyles[variant]}
          ${isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
        `}
        aria-hidden="true" // Dobra praktyka: element dekoracyjny nie powinien być czytany przez screen readery
      />
    );
  },
);

Underline.displayName = "Underline";

export default Underline;
