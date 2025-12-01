// src/sanity/schemaTypes/objects/richText.ts

import { FiLink } from "react-icons/fi";
import { defineArrayMember, defineType } from "sanity";

export const richText = defineType({
  name: "richText",
  title: "Rozbudowany Tekst",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      // --- ZMIANA: Dodajemy style nagłówków, aby artykuły były czytelne ---
      styles: [
        { title: "Normalny", value: "normal" },
        { title: "Nagłówek 2", value: "h2" },
        { title: "Nagłówek 3", value: "h3" },
        { title: "Nagłówek 4", value: "h4" },
        { title: "Cytat", value: "blockquote" },
      ],
      // ----------------------------------------------------------------

      lists: [
        { title: "Lista punktowana", value: "bullet" },
        { title: "Lista numerowana", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Pogrubienie", value: "strong" },
          { title: "Kursywa", value: "em" },
          { title: "Podkreślenie", value: "underline" },
          { title: "Przekreślenie", value: "strike-through" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            icon: FiLink,
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              {
                title: "Otwórz w nowej karcie",
                name: "blank",
                type: "boolean",
              },
            ],
          },
        ],
      },
    }),
    // Twoje dodatkowe komponenty
    defineArrayMember({ type: "horizontalRule" }),
    defineArrayMember({ type: "spacer" }),
    // Opcjonalnie: Możesz tu dodać 'image' jeśli chcesz zdjęcia wewnątrz tekstu
  ],
});
