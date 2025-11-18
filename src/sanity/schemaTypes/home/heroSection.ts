import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Sekcja Hero",
  type: "object",
  fieldsets: [
    { name: "content", title: "Treść tekstowa" },
    { name: "media", title: "Media w tle" },
  ],
  fields: [
    // --- Reszta pól pozostaje bez zmian ---
    defineField({
      name: "badgeText",
      title: "Tekst na znaczku (Badge)",
      type: "string",
      description: "Opcjonalny, krótki tekst wyświetlany nad głównym nagłówkiem (np. 'Nowość!').",
      fieldset: "content",
    }),
    defineField({
      name: "headingPart1",
      title: "Nagłówek - część główna",
      type: "string",
      description: "Pierwsza, standardowa część głównego nagłówka.",
      validation: (Rule) => Rule.required().error("Główna część nagłówka jest wymagana."),
      fieldset: "content",
    }),
    defineField({
      name: "headingPart2",
      title: "Nagłówek - część wyróżniona",
      type: "string",
      description: "Druga część nagłówka, która zostanie automatycznie wyróżniona innym stylem (np. kolorem).",
      validation: (Rule) => Rule.required().error("Wyróżniona część nagłówka jest wymagana."),
      fieldset: "content",
    }),
    defineField({
      name: "description",
      title: "Opis pod nagłówkiem",
      type: "text",
      rows: 3,
      description: "Krótki (1-2 zdania) paragraf zachęcający do dalszej interakcji, wyświetlany pod głównym nagłówkiem.",
      validation: (Rule) => Rule.required().error("Opis pod nagłówkiem jest wymagany."),
      fieldset: "content",
    }),
    defineField({
      name: "videoWebm",
      title: "Wideo w tle (.webm)",
      type: "file",
      options: {
        accept: "video/webm",
      },
      description: "Nowoczesny i wydajny format wideo dla przeglądarek takich jak Chrome i Firefox. Zawsze dodawaj oba formaty wideo.",
      validation: (Rule) => Rule.required().error("Plik wideo w formacie .webm jest wymagany."),
      fieldset: "media",
    }),
    defineField({
      name: "videoMp4",
      title: "Wideo w tle (.mp4)",
      type: "file",
      options: {
        accept: "video/mp4",
      },
      description: "Format wideo zapewniający kompatybilność ze starszymi przeglądarkami, np. Safari.",
      validation: (Rule) => Rule.required().error("Plik wideo w formacie .mp4 jest wymagany jako alternatywa."),
      fieldset: "media",
    }),
    defineField({
      name: "poster",
      title: "Obrazek zastępczy (Poster)",
      type: "image",
      description: "Obrazek wyświetlany, zanim wideo się załaduje lub gdy jego odtworzenie jest niemożliwe. Kluczowy dla user experience i szybkości strony.",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Obrazek zastępczy dla wideo jest wymagany."),
      fieldset: "media",
    }),
  ],
});