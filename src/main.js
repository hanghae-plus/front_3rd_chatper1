import { Router } from './router.js';
import { Error } from '/src/component/error.js';
import { useUserStore } from '/src/store/useUserStore.js';
import { homePage } from '/src/views/contents/homePage.js';
import { loginPage } from '/src/views/contents/loginPage.js';
import { notFoundPage } from '/src/views/contents/notFoundPage.js';
import { profilePage } from '/src/views/contents/profilePage.js';
import { footer } from '/src/views/footer/footer.js';
import { header } from '/src/views/header/header.js';
import { nav } from '/src/views/navigation/nav.js';

const router = new Router(document.querySelector('#root'));

// 레이아웃 함수
const layout = (content) => {
  return `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${header()}
      ${nav()}
      ${content}
      ${footer()}
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
