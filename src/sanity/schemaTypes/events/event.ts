// Plik: sanity/schemas/documents/event.ts (dawniej eventsPage.ts)

import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Wydarzenie", // Pojedyncze wydarzenie
  type: "document",
  icon: CalendarIcon,
  groups: [
    { name: "details", title: "Szczegóły", default: true },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- GRUPA: SZCZEGÓŁY ---
    defineField({
      name: "title",
      title: "Tytuł wydarzenia",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "details",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
      type: "string",
      group: "details",
    }),

    // Daty i Czas
    defineField({
      name: "date",
      title: "Data (do sortowania)",
      type: "date",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateDisplay",
      title: "Data wyświetlana",
      type: "string",
      group: "details",
      description: 'np. "15 Grudnia 2025"',
    }),
    defineField({
      name: "time",
      title: "Godzina",
      type: "string",
      group: "details",
      description: 'np. "19:00"',
    }),

    // Lokalizacja
    defineField({
      name: "location",
      title: "Nazwa miejsca",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "address",
      title: "Adres",
      type: "string",
      group: "details",
    }),

    // Bilety
    defineField({
      name: "price",
      title: "Cena / Status",
      type: "string",
      group: "details",
      description: 'np. "Od 80 zł" lub "Wstęp wolny"',
    }),
    defineField({
      name: "ticketLink", // <--- NOWE POLE
      title: "Link do biletów",
      type: "url",
      group: "details",
      description:
        "Link do zewnętrznego serwisu (np. Bilety24). Zostaw puste, jeśli wstęp wolny.",
    }),

    // Artysta
    defineField({
      name: "artist",
      title: "Artysta",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "artistRole",
      title: "Rola artysty",
      type: "string",
      group: "details",
    }),

    // Opis (ZMIANA NA RICHTEXT)
    defineField({
      name: "description",
      title: "Opis wydarzenia",
      type: "richText", // <--- Zmiana z 'text' na 'richText'
      group: "details",
    }),

    // --- GRUPA: MEDIA ---
    defineField({
      name: "image",
      title: "Główne zdjęcie",
      type: "image",
      group: "media",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    // --- GRUPA: SEO ---
    defineField({
      name: "seo",
      title: "SEO wydarzenia",
      type: "seo", // <--- Dodanie Twojego typu SEO
      group: "seo",
      description:
        "Opcjonalne nadpisanie globalnych ustawień SEO dla tego wydarzenia.",
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
