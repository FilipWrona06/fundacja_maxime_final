import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaSection",
  title: "Sekcja Wezwania do Działania (CTA)",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Nagłówek",
      type: "string",
      description: "Główny, chwytliwy tekst zachęcający do działania.",
      validation: (Rule) => Rule.required().error("Nagłówek jest wymagany."),
    }),
    defineField({
      name: "text",
      title: "Tekst",
      type: "text",
      rows: 3,
      description:
        "Krótki tekst uzupełniający nagłówek, wyjaśniający korzyść lub dalsze kroki.",
      validation: (Rule) => Rule.required().error("Tekst jest wymagany."),
    }),
  ],
});
