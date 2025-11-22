// Plik: src/components/events/WydarzeniaHeroSection.tsx

import { WydarzeniaHeroSectionClient } from "./WydarzeniaHeroSection.client";

export function WydarzeniaHeroSection() {
  // Tutaj definiujemy treść statyczną lub pobraną z CMS.
  // Dzięki temu Client Component zajmuje się tylko wyglądem, a nie danymi.
  const content = {
    badgeText: "Sezon 2024 / 2025",
    titleLine1: "Poczuj Rytm",
    titleLine2: "Naszej Sceny",
    subtitle:
      "Odkryj nadchodzące koncerty, festiwale i wydarzenia specjalne. Bądź częścią niezapomnianych muzycznych wrażeń w sercu miasta.",
  };

  return (
    <WydarzeniaHeroSectionClient
      badgeText={content.badgeText}
      titleLine1={content.titleLine1}
      titleLine2={content.titleLine2}
      subtitle={content.subtitle}
    />
  );
}
