/** @jsx createVNode */
import { createVNode } from "@/lib";

import { globalStore } from "@/stores";

export function Navigation() {
  const isLogin = globalStore.getState().loggedIn;

  const isActive = (href) => {
    return window.location.pathname === `/${href}`;
  };

  return (
    <nav className="bg-white shadow-md p-2 sticky top-14">
      <ul className="flex justify-around">
        {navList.map(({ title, href }) => {
          switch (href) {
            case "profile":
            case "logout":
              if (!isLogin) return null;
              break;
            case "login":
              if (isLogin) return null;
              break;
          }
          return (
            <li>
              <a
                href={`/${href}`}
                className={
                  isActive(href) ? "text-blue-600 font-bold" : "text-gray-600"
                }
                data-link={true}
                {...(href === "logout" && { id: "logout" })}
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const navList = [
  { title: "홈", href: "" },
  { title: "프로필", href: "profile" },
  { title: "로그아웃", href: "logout" },
  { title: "로그인", href: "login" },
];
