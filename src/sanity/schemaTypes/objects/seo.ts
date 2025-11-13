import { defineField, defineType } from 'sanity'

// Definiujemy grupy, które stworzą zakładki w interfejsie Sanity Studio
const seoGroups = [
  { name: 'main', title: 'Główne SEO', default: true },
  { name: 'social', title: 'Social Media' },
  { name: 'advanced', title: 'Zaawansowane' },
]

export default defineType({
  name: 'seo',
  title: 'Ustawienia SEO i Social Media',
  type: 'object',
  groups: seoGroups,
  fields: [
    // --- Zakładka "Główne SEO" ---
    defineField({
      name: 'metaTitle',
      title: 'Meta Tytuł (Title Tag)',
      type: 'string',
      group: 'main',
      description:
        'Najważniejszy element SEO. Pojawi się w zakładce przeglądarki i w wynikach Google. Idealna długość: 50-60 znaków.',
      validation: (Rule) => [
        Rule.required().error('Tytuł jest wymagany.'),
        Rule.max(70).warning(
          'Tytuł jest dość długi. Staraj się nie przekraczać 60 znaków.',
        ),
      ],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Opis (Meta Description)',
      type: 'text',
      rows: 3,
      group: 'main',
      description:
        'Tekst widoczny pod tytułem w wynikach Google. Kluczowy dla zachęcenia do kliknięcia. Idealna długość: 150-160 znaków.',
      validation: (Rule) => [
        Rule.required().error('Opis jest wymagany.'),
        Rule.max(170).warning(
          'Opis jest dość długi. Staraj się nie przekraczać 160 znaków.',
        ),
      ],
    }),
    
    // --- Zakładka "Social Media" ---
    defineField({
      name: 'ogTitle',
      title: 'Tytuł dla Social Media (Open Graph Title)',
      type: 'string',
      group: 'social',
      description: 'Opcjonalny. Jeśli pusty, użyty zostanie Meta Tytuł. Możesz tu wpisać bardziej chwytliwy tytuł dla Facebooka, LinkedIn itp.'
    }),
    defineField({
      name: 'ogDescription',
      title: 'Opis dla Social Media (Open Graph Description)',
      type: 'text',
      rows: 3,
      group: 'social',
      description: 'Opcjonalny. Jeśli pusty, użyty zostanie Meta Opis. Możesz tu wpisać krótszy, bardziej angażujący opis dla social mediów.'
    }),
    defineField({
      name: 'ogImage',
      title: 'Obrazek dla Social Media (Open Graph Image)',
      type: 'image',
      group: 'social',
      description:
        'Najważniejszy element dla social media. Rekomendowany rozmiar: 1200x630 pikseli. Ten obrazek pojawi się, gdy link do strony zostanie udostępniony.',
      options: {
        hotspot: true, // Pozwala na inteligentne kadrowanie obrazka
      },
    }),

    // --- Zakładka "Zaawansowane" ---
    defineField({
      name: 'noIndex',
      title: 'Ukryj tę stronę przed wyszukiwarkami (noindex)',
      type: 'boolean',
      initialValue: false,
      group: 'advanced',
      description:
        'Zaznacz, jeśli ta strona nie powinna pojawiać się w wynikach wyszukiwania. Używaj ostrożnie!',
    }),
    defineField({
      name: 'noFollow',
      title: 'Nie podążaj za linkami na tej stronie (nofollow)',
      type: 'boolean',
      initialValue: false,
      group: 'advanced',
      description: 'Rzadko używane. Zaznacz, jeśli chcesz, aby roboty Google nie "klikały" w żadne linki na tej stronie.'
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Kanoniczny Adres URL',
      type: 'url',
      group: 'advanced',
      description:
        'Opcjonalne. Jeśli ta strona jest kopią innej, podaj tutaj oryginalny adres, aby uniknąć problemów z duplikacją treści.',
    }),
  ],
})