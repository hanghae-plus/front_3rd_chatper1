/** @jsx createVNode */
import { createVNode } from "../../lib";
import { globalStore } from '../../stores';
import { router } from "../../main";

export const Navigation = () => {
  const { loggedIn } = globalStore.getState();
  const getNavItemClass = (href) => (location.pathname === href ? 'text-blue-600 font-bold' : 'text-gray-600');

  return (
    <nav className="bg-white shadow-md p-2 sticky top-14">
      <ul className="flex justify-around">
        <li>
          <a href="/" className={getNavItemClass("/")} data-link='true' onClick={()=>router.push('/')}>
            홈
          </a>
        </li>

        {!loggedIn && (
          <li>
            <a href="/login" className={getNavItemClass("/login")} data-link='true' onClick={()=>router.push('/login')}>
              로그인
            </a>
          </li>
        )}
        {!loggedIn && (
          <li>
            <a
              href="/profile"
              className={getNavItemClass("/profile")}
              data-link='true' onClick={()=>router.push('/profile')}
            >
              프로필
            </a>
          </li>
        )}
        {!loggedIn && (
          <li>
            <a href="#" id="logout" className="text-gray-600">
              로그아웃
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
