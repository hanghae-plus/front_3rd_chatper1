import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

export default function Layout(child) {
  const LayoutEl = document.createElement("div");
  LayoutEl.setAttribute("class", "max-w-md w-full");
  LayoutEl.appendChild(Header());

  LayoutEl.appendChild(Nav());

  if (child) {
    LayoutEl.appendChild(child);
  }

  LayoutEl.appendChild(Footer());
  return LayoutEl;
}
