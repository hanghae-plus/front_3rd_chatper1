import { getLoginStatus } from '../services/auth.js';

export function renderNavBar() {
  const currentPath = window.location.pathname; // 현재 경로 가져오기

  if (getLoginStatus()) {
    // 로그인된 상태에서의 네비게이션 바
    return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li>
            <a href="/" class="${currentPath === '/' ? 'text-blue-600' : 'text-gray-600'}" data-link>홈</a>
          </li>
          <li>
            <a href="/profile" class="${currentPath === '/profile' ? 'text-blue-600' : 'text-gray-600'}" data-link>프로필</a>
          </li>
          <li>
            <a href="#" id="logout" class="text-gray-600">로그아웃</a>
          </li>
        </ul>
      </nav>
    `;
  } else {
    // 로그인되지 않은 상태에서의 네비게이션 바
    return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li>
            <a href="/" class="${currentPath === '/' ? 'text-blue-600' : 'text-gray-600'}" data-link>홈</a>
          </li>
          <li>
            <a href="/login" class="${currentPath === '/login' ? 'text-blue-600' : 'text-gray-600'}" data-link>로그인</a>
          </li>
        </ul>
      </nav>
    `;
  }
}
