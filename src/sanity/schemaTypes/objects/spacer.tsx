// schemas/objects/spacer.tsx
import { defineField, defineType } from "sanity";

// Komponent podglądu, który wizualizuje pustą przestrzeń w edytorze
const SpacerPreview = () => (
  <div
    style={{
      border: "2px dashed #444",
      borderRadius: "4px",
      padding: "0.5em",
      textAlign: "center",
      color: "#888",
      margin: "1em 0",
    }}
  >
    Odstęp (Pusta Linia)
  </div>
);

export default defineType({
  name: "spacer",
  title: "Odstęp (Pusta Linia)",
  type: "object",
  fields: [
    defineField({
      name: "placeholder",
      type: "string",
      hidden: true,
    }),
  ],
  components: {
    preview: SpacerPreview,
  },
  preview: {
    prepare() {
      return {
        title: "Odstęp (Pusta Linia)",
      };
    },
  },
});
