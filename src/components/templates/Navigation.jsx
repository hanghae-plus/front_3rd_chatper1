/** @jsx createVNode */
import { createVNode } from '@/lib';
import { logout } from '@/main';

export const Navigation = ({ loggedIn }) => {
  const getClassName = (path) => {
    return path === window.location.pathname ? 'text-blue-600 font-bold' : 'text-gray-600';
  };

  return (
    <nav className="bg-white shadow-md p-2 sticky top-14">
      {loggedIn ? (
        <ul className="flex justify-around">
          <li>
            <a href="/" className={getClassName('/')} data-link="true">
              홈
            </a>
          </li>
          <li className="flex space-x-4">
            <a href="/profile" className={getClassName('/profile')} data-link="true">
              프로필
            </a>
          </li>
          <li>
            <a id="logout" href="#" className="text-gray-600" onClick={logout}>
              로그아웃
            </a>
          </li>
        </ul>
      ) : (
        <ul className="flex justify-around">
          <li>
            <a href="/" className={getClassName('/')} data-link="true">
              홈
            </a>
          </li>
          <li>
            <a href="/login" className="text-gray-600" data-link="true">
              로그인
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};
