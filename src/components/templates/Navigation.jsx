/** @jsx createVNode */
import { createVNode } from "../../lib";

const getNavItemClass = (path) => {
  const currentPath = window.location.pathname;
  return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
};

export const Navigation = ({ loggedIn }) => {
  return (
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a href="/" class={getNavItemClass("/")} data-link="true">
            홈
          </a>
        </li>

        {!loggedIn && (
          <li>
            <a href="/login" class={getNavItemClass("/login")} data-link="true">
              로그인
            </a>
          </li>
        )}

        {loggedIn && (
          <li>
            <a
              href="/profile"
              class={getNavItemClass("/profile")}
              data-link="true"
            >
              프로필
            </a>
          </li>
        )}

        {loggedIn && (
          <li>
            <a href="#" id="logout" class="text-gray-600">
              로그아웃
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
