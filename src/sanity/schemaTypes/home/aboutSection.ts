import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'Sekcja O Fundacji',
  type: 'object',
  fields: [
    defineField({
      name: 'smallHeading',
      title: 'Mały nagłówek',
      type: 'string',
      description: 'Tekst wyświetlany nad głównym nagłówkiem, np. "O Fundacji Maxime".',
      validation: (Rule) => Rule.required().error('Mały nagłówek jest wymagany.'),
    }),
    defineField({
      name: 'headingPart1',
      title: 'Nagłówek - część 1',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headingPart2',
      title: 'Nagłówek - część 2 (żółty)',
      type: 'string',
      description: 'Ta część nagłówka będzie wyróżniona kolorem.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headingPart3',
      title: 'Nagłówek - część 3',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paragraph1',
      title: 'Akapit 1',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('Pierwszy akapit jest wymagany.'),
    }),
    defineField({
      name: 'paragraph2',
      title: 'Akapit 2',
      type: 'text',
      rows: 4,
      description: 'Drugi akapit jest opcjonalny.',
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: {
        hotspot: true, // Umożliwia inteligentne kadrowanie
      },
      validation: (Rule) => Rule.required().error('Zdjęcie jest wymagane.'),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Tekst alternatywny zdjęcia',
      type: 'string',
      description: 'Ważne dla SEO i dostępności. Opisz zwięźle, co znajduje się na zdjęciu.',
      validation: (Rule) => Rule.required().error('Tekst alternatywny jest wymagany dla zdjęcia.'),
    }),
  ],
})