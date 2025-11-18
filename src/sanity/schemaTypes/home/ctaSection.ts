// Plik: ctaSection.ts (wersja ostateczna)

import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaSection",
  title: "Sekcja Wezwania do Działania (CTA)",
  type: "object",
  fieldsets: [
    { name: "content", title: "Treść" },
    { name: "action", title: "Przycisk Akcji" },
  ],
  fields: [
    // --- Treść sekcji (bez zmian) ---
    defineField({
      name: "heading",
      title: "Główny nagłówek",
      type: "string",
      description: "Chwytliwy tekst, który ma przyciągnąć uwagę i zachęcić do działania, np. 'Zmieńmy świat na lepsze, razem!'.",
      validation: (Rule) => Rule.required().error("Nagłówek jest wymagany."),
      fieldset: "content",
    }),
    defineField({
      name: "text",
      title: "Tekst pomocniczy (opcjonalny)",
      type: "text",
      rows: 2,
      description: "Dodatkowy, krótki tekst, jeśli nagłówek wymaga uzupełnienia lub wyjaśnienia.",
      fieldset: "content",
    }),

    // --- Przycisk Akcji (bez zmian) ---
    defineField({
      name: "button",
      title: "Przycisk",
      type: "object",
      description: "Przycisk, który wykonuje główną akcję w tej sekcji.",
      validation: (Rule) => Rule.required().error("Sekcja CTA musi zawierać przycisk."),
      fieldset: "action",
      fields: [
        defineField({
          name: "label",
          title: "Etykieta przycisku",
          type: "string",
          description: "Tekst, który pojawi się na przycisku, np. 'Wesprzyj nas', 'Dołącz do nas'.",
          validation: (Rule) => Rule.required().error("Etykieta przycisku jest wymagana."),
        }),
        defineField({
          name: "link",
          title: "Link docelowy",
          type: "url",
          description: "Adres, na który zostanie przekierowany użytkownik. Może być wewnętrzny (np. /kontakt) lub zewnętrzny (np. https://google.com).",
          validation: (Rule) =>
            Rule.uri({
              allowRelative: true,
              scheme: ["http", "https", "mailto", "tel"],
            }).error("Podaj prawidłowy adres URL."),
        }),
      ],
    }),
  ],
});