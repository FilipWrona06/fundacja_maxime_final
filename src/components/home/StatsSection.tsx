import { getStatsSectionData } from "@/sanity/lib/get-data";
import { StatsSectionClient } from "./StatsSection.client";

/**
 * Asynchroniczny Komponent Serwerowy (RSC) dla sekcji ze statystykami.
 *
 * Odpowiedzialności:
 * 1. Pobranie danych (tablicy statystyk) z Sanity za pomocą z-cache-owanej funkcji.
 * 2. Przekazanie tych danych do Komponentu Klienckiego, który zajmie się ich
 *    wyrenderowaniem, animacją i mapowaniem ikon.
 */
export async function StatsSection() {
  // Krok 1: Używamy naszej scentralizowanej i z-cache-owanej funkcji.
  const statsData = await getStatsSectionData();

  // Jeśli nie ma danych, nic nie renderujemy.
  if (!statsData) {
    return null;
  }

  // Krok 2: Zwracamy komponent kliencki, przekazując mu pobrane dane.
  // W tym przypadku nie przekazujemy `children`, ponieważ cała zawartość tej sekcji
  // jest dynamicznie generowana na podstawie danych.
  return <StatsSectionClient statsData={statsData} />;
}
