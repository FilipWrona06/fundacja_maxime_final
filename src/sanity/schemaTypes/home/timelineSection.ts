// Plik: timelineSection.ts

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "timelineSection",
  title: 'Sekcja "Nasza Historia"',
  type: "object",
  fieldsets: [{ name: "header", title: "Nagłówek sekcji" }],
  fields: [
    // --- Nagłówek sekcji (bez zmian) ---
    defineField({
      name: "headingPrefix",
      title: "Nagłówek - część standardowa",
      type: "string",
      description: 'Standardowy tekst przed wyróżnieniem, np. "Nasza".',
      fieldset: "header",
    }),
    defineField({
      name: "headingHighlighted",
      title: "Nagłówek - część wyróżniona",
      type: "string",
      description:
        'Część nagłówka, która zostanie wyróżniona kolorem, np. "Historia".',
      validation: (Rule) =>
        Rule.required().error("Wyróżniona część nagłówka jest wymagana."),
      fieldset: "header",
    }),
    defineField({
      name: "subheading",
      title: "Podtytuł",
      type: "string",
      description:
        "Krótki tekst wprowadzający, wyświetlany pod głównym nagłówkiem.",
      validation: (Rule) => Rule.required().error("Podtytuł jest wymagany."),
      fieldset: "header",
    }),

    // --- Lista wydarzeń na osi czasu ---
    defineField({
      name: "timelineEvents",
      title: "Wydarzenia na osi czasu",
      type: "array",
      description:
        "Lista kluczowych wydarzeń z historii fundacji. Najlepiej dodawać je w porządku chronologicznym (od najstarszego do najnowszego).",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Należy dodać co najmniej jedno wydarzenie."),
      of: [
        defineArrayMember({
          name: "timelineEvent",
          title: "Wydarzenie",
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Rok wydarzenia",
              type: "number",
              description:
                "Wpisz pełny rok, np. 2022. Formatowanie na stronie (np. do '22) odbędzie się automatycznie.",
              validation: (Rule) =>
                Rule.required()
                  .integer()
                  .positive()
                  .error("Rok musi być liczbą całkowitą dodatnią."),
            }),
            defineField({
              name: "title",
              title: "Tytuł wydarzenia",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Tytuł wydarzenia jest wymagany."),
            }),

            // --- ZAKTUALIZOWANE POLE "description" ---
            // Używamy typu 'richText'
            defineField({
              name: "description",
              title: "Opis wydarzenia",
              type: "richText",
              validation: (Rule) =>
                Rule.required().error("Opis wydarzenia jest wymagany."),
            }),

            defineField({
              name: "image",
              title: "Zdjęcie",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) =>
                Rule.required().error("Zdjęcie jest wymagane dla wydarzenia."),
            }),
            defineField({
              name: "altText",
              title: "Tekst alternatywny",
              type: "string",
              description:
                "Kluczowe dla SEO i dostępności. Opisz zwięźle, co przedstawia zdjęcie.",
              validation: (Rule) =>
                Rule.required().error("Tekst alternatywny jest wymagany."),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "year",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: subtitle
                  ? `${subtitle}: ${title}`
                  : title || "Brak tytułu",
                subtitle: "Wydarzenie na osi czasu",
                media: media,
              };
            },
          },
        }),
      ],
    }),
  ],
});
