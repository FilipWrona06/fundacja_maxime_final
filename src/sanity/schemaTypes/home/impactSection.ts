// Plik: impactSection.ts (wersja ostateczna)

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "impactSection",
  title: 'Sekcja "Nasz Wpływ"',
  type: "object",
  fieldsets: [{ name: "header", title: "Nagłówek sekcji" }],
  fields: [
    // --- Nagłówek sekcji (bez zmian) ---
    defineField({
      name: "headingPrefix",
      title: "Nagłówek - część standardowa",
      type: "string",
      description: 'Standardowy tekst przed wyróżnieniem, np. "Nasz".',
      fieldset: "header",
    }),
    defineField({
      name: "headingHighlighted",
      title: "Nagłówek - część wyróżniona",
      type: "string",
      description: 'Część nagłówka, która zostanie wyróżniona kolorem, np. "Wpływ".',
      validation: (Rule) => Rule.required().error("Wyróżniona część nagłówka jest wymagana."),
      fieldset: "header",
    }),
    defineField({
      name: "subheading",
      title: "Podtytuł",
      type: "string",
      description: "Krótki tekst wyjaśniający, wyświetlany pod głównym nagłówkiem.",
      validation: (Rule) => Rule.required().error("Podtytuł jest wymagany."),
      fieldset: "header",
    }),

    // --- Lista Kart Wpływu (bez zmian) ---
    defineField({
      name: "impactCards",
      title: "Karty Wpływu",
      type: "array",
      description: "Lista kart prezentujących kluczowe obszary działalności lub osiągnięcia.",
      validation: (Rule) => Rule.required().min(1).error("Należy dodać przynajmniej jedną Kartę Wpływu."),
      of: [
        defineArrayMember({
          name: "impactCard",
          title: "Karta Wpływu",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Tytuł karty",
              type: "string",
              validation: (Rule) => Rule.required().error("Tytuł karty jest wymagany."),
            }),
            defineField({
              name: "description",
              title: "Opis karty",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().error("Opis karty jest wymagany."),
            }),
            defineField({
              name: "image",
              title: "Zdjęcie",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required().error("Zdjęcie na karcie jest wymagane."),
            }),
            defineField({
              name: "altText",
              title: "Tekst alternatywny",
              type: "string",
              description: "Ważne dla SEO i dostępności. Opisz zwięźle, co przedstawia zdjęcie.",
              validation: (Rule) => Rule.required().error("Tekst alternatywny jest wymagany."),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Brak tytułu",
                subtitle: subtitle || "Brak opisu",
                media: media,
              };
            },
          },
        }),
      ],
    }),
  ],
});