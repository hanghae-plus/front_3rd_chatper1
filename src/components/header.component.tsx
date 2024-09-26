import { router } from '../router.js';
import { h } from '../virtual-dom.js';

function Header() {
  return (
    <div>
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li>
            <a href="/" class="text-blue-600">
              홈
            </a>
          </li>
          <li>
            <a href="/profile" class="text-gray-600">
              프로필
            </a>
          </li>
          <li>
            <button id="logout" class="text-gray-600">
              로그아웃
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

document.addEventListener('click', e => {
  const $logout = document.getElementById('logout');
  if (e.target === $logout && $logout !== null) {
    localStorage.removeItem('user');
    router().push('/login');
  }
});

export default Header;
