import { userInfoState } from '../main.js';
import { router } from '../router.js';
import { h } from '../virtual-dom.js';

function Header() {
  const userInfo = userInfoState.getUser();
  return (
    <div>
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li>
            <a href="/" class="text-blue-600 font-bold">
              홈
            </a>
          </li>
          <li>
            <a href="/profile" class="text-gray-600">
              프로필
            </a>
          </li>
          <li>
            <a href="/login" id="logout" class="text-gray-600">
              {userInfo.username === '' ? '로그인' : '로그아웃'}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

document.addEventListener('click', e => {
  e.stopPropagation();
  const $logout = document.getElementById('logout');
  if (e.target === $logout && $logout !== null && userInfoState.getUser().username !== '') {
    localStorage.removeItem('user');
    router().push('/login');
  }
});

export default Header;
