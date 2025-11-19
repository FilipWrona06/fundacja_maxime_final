// Plik: impactSection.ts (wersja z edytorem Portable Text w opisie karty)

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
      description:
        'Część nagłówka, która zostanie wyróżniona kolorem, np. "Wpływ".',
      validation: (Rule) =>
        Rule.required().error("Wyróżniona część nagłówka jest wymagana."),
      fieldset: "header",
    }),
    defineField({
      name: "subheading",
      title: "Podtytuł",
      type: "string",
      description:
        "Krótki tekst wyjaśniający, wyświetlany pod głównym nagłówkiem.",
      validation: (Rule) => Rule.required().error("Podtytuł jest wymagany."),
      fieldset: "header",
    }),

    // --- Lista Kart Wpływu (zaktualizowana) ---
    defineField({
      name: "impactCards",
      title: "Karty Wpływu",
      type: "array",
      description:
        "Lista kart prezentujących kluczowe obszary działalności lub osiągnięcia.",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Należy dodać przynajmniej jedną Kartę Wpływu."),
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
              validation: (Rule) =>
                Rule.required().error("Tytuł karty jest wymagany."),
            }),

            // --- ZAKTUALIZOWANE POLE "description" Z EDYTOREM TEKSTU ---
            defineField({
              name: "description",
              title: "Opis karty",
              type: "array", // Zmieniono z 'text' na 'array'
              validation: (Rule) =>
                Rule.required().error("Opis karty jest wymagany."),
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
              ],
            }),

            defineField({
              name: "image",
              title: "Zdjęcie",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) =>
                Rule.required().error("Zdjęcie na karcie jest wymagane."),
            }),
            defineField({
              name: "altText",
              title: "Tekst alternatywny",
              type: "string",
              description:
                "Ważne dla SEO i dostępności. Opisz zwięźle, co przedstawia zdjęcie.",
              validation: (Rule) =>
                Rule.required().error("Tekst alternatywny jest wymagany."),
            }),
          ],
          preview: {
            select: {
              title: "title",
              // Nie można już użyć 'description' jako subtitle, ponieważ jest to tablica
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title || "Brak tytułu",
                subtitle: "Zawartość z edytora Portable Text",
                media: media,
              };
            },
          },
        }),
      ],
    }),
  ],
});
