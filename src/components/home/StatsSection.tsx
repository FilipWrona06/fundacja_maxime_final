// src/components/home/StatsSection.tsx

import { groq } from "next-sanity";

import type { HomePageData } from "@/lib/types";
import { client } from "@/sanity/lib/client";

import { StatsSectionClient } from "./StatsSection.client";

// Publiczny, asynchroniczny Komponent Serwerowy.
export async function StatsSection() {
  // Pobieramy dane potrzebne tylko dla tej sekcji.
  const data = await client.fetch<{ statsSection: HomePageData["statsSection"] }>(
    groq`*[_type == "homePage"][0]{ statsSection }`,
    {},
    { next: { tags: ["homePage"] } },
  );

  if (!data?.statsSection) {
    return null;
  }

  // Zwracamy komponent kliencki, przekazując mu pobrane dane.
  // W tym przypadku nie przekazujemy `children`, ponieważ cała sekcja jest dynamiczna.
  return <StatsSectionClient statsData={data.statsSection} />;
}