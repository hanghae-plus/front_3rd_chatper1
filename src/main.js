import { routes } from './router';
import NotFoundPage from './pages/NotFoundPage';
import { deleteUserInfoStorage, getUserInfoStorage, setUserInfoStorage } from './utils/storage';

export function navigate (requestUrl) {
  history.pushState(null, null, requestUrl);
  renderRoute(requestUrl);
};

function renderRoute() {
  const path = window.location.pathname;

  const isLogin = getUserInfoStorage('isLogin');

  if (path === '/profile' && !isLogin) {
    navigate('/login');
    return;
  }

  if (path === '/login' && isLogin) {
    navigate('/');
    return;
  }

  const route = routes[path] || NotFoundPage;

  document.getElementById('root').innerHTML = route();

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;

      const userInfo = {
        username: username,
        email: '',
        bio: '',
      };
      setUserInfoStorage('user', userInfo);
      setUserInfoStorage('isLogin', true);
      navigate('/profile');
    });
  }

  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      deleteUserInfoStorage('user');
      deleteUserInfoStorage('isLogin');
      navigate('/');
    });
  }


}

window.addEventListener('popstate', renderRoute);

document.addEventListener('DOMContentLoaded', () => {
  renderRoute();
});
