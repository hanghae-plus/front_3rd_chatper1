/** @jsx createVNode */
import { createVNode } from '@/lib';
import { logout } from '@/main';

export const Navigation = ({ loggedIn }) => {
  const getClassName = (path) => {
    if (path === window.location.pathname) {
      return 'text-blue-600 font-bold';
    } else {
      return 'text-gray-600';
    }
  };

  return (
    <nav className="bg-white shadow-md p-2 sticky top-14">
      <ul className="flex justify-around">
        <li>
          <a href="/" className={getClassName('/')} data-link="true">
            홈
          </a>
        </li>
        {loggedIn ? (
          <ul>
            <li>
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
          <li>
            <a href="/login" className="text-gray-600" data-link="true">
              로그인
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
