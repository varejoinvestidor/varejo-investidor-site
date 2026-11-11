import Image from "@tiptap/extension-image";

export const PublisherImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        parseHTML: (element) => element.getAttribute("data-width") ?? element.style.width ?? "100%",
        renderHTML: (attrs) => {
          const w = String(attrs.width ?? "100%");
          return { "data-width": w, style: `width: ${w}; max-width: 100%; height: auto;` };
        },
      },
      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align") ?? "center",
        renderHTML: (attrs) => ({
          "data-align": String(attrs.align ?? "center"),
        }),
      },
      alt: {
        default: "",
      },
      title: {
        default: null,
      },
    };
  },
});
