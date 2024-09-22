import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

export default function Layout(children) {
  const Layout = document.createElement("div");
  Layout.setAttribute(
    "class",
    "max-w-md w-full h-full flex flex-col overflow-hidden"
  );
  Layout.appendChild(Header());
  Layout.appendChild(Nav());

  const ChildrenContainer = document.createElement("main");
  ChildrenContainer.setAttribute("class", "p-4 overflow-y-auto flex-1");
  if (children) {
    ChildrenContainer.appendChild(children);
    Layout.appendChild(ChildrenContainer);
  }

  Layout.appendChild(Footer());
  return Layout;
}
