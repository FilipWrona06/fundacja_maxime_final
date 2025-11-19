import { defineField, defineType } from "sanity";

// Ten mały komponent React tworzy wizualny podgląd linii
// bezpośrednio w edytorze Sanity, co bardzo ułatwia pracę redaktorowi.
const RulePreview = () => (
  <hr
    style={{ border: "none", borderTop: "2px solid #ccc", margin: "1em 0" }}
  />
);

export default defineType({
  name: "horizontalRule",
  title: "Pozioma linia (Separator)",
  type: "object",
  // Poniższe pole jest tylko technicznym wymogiem, aby obiekt nie był pusty.
  // Jest ukryte i redaktor go nie widzi.
  fields: [
    defineField({
      name: "placeholder",
      type: "string",
      hidden: true,
    }),
  ],
  components: {
    preview: RulePreview,
  },
  preview: {
    prepare() {
      // Ta nazwa pojawi się przy komponencie, gdy jest zwinięty
      return {
        title: "Pozioma linia",
      };
    },
  },
});
