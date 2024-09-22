export default function Footer() {
  const FooterEl = document.createElement("footer");
  FooterEl.className = "bg-gray-200 p-4 text-center";

  const PEl = document.createElement("p");
  PEl.textContent = "© 2024 항해플러스. All rights reserved.";

  FooterEl.appendChild(PEl);

  return FooterEl;
}
