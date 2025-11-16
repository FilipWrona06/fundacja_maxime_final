import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Sekcja Hero",
  type: "object",
  fields: [
    defineField({
      name: "badgeText",
      title: "Tekst w znaczku (badge)",
      type: "string",
      description: "Mały tekst wyświetlany nad głównym nagłówkiem.",
    }),
    defineField({
      name: "headingPart1",
      title: "Nagłówek - część 1",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingPart2",
      title: "Nagłówek - część 2",
      type: "string",
      description: "Ta część nagłówka będzie wyróżniona innym stylem.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      rows: 3,
      description: "Krótki paragraf pod głównym nagłówkiem.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoWebm",
      title: "Wideo w tle (format WebM)",
      type: "file",
      options: {
        accept: "video/webm",
      },
      description:
        "Wideo w formacie WebM dla nowoczesnych przeglądarek (np. Chrome, Firefox). Jest bardziej wydajne.",
      validation: (Rule) =>
        Rule.required().error("Wideo w formacie WebM jest wymagane."),
    }),
    defineField({
      name: "videoMp4",
      title: "Wideo w tle (format MP4)",
      type: "file",
      options: {
        accept: "video/mp4",
      },
      description:
        "Wideo w formacie MP4 jako wsparcie dla przeglądarek, które nie obsługują WebM (np. Safari).",
      validation: (Rule) =>
        Rule.required().error(
          "Wideo w formacie MP4 jest wymagane jako fallback.",
        ),
    }),
    defineField({
      name: "poster",
      title: "Plakat wideo (poster)",
      type: "image",
      description:
        "Obrazek, który będzie wyświetlany, zanim wideo się załaduje, lub jeśli wideo nie może być odtworzone. Kluczowy dla szybkości ładowania.",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().error("Plakat wideo jest wymagany."),
    }),
  ],
});
