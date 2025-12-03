// Plik: src/components/contact/ContactForm.client.tsx
// (Zostawiamy .client, bo to Interaktywna Wyspa)

"use client";

import { type FormEvent, useState } from "react";
import { FiCheck, FiSend } from "react-icons/fi";

export const ContactFormClient = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Symulacja wysyłki
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Zwracamy czysty formularz HTML, bez wrapperów animacji
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-white/80"
        >
          Imię i nazwisko
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 focus:border-arylideYellow focus:outline-none focus:ring-2 focus:ring-arylideYellow/20"
          placeholder="Jan Kowalski"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-white/80"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 focus:border-arylideYellow focus:outline-none focus:ring-2 focus:ring-arylideYellow/20"
          placeholder="jan@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-2 block text-sm font-semibold text-white/80"
        >
          Temat
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 focus:border-arylideYellow focus:outline-none focus:ring-2 focus:ring-arylideYellow/20"
          placeholder="Pytanie o koncert"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-white/80"
        >
          Wiadomość
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 focus:border-arylideYellow focus:outline-none focus:ring-2 focus:ring-arylideYellow/20"
          placeholder="Twoja wiadomość..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitted}
        className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-arylideYellow px-8 py-4 font-bold text-raisinBlack transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >
        {isSubmitted ? (
          <>
            <FiCheck size={20} />
            Wysłano!
          </>
        ) : (
          <>
            Wyślij wiadomość
            <FiSend
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </>
        )}
      </button>
    </form>
  );
};
