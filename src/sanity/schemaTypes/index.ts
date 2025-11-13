import type { SchemaTypeDefinition } from 'sanity'

// --- DOKUMENTY (Główne typy stron w Twoim Studio) ---
import homePage from './documents/homePage'
import { galeriaPage } from './documents/galeriaPage'
import eventsPage from './documents/eventsPage'
import newsPage from './documents/newsPage'

// --- REUŻYWALNE OBIEKTY (Klocki do budowy schematów) ---
// Importujemy schemat SEO, aby Sanity go "poznało".
import seo from './objects/seo'

// --- SEKCJE (Specjalistyczne obiekty dla strony głównej) ---
// Importujemy WSZYSTKIE nowe, wydzielone schematy sekcji.
import aboutSection from './home/aboutSection'
import ctaSection from './home/ctaSection'
import heroSection from './home/heroSection'
import impactSection from './home/impactSection'
import statsSection from './home/statsSection'
import timelineSection from './home/timelineSection'

/**
 * Tutaj rejestrujemy WSZYSTKIE nasze typy schematów.
 * Sanity musi wiedzieć o każdym dokumencie, obiekcie i sekcji,
 * aby móc poprawnie zbudować Studio.
 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // --- Dokumenty ---
    homePage,
    galeriaPage,
    eventsPage,
    newsPage,

    // --- Reużywalne Obiekty i Sekcje ---
    // Musimy tutaj "zarejestrować" wszystkie typy, których użyliśmy
    // w pliku homePage.ts, aby Sanity wiedziało, czym one są.
    seo,
    heroSection,
    statsSection,
    aboutSection,
    impactSection,
    timelineSection,
    ctaSection,
  ],
}