// Plik: src/sanity/schemaTypes/documents/newsPage.ts

import { BlockContentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsPage",
  title: "Strona Aktualności (Ustawienia)",
  type: "document",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "seo",
      title: "SEO Strony Aktualności",
      type: "seo",
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: "heroHeading",
      title: "Nagłówek Hero (Góra)",
      type: "string",
      initialValue: "Aktualności",
    }),
    defineField({
      name: "heroSubheading",
      title: "Nagłówek Hero (Dół - Kolor)",
      type: "string",
      initialValue: "Fundacji",
    }),
    defineField({
      name: "heroDescription",
      title: "Opis pod nagłówkiem",
      type: "text",
      rows: 3,
      initialValue:
        "Najnowsze wiadomości, wydarzenia i relacje z naszych koncertów",
    }),
    // NOWE: Sekcja Newslettera
    defineField({
      name: "newsletter",
      title: "Sekcja Newslettera (Dół strony)",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "heading",
          title: "Nagłówek",
          type: "string",
          initialValue: "Nie przegap żadnej Wiadomości",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "text",
          title: "Tekst zachęty",
          type: "text",
          rows: 3,
          initialValue:
            "Zapisz się do naszego newslettera i otrzymuj najnowsze informacje...",
        }),
        defineField({
          name: "buttonLabel",
          title: "Tekst przycisku",
          type: "string",
          initialValue: "Zapisz się",
        }),
      ],
    }),
  ],
});
