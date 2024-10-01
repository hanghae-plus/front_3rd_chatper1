/** @jsx createVNode */
import{ createRouter, createVNode, renderElement } from "../../lib";
import { HomePage, LoginPage, ProfilePage } from "../../pages";
import { globalStore } from "../../stores";
import { userStorage } from "../../storages";

const getNavItemClass = (path) => {
  const currentPath = window.location.pathname;
  return currentPath === path ? 'text-blue-600 font-bold' : 'text-gray-600';
}
export const Navigation = ({ loggedIn }) => {
  // const handleLinkClick = (e, path) => {
  //   console.log(e.target.tagName)
  //   e.preventDefault();
  //   if(e.target.tagName === 'A'){
  //     window.history.pushState(null, null, path);
  //   }
  //   renderElement(Navigation(loggedIn),document.querySelector('#root'))
  // };
  return(
  <nav className="bg-white shadow-md p-2 sticky top-14">
    <ul className="flex justify-around">
      <li><a href="/"  className={getNavItemClass('/')} data-link>홈</a></li>
      {!loggedIn ? (<li><a href="/login" className={getNavItemClass('/login')} data-link>로그인</a></li>) : ''}
      {loggedIn ? (<li><a href="/profile"  className={getNavItemClass('/profile')} data-link >프로필</a></li>) : ''}
      {loggedIn ? (<li><a id="logout" className="text-gray-600">로그아웃</a></li>) : ''}
    </ul>
  </nav>
)};
