// src/components/home/TimelineSection.tsx

import { groq } from "next-sanity";

import type { HomePageData } from "@/lib/types";
import { client } from "@/sanity/lib/client";

import { TimelineSectionClient } from "./TimelineSection.client";

// Publiczny, asynchroniczny Komponent Serwerowy.
export async function TimelineSection() {
  // POPRAWKA: Używamy 'timelineSection' w zapytaniu i w typie, aby pasowało do HomePageData
  const data = await client.fetch<{ timelineSection: HomePageData["timelineSection"] }>(
    groq`*[_type == "homePage"][0]{ timelineSection }`,
    {},
    { next: { tags: ["homePage"] } },
  );

  // POPRAWKA: Sprawdzamy poprawną właściwość
  if (!data?.timelineSection) {
    return null;
  }

  // POPRAWKA: Przekazujemy poprawną właściwość 'timelineSection' do propa 'timelineData'
  return (
    <TimelineSectionClient timelineData={data.timelineSection}>
      {/* Poniższy kod jest renderowany na serwerze do czystego HTML. */}
      {/* POPRAWKA: Używamy poprawnej właściwości do renderowania */}
      <h2
        id="timeline-heading"
        className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl"
      >
        Nasza{" "}
        <span className="font-youngest text-arylideYellow">
          {data.timelineSection.heading}
        </span>
      </h2>
      <p className="mx-auto max-w-2xl text-xl text-white/60">
        {data.timelineSection.subheading}
      </p>
    </TimelineSectionClient>
  );
}