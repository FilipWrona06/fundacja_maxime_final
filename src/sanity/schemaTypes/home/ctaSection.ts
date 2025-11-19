// Plik: ctaSection.ts (wersja z zaawansowanym edytorem tekstu)

import { FiMousePointer } from "react-icons/fi"; // Opcjonalnie: dodanie ikon dla lepszego UI w studio
import { defineField, defineType } from "sanity";

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

    // ZAKTUALIZOWANE POLE "text" Z ZAAWANSOWANYM EDYTOREM
    defineField({
      name: "text",
      title: "Tekst pomocniczy",
      type: "array",
      fieldset: "content",
      description:
        "Dodatkowy tekst wyjaśniający, np. 'Twoje wsparcie pozwala nam organizować bezpłatne koncerty...'.",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [
            { title: "Lista punktowana", value: "bullet" },
            { title: "Lista numerowana", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Pogrubienie", value: "strong" },
              { title: "Kursywa", value: "em" },
              { title: "Podkreślenie", value: "underline" },
              { title: "Przekreślenie", value: "strike-through" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link zewnętrzny",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
        },
        // Możesz także dodać separatory, jeśli są potrzebne w tej sekcji
        // { type: "horizontalRule" },
        // { type: "spacer" },
      ],
      validation: (Rule) =>
        Rule.required().error("Tekst pomocniczy jest wymagany."),
    }),

    // --- GRUPA: Przyciski Akcji (pozostaje bez zmian) ---
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
