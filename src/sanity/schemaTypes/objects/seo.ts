// Plik: seo.ts (wersja ostateczna, poprawiona)

import { defineField, defineType } from "sanity";
// ZMIANA: Poprawiony import klienta Sanity przy użyciu aliasu ścieżki.
// Zakładamy, że masz skonfigurowany alias '@' wskazujący na src/.
// Jeśli nie, użyj poprawnej ścieżki względnej, np. '../../client'.
import { client } from "@/sanity/lib/client";

// Definiujemy grupy, które stworzą zakładki w interfejsie Sanity Studio
const seoGroups = [
  { name: "main", title: "Główne SEO", default: true },
  { name: "social", title: "Social Media" },
  { name: "advanced", title: "Zaawansowane" },
];

export default defineType({
  name: "seo",
  title: "Ustawienia SEO i Social Media",
  type: "object",
  groups: seoGroups,
  fields: [
    // --- Zakładka "Główne SEO" ---
    defineField({
      name: "metaTitle",
      title: "Meta Tytuł (Title Tag)",
      type: "string",
      group: "main",
      description:
        "Najważniejszy element SEO. Pojawi się w zakładce przeglądarki i w wynikach Google. Idealna długość: 50-60 znaków.",
      validation: (Rule) =>
        Rule.required()
          .max(70)
          .error("Tytuł jest wymagany i nie powinien przekraczać 70 znaków."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Opis (Meta Description)",
      type: "text",
      rows: 3,
      group: "main",
      description:
        "Tekst widoczny pod tytułem w wynikach Google. Kluczowy dla zachęcenia do kliknięcia. Idealna długość: 150-160 znaków.",
      validation: (Rule) =>
        Rule.required()
          .max(170)
          .error("Opis jest wymagany i nie powinien przekraczać 170 znaków."),
    }),

    // --- Zakładka "Social Media" ---
    defineField({
      name: "ogTitle",
      title: "Tytuł dla Social Media",
      type: "string",
      group: "social",
      description:
        "Opcjonalny. Jeśli pusty, użyty zostanie Meta Tytuł. Możesz tu wpisać bardziej chwytliwy tytuł dla Facebooka, LinkedIn itp.",
      placeholder: "Domyślnie taki sam jak Meta Tytuł",
    }),
    defineField({
      name: "ogDescription",
      title: "Opis dla Social Media",
      type: "text",
      rows: 3,
      group: "social",
      description:
        "Opcjonalny. Jeśli pusty, użyty zostanie Meta Opis. Możesz tu wpisać krótszy, bardziej angażujący opis.",
      placeholder: "Domyślnie taki sam jak Meta Opis",
    }),
    defineField({
      name: "ogImage",
      title: "Obrazek dla Social Media",
      type: "image",
      group: "social",
      description:
        "Najważniejszy element dla social media. Rekomendowany rozmiar: 1200x630 pikseli (proporcje 1.91:1).",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Tekst alternatywny",
          type: "string",
          description: "Opis obrazka dla dostępności i SEO.",
          validation: (Rule) =>
            Rule.required().error(
              "Tekst alternatywny jest wymagany dla obrazka.",
            ),
        }),
      ],
      validation: (Rule) =>
        // ZMIANA: 'context' zmieniony na '_context', aby usunąć ostrzeżenie lintera
        Rule.custom(async (value, _context) => {
          if (!value?.asset?._ref) {
            return true;
          }

          // ZMIANA: Używamy bezpośrednio zaimportowanego klienta
          const asset = await client.fetch(`*[_id == $id][0]`, {
            id: value.asset._ref,
          });

          const dimensions = asset?.metadata?.dimensions;
          if (!dimensions) {
            return "Nie można odczytać wymiarów obrazka. Spróbuj wgrać go ponownie.";
          }

          return true;
        }),
    }),

    // --- Zakładka "Zaawansowane" ---
    defineField({
      name: "noIndex",
      title: "Ukryj tę stronę przed wyszukiwarkami (noindex)",
      type: "boolean",
      initialValue: false,
      group: "advanced",
      description:
        "Zaznacz, jeśli ta strona nie powinna pojawiać się w wynikach wyszukiwania. Używaj ostrożnie!",
    }),
    defineField({
      name: "noFollow",
      title: "Nie podążaj za linkami na tej stronie (nofollow)",
      type: "boolean",
      initialValue: false,
      group: "advanced",
      description:
        'Rzadko używane. Zaznacz, jeśli chcesz, aby roboty Google nie "klikały" w żadne linki na tej stronie.',
    }),
    defineField({
      name: "canonicalUrl",
      title: "Kanoniczny Adres URL",
      type: "url",
      group: "advanced",
      description:
        "Opcjonalne. Jeśli ta strona jest kopią innej, podaj tutaj oryginalny adres, aby uniknąć problemów z duplikacją treści.",
      validation: (Rule) => Rule.uri({ allowRelative: true }),
    }),
  ],
});
