import { Header, Navigation, Footer } from "@/components/templates";
import { createVNode } from "@/lib";

export function Layout(children) {
  return createVNode(
    "div",
    {
      class: "max-w-md w-full h-full flex flex-col overflow-hidden",
    },
    Header(),
    Navigation(),
    createVNode(
      "main",
      {
        class: "p-4 overflow-y-auto flex-1",
      },
      children
    ),
    Footer()
  );
}
