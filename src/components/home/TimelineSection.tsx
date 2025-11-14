import { getTimelineSectionData } from "@/sanity/lib/get-data";
import { TimelineSectionClient } from "./TimelineSection.client";

export async function TimelineSection() {
  const timelineData = await getTimelineSectionData();

  if (!timelineData) {
    return null;
  }

  return (
    <TimelineSectionClient timelineData={timelineData}>
      <h2
        id="timeline-heading"
        className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl"
      >
        Nasza{" "}
        <span className="font-youngest text-arylideYellow">
          {timelineData.heading}
        </span>
      </h2>
      {/* ZMIANA (RWD): Tekst jest mniejszy na mobile, większy na desktopie */}
      <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
        {timelineData.subheading}
      </p>
    </TimelineSectionClient>
  );
}