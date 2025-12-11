"use client";

import { useActionState, useEffect, useState } from "react";
import { FiArrowRight, FiLoader } from "react-icons/fi"; // Dodałem ikonę ładowania
import { subscribeToNewsletter } from "@/actions/subscribe"; // Import akcji

const initialState = {
  status: "idle" as const,
  message: "",
};

export const NewsletterForm = () => {
  // useActionState obsługuje stan formularza (pending, success, error)
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  // Zachowujemy lokalny stan tylko do czyszczenia inputa po sukcesie
  const [email, setEmail] = useState("");

  // Efekt czyszczący formularz po udanym zapisie
  useEffect(() => {
    if (state.status === "success") {
      setEmail("");
      // Tutaj możesz też wywołać zewnętrzny Toast (np. sonner / react-hot-toast)
      // toast.success(state.message);
    }
  }, [state.status]);

  return (
    <div className="w-full max-w-sm mt-6">
      <form action={formAction}>
        <div
          className={`
            group relative flex items-center border-b py-2 transition-colors duration-300
            ${state.status === "error" ? "border-red-500" : "border-white/20 focus-within:border-arylideYellow/80"}
          `}
        >
          <input
            name="email" // KLUCZOWE: Server Action czyta to pole
            type="email"
            placeholder="Twój adres e-mail"
            aria-label="Twój adres e-mail"
            required
            disabled={isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full appearance-none border-none bg-transparent text-sm text-white placeholder:text-philippineSilver focus:outline-none focus:ring-0 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={isPending || !email}
            aria-label="Zapisz się do newslettera"
            className="group/btn relative flex h-8 w-8 items-center justify-center rounded-full border border-arylideYellow bg-transparent text-arylideYellow transition-all duration-300 ease-out hover:bg-arylideYellow hover:text-raisinBlack hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
              {isPending ? (
                <FiLoader className="animate-spin" size={18} />
              ) : (
                <FiArrowRight size={20} />
              )}
            </span>
          </button>
        </div>
      </form>

      {/* Dyskretne komunikaty o statusie pod inputem */}
      <div className="mt-2 h-5 text-xs font-medium">
        {state.status === "error" && (
          <p className="text-red-400 animate-in fade-in slide-in-from-top-1">
            {state.message}
          </p>
        )}
        {state.status === "success" && (
          <p className="text-green-400 animate-in fade-in slide-in-from-top-1">
            {state.message}
          </p>
        )}
      </div>
    </div>
  );
};

NewsletterForm.displayName = "NewsletterForm";
