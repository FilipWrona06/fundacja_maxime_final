// src/sanity/schemas/objects/richText.ts

import { FiLink } from "react-icons/fi";
import { defineArrayMember, defineType } from "sanity";

export const richText = defineType({
  name: "richText",
  title: "Rozbudowany Tekst",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      // --- ZMIANA: Pusta tablica usuwa menu wyboru stylu (nagłówków) ---
      styles: [],
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
  ],
});
