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

  function renderErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    errorMessage.textContent = message;
    document.body.appendChild(errorMessage);
  }

  function triggerLoginError() {
    const username = document.getElementById('username');

    username.addEventListener(
      'input',
      () => {
        try {
          throw new Error('의도적인 오류입니다.');
        } catch (e) {
          renderErrorMessage('오류 발생! 의도적인 오류입니다.');
        }
      },
      { once: true }
    );
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    triggerLoginError();
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

  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    const userInfo = getUserInfoStorage('user');

    const parsedUser = JSON.parse(userInfo);

    document.getElementById('username').value = parsedUser.username;
    document.getElementById('email').value = parsedUser.email;
    document.getElementById('bio').value = parsedUser.bio;

    profileForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const usernameInput = document.getElementById('username');
      const emailInput = document.getElementById('email');
      const bioInput = document.getElementById('bio');

      const userInfo = {
        username: usernameInput.value,
        email: emailInput.value,
        bio: bioInput.value,
      };
      setUserInfoStorage('user', userInfo);
      alert('프로필이 수정되었습니다.');
    });
  }

}

window.addEventListener('popstate', renderRoute);

document.addEventListener('DOMContentLoaded', () => {
  renderRoute();
});

window.addEventListener('error', error => {
  renderErrorMessage();
})