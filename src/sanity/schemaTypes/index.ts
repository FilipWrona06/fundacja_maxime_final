// Plik: src/sanity/schemaTypes/index.ts

import type { SchemaTypeDefinition } from "sanity";
import eventsPage from "./documents/eventsPage";
import { galeriaPage } from "./documents/galeriaPage";
import homePage from "./documents/homePage";
import newsPage from "./documents/newsPage";
import { gallery } from "./gallery/gallery";
import aboutSection from "./home/aboutSection";
import ctaSection from "./home/ctaSection";
import heroSection from "./home/heroSection";
import impactSection from "./home/impactSection";
import timelineSection from "./home/timelineSection";
import horizontalRule from "./objects/horizontalRule";
import { richText } from "./objects/richText";
import seo from "./objects/seo";
import spacer from "./objects/spacer";
import event from "./events/event";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // --- Dokumenty ---
    homePage,
    galeriaPage,
    gallery,
    eventsPage,
    event,
    newsPage,

    // --- Reużywalne Obiekty i Sekcje ---
    // Na liście nie ma już `statsSection`
    seo,
    heroSection,
    aboutSection,
    impactSection,
    timelineSection,
    ctaSection,
    horizontalRule,
    spacer,
    richText,
  ],
};
