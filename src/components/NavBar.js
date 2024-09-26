import { getLoginStatus } from '../services/auth.js';

export function navBar() {
  const currentPath = window.location.pathname;

  if (getLoginStatus()) {
    return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li>
            <a href="/" class="${currentPath === '/' ? 'text-blue-600 font-bold' : 'text-gray-600'}" data-link>홈</a>
          </li>
          <li>
            <a href="/profile" class="${currentPath === '/profile' ? 'text-blue-600 font-bold' : 'text-gray-600'}" data-link>프로필</a>
          </li>
          <li>
            <a href="#" id="logout" class="text-gray-600">로그아웃</a>
          </li>
        </ul>
      </nav>
    `;
  } else {
    return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li>
            <a href="/" class="${currentPath === '/' ? 'text-blue-600 font-bold' : 'text-gray-600'}" data-link>홈</a>
          </li>
          <li>
            <a href="/login" class="${currentPath === '/login' ? 'text-blue-600 font-bold' : 'text-gray-600'}" data-link>로그인</a>
          </li>
        </ul>
      </nav>
    `;
  }
}
