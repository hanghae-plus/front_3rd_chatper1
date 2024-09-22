export default function Header() {
  const HeaderEl = document.createElement("header");
  HeaderEl.setAttribute("class", "bg-blue-600 text-white p-4 sticky top-0");

  const TitleEl = document.createElement("h1");
  TitleEl.setAttribute("class", "text-2xl font-bold");

  TitleEl.textContent = "항해플러스";

  HeaderEl.appendChild(TitleEl);

  return HeaderEl;
}
