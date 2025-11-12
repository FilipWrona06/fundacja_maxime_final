// src/components/home/AboutSection.tsx

import { groq } from "next-sanity";

import type { HomePageData } from "@/lib/types";
import { client } from "@/sanity/lib/client";

import { AboutSectionClient } from "./AboutSection.client";

// To jest teraz asynchroniczny Komponent Serwerowy.
// Jest on "publiczny" - to jego importujemy w page.tsx.
export async function AboutSection() {
  // Krok 1: Pobieramy dane potrzebne tylko dla tej sekcji.
  const data = await client.fetch<{ aboutSection: HomePageData["aboutSection"] }>(
    groq`*[_type == "homePage"][0]{ aboutSection }`,
    {},
    { next: { tags: ["homePage"] } }, // Pamiętamy o tagowaniu dla webhooka!
  );

  // Jeśli nie ma danych, nic nie renderujemy.
  if (!data?.aboutSection) {
    return null;
  }

  // Krok 2: Zwracamy komponent kliencki jako "otoczkę",
  // a w środku (jako children) renderujemy całą statyczną treść.
  return (
    <AboutSectionClient aboutData={data.aboutSection}>
      {/* Poniższy kod jest renderowany na serwerze do czystego HTML. */}
      {/* Do przeglądarki nie jest wysyłany żaden JS odpowiedzialny za renderowanie tych tagów. */}
      
      <span className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow">
        {data.aboutSection.smallHeading}
      </span>
      <h2
        id="about-heading"
        className="mb-8 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
      >
        <span className="block">{data.aboutSection.headingPart1}</span>
        <span className="block font-youngest text-arylideYellow">
          {data.aboutSection.headingPart2}
        </span>
        <span className="block">{data.aboutSection.headingPart3}</span>
      </h2>
      <div className="space-y-6 text-lg leading-relaxed text-white/70">
        <p>{data.aboutSection.paragraph1}</p>
        <p>{data.aboutSection.paragraph2}</p>
      </div>
    </AboutSectionClient>
  );
}