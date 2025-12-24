import { defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Wydarzenie (Galeria)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Tytuł Wydarzenia",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug (Przyjazny link)",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      type: "date",
      title: "Data Wydarzenia",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      type: "string",
      title: "Lokalizacja",
    }),

    // --- ZMIANA: Używamy richText zamiast zwykłego text ---
    defineField({
      name: "description",
      title: "Opis Wydarzenia (Storytelling)",
      type: "richText", // <--- Tutaj używamy Twojego nowego typu
      description: "Opisz emocje, repertuar i atmosferę wydarzenia.",
    }),
    // ------------------------------------------------------

    defineField({
      name: "videoUrl",
      type: "url",
      title: "Link do Wideo (YouTube/Vimeo)",
    }),

    defineField({
      name: "sponsors",
      title: "Partnerzy i Sponsorzy (Opcjonalnie)",
      description:
        "Dodaj logotypy i nazwy firm, które wsparły TO konkretne wydarzenie.",
      type: "array",
      of: [
        {
          type: "object",
          title: "Partner",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Nazwa",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "logo",
              type: "image",
              title: "Logo (Opcjonalnie)",
              options: { hotspot: true },
            },
            {
              name: "website",
              type: "url",
              title: "Strona WWW (Opcjonalnie)",
            },
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
            },
          },
        },
      ],
    }),

    defineField({
      name: "images",
      type: "array",
      title: "Zdjęcia",
      options: { layout: "grid" },
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              initialValue: "Zdjęcie z koncertu",
            },
            {
              name: "caption",
              type: "string",
              title: "Podpis",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "images.0",
    },
    prepare({ title, date, media }) {
      return {
        title: title,
        subtitle: date
          ? new Date(date).toLocaleDateString("pl-PL")
          : "Brak daty",
        media: media,
      };
    },
  },
});
