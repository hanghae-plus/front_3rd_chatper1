/** @jsx createVNode */
import { createVNode } from "../../lib";
export const Navigation = ({ loggedIn }) => {
  const getNavItemClass = (href) => {
    return location.pathname == href
      ? "text-blue-600 font-bold"
      : "text-gray-600";
  };

  return (
    <nav classsName="bg-white shadow-md p-2 sticky top-14">
      <ul classsName="flex justify-around">
        <li>
          <a href="/" classsName={getNavItemClass("/")} data-link>
            홈
          </a>
        </li>
        {!loggedIn ? (
          <li>
            <a href="/login" classsName={getNavItemClass("/login")} data-link>
              로그인
            </a>
          </li>
        ) : (
          ""
        )}
        {loggedIn ? (
          <li>
            <a
              href="/profile"
              classsName={getNavItemClass("/profile")}
              data-link
            >
              프로필
            </a>
          </li>
        ) : (
          ""
        )}
        {loggedIn ? (
          <li>
            <a href="#" id="logout" classsName="text-gray-600">
              로그아웃
            </a>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};
