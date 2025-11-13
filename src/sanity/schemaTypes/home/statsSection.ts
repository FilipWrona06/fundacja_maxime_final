import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'statsSection',
  title: 'Sekcja Statystyk',
  type: 'array',
  description: 'Lista kluczowych liczb opisujących działalność fundacji.',
  of: [
    defineArrayMember({
      name: 'stat',
      title: 'Statystyka',
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Wartość (np. 50+)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'label',
          title: 'Etykieta (np. Koncertów, Widzów, Nagród)',
          type: 'string',
          description: 'Etykieta musi pasować do jednej z predefiniowanych ikon w kodzie (Koncertów, Widzów, Nagród).',
          validation: (Rule) => Rule.required(),
        }),
      ],
      // Ulepszony podgląd dla każdej statystyki w liście
      preview: {
        select: {
          title: 'label',
          subtitle: 'value',
        },
        prepare({ title, subtitle }) {
          return {
            title: title || 'Brak etykiety',
            subtitle: subtitle || 'Brak wartości',
          }
        },
      },
    }),
  ],
  validation: (Rule) =>
    Rule.required().min(1).error('Należy dodać co najmniej jedną statystykę.'),
})