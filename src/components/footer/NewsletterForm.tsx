"use client";

import type { FormEvent } from "react";
import { memo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export const NewsletterForm = memo(() => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Tutaj w przyszłości wywołasz Server Action
    alert("Dziękujemy za zapisanie się do newslettera!");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm">
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

        <button
          type="submit"
          aria-label="Zapisz się do newslettera"
          // ZMIANA: Zamiast m.button używamy zwykłego buttona z klasami Tailwind.
          // hover:scale-105 i active:scale-95 dają podobny efekt "klikania" jak Framer Motion.
          className="group/btn relative flex h-8 w-8 items-center justify-center rounded-full border border-arylideYellow bg-transparent text-arylideYellow transition-all duration-300 ease-out hover:bg-arylideYellow hover:text-raisinBlack hover:scale-105 active:scale-95"
        >
          <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
            <FiArrowRight size={20} />
          </span>
        </button>
      </div>
    </form>
  );
});

NewsletterForm.displayName = "NewsletterForm";
