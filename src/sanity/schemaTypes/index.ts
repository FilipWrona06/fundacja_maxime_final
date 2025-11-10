import type { SchemaTypeDefinition } from "sanity";
import homePage from "./homePage";
import { galeriaPage } from "./galeriaPage";
import eventsPage from "./eventsPage";
import newsPage from "./newsPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, galeriaPage, eventsPage, newsPage],
};
