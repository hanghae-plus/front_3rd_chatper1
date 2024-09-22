export default function Footer() {
  const Footer = document.createElement("footer");
  Footer.className = "bg-gray-200 p-4 text-center";

  const FooterContent = document.createElement("p");
  FooterContent.textContent = "© 2024 항해플러스. All rights reserved.";

  Footer.appendChild(FooterContent);

  return Footer;
}
