import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';

function movePage(path = '') {
  history.pushState({}, '', path);
  history.pushState({}, '', path);
  history.back();
}

function handleLoginForm() {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
}

function handleNav() {
  const list = document.getElementById('nav-list');
  if (list) {
    list.addEventListener('click', (e) => {
      if (!list.contains(e.target)) return;

      const route = e.target.dataset.route;
      switch (route) {
        case 'home':
          movePage('/');
          break;

        case 'profile':
          const user = localStorage.getItem('user');

          if (user) {
            movePage('/profile');
          } else {
            movePage('/login');
          }
          break;

        case 'login':
          movePage('/login');
          break;

        case 'logout':
          if (!confirm('로그아웃 하시겠습니까?')) return;

          localStorage.removeItem('user');
          movePage('/');
          break;

        default:
          movePage('/404');
          break;
      }
    });
  }
}

function initFunctions() {
  handleNav();
  handleLoginForm();
}

function render() {
  const paintMain = () => {
    switch (location.pathname) {
      case '/':
        return HomePage();

      case '/login':
        return LoginPage();

      case '/profile':
        return ProfilePage();

      default:
        return NotFoundPage();
    }
  };

  document.querySelector('#root').innerHTML = paintMain();
  initFunctions();
}

window.addEventListener('popstate', (e) => {
  render();
});

render();
