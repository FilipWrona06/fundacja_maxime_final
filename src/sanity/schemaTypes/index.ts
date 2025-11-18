// Plik: src/sanity/schemaTypes/index.ts

import type { SchemaTypeDefinition } from "sanity";
import eventsPage from "./documents/eventsPage";
import { galeriaPage } from "./documents/galeriaPage";
import homePage from "./documents/homePage";
import newsPage from "./documents/newsPage";
import aboutSection from "./home/aboutSection";
import ctaSection from "./home/ctaSection";
import heroSection from "./home/heroSection";
import impactSection from "./home/impactSection";
import timelineSection from "./home/timelineSection";
import seo from "./objects/seo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // --- Dokumenty ---
    homePage,
    galeriaPage,
    eventsPage,
    newsPage,

    // --- Reużywalne Obiekty i Sekcje ---
    // Na liście nie ma już `statsSection`
    seo,
    heroSection,
    aboutSection,
    impactSection,
    timelineSection,
    ctaSection,
  ],
};