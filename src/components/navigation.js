import { isLogin, removeUser } from '../utils';

class Navigation {
  template() {
    return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/main" class="text-blue-600 font-bold">홈</a></li>
        ${
          isLogin()
            ? `
          <li><a href="/profile" class="text-gray-600">프로필</a></li>
          <li><button id="logout" type="button" class="text-gray-600">로그아웃</button></li>
          `
            : '<li><a href="/login" class="text-gray-600">로그인</a></li>'
        }
      </ul>
    </nav>
    `;
  }

  bindEvents(navigateTo) {
    document.querySelector('nav')?.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        navigateTo(e.target.pathname);

        return;
      }
    });

    if (isLogin()) {
      document.getElementById('logout')?.addEventListener('click', () => {
        removeUser();
        navigateTo('/login');
      });
    }
  }
}

export default new Navigation();
