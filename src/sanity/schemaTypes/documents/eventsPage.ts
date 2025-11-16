import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Ten plik definiuje schemat dla pojedynczego dokumentu 'Wydarzenie' w Sanity CMS.
 * Każdy dokument stworzony na podstawie tego schematu będzie reprezentował jedno wydarzenie,
 * które następnie zostanie wyświetlone na stronie z listą wydarzeń oraz na swojej własnej podstronie.
 */
export default defineType({
  // Nazwa API - kluczowa do zapytań GROQ
  name: "event",

  // Nazwa wyświetlana w Sanity Studio
  title: "Wydarzenie",

  // Typ dokumentu - oznacza, że będzie to osobna kolekcja w panelu
  type: "document",

  // Ikona wyświetlana w menu w Sanity Studio
  icon: CalendarIcon,

  // Pola definiujące strukturę danych każdego wydarzenia
  fields: [
    defineField({
      name: "title",
      title: "Tytuł wydarzenia",
      type: "string",
      description: 'Główny tytuł, np. "Wieczór z Chopinem".',
      validation: (Rule) => Rule.required().error("Tytuł jest wymagany."),
    }),
    defineField({
      name: "slug",
      title: "Slug (adres URL)",
      type: "slug",
      description:
        'Generowany automatycznie na podstawie tytułu. Kliknij "Generate".',
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error("Slug jest wymagany do stworzenia linku."),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
      type: "string",
      description:
        'Krótki tekst pod głównym tytułem, np. "Recital fortepianowy".',
    }),
    defineField({
      name: "date",
      title: "Data wydarzenia",
      type: "date",
      description:
        "Wybierz dokładną datę z kalendarza. Kluczowe dla sortowania.",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateDisplay",
      title: "Wyświetlana data tekstowa",
      type: "string",
      description: 'Tekst, który zobaczy użytkownik, np. "15 Grudnia 2025".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Godzina rozpoczęcia",
      type: "string",
      description: 'Podaj godzinę w formacie HH:MM, np. "19:00".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Główne zdjęcie wydarzenia",
      type: "image",
      description:
        "Zdjęcie, które będzie tłem w nagłówku i miniaturką na liście.",
      options: {
        hotspot: true, // Umożliwia kadrowanie obrazu
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Nazwa miejsca",
      type: "string",
      description: 'np. "Filharmonia Narodowa" lub "Zamek Królewski".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Adres miejsca",
      type: "string",
      description: 'np. "ul. Jasna 5, Warszawa".',
    }),
    defineField({
      name: "artist",
      title: "Artysta / Wykonawca",
      type: "string",
      description: 'np. "Maria Kowalska" lub "Orkiestra Fundacji Maxime".',
    }),
    defineField({
      name: "artistRole",
      title: "Rola artysty",
      type: "string",
      description: 'np. "Pianistka" lub "Pod dyrekacją Andrzeja Nowaka".',
    }),
    defineField({
      name: "description",
      title: "Szczegółowy opis wydarzenia",
      type: "text",
      description:
        "Główny tekst opisujący wydarzenie, widoczny na stronie szczegółów.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Cena",
      type: "string",
      description: 'np. "Od 80 zł" lub "Wstęp wolny".',
      validation: (Rule) => Rule.required(),
    }),
  ],

  // Definiuje, jak dokumenty tego typu będą wyglądać na liście w Sanity Studio
  preview: {
    select: {
      title: "title",
      subtitle: "dateDisplay",
      media: "image",
    },
  },
});
