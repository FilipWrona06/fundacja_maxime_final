import { getTimelineSectionData } from "@/sanity/lib/get-data";
import { TimelineSectionClient } from "./TimelineSection.client";

export async function TimelineSection() {
  const timelineData = await getTimelineSectionData();

  if (!timelineData) {
    return null;
  }

  return (
    <TimelineSectionClient timelineData={timelineData}>
      <div className="space-y-4 sm:space-y-6">
        {/* Main heading */}
        <h2
          id="timeline-heading"
          className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          <span className="block text-white">Nasza</span>
          <span className="block font-youngest text-arylideYellow drop-shadow-lg">
            {timelineData.heading}
          </span>
        </h2>

        {/* Subheading */}
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
          {timelineData.subheading}
        </p>
      </div>
    </TimelineSectionClient>
  );
}