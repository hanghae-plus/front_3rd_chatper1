/** @jsx createVNode */
import { createVNode } from '../../lib';

export const Navigation = ({ loggedIn }) => {
  const getNavItemClass = (path) => {
    const currentPath = window.location.pathname;
    return currentPath === path ? 'text-blue-600 font-bold' : 'text-gray-600';
  };

  return (
    <nav className='bg-white shadow-md p-2 sticky top-14'>
      <ul className='flex justify-around'>
        <li>
          <a href='/' className={getNavItemClass('/')} data-link>
            홈
          </a>
        </li>
        {!loggedIn ? (
          <li>
            <a href='/login' className={getNavItemClass('/login')} data-link>
              로그인
            </a>
          </li>
        ) : null}
        {loggedIn ? (
          <li>
            <a href='/profile' className={getNavItemClass('/profile')} data-link>
              프로필
            </a>
          </li>
        ) : null}
        {loggedIn ? (
          <li>
            <a href='#' id='logout' className='text-gray-600'>
              로그아웃
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};
