"use client";

import { m } from "framer-motion";
import type { FormEvent } from "react";
import { memo, useCallback, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { tapScales, ultraSmoothSpring } from "@/lib/animations";

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
          className="relative flex h-8 w-8 items-center justify-center rounded-full border border-arylideYellow bg-transparent text-arylideYellow transition-colors duration-300 hover:bg-arylideYellow hover:text-raisinBlack"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: tapScales.normal }}
          transition={ultraSmoothSpring}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          <m.span
            animate={isButtonHovered ? { x: 2 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiArrowRight size={20} />
          </m.span>
        </m.button>
      </m.div>
    </form>
  );
});

NewsletterForm.displayName = "NewsletterForm";
