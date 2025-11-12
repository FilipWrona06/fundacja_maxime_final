// src/components/home/ImpactSection.tsx

import { groq } from "next-sanity";

import type { HomePageData } from "@/lib/types";
import { client } from "@/sanity/lib/client";

import { ImpactSectionClient } from "./ImpactSection.client";

// Publiczny, asynchroniczny Komponent Serwerowy.
export async function ImpactSection() {
  // Pobieramy dane potrzebne tylko dla tej sekcji.
  const data = await client.fetch<{ impactSection: HomePageData["impactSection"] }>(
    groq`*[_type == "homePage"][0]{ impactSection }`,
    {},
    { next: { tags: ["homePage"] } },
  );

  if (!data?.impactSection) {
    return null;
  }

  // Zwracamy komponent kliencki, przekazując mu zarówno dane,
  // jak i wyrenderowaną na serwerze, statyczną część JSX jako `children`.
  return (
    <ImpactSectionClient impactData={data.impactSection}>
      {/* Poniższy kod jest renderowany na serwerze do czystego HTML. */}
      
      <h2
        id="impact-heading"
        className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl"
      >
        Nasz{" "}
        <span className="font-youngest text-arylideYellow">
          {data.impactSection.heading}
        </span>
      </h2>
      <p className="mx-auto max-w-2xl text-xl text-white/60">
        {data.impactSection.subheading}
      </p>
    </ImpactSectionClient>
  );
}