import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Definiujemy zakładki dla lepszej organizacji w Sanity Studio.
const homePageGroups = [
  { name: "content", title: "Treść Strony", default: true },
  { name: "seo", title: "Ustawienia SEO" },
];

export default defineType({
  name: "homePage",
  title: "Strona Główna",
  type: "document",
  icon: HomeIcon,
  groups: homePageGroups,
  fields: [
    // --- Pole Tytułu ---
    defineField({
      name: "title",
      title: "Tytuł (wewnętrzny)",
      type: "string",
      group: "content",
      description:
        "Ten tytuł jest tylko dla Twojej orientacji w Sanity Studio.",
      initialValue: "Strona Główna",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    // --- Sekcje Strony ---
    // Dodanie opcji 'collapsible' sprawia, że każdą sekcję można zwinąć,
    // co bardzo poprawia czytelność przy dużej ilości pól.
    defineField({
      name: "heroSection",
      title: "Sekcja Hero",
      type: "heroSection",
      group: "content",
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: "aboutSection",
      title: "Sekcja O Fundacji",
      type: "aboutSection",
      group: "content",
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "impactSection",
      title: 'Sekcja "Nasz Wpływ"',
      type: "impactSection",
      group: "content",
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "timelineSection",
      title: 'Sekcja "Nasza Historia"',
      type: "timelineSection",
      group: "content",
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "ctaSection",
      title: "Sekcja Wezwania do Działania",
      type: "ctaSection",
      group: "content",
      options: { collapsible: true, collapsed: true },
    }),

    // --- Pole SEO ---
    defineField({
      name: "seo",
      title: "Ustawienia SEO i Social Media",
      type: "seo", // Zakładamy, że jest to dobrze zdefiniowany typ obiektu
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Strona Główna",
        icon: HomeIcon,
      };
    },
  },
});
