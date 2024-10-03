/** @jsx createVNode */
import { createVNode } from "../../lib";
import { userStorage } from "../../storages";

export const Navigation = () => {
  const loggedIn = userStorage.get("user");

  const getStyle = (href) => {
    return location.pathname == href
      ? "text-blue-600 font-bold"
      : "text-gray-600";
  };

  const createLink = (href, label) => {
    return (
      <li>
        <a href={href} className={`${getStyle(href)}`} data-link="true">
          {label}
        </a>
      </li>
    );
  };

  const handleLogout = () => {
    userStorage.reset();
    window.location.href = "/login";
  };

  return (
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul className="flex justify-around">
        {createLink("/", "홈")}

        {loggedIn
          ? createLink("/profile", "프로필")
          : createLink("/login", "로그인")}

        {loggedIn ? (
          <li className="text-center">
            <button
              onClick={handleLogout}
              id="logout"
              className="text-gray-600"
            >
              로그아웃
            </button>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};
