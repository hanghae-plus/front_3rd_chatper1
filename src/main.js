import { Main, LoginMain } from '../components/Main';
import Profile from '../components/Profile';
import Login from '../components/Login';
import Error from '../components/Error';
import Router from './router';
import User from '../store/User';

//renderMainPage
const user = User();
const renderMainPage = () => {
  if (user.getUser()) {
    document.querySelector('#root').innerHTML = LoginMain();
  } else {
    document.querySelector('#root').innerHTML = Main();
  }
};

const logout = () => {
  user.deleteUser();
  router.navigateTo('/login');
};
const renderProfilePage = () => {
  if (!user.getUser()) {
    router.navigateTo('/login');
    return;
  }

  document.querySelector('#root').innerHTML = Profile();
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
    logout();
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
    // form의 submit 이벤트를 사용합니다.
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
};

const renderLoginPage = () => {
  if (user.getUser()) {
    router.navigateTo('/');
    return;
  }
  console.log('Login Page');
  document.querySelector('#root').innerHTML = Login();

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
};

const renderErrorPage = () => {
  console.log('Error Page');
  document.querySelector('#root').innerHTML = Error();
};
renderMainPage();
const router = Router();
router.addRoute('/', renderMainPage);
router.addRoute('/login', renderLoginPage);
router.addRoute('/profile', renderProfilePage);
router.addRoute('/404', renderErrorPage);

document.querySelector('nav').addEventListener('click', (e) => {
  e.stopPropagation();
  if (e.target.tagName === 'A') {
    e.preventDefault();
    router.navigateTo(e.target.pathname);
  }
});

window.addEventListener('load', () => {
  router.navigateTo(window.location.pathname);
});
