import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Sekcja Hero",
  type: "object",
  fieldsets: [
    { name: "content", title: "Treść tekstowa" },
    { name: "media", title: "Media w tle" },
    { name: "actions", title: "Przyciski Akcji" },
  ],
  fields: [
    // --- GRUPA: Treść tekstowa (bez zmian) ---
    defineField({
      name: "badgeText",
      title: "Tekst na znaczku (Badge)",
      type: "string",
      description:
        "Opcjonalny, krótki tekst wyświetlany nad głównym nagłówkiem (np. 'Nowość!').",
      fieldset: "content",
    }),
    defineField({
      name: "headingPart1",
      title: "Nagłówek - część główna",
      type: "string",
      description: "Pierwsza, standardowa część głównego nagłówka.",
      validation: (Rule) =>
        Rule.required().error("Główna część nagłówka jest wymagana."),
      fieldset: "content",
    }),
    defineField({
      name: "headingPart2",
      title: "Nagłówek - część wyróżniona",
      type: "string",
      description:
        "Druga część nagłówka, która zostanie automatycznie wyróżniona innym stylem (np. kolorem).",
      validation: (Rule) =>
        Rule.required().error("Wyróżniona część nagłówka jest wymagana."),
      fieldset: "content",
    }),

    // --- ZAKTUALIZOWANE POLE "description" ---
    // Używamy typu 'richText' zamiast ręcznej definicji
    defineField({
      name: "description",
      title: "Opis pod nagłówkiem",
      type: "richText",
      fieldset: "content",
      validation: (Rule) =>
        Rule.required().error("Opis pod nagłówkiem jest wymagany."),
    }),

    // --- GRUPA: Media w tle (bez zmian) ---
    defineField({
      name: "videoWebm",
      title: "Wideo w tle (.webm)",
      type: "file",
      options: {
        accept: "video/webm",
      },
      description:
        "Nowoczesny i wydajny format wideo. Zawsze dodawaj oba formaty.",
      validation: (Rule) =>
        Rule.required().error("Plik wideo .webm jest wymagany."),
      fieldset: "media",
    }),
    defineField({
      name: "videoMp4",
      title: "Wideo w tle (.mp4)",
      type: "file",
      options: {
        accept: "video/mp4",
      },
      description:
        "Format wideo zapewniający kompatybilność ze starszymi przeglądarkami.",
      validation: (Rule) =>
        Rule.required().error("Plik wideo .mp4 jest wymagany."),
      fieldset: "media",
    }),
    defineField({
      name: "poster",
      title: "Obrazek zastępczy (Poster)",
      type: "image",
      description: "Obrazek wyświetlany, zanim wideo się załaduje.",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().error("Obrazek zastępczy jest wymagany."),
      fieldset: "media",
    }),

    // --- GRUPA: Przyciski Akcji (bez zmian) ---
    defineField({
      name: "primaryButton",
      title: "Przycisk główny (np. 'Nadchodzące koncerty')",
      type: "object",
      fieldset: "actions",
      description: "Główny przycisk wezwania do działania w sekcji Hero.",
      validation: (Rule) =>
        Rule.required().error("Przycisk główny jest wymagany."),
      fields: [
        defineField({
          name: "label",
          title: "Etykieta przycisku",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("Etykieta przycisku jest wymagana."),
        }),
        defineField({
          name: "link",
          title: "Link docelowy",
          type: "string",
          description:
            "Link wewnętrzny (np. '/wydarzenia') lub zewnętrzny (np. 'https://google.com').",
          validation: (Rule) =>
            Rule.required().error("Link docelowy jest wymagany."),
        }),
      ],
    }),

    defineField({
      name: "secondaryButton",
      title: "Przycisk dodatkowy (np. 'Skontaktuj się z nami')",
      type: "object",
      fieldset: "actions",
      description: "Opcjonalny, drugi przycisk o niższym priorytecie.",
      fields: [
        defineField({
          name: "label",
          title: "Etykieta przycisku",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("Etykieta przycisku jest wymagana."),
        }),
        defineField({
          name: "link",
          title: "Link docelowy",
          type: "string",
          description: "Link wewnętrzny (np. '/kontakt').",
          validation: (Rule) =>
            Rule.required().error("Link docelowy jest wymagany."),
        }),
      ],
    }),
  ],
});
