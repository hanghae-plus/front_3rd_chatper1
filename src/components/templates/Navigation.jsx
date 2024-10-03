/** @jsx createVNode */
import { createVNode } from "../../lib/createVNode";

// 상수 선언
const NAV_ITEMS = {
  home: { path: "/", label: "홈" },
  login: { path: "/login", label: "로그인" },
  profile: { path: "/profile", label: "프로필" },
  logout: { label: "로그아웃" },
};

// Navigation 컴포넌트
export const Navigation = ({ loggedIn }) => {
  const getNavItemClass = (path) => {
    const currentPath = window.location.pathname;
    return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
  };

  return (
    <nav className="bg-white shadow-md p-2 sticky top-14">
      <ul className="flex justify-around">
        <li>
          <a href={NAV_ITEMS.home.path} className={getNavItemClass(NAV_ITEMS.home.path)} data-link="true">{NAV_ITEMS.home.label}</a>
        </li>
        {!loggedIn && (
          <li>
            <a href={NAV_ITEMS.login.path} className={getNavItemClass(NAV_ITEMS.login.path)} data-link="true">{NAV_ITEMS.login.label}</a>
          </li>
        )}
        {loggedIn && (
          <li>
            <a href={NAV_ITEMS.profile.path} className={getNavItemClass(NAV_ITEMS.profile.path)} data-link="true">{NAV_ITEMS.profile.label}</a>
          </li>
        )}
        {loggedIn && (
          <li>
            <a href="#" id="logout" className="text-gray-600">{NAV_ITEMS.logout.label}</a>
          </li>
        )}
      </ul>
    </nav>
  );
};
