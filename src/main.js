import { Main, LoginMain } from '../components/Main';
import Profile from '../components/Profile';
import Login from '../components/Login';
import Error from '../components/Error';
import Router from './router';
import User from '../store/User';

//renderMainPage
const user = User();
const router = Router();
router.addRoute('/', renderMainPage);
router.addRoute('/login', renderLoginPage);
router.addRoute('/profile', renderProfilePage);
router.addRoute('/404', renderErrorPage);

// 페이지가 로드될 때 초기 페이지 렌더링
renderMainPage();

document.querySelector('nav').addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    router.navigateTo(e.target.pathname);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  router.navigateTo(window.location.pathname);
});

function render(component) {
  document.querySelector('#root').innerHTML = component();
}

function renderMainPage() {
  if (user.getUser()) {
    render(LoginMain);
    const logoutButton = document.querySelector('a[id="logout"]');
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      user.deleteUser();
      router.navigateTo('/login');
    });
  } else {
    render(Main);
  }
}

function renderProfilePage() {
  if (!user.getUser()) {
    router.navigateTo('/login');
    return;
  }

  render(Profile);

  if (user.getUser().username) {
    document.querySelector('input[id="username"]').value =
      user.getUser().username;
  }
  if (user.getUser().email) {
    document.querySelector('input[id="email"]').value = user.getUser().email;
  }
  if (user.getUser().bio) {
    document.querySelector('textArea[id="bio"]').value = user.getUser().bio;
  }

  const logoutButton = document.querySelector('a[id="logout"]');
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    user.deleteUser();
    router.navigateTo('/login');
  });

  const profileForm = document.getElementById('profile-form');

  const update = (username, email = '', bio = '') => {
    const updatedUser = {
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      bio: document.getElementById('bio').value,
    };
    user.setUser(updatedUser);
    alert('프로필이 업데이트되었습니다.');
  };

  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('update!');
    const updatedUser = {
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      bio: document.getElementById('bio').value,
    };
    if (!updatedUser.username) {
      alert('사용자 이름을 입력해주세요.');
      return;
    }

    update(updatedUser);
  });
}

function renderLoginPage() {
  if (user.getUser()) {
    router.navigateTo('/');
    return;
  }
  console.log('Login Page');
  render(Login);

  const loginForm = document.getElementById('login-form');

  const login = (username, email = '', bio = '') => {
    let userInfo = {
      username,
      email,
      bio,
    };

    user.setUser(userInfo);
    router.navigateTo('/profile');
  };

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('login!');
    let username = document
      .querySelector('input[name="username"]')
      .value.trim();
    if (!username) {
      alert('사용자 이름을 입력해주세요.');
      return;
    }

    login(username);
  });

  window.addEventListener('error', () => {
    document
      .querySelector('#login-form')
      .insertAdjacentHTML(
        'beforeend',
        `<p>오류 발생! 의도적인 오류입니다.</p>`
      );
  });
}

function renderErrorPage() {
  console.log('Error Page');
  render(Error);
}
