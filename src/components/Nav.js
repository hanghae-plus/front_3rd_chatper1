import { createElement } from "@/utils/createElement";

export default function Nav() {
  const Nav = createElement({
    tagName: "nav",
    className: "bg-white shadow-md p-2 sticky top-14",
  });

  const NavContainer = createElement({
    tagName: "ul",
    className: "flex justify-around",
  });

  NavList.forEach(({ title, href }) => {
    const NavItem = createElement({ tagName: "li", className: "flex-center" });

    const Link = document.createElement("a");
    Link.className = "block w-full h-full text-center";

    if (window.location.hash.includes(href)) {
      Link.className += " text-blue-600";
    }
    Link.setAttribute("href", `#${href}`);

    Link.textContent = title;

    NavItem.appendChild(Link);
    NavContainer.appendChild(NavItem);
  });

  Nav.appendChild(NavContainer);

  return Nav;
}

const NavList = [
  { title: "홈", href: "main" },
  { title: "프로필", href: "profile" },
  { title: "로그아웃", href: "logout" },
  { title: "로그인", href: "login" },
];
