import { appendChild, createElement } from "@/utils";
import { getUser } from "@/store/userStore";
import { logout } from "../store/userStore";

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
  console.log(getUser());
  console.log(isLogin);

  NavList.forEach(({ title, href }) => {
    if (isLogin) {
      if (href === "login") return;
    } else {
      if (href === "profile" || href === "logout") return;
    }

    const NavItem = createElement({ tagName: "li", className: "flex-center" });

    const Link = createElement({
      tagName: "a",
      className: "block w-full h-full text-center",
      textContent: title,
      setAttribute: { href: `#${href}` },
    });

    if (window.location.hash.includes(href)) {
      Link.className += " text-blue-600";
    }

    appendChild({ parent: NavItem, children: [Link] });
    appendChild({ parent: NavContainer, children: [NavItem] });
  });

  NavContainer.addEventListener("click", (e) => {
    if (e.target.href.includes("#logout")) {
      alert("로그아웃 되었습니다.");
      e.preventDefault();
      logout();
      return;
    }
  });
  appendChild({ parent: Nav, children: [NavContainer] });

  return Nav;
}

const NavList = [
  { title: "홈", href: "main" },
  { title: "프로필", href: "profile" },
  { title: "로그아웃", href: "logout" },
  { title: "로그인", href: "login" },
];
