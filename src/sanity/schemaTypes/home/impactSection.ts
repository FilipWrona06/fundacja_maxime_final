import { defineField, defineType } from "sanity";

export default defineType({
  name: "impactSection",
  title: 'Sekcja "Nasz Wpływ"',
  type: "object",
  description:
    "Karty będą generowane automatycznie z najnowszych treści (wydarzenie, news, galeria)",
  fields: [
    defineField({
      name: "headingPrefix",
      title: "Nagłówek - część standardowa",
      type: "string",
      description: 'Standardowy tekst przed wyróżnieniem, np. "Nasz".',
    }),
    defineField({
      name: "headingHighlighted",
      title: "Nagłówek - część wyróżniona",
      type: "string",
      description: 'Część nagłówka wyróżniona kolorem, np. "Wpływ".',
      validation: (Rule) =>
        Rule.required().error("Wyróżniona część nagłówka jest wymagana."),
    }),
    defineField({
      name: "subheading",
      title: "Podtytuł",
      type: "string",
      description: "Tekst wyjaśniający pod głównym nagłówkiem.",
      validation: (Rule) => Rule.required().error("Podtytuł jest wymagany."),
    }),
  ],
});
