/** @jsx createVNode */
import{ createRouter, createVNode, renderElement } from "../../lib";
import { HomePage, LoginPage, ProfilePage } from "../../pages";
import { globalStore } from "../../stores";
import { userStorage } from "../../storages";

const getNavItemClass = (path) => {
  const currentPath = window.location.pathname;
  return currentPath === path ? 'text-blue-600 font-bold' : 'text-gray-600';
}
const handleLinkClick = (e,path) => {
  e.preventDefault();
  if(e.target.tagName === 'A'){
    createRouter({
      "/": HomePage,
      "/login": LoginPage,
      "/profile": ProfilePage,
    }).push(path)
  }
  // renderElement(Navigation(),document.querySelector('#root'))
};
const logout =()=>{
  globalStore.setState({ currentUser: null, loggedIn: false });
  userStorage.reset();
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
      <li><a href="/"  className={getNavItemClass('/')} data-link onClick={(e) => handleLinkClick(e,'/')}>홈</a></li>
      {!loggedIn ? (<li><a href="/login" className={getNavItemClass('/login')} data-link onClick={(e) => handleLinkClick(e,'/login')}>로그인</a></li>) : ''}
      {loggedIn ? (<li><a href="/profile"  className={getNavItemClass('/profile')} data-link onClick={(e) => handleLinkClick(e,'/profile')}>프로필</a></li>) : ''}
      {loggedIn ? (<li><a onClick={logout} id="logout" className="text-gray-600">로그아웃</a></li>) : ''}
    </ul>
  </nav>
)};
