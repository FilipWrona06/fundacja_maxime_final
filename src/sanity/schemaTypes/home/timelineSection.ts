import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'timelineSection',
  title: 'Sekcja "Nasza Historia"',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Nagłówek',
      type: 'string',
      description: 'Część nagłówka, która będzie wyróżniona kolorem, np. "Historia".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Podtytół',
      type: 'string',
      description: 'Tekst wyświetlany pod głównym nagłówkiem.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timelineEvents',
      title: 'Wydarzenia na osi czasu',
      type: 'array',
      description: 'Lista kluczowych wydarzeń w historii fundacji, od najstarszego do najnowszego.',
      of: [
        defineArrayMember({
          name: 'timelineEvent',
          title: 'Wydarzenie na osi czasu',
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Skrócony rok (np. 22)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'fullYear',
              title: 'Pełny rok (np. 2022)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Tytuł wydarzenia',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Opis wydarzenia',
              type: 'text',
              rows: 4,
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
          // Ulepszony podgląd dla każdego wydarzenia w liście
          preview: {
            select: {
              title: 'title',
              subtitle: 'fullYear',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Brak tytułu',
                subtitle: subtitle || 'Brak roku',
                media: media,
              }
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Należy dodać co najmniej jedno wydarzenie.'),
    }),
  ],
})