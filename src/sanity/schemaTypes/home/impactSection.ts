import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'impactSection',
  title: 'Sekcja "Nasz Wpływ"',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Nagłówek',
      type: 'string',
      description: 'Część nagłówka, która będzie wyróżniona kolorem, np. "Wpływ".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Podtytuł',
      type: 'string',
      description: 'Tekst wyświetlany pod głównym nagłówkiem.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'impactCards',
      title: 'Karty Wpływu',
      type: 'array',
      description: 'Lista kart prezentujących osiągnięcia lub obszary działalności.',
      // Używamy defineArrayMember dla lepszej organizacji
      of: [
        defineArrayMember({
          name: 'impactCard',
          title: 'Karta Wpływu',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Tytuł karty',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'desc',
              title: 'Opis karty',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Zdjęcie',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Tekst alternatywny',
              type: 'string',
              description: 'Ważne dla SEO i dostępności. Opisz, co widać na zdjęciu.',
              validation: (Rule) => Rule.required(),
            }),
          ],
          // Ulepszony podgląd dla każdej karty w liście
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Brak tytułu',
                subtitle: 'Karta Wpływu',
                media: media,
              }
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Należy dodać co najmniej jedną kartę.'),
    }),
  ],
})