// Plik: ctaSection.ts

import { FiMousePointer } from "react-icons/fi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaSection",
  title: "Sekcja Wezwania do Działania (CTA)",
  type: "object",
  icon: FiMousePointer,
  fieldsets: [
    { name: "content", title: "Treść sekcji" },
    { name: "buttons", title: "Przyciski Akcji" },
  ],
  fields: [
    // --- GRUPA: Treść sekcji ---
    defineField({
      name: "heading",
      title: "Główny nagłówek",
      type: "string",
      description:
        "Chwytliwy tekst, który ma przyciągnąć uwagę, np. 'Pomóż nam się rozwijać!'.",
      validation: (Rule) => Rule.required().error("Nagłówek jest wymagany."),
      fieldset: "content",
    }),

    // --- ZAKTUALIZOWANE POLE "text" ---
    // Używamy typu 'richText' zamiast ręcznej definicji tablicy bloków
    defineField({
      name: "text",
      title: "Tekst pomocniczy",
      type: "richText",
      fieldset: "content",
      description:
        "Dodatkowy tekst wyjaśniający, np. 'Twoje wsparcie pozwala nam organizować bezpłatne koncerty...'.",
      validation: (Rule) =>
        Rule.required().error("Tekst pomocniczy jest wymagany."),
    }),

    // --- GRUPA: Przyciski Akcji (bez zmian) ---
    defineField({
      name: "primaryButton",
      title: "Przycisk główny (np. 'Wesprzyj nas')",
      type: "object",
      description: "Główny przycisk akcji w sekcji.",
      validation: (Rule) =>
        Rule.required().error("Przycisk główny jest wymagany."),
      fieldset: "buttons",
      fields: [
        defineField({
          name: "label",
          title: "Etykieta przycisku",
          type: "string",
          description: "Tekst na przycisku, np. 'Wesprzyj nas'.",
          validation: (Rule) =>
            Rule.required().error("Etykieta jest wymagana."),
        }),
        defineField({
          name: "link",
          title: "Link docelowy",
          type: "url",
          description: "Adres URL, np. 'https://patronite.pl/fundacja-maxime'.",
          validation: (Rule) =>
            Rule.uri({
              allowRelative: true,
              scheme: ["http", "https", "mailto", "tel"],
            }).error("Podaj prawidłowy adres URL."),
        }),
      ],
    }),

    defineField({
      name: "secondaryButton",
      title: "Przycisk dodatkowy (np. 'Zobacz galerię')",
      type: "object",
      description: "Opcjonalny, drugi przycisk o mniejszym priorytecie.",
      fieldset: "buttons",
      fields: [
        defineField({
          name: "label",
          title: "Etykieta przycisku",
          type: "string",
          description: "Tekst na przycisku, np. 'Zobacz naszą galerię'.",
          validation: (Rule) =>
            Rule.required().error("Etykieta jest wymagana."),
        }),
        defineField({
          name: "link",
          title: "Link docelowy",
          type: "string",
          description:
            "Link wewnętrzny (np. '/galeria') lub zewnętrzny (np. 'https://google.com').",
          validation: (Rule) => Rule.required().error("Link jest wymagany."),
        }),
      ],
    }),
  ],
});
