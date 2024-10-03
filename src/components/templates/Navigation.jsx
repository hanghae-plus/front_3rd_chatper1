/** @jsx createVNode */
import{ createVNode } from "../../lib";
import { userStorage } from "../../storages";
import { globalStore } from "../../stores";

export const Navigation = () => {
  const getNavItemClass = (path) => {
    const currentPath = window.location.pathname;
    return currentPath === path ? 'text-blue-600 font-bold' : 'text-gray-600';
  }

  const isLoggedIn = globalStore.getState().loggedIn;

  return (
    <nav className="bg-white shadow-md p-2 sticky top-14">
      <ul className="flex justify-around">
        <li><a href="/" className={getNavItemClass('/')} data-link>홈</a></li>
        {!isLoggedIn ? <li><a href="/login" className={getNavItemClass('/login')} data-link>로그인</a></li> : ''}
        {isLoggedIn ? <li><a href="/profile" className={getNavItemClass('/profile')} data-link>프로필</a></li> : ''}
        {isLoggedIn ? <li><a href="#" id="logout" className="text-gray-600">로그아웃</a></li> : ''}
      </ul>
    </nav>
  );
};
