// Plik: src/sanity/schemaTypes/documents/newsArticle.ts

import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsArticle",
  title: "Artykuł (Aktualności)",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Treść", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tytuł artykułu",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (link)",
      type: "slug",
      group: "content",
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
      group: "content",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      // Automatyczna data dzisiejsza
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Główne zdjęcie artykułu",
      type: "image",
      group: "content",
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
      group: "content",
      description: "Krótki tekst widoczny na liście aktualności.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Treść artykułu",
      type: "richText",
      group: "content",
      description: "Główna zawartość artykułu.",
      validation: (Rule) => Rule.required(),
    }),
    // USUNIĘTO POLE AUTHOR
    defineField({
      name: "featured",
      title: "Wyróżniony artykuł?",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO Artykułu",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "image",
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date,
        media,
      };
    },
  },
});
