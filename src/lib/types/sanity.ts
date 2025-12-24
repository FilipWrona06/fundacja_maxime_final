export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

// --- GŁÓWNE REUŻYWALNE TYPY ---

/**
 * Definiuje podstawowy, bezpieczny typ dla bloków z edytora Portable Text.
 * Zastępuje użycie `any[]`, eliminując błędy lintera. Każdy obiekt
 * w tablicy musi mieć co najmniej właściwość `_type`.
 */
export type PortableTextBlock = {
  _type: string;
  [key: string]: unknown;
};

export type PortableTextContent = PortableTextBlock[];
