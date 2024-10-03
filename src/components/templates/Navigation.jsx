/** @jsx createVNode */
import { createVNode } from '../../lib';
import { router } from '../../main';

export const Navigation = ({ loggedIn }) => {
  const getStyle = (href) => (location.pathname === href ? 'text-blue-600 font-bold' : 'text-gray-600');

  const createLink = (href, label) => {
    return (
      <li>
        <a href={href} className={`${getStyle(href)}`} data-link="true" onClick={() => router.push(href)}>
          {label}
        </a>
      </li>
    );
  };
  return (
    <nav className="bg-white shadow-md p-2 sticky top-14">
      <ul className="flex justify-around">
        {createLink('/', '홈')}

        {loggedIn ? createLink('/profile', '프로필') : createLink('/login', '로그인')}

        {loggedIn ? (
          <li className="text-center">
            <button id="logout" className="text-gray-600">
              로그아웃
            </button>
          </li>
        ) : (
          ''
        )}
      </ul>
    </nav>
  );
};
