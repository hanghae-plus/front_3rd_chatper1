import { ROUTES } from '../constants/routes.js';

const MENU = {
  HOME: '홈',
  PROFILE: '프로필',
  LOGIN: '로그인',
  LOGOUT: '로그아웃'
};

export default function Nav() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const menus = [
    {
      name: MENU.HOME,
      href: ROUTES.HOME
    },
    {
      name: MENU.PROFILE,
      href: ROUTES.PROFILE
    },
    {
      name: isLoggedIn ? MENU.LOGOUT : MENU.LOGIN,
      href: ROUTES.LOGIN
    }
  ];

  return `<nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
        ${menus.map(
          ({ name, href }) =>
            `<li><a href="${href}" id="${name === MENU.LOGOUT ? 'logout' : ''}" className="${location.pathname === href ? 'text-blue-600' : 'text-gray-600'}">${name}</a></li>`
        )}
        </ul>
      </nav>`;
}
