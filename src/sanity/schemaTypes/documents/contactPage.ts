import { FiPhone } from "react-icons/fi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Strona Kontaktu (Ustawienia)",
  type: "document",
  icon: FiPhone,
  fields: [
    // --- SEO ---
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      options: { collapsible: true, collapsed: false },
    }),

    // --- NAGŁÓWEK HERO ---
    defineField({
      name: "hero",
      title: "Nagłówek Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "badge",
          title: "Badge (Mały tekst na górze)",
          type: "string",
          initialValue: "Jesteśmy do Twojej dyspozycji",
        }),
        defineField({
          name: "headingLine1",
          title: "Nagłówek - Linia 1 (Biała)",
          type: "string",
          initialValue: "Skontaktuj się",
        }),
        defineField({
          name: "headingLine2",
          title: "Nagłówek - Linia 2 (Żółta)",
          type: "string",
          initialValue: "z nami",
        }),
        defineField({
          name: "description",
          title: "Opis pod nagłówkiem",
          type: "text",
          rows: 3,
        }),
      ],
    }),

    // --- DANE KONTAKTOWE ---
    defineField({
      name: "contactInfo",
      title: "Dane Kontaktowe",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string", title: "Email" }),
        defineField({ name: "phone", type: "string", title: "Telefon" }),
        defineField({ name: "address", type: "string", title: "Adres" }),
        defineField({
          name: "googleMapsLink",
          type: "url",
          title: "Link do Google Maps",
        }),
      ],
    }),

    // --- SOCIAL MEDIA ---
    defineField({
      name: "socialLinks",
      title: "Linki Social Media",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Nazwa" }),
            defineField({ name: "href", type: "url", title: "Link URL" }),
            defineField({
              name: "icon",
              type: "string",
              title: "Ikona",
              description: "Wybierz ikonę odpowiadającą serwisowi",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Patronite", value: "patronite" },
                ],
              },
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "href" },
          },
        },
      ],
    }),

    // --- FAQ ---
    defineField({
      name: "faq",
      title: "FAQ (Pytania i Odpowiedzi)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string", title: "Pytanie" }),
            defineField({
              name: "answer",
              type: "text",
              rows: 3,
              title: "Odpowiedź",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Ustawienia Strony Kontaktu",
      };
    },
  },
});
