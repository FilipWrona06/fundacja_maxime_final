import { urlFor } from "@/sanity/lib/image";
import type { Gallery } from "@/lib/types";
import GalleryHeader from "./GalleryHeader";
import GalleryImageGrid from "./GalleryImageGrid";

interface Props {
  gallery: Gallery;
  index: number;
}

export default function GalleryGrid({ gallery, index }: Props) {
  const images = gallery.images.map((img) => ({
    src: urlFor(img).width(1200).height(1200).quality(85).url(),
    alt: img.alt,
    caption: img.caption,
    blurDataURL: urlFor(img).width(20).height(20).blur(10).url(),
  }));

  return (
    <section aria-labelledby={`gallery-${gallery.slug.current}`}>
      <GalleryHeader
        id={`gallery-${gallery.slug.current}`}
        title={gallery.title}
        date={gallery.date}
        location={gallery.location}
        index={index}
      />
      <GalleryImageGrid galleryId={gallery.slug.current} images={images} />
    </section>
  );
}
