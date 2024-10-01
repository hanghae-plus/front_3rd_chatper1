/** @jsx createVNode */
import { createVNode } from "../../lib";

const getNavItemClass = (path) => {
  const currentPath = window.location.pathname;
  return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
};

export const Navigation = ({ loggedIn }) => `
   <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li>
        <a href="/" class="text-blue-600 font-bold" data-link="true">홈</a>
      </li>
      <li>
        <a href="/login" class="text-gray-600" data-link="true">로그인</a>
      </li>
    </ul>
  </nav>
`;
