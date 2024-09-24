import { user } from '../utils';
import router from '../router';

class Navigation {
  template() {
    const currentPath = window.location.pathname;
    const isActivated = (path) => (currentPath === path ? 'text-blue-600 font-bold' : 'text-gray-600');

    return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${isActivated('/')}">홈</a></li>
        ${
          user.isLogin()
            ? `
          <li><a href="/profile" class="${isActivated('/profile')}">프로필</a></li>
          <li><button id="logout" type="button" class="text-gray-600">로그아웃</button></li>
          `
            : '<li><a href="/login" class="text-gray-600">로그인</a></li>'
        }
      </ul>
    </nav>
    `;
  }

  activeEvents() {
    document.querySelector('nav')?.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        router.navigateTo(e.target.pathname);

        return;
      }
    });

    if (user.isLogin()) {
      document.getElementById('logout')?.addEventListener('click', () => {
        user.removeUser();
        router.navigateTo('/login');
      });
    }
  }
}

export default new Navigation();
