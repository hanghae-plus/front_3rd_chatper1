import { appendChild, createElement } from "@/utils";

export default function Header() {
  const Header = createElement({
    tagName: "header",
    className: "bg-blue-600 text-white p-4 sticky top-0",
  });

  const Title = createElement({
    tagName: "h1",
    className: "text-2xl font-bold",
    textContent: "항해플러스",
  });

  appendChild({ parent: Header, children: [Title] });

  return Header;
}
