import { routerPush } from "@/lib/router";

export default function Nav() {
  const NavEl = document.createElement("nav");
  NavEl.setAttribute("class", "bg-white shadow-md p-2 sticky top-14");

  const NavUlEl = document.createElement("ul");
  NavUlEl.setAttribute("class", "flex justify-around");

  NavUlEl.addEventListener("click", ({ target }) => {
    const routePath = target.getAttribute("href");
    routerPush(routePath);
  });

  const NavList = [
    { title: "홈", href: "/main" },
    { title: "프로필", href: "/profile" },
    { title: "로그아웃", href: "/logout" },
    { title: "로그인", href: "/login" },
  ];

  NavList.forEach(({ title, href }) => {
    const LiEl = document.createElement("li");

    LiEl.className = "flex-center";

    const AEl = document.createElement("a");
    AEl.className = "block w-full h-full text-center";
    if (window.location.pathname === href) {
      AEl.className += " text-blue-600";
    }
    AEl.setAttribute("href", href);
    AEl.setAttribute("onclick", "return false;");

    AEl.textContent = title;

    LiEl.appendChild(AEl);
    NavUlEl.appendChild(LiEl);
  });

  NavEl.appendChild(NavUlEl);

  return NavEl;
}
