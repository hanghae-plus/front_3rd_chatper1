/** @jsx createVNode */
import { createVNode } from "../../lib";

export const Navigation = ({ loggedIn }) => (
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li>
        <a href="/" class="${getNavItemClass('/')}" data-link>
          홈
        </a>
      </li>
      $
      {!loggedIn
        ? `<li><a href="/login" class="${getNavItemClass(
            "/login"
          )}" data-link>로그인</a></li>`
        : ""}
      $
      {loggedIn
        ? `<li><a href="/profile" class="${getNavItemClass(
            "/profile"
          )}" data-link>프로필</a></li>`
        : ""}
      $
      {loggedIn
        ? `<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`
        : ""}
    </ul>
  </nav>
);
