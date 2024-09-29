import { createVNode } from "@/lib";

export function RootLayout(children) {
  return createVNode(
    "div",
    {
      class: "bg-gray-100 h-screen flex justify-center items-center",
    },
    children
  );
}
