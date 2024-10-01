/** @jsx createVNode */
import { createVNode } from '../../lib';

export const Navigation = ({ loggedIn }) => {
  const currentPath = window.location.pathname;

  const getLinkClass = (path) => {
    return currentPath === path ? 'text-blue-600 font-bold' : 'text-gray-600';
  };

  return (
    <nav className='bg-white shadow-md p-2 sticky top-14'>
      <ul className='flex justify-around'>
        <li>
          <a href='/' className={getLinkClass('/')} data-link='true'>
            홈
          </a>
        </li>
        {!loggedIn && (
          <li>
            <a
              href='/login'
              className={getLinkClass('/login')}
              data-link='true'
            >
              로그인
            </a>
          </li>
        )}
        {loggedIn && (
          <li>
            <a
              href='/profile'
              className={getLinkClass('/profile')}
              data-link='true'
            >
              프로필
            </a>
          </li>
        )}
        {loggedIn && (
          <li>
            <a href='#' id='logout' className='text-gray-600'>
              로그아웃
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};