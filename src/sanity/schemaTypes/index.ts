import type { SchemaTypeDefinition } from 'sanity'
import homePage from './homePage'
import { galeriaPage } from './galeriaPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homePage,
    galeriaPage
  ],
}
