// sanity/schemaTypes/homePage.ts
import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Strona Główna",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tytuł (wewnętrzny)",
      type: "string",
      initialValue: "Strona Główna",
      validation: (Rule) => Rule.required(),
    }),
    // --- Hero Section ---
    defineField({
      name: "heroSection",
      title: "Sekcja Hero",
      type: "object",
      fields: [
        defineField({
          name: "badgeText",
          title: "Tekst w znaczku (badge)",
          type: "string",
          initialValue: "Fundacja Maxime • Od 2022",
        }),
        defineField({
          name: "headingPart1",
          title: "Nagłówek - część 1",
          type: "string",
          initialValue: "Z pasji",
        }),
        defineField({
          name: "headingPart2",
          title: "Nagłówek - część 2",
          type: "string",
          initialValue: "do muzyki",
        }),
        defineField({
          name: "description",
          title: "Opis",
          type: "text",
          rows: 3,
        }),
        // --- NOWE POLA WIDEO ---
        defineField({
          name: "videoWebm",
          title: "Wideo w tle (WebM)",
          type: "file",
          options: {
            accept: "video/webm",
          },
          description:
            "Zalecane: wideo w formacie WebM dla nowoczesnych przeglądarek (np. Chrome, Firefox).",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "videoMp4",
          title: "Wideo w tle (MP4)",
          type: "file",
          options: {
            accept: "video/mp4",
          },
          description:
            "Zalecane: wideo w formacie MP4 jako fallback dla przeglądarek (np. Safari).",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "poster",
          title: "Poster wideo",
          type: "image",
          description:
            "Obrazek, który będzie wyświetlany, zanim wideo się załaduje. Powinien mieć takie same wymiary jak wideo.",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // --- Stats Section ---
    defineField({
      name: "statsSection",
      title: "Sekcja Statystyk",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Wartość (np. 50+)",
              type: "string",
            }),
            defineField({
              name: "label",
              title: "Etykieta (np. Koncertów)",
              type: "string",
            }),
          ],
        },
      ],
    }),
    // --- About Section ---
    defineField({
      name: "aboutSection",
      title: "Sekcja O Fundacji",
      type: "object",
      fields: [
        defineField({
          name: "smallHeading",
          title: "Mały nagłówek",
          type: "string",
          initialValue: "O Fundacji Maxime",
        }),
        defineField({
          name: "headingPart1",
          title: "Nagłówek - część 1",
          type: "string",
          initialValue: "Tworzymy",
        }),
        defineField({
          name: "headingPart2",
          title: "Nagłówek - część 2 (żółty)",
          type: "string",
          initialValue: "Niezapomniane",
        }),
        defineField({
          name: "headingPart3",
          title: "Nagłówek - część 3",
          type: "string",
          initialValue: "Doświadczenia",
        }),
        defineField({ name: "paragraph1", title: "Akapit 1", type: "text" }),
        defineField({ name: "paragraph2", title: "Akapit 2", type: "text" }),
        defineField({
          name: "image",
          title: "Zdjęcie",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "imageAlt",
          title: "Tekst alternatywny zdjęcia",
          type: "string",
        }),
      ],
    }),
    // --- Impact Section ---
    defineField({
      name: "impactSection",
      title: 'Sekcja "Nasz Wpływ"',
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Nagłówek",
          type: "string",
          initialValue: "Nasz Wpływ",
        }),
        defineField({ name: "subheading", title: "Podtytuł", type: "string" }),
        defineField({
          name: "impactCards",
          title: "Karty",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Tytuł karty",
                  type: "string",
                }),
                defineField({
                  name: "desc",
                  title: "Opis karty",
                  type: "string",
                }),
                defineField({
                  name: "image",
                  title: "Zdjęcie",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "alt",
                  title: "Tekst alternatywny",
                  type: "string",
                }),
              ],
            },
          ],
        }),
      ],
    }),
    // --- Timeline Section ---
    defineField({
      name: "timelineSection",
      title: 'Sekcja "Nasza Historia"',
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Nagłówek",
          type: "string",
          initialValue: "Nasza Historia",
        }),
        defineField({ name: "subheading", title: "Podtytuł", type: "string" }),
        defineField({
          name: "timelineEvents",
          title: "Wydarzenia na osi czasu",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "year",
                  title: "Skrócony rok (np. 22)",
                  type: "string",
                }),
                defineField({
                  name: "fullYear",
                  title: "Pełny rok (np. 2022)",
                  type: "string",
                }),
                defineField({ name: "title", title: "Tytuł", type: "string" }),
                defineField({ name: "text", title: "Opis", type: "text" }),
                defineField({
                  name: "image",
                  title: "Zdjęcie",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "alt",
                  title: "Tekst alternatywny",
                  type: "string",
                }),
              ],
            },
          ],
        }),
      ],
    }),
    // --- CTA Section ---
    defineField({
      name: "ctaSection",
      title: "Sekcja Wezwania do Działania (CTA)",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Nagłówek",
          type: "string",
          initialValue: "Czekamy na ciebie",
        }),
        defineField({ name: "text", title: "Tekst", type: "text" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Strona Główna",
      };
    },
  },
});
