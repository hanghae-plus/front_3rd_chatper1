import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import { PATH } from './utils/constants';
import { movePage } from './utils/functions';

/**
 * root div에 HTML 요소를 집어넣는 함수
 */
function putElementsInRoot(elements = '') {
  document.querySelector('#root').innerHTML = elements;
}

/**
 * 프로필 페이지 핸들링
 */
function handleProfile() {
  const profileForm = document.getElementById('profile-form');
  if (!profileForm) return;

  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const bio = document.getElementById('bio');

    const user = {
      ...JSON.parse(localStorage.getItem('user')),
      bio: bio.value,
    };

    localStorage.setItem('user', JSON.stringify(user));
    alert('프로필이 업데이트 되었습니다.');
  });
}

/**
 * 로그인 페이지 핸들링
 */
function handleLogin() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  const username = document.getElementById('username');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = {
      username: username.value,
      email: '',
      bio: '',
    };
    localStorage.setItem('user', JSON.stringify(user));

    putElementsInRoot(ProfilePage());
    movePage(PATH.PROFILE);
    initFunctions();
  });
}

/**
 * Nav 컴포넌트를 핸들링하는 함수
 */
function handleNav() {
  const list = document.getElementById('nav-list');

  if (list) {
    list.addEventListener('click', (e) => {
      const route = e.target.dataset.route;
      switch (route) {
        case 'home':
          movePage(PATH.HOME);
          break;

        case 'profile':
          // 로그인 상태가 아닐 때 profile에 접근하면 로그인으로 이동
          const user = JSON.parse(localStorage.getItem('user'));
          user ? movePage(PATH.PROFILE) : movePage(PATH.LOGIN);
          break;

        case 'login':
          movePage(PATH.LOGIN);
          break;

        case 'logout':
          // 로그아웃 버튼 클릭 시 local storage 삭제 후 로그인 페이지 이동
          localStorage.removeItem('user');
          movePage(PATH.LOGIN);
          break;

        default:
          movePage(PATH.NOT_FOUND);
          break;
      }
    });
  }
}

// 각 컴포넌트에 필요한 함수들 실행(DOM API 등)
function initFunctions() {
  handleNav();
  handleLogin();
  handleProfile();
}

// 경로에 따라 화면 컴포넌트 렌더링
function render() {
  let result = '';

  switch (location.pathname) {
    case PATH.HOME:
      result = HomePage();
      break;

    case PATH.LOGIN:
      result = LoginPage();
      break;

    case PATH.PROFILE:
      result = ProfilePage();
      break;

    default:
      result = NotFoundPage();
      break;
  }

  putElementsInRoot(result);
  initFunctions();
}

window.addEventListener('popstate', (e) => {
  render();
});

render();
