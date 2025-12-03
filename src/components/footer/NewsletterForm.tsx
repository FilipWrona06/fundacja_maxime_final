"use client";

import { m } from "framer-motion"; // Używamy tylko do sprężystości przycisku
import type { FormEvent } from "react";
import { memo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { tapScales, ultraSmoothSpring } from "@/lib/animations";

export const NewsletterForm = memo(() => {
  const [email, setEmail] = useState("");
  // USUNIĘTO: isFocused, isButtonHovered (zastąpione przez CSS)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Tutaj w przyszłości wywołasz Server Action
    alert("Dziękujemy za zapisanie się do newslettera!");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm">
      {/* 
        ZAMIAST FRAMER MOTION DO KOLORU:
        Używamy 'focus-within:' w Tailwindzie. 
        To działa natywnie w przeglądarce, bez JS.
      */}
      <div className="group relative flex items-center border-b border-white/20 py-2 transition-colors duration-300 focus-within:border-arylideYellow/80">
        <input
          type="email"
          placeholder="Twój adres e-mail"
          aria-label="Twój adres e-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full appearance-none border-none bg-transparent text-sm text-white placeholder:text-philippineSilver focus:outline-none focus:ring-0"
        />

        <m.button
          type="submit"
          aria-label="Zapisz się do newslettera"
          // Dodano klasę 'group/btn', żeby strzałka wiedziała kiedy guzik ma hover
          className="group/btn relative flex h-8 w-8 items-center justify-center rounded-full border border-arylideYellow bg-transparent text-arylideYellow transition-colors duration-300 hover:bg-arylideYellow hover:text-raisinBlack"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: tapScales.normal }}
          transition={ultraSmoothSpring}
        >
          {/* 
            ZAMIAST FRAMER MOTION DO PRZESUNIĘCIA:
            Używamy zwykłego CSS transform i group-hover
          */}
          <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
            <FiArrowRight size={20} />
          </span>
        </m.button>
      </div>
    </form>
  );
});

NewsletterForm.displayName = "NewsletterForm";
