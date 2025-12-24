import { FiSliders } from "react-icons/fi";
import { defineField, defineType } from "sanity";

export const galeriaPage = defineType({
  name: "galeriaPage",
  title: "Strona Galerii (Ustawienia)",
  type: "document",
  icon: FiSliders,
  fields: [
    defineField({
      name: "seo",
      title: "Ustawienia SEO",
      type: "seo",
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: "heroSection",
      title: "Sekcja Hero",
      type: "object",
      fields: [
        { name: "badge", type: "string", title: "Badge" },
        { name: "headingLine1", type: "string", title: "Nagłówek - Linia 1" },
        { name: "headingLine2", type: "string", title: "Nagłówek - Linia 2" },

        // --- ZMIANA: Zwykły 'text' zamieniony na 'richText' ---
        {
          name: "description",
          type: "richText",
          title: "Opis pod nagłówkiem",
        },
        // ------------------------------------------------------
      ],
      options: { collapsible: true, collapsed: false },
    }),
  ],
});
