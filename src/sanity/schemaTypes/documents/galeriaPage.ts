import { defineField, defineType } from "sanity";
import { FiSliders } from "react-icons/fi";

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
    }),
    defineField({
      name: "heroSection",
      title: "Sekcja Hero",
      type: "object",
      fields: [
        { name: "badge", type: "string", title: "Badge" },
        { name: "headingLine1", type: "string", title: "Nagłówek - Linia 1" },
        { name: "headingLine2", type: "string", title: "Nagłówek - Linia 2" },
        { name: "description", type: "text", title: "Opis pod nagłówkiem" },
      ],
    }),
  ],
});