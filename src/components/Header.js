export default function Header() {
  const Header = document.createElement("header");
  Header.setAttribute("class", "bg-blue-600 text-white p-4 sticky top-0");

  const Title = document.createElement("h1");
  Title.setAttribute("class", "text-2xl font-bold");

  Title.textContent = "항해플러스";

  Header.appendChild(Title);

  return Header;
}
