import { appendChild, createElement } from "@/utils";

export default function RootLayout(children) {
  const RootLayout = createElement({
    tagName: "div",
    className: "bg-gray-100 h-screen flex justify-center items-center",
  });
  appendChild({ parent: RootLayout, children: [children] });
  return RootLayout;
}
