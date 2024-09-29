/** @jsx createVNode */
import{ createVNode } from "../../lib";
import { globalStore } from "../../stores";
import { userStorage } from "../../storages";

const getNavItemClass = (path) => {
  const currentPath = window.location.pathname;
  return currentPath === path ? 'text-blue-600 font-bold' : 'text-gray-600';
}

const logout =()=>{
  globalStore.setState({ currentUser: null, loggedIn: false });
  userStorage.reset();
}

export const Navigation = ({ loggedIn }) => (
  <nav className="bg-white shadow-md p-2 sticky top-14">
    <ul className="flex justify-around">
      <li><a href="/" className={getNavItemClass('/')} data-link>홈</a></li>
      {!loggedIn ? (<li><a href="/login" className={getNavItemClass('/login')} data-link>로그인</a></li>) : ''}
      {loggedIn ? (<li><a href="/profile" className={getNavItemClass('/profile')} data-link>프로필</a></li>) : ''}
      {loggedIn ? (<li><a href="#" onClick={()=>logout()} id="logout" className="text-gray-600">로그아웃</a></li>) : ''}
    </ul>
  </nav>
);
