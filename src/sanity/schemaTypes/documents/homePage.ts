import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

// Definiujemy zakładki dla lepszej organizacji w Sanity Studio.
// Redaktor będzie mógł łatwo przełączać się między edycją treści a ustawieniami SEO.
const homePageGroups = [
  { name: 'content', title: 'Treść Strony', default: true },
  { name: 'seo', title: 'Ustawienia SEO' },
]

export default defineType({
  name: 'homePage',
  title: 'Strona Główna',
  type: 'document',
  icon: HomeIcon,
  groups: homePageGroups, // Przypisujemy zakładki do naszego dokumentu
  fields: [
    // --- Pole Tytułu ---
    defineField({
      name: 'title',
      title: 'Tytuł (wewnętrzny)',
      type: 'string',
      group: 'content', // Przypisujemy do zakładki "Treść"
      description: 'Ten tytuł jest tylko dla Twojej orientacji w Sanity Studio.',
      initialValue: 'Strona Główna',
      validation: (Rule) => Rule.required(),
      // Ustawiamy jako tylko do odczytu, ponieważ jest to dokument typu singleton
      // i jego tytuł nie powinien być zmieniany przez redaktora.
      readOnly: true,
    }),

    // --- Sekcje Strony ---
    // Zamiast definiować tu całe obiekty, po prostu odnosimy się do typów
    // zdefiniowanych w osobnych plikach w folderze `sections`.
    defineField({
      name: 'heroSection',
      title: 'Sekcja Hero',
      type: 'heroSection',
      group: 'content',
    }),
    defineField({
      name: 'statsSection',
      title: 'Sekcja Statystyk',
      type: 'statsSection',
      group: 'content',
    }),
    defineField({
      name: 'aboutSection',
      title: 'Sekcja O Fundacji',
      type: 'aboutSection',
      group: 'content',
    }),
    defineField({
      name: 'impactSection',
      title: 'Sekcja "Nasz Wpływ"',
      type: 'impactSection',
      group: 'content',
    }),
    defineField({
      name: 'timelineSection',
      title: 'Sekcja "Nasza Historia"',
      type: 'timelineSection',
      group: 'content',
    }),
    defineField({
      name: 'ctaSection',
      title: 'Sekcja Wezwania do Działania',
      type: 'ctaSection',
      group: 'content',
    }),

    // --- Pole SEO ---
    // Dodajemy nasz kompletny, reużywalny schemat SEO do zakładki "SEO".
    defineField({
      name: 'seo',
      title: 'Ustawienia SEO i Social Media',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Strona Główna',
        icon: HomeIcon,
      }
    },
  },
})