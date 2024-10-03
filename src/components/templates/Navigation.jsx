/** @jsx createVNode */
import { createVNode } from "../../lib";
import { router } from "../../main";
import { userStorage } from "../../storages";

const getStyle = (href) => {
  const currentPath = window.location.pathname;
  return currentPath === href ? "text-blue-600 font-bold" : "text-gray-600";
};

const createLink = (href, name) => {
  return (
    <li>
      <a
        href={href}
        className={getStyle(href)}
        data-link="true"
        onClick={() => {
          router.push(href);
        }}
      >
        {name}
      </a>
    </li>
  );
};

export const Navigation = () => {
  const loggedIn = userStorage.get("user");
  return (
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        {createLink("/", "홈")}

        {loggedIn
          ? createLink("/profile", "프로필")
          : createLink("/login", "로그인")}

        {loggedIn && (
          <li>
            <a href="/" id="logout" className="text-gray-600">
              로그아웃
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
