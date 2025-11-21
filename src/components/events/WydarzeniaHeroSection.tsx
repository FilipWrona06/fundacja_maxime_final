// Plik: src/components/wydarzenia/WydarzeniaHeroSection.tsx

import { WydarzeniaHeroSectionClient } from "./WydarzeniaHeroSection.client";

// Opcjonalnie: import funkcji pobierającej dane z Sanity
// import { getWydarzeniaPageData } from "@/sanity/lib/queries/wydarzenia";

export async function WydarzeniaHeroSection() {
  // 1. Tu możesz pobrać dane z Sanity, np.:
  // const data = await getWydarzeniaPageData();
  
  // 2. Dane domyślne (fallback), jeśli nie używasz CMS dla nagłówka tej podstrony
  const staticData = {
    badgeText: "Sezon 2024 / 2025",
    titleLine1: "Poczuj Rytm",
    titleLine2: "Naszej Sceny",
    subtitle: "Odkryj nadchodzące koncerty, festiwale i wydarzenia specjalne. Bądź częścią niezapomnianych muzycznych wrażeń.",
  };

  // Jeśli używasz Sanity, podmień staticData na data z CMS
  const content = staticData;

  return (
    <WydarzeniaHeroSectionClient
      badgeText={content.badgeText}
      titleLine1={content.titleLine1}
      titleLine2={content.titleLine2}
      subtitle={content.subtitle}
    />
  );
}