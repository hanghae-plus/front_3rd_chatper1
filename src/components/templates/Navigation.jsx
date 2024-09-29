/** @jsx createVNode */
import { createVNode } from "../../lib";

export const getNavItemClass = (path) => {
  const currentPath = window.location.pathname;
  return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
};

export const Navigation = ({ loggedIn }) => {
  if (!loggedIn) {
    return (
      <li>
        <a href="/login" class={getNavItemClass("/login")} data-link>
          로그인
        </a>
      </li>
    );
  }

  return [
    <li>
      <a href="/profile" class={getNavItemClass("/profile")} data-link>
        프로필
      </a>
    </li>,
    <li>
      <a href="#" id="logout" class="text-gray-600">
        로그아웃
      </a>
    </li>,
  ];
};
