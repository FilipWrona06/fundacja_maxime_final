// Plik: ctaSection.ts (wersja rozszerzona i poprawiona)

import { defineField, defineType } from "sanity";
import { FiMousePointer } from "react-icons/fi"; // Opcjonalnie: dodanie ikon dla lepszego UI w studio

export default defineType({
  name: "ctaSection",
  title: "Sekcja Wezwania do Działania (CTA)",
  type: "object",
  icon: FiMousePointer, // Opcjonalna ikona dla typu
  fieldsets: [
    { name: "content", title: "Treść sekcji" },
    { name: "buttons", title: "Przyciski Akcji" },
  ],
  fields: [
    // --- GRUPA: Treść sekcji (pola pozostają bez zmian) ---
    defineField({
      name: "heading",
      title: "Główny nagłówek",
      type: "string",
      description: "Chwytliwy tekst, który ma przyciągnąć uwagę, np. 'Pomóż nam się rozwijać!'.",
      validation: (Rule) => Rule.required().error("Nagłówek jest wymagany."),
      fieldset: "content",
    }),
    defineField({
      name: "text",
      title: "Tekst pomocniczy",
      type: "text",
      rows: 3,
      description: "Dodatkowy, krótki tekst wyjaśniający, np. 'Twoje wsparcie pozwala nam organizować bezpłatne koncerty...'.",
      validation: (Rule) => Rule.required().error("Tekst pomocniczy jest wymagany."),
      fieldset: "content",
    }),

    // --- GRUPA: Przyciski Akcji (zmodyfikowana i rozszerzona) ---

    // ZMIANA: Przycisk główny został nazwany `primaryButton` dla większej czytelności.
    // Jego struktura pozostaje taka sama.
    defineField({
      name: "primaryButton",
      title: "Przycisk główny (np. 'Wesprzyj nas')",
      type: "object",
      description: "Główny przycisk akcji w sekcji.",
      validation: (Rule) => Rule.required().error("Przycisk główny jest wymagany."),
      fieldset: "buttons",
      fields: [
        defineField({
          name: "label",
          title: "Etykieta przycisku",
          type: "string",
          description: "Tekst na przycisku, np. 'Wesprzyj nas'.",
          validation: (Rule) => Rule.required().error("Etykieta jest wymagana."),
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

    // NOWOŚĆ: Dodano pole dla drugiego, opcjonalnego przycisku.
    // Jest to obiekt, który redaktor może dodać, ale nie musi.
    // Dzięki temu komponent na froncie będzie mógł go warunkowo renderować.
    defineField({
      name: "secondaryButton",
      title: "Przycisk dodatkowy (np. 'Zobacz galerię')",
      type: "object",
      description: "Opcjonalny, drugi przycisk o mniejszym priorytecie.",
      // Brak walidacji `required()` oznacza, że pole jest opcjonalne.
      fieldset: "buttons",
      fields: [
        defineField({
          name: "label",
          title: "Etykieta przycisku",
          type: "string",
          description: "Tekst na przycisku, np. 'Zobacz naszą galerię'.",
          validation: (Rule) => Rule.required().error("Etykieta jest wymagana."),
        }),
        defineField({
          name: "link",
          title: "Link docelowy",
          type: "string", // Użycie 'string' zamiast 'url' pozwala na łatwe linkowanie wewnętrzne, np. '/galeria'
          description: "Link wewnętrzny (np. '/galeria') lub zewnętrzny (np. 'https://google.com').",
          validation: (Rule) => Rule.required().error("Link jest wymagany."),
        }),
      ],
    }),
  ],
});