import { appendChild, createElement } from "../utils";

export default function Footer() {
  const Footer = createElement({
    tagName: "footer",
    className: "bg-gray-200 p-4 text-center",
  });

  const FooterContent = createElement({
    tagName: "p",
    textContent: "© 2024 항해플러스. All rights reserved.",
  });

  appendChild({ parent: Footer, children: [FooterContent] });

  return Footer;
}
