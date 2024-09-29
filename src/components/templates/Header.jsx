import { createVNode } from "@/lib";

export function Header() {
  return createVNode(
    "header",
    {
      class: "bg-blue-600 text-white p-4 sticky top-0",
    },
    createVNode("h1", { class: "text-2xl font-bold" }, "항해플러스")
  );
}
