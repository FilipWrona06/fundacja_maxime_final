// src/components/home/CtaSection.tsx

import { groq } from "next-sanity";

import type { HomePageData } from "@/lib/types";
import { client } from "@/sanity/lib/client";

import { CTASectionClient } from "./CtaSection.client";

// Publiczny, asynchroniczny Komponent Serwerowy.
export async function CTASection() {
  // Pobieramy dane potrzebne tylko dla tej sekcji.
  const data = await client.fetch<{ ctaSection: HomePageData["ctaSection"] }>(
    groq`*[_type == "homePage"][0]{ ctaSection }`,
    {},
    { next: { tags: ["homePage"] } },
  );

  if (!data?.ctaSection) {
    return null;
  }

  // Zwracamy komponent kliencki, a w środku (jako children) renderujemy statyczną treść.
  return (
    <CTASectionClient>
      {/* Poniższy kod jest renderowany na serwerze. */}
      {/* JS do renderowania h2 i p nie trafia do przeglądarki. */}
      
      <h2
        id="cta-heading"
        className="mb-6 font-youngest text-6xl leading-tight text-arylideYellow md:text-7xl lg:text-8xl"
      >
        {data.ctaSection.heading}
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/70 md:text-2xl">
        {data.ctaSection.text}
      </p>
    </CTASectionClient>
  );
}