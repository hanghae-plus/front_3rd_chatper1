/** @jsx createVNode */
import { createVNode } from '@/lib';
import { logout } from '@/main';

export const Navigation = ({ loggedIn }) => {
  if (loggedIn) {
    return (
      <nav className="bg-white shadow-md p-2 sticky top-14">
        <ul className="flex justify-around">
          <li>
            <a href="/" className="text-blue-600 font-bold" data-link="true">
              홈
            </a>
          </li>
          <li>
            <a href="/profile" className="text-gray-600" data-link="true">
              프로필
            </a>
          </li>
          <li>
            <a id="logout" href="#" className="text-gray-600" onClick={logout}>
              로그아웃
            </a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="bg-white shadow-md p-2 sticky top-14">
        <ul className="flex justify-around">
          <li>
            <a href="/" className="text-blue-600 font-bold" data-link="true">
              홈
            </a>
          </li>
          <li>
            <a href="/login" className="text-gray-600" data-link="true">
              로그인
            </a>
          </li>
        </ul>
      </nav>
    );
  }
};
