import { Router } from './router.js';
import { Error } from '/src/component/error.js';
import { useUserStore } from '/src/store/useUserStore.js';
import { homePage } from '/src/views/homePage.js';
import { loginPage } from '/src/views/loginPage.js';
import { notFoundPage } from '/src/views/notFoundPage.js';
import { profilePage } from '/src/views/profilePage.js';

const router = new Router(document.querySelector('#root'));

// 레이아웃 함수
const layout = (content) => {
  const currentPath = window.location.pathname;

  const getNavLinkClass = (path) => {
    return currentPath === path
      ? 'text-blue-600 font-bold'
      : 'text-gray-600 hover:text-blue-600';
  };

  return `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${getNavLinkClass('/')}">홈</a></li>
          ${
            useUserStore.isLoggedIn()
              ? `<li><a href="/profile" class="${getNavLinkClass(
                  '/profile'
                )}">프로필</a></li>`
              : ``
          }
          ${
            useUserStore.isLoggedIn()
              ? `<li><button id="logout" class="text-gray-600 hover:text-blue-600">로그아웃</button></li>`
              : `<li><a href="/login" class="${getNavLinkClass(
                  '/login'
                )}">로그인</a></li>`
          }
        </ul>
      </nav>

      ${content}

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>
`;
};

// 라우트 추가
router.addRoute('/', () => layout(homePage()));
router.addRoute('/login', () => loginPage(), { guestOnly: true });
router.addRoute('/profile', () => layout(profilePage()), {
  requiresAuth: true,
});
router.addRoute('/404', () => notFoundPage());

// 전역 에러 핸들러
window.addEventListener('error', (event) => {
  event.preventDefault();
  Error.showError(event.error.message);
});

// 기본 동작을 막는 이벤트 리스너 (캡처 단계)
document.addEventListener(
  'click',
  (e) => {
    const linkElement = e.target.closest('a');
    if (
      linkElement &&
      linkElement.href &&
      linkElement.href.startsWith(window.location.origin)
    ) {
      e.preventDefault();
    }
  },
  true
);

// 네비게이션 이벤트 처리 (버블링 단계)
document.addEventListener('click', (e) => {
  const linkElement = e.target.closest('a');
  if (
    linkElement &&
    linkElement.href &&
    linkElement.href.startsWith(window.location.origin)
  ) {
    const path = new URL(linkElement.href).pathname;
    router.navigateTo(path);
  }

  if (e.target.id === 'logout') {
    useUserStore.logout();
    router.navigateTo('/');
  }
});

// 이벤트 리스너 설정
document.addEventListener('submit', (e) => {
  if (e.target.id === 'login-form') {
    e.preventDefault();
    const username = document.getElementById('username').value;
    useUserStore.login(username);
    router.navigateTo('/');
  }

  if (e.target.id === 'profile-form') {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;

    useUserStore.updateUser({ username, email, bio });

    alert('프로필이 업데이트되었습니다.');
  }
});

// 상태 변경 추가
useUserStore.subscribe(() => {
  router.updateCurrentRoute();
});

router.init();
