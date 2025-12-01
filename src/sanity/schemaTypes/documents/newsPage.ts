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
  ],
});
