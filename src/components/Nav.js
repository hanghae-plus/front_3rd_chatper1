import { appendChild, createElement } from "@/utils";

import { deleteUser, getUser, useNavigate } from "../main";

export default function Nav() {
  const Nav = createElement({
    tagName: "nav",
    className: "bg-white shadow-md p-2 sticky top-14",
  });

  const NavContainer = createElement({
    tagName: "ul",
    className: "flex justify-around",
  });
  const isLogin = !!getUser();
  NavList.forEach(({ title, href }) => {
    if (isLogin) {
      if (href === "login") return;
    } else {
      if (href === "profile" || href === "logout") return;
    }

    const NavItem = createElement({ tagName: "li", className: "flex-center" });

    const Link = createElement({
      tagName: "a",
      className: "block w-full h-full text-center font-bold",
      textContent: title,
      id: href,
      setAttribute: { href: `/${href}` },
    });

    if (window.location.pathname === `/${href}`) {
      Link.className += " text-blue-600";
    }

    appendChild({ parent: NavItem, children: [Link] });
    appendChild({ parent: NavContainer, children: [NavItem] });
  });

  NavContainer.addEventListener("click", (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    if (href === "/logout") {
      deleteUser();
      alert("로그아웃 되었습니다.");
      useNavigate("/login");
      return;
    }
    useNavigate(href);
  });
  appendChild({ parent: Nav, children: [NavContainer] });

  return Nav;
}

const NavList = [
  { title: "홈", href: "" },
  { title: "프로필", href: "profile" },
  { title: "로그아웃", href: "logout" },
  { title: "로그인", href: "login" },
];
