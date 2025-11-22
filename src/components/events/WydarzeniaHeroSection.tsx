// Plik: src/components/events/WydarzeniaHeroSection.tsx

import { WydarzeniaHeroSectionClient } from "./WydarzeniaHeroSection.client";

interface Props {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  badgeText: string;
}

export function WydarzeniaHeroSection({
  titleLine1,
  titleLine2,
  subtitle,
  badgeText,
}: Props) {
  return (
    <WydarzeniaHeroSectionClient
      titleLine1={titleLine1}
      titleLine2={titleLine2}
      subtitle={subtitle}
      badgeText={badgeText}
    />
  );
}