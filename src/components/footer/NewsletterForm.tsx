"use client";

import { m } from "framer-motion";
import type { FormEvent } from "react";
import { memo, useCallback, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  hoverTransition,
  iconPopTransition,
  shineTransition,
  ultraSmoothSpring,
  hoverScales,
  tapScales,
} from "@/lib/animations";

export const NewsletterForm = memo(() => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Dziękujemy za zapisanie się do newslettera!");
    setEmail("");
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm">
      <m.div
        className="relative flex items-center border-b py-2 transition-colors duration-300"
        animate={{
          borderColor: isFocused
            ? "rgba(233,215,88,0.8)"
            : "rgba(200,200,200,0.2)",
        }}
      >
        <input
          type="email"
          placeholder="Twój adres e-mail"
          aria-label="Twój adres e-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full appearance-none border-none bg-transparent text-sm text-white placeholder:text-philippineSilver focus:outline-none focus:ring-0"
        />
        <m.button
          type="submit"
          aria-label="Zapisz się do newslettera"
          className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-arylideYellow bg-transparent"
          whileHover={{ scale: hoverScales.normal }}
          whileTap={{ scale: tapScales.normal }}
          transition={ultraSmoothSpring}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          {/* Background fill */}
          <m.span
            className="absolute inset-0 bg-arylideYellow"
            initial={{ x: "-100%" }}
            animate={isButtonHovered ? { x: "0%" } : { x: "-100%" }}
            transition={hoverTransition}
          />

          {/* Icon */}
          <m.span
            className="relative z-10"
            animate={
              isButtonHovered
                ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, -10, 0],
                    color: "#1a1a2e",
                  }
                : { scale: 1, rotate: 0, color: "#E9D758" }
            }
            transition={iconPopTransition}
          >
            <FiArrowRight size={20} />
          </m.span>

          {/* Shine effect */}
          <m.span
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%", skewX: -20 }}
            animate={isButtonHovered ? { x: "200%" } : { x: "-100%" }}
            transition={shineTransition}
          />
        </m.button>
      </m.div>
    </form>
  );
});

NewsletterForm.displayName = "NewsletterForm";