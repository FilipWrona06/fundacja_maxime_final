import { defineField, defineType } from 'sanity';

export const galeriaPage = defineType({
  name: 'galeriaPage',
  title: 'Strona Galerii',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Meta Title' },
        { name: 'description', type: 'text', title: 'Meta Description' },
        { name: 'ogImage', type: 'image', title: 'OG Image' },
      ],
    }),
    defineField({
      name: 'heroSection',
      title: 'Sekcja Hero',
      type: 'object',
      fields: [
        { name: 'badge', type: 'string', title: 'Badge' },
        { name: 'headingLine1', type: 'string', title: 'Nagłówek - Linia 1' },
        { name: 'headingLine2', type: 'string', title: 'Nagłówek - Linia 2' },
        { name: 'description', type: 'text', title: 'Opis' },
      ],
    }),
    defineField({
      name: 'galleries',
      title: 'Galerie',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Tytuł' },
            { name: 'date', type: 'date', title: 'Data' },
            { name: 'location', type: 'string', title: 'Lokalizacja' },
            { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
            {
              name: 'images',
              type: 'array',
              title: 'Zdjęcia',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    { name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required() },
                    { name: 'caption', type: 'string', title: 'Podpis (opcjonalnie)' },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date',
              media: 'images.0',
            },
            prepare({ title, date, media }) {
              return {
                title: title || 'Bez tytułu',
                subtitle: date ? new Date(date).toLocaleDateString('pl-PL') : 'Brak daty',
                media,
              };
            },
          },
        },
      ],
    }),
  ],
});