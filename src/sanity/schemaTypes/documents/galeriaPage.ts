// src/sanity/schemas/galeriaPage.ts

import { defineField, defineType } from "sanity";

export const galeriaPage = defineType({
  name: "galeriaPage",
  title: "Strona Galerii",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "Ustawienia SEO i Social Media",
      type: "seo",
    }),
    defineField({
      name: "heroSection",
      title: "Sekcja Hero",
      type: "object",
      fields: [
        { name: "badge", type: "string", title: "Badge" },
        { name: "headingLine1", type: "string", title: "Nagłówek - Linia 1" },
        { name: "headingLine2", type: "string", title: "Nagłówek - Linia 2" },
        { name: "description", type: "text", title: "Opis" },
      ],
    }),
    defineField({
      name: "galleries",
      title: "Galerie",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Tytuł Wydarzenia" },
            
            // --- NOWE POLA (Storytelling & Wideo) ---
            { 
              name: "description", 
              type: "text", 
              title: "Opis Wydarzenia",
              description: "Krótka historia o koncercie, emocjach i atmosferze (wyświetlana obok zdjęć).",
              rows: 4
            },
            {
              name: "partners",
              type: "string",
              title: "Partnerzy / Sponsorzy",
              description: "Np. 'Partnerzy: Miasto Warszawa, Yamaha Music'"
            },
            {
              name: "videoUrl",
              type: "url",
              title: "Link do Wideo",
              description: "Link do nagrania na YouTube lub Vimeo."
            },
            // ----------------------------------------

            { name: "date", type: "date", title: "Data" },
            { name: "location", type: "string", title: "Lokalizacja" },
            {
              name: "slug",
              type: "slug",
              title: "Przyjazny link (opcjonalnie)",
              options: { source: "title" },
            },
            {
              name: "images",
              type: "array",
              title: "Zdjęcia",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    {
                      name: "alt",
                      type: "string",
                      title: "Tekst alternatywny (Alt)",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "caption",
                      type: "string",
                      title: "Podpis pod zdjęciem",
                      description: "Np. 'Jan Kowalski podczas solówki'"
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "title",
              date: "date",
              media: "images.0",
            },
            prepare({ title, date, media }) {
              return {
                title: title || "Bez tytułu",
                subtitle: date
                  ? new Date(date).toLocaleDateString("pl-PL")
                  : "Brak daty",
                media,
              };
            },
          },
        },
      ],
    }),
  ],
});