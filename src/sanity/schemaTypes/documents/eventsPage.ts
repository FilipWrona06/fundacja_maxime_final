// Plik: sanity/schemas/singletons/eventsPage.ts

import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "eventsPage",
  title: "Strona Wydarzeń (Ustawienia)",
  type: "document",
  icon: CalendarIcon,
  fields: [
    // --- Zakładka SEO ---
    defineField({
      name: "seo",
      title: "Ustawienia SEO",
      type: "seo",
      options: { collapsible: true, collapsed: false },
    }),

    // --- Sekcja Hero (Nagłówek) ---
    defineField({
      name: "heroSection",
      title: "Sekcja Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "badgeText",
          title: "Tekst na znaczku (Badge)",
          type: "string",
          initialValue: "Sezon 2024 / 2025",
        }),
        defineField({
          name: "headingLine1",
          title: "Nagłówek - Linia 1",
          type: "string",
          initialValue: "Poczuj Rytm",
        }),
        defineField({
          name: "headingLine2",
          title: "Nagłówek - Linia 2 (Kolor)",
          type: "string",
          initialValue: "Naszej Sceny",
          description: "Ta linia będzie wyróżniona kolorem.",
        }),
        defineField({
          name: "description",
          title: "Opis pod nagłówkiem",
          type: "text",
          rows: 3,
          initialValue: "Odkryj nadchodzące koncerty...",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Ustawienia Strony Wydarzeń",
      };
    },
  },
});
