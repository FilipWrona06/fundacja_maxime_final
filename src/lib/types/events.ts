import type { SanityImage, SanitySlug } from "./sanity";

export interface EventType {
  _id: string;
  slug: SanitySlug;
  title: string;
  subtitle: string;
  date: string;
  dateDisplay: string;
  time: string;
  location: string;
  address: string;
  artist: string;
  artistRole: string;
  description: string;
  image: SanityImage;
  price: string;
}
