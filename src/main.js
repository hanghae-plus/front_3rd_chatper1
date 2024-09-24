import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import { PATH } from './utils/constants';
import { movePage } from './utils/functions';

let user;

function handleLogin() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  const username = document.getElementById('username');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    user = {
      username: username.value,
      email: '',
      bio: '',
    };

    localStorage.setItem('user', JSON.stringify(user));

    movePage(PATH.HOME);
  });
}

function handleNav() {
  const list = document.getElementById('nav-list');

  if (list) {
    list.addEventListener('click', (e) => {
      if (!list.contains(e.target)) return;

      const route = e.target.dataset.route;
      switch (route) {
        case 'home':
          movePage(PATH.HOME);
          break;

        case 'profile':
          const user = JSON.parse(localStorage.getItem('user'));
          user ? movePage(PATH.PROFILE) : movePage(PATH.LOGIN);
          break;

        case 'login':
          movePage(PATH.LOGIN);
          break;

        case 'logout':
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

function initFunctions() {
  handleNav();
  handleLogin();
}

function render() {
  const paintMain = () => {
    switch (location.pathname) {
      case PATH.HOME:
        return HomePage();

      case PATH.LOGIN:
        return LoginPage();

      case PATH.PROFILE:
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
