import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
/**
Definiuje schemat dla pojedynczego artykułu w sekcji "Aktualności".
*/
export default defineType({
  name: "newsArticle",
  title: "Artykuł (Aktualności)",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tytuł artykułu",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (link)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data publikacji",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateDisplay",
      title: "Wyświetlana data tekstowa",
      type: "string",
      description: 'Np. "28 Października 2025"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "string",
      options: {
        list: [
          { title: "Ogłoszenia", value: "Ogłoszenia" },
          { title: "Relacje", value: "Relacje" },
          { title: "Wydarzenia", value: "Wydarzenia" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Główne zdjęcie artykułu",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Zajawka (krótki opis)",
      type: "text",
      rows: 3,
      description: "Krótki tekst widoczny na liście aktualności.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Treść artykułu",
      type: "text", // Dla prostego tekstu. Użyj 'array', of: [{type: 'block'}] dla edytora rich-text.
      description: "Główna zawartość widoczna po wejściu w szczegóły.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      initialValue: "Fundacja Maxime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Wyróżniony artykuł?",
      type: "boolean",
      description:
        "Zaznacz, jeśli ten artykuł ma być specjalnie wyróżniony na stronie.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "dateDisplay",
      media: "image",
    },
  },
});
