/** @jsx createVNode */
import { createVNode } from "../../lib";
import { userStorage } from "../../storages";

export const Navigation = () => {
  const loggedIn = userStorage.get("user");

  const getNavigateList = (href) => {
    return location.pathname == href
      ? "text-blue-600 font-bold"
      : "text-gray-600";
  };

  return (
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a href="/" class={getNavigateList("/")} data-link>
            홈
          </a>
        </li>
        {loggedIn ? (
          <li>
            <a href="/profile" class={getNavigateList("/profile")} data-link>
              프로필
            </a>
          </li>
        ) : (
          ''
        )}
        {!loggedIn ? (
          <li>
            <a href="/login" class={getNavigateList("/login")} data-link>
              로그인
            </a>
          </li>
        ) : (
          ''
        )}
        {loggedIn ? (
          <li>
            <a href="#" id="logout" class="text-gray-600">
              로그아웃
            </a>
          </li>
        ) : (
          ''
        )}
      </ul>
    </nav>
  );
};
