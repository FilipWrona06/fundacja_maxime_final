// Plik: aboutSection.ts

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "aboutSection",
  title: "Sekcja O Fundacji",
  type: "object",
  fieldsets: [
    { name: "content", title: "Treść sekcji" },
    { name: "imageGroup", title: "Główny obraz" },
    { name: "statsGroup", title: "Statystyki liczbowe" },
  ],
  fields: [
    // --- GRUPA: Treść sekcji ---
    defineField({
      name: "smallHeading",
      title: "Podtytuł (nad nagłówkiem)",
      type: "string",
      description: 'Krótki tekst wprowadzający, np. "O Fundacji Maxime".',
      validation: (Rule) => Rule.required().error("Podtytuł jest wymagany."),
      fieldset: "content",
    }),
    defineField({
      name: "headingPart1",
      title: "Nagłówek - część 1 (początek)",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Początkowa część nagłówka jest wymagana."),
      fieldset: "content",
    }),
    defineField({
      name: "headingPart2",
      title: "Nagłówek - część 2 (wyróżniona)",
      type: "string",
      description:
        "Ta część nagłówka zostanie automatycznie wyróżniona kolorem (np. żółtym).",
      validation: (Rule) =>
        Rule.required().error("Wyróżniona część nagłówka jest wymagana."),
      fieldset: "content",
    }),
    defineField({
      name: "headingPart3",
      title: "Nagłówek - część 3 (koniec)",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Końcowa część nagłówka jest wymagana."),
      fieldset: "content",
    }),

    // --- ZAKTUALIZOWANE POLE "paragraph1" ---
    // Teraz używa typu 'richText', co usuwa style nagłówków i upraszcza kod
    defineField({
      name: "paragraph1",
      title: "Akapit 1 (główny)",
      type: "richText",
      fieldset: "content",
      validation: (Rule) =>
        Rule.required().error("Pierwszy, główny akapit jest wymagany."),
    }),

    // --- ZAKTUALIZOWANE POLE "paragraph2" ---
    defineField({
      name: "paragraph2",
      title: "Akapit 2 (opcjonalny)",
      type: "richText",
      fieldset: "content",
      description:
        "Dodatkowy akapit, jeśli potrzebne jest więcej miejsca na opis.",
    }),

    // --- GRUPA: Główny obraz (bez zmian) ---
    defineField({
      name: "image",
      title: "Zdjęcie",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().error("Zdjęcie w tej sekcji jest wymagane."),
      fieldset: "imageGroup",
    }),
    defineField({
      name: "imageAlt",
      title: "Tekst alternatywny (Alt Text)",
      type: "string",
      description:
        "Kluczowe dla SEO i dostępności. Opisz zwięźle, co przedstawia zdjęcie (np. 'Założyciel fundacji podczas przemówienia').",
      validation: (Rule) =>
        Rule.required().error("Tekst alternatywny jest wymagany."),
      fieldset: "imageGroup",
    }),

    // --- GRUPA: Statystyki liczbowe (bez zmian) ---
    defineField({
      name: "stats",
      title: "Statystyki",
      type: "array",
      description:
        "Dodaj od 1 do 3 kluczowych statystyk, które pojawią się na zdjęciu.",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(3)
          .error("Należy dodać od 1 do 3 statystyk."),
      fieldset: "statsGroup",
      of: [
        defineArrayMember({
          name: "stat",
          title: "Statystyka",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Wartość",
              type: "string",
              description: "Wpisz liczbę lub tekst, np. '50+', '1000', 'Nr 1'.",
              validation: (Rule) =>
                Rule.required().error("Wartość statystyki jest wymagana."),
            }),
            defineField({
              name: "label",
              title: "Etykieta",
              type: "string",
              description:
                "Wybierz etykietę, do której w kodzie przypisana jest odpowiednia ikona.",
              options: {
                list: [
                  { title: "Zorganizowanych koncertów", value: "Koncertów" },
                  { title: "Zadowolonych widzów", value: "Widzów" },
                  { title: "Zdobytych nagród", value: "Nagród" },
                ],
                layout: "radio",
              },
              validation: (Rule) =>
                Rule.required().error("Musisz wybrać etykietę dla statystyki."),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
            prepare({ title, subtitle }) {
              return {
                title: subtitle ? `${subtitle} ${title}` : "Nowa statystyka",
              };
            },
          },
        }),
      ],
    }),
  ],
});
