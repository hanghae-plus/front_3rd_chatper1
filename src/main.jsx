/** @jsx createVNode */
import { createElement, createRouter, createStorage, createVNode, renderElement } from './lib';
import { HomePage, LoginPage, ProfilePage } from './pages';
import { globalStore } from './stores';
import { ForbiddenError, UnauthorizedError } from './errors';
import { userStorage } from './storages';
import { addEvent, registerGlobalEvents } from './utils';
import { App } from './App';

const router = createRouter({
  '/': HomePage,
  '/login': () => {
    const { loggedIn } = globalStore.getState();
    if (loggedIn) {
      throw new ForbiddenError();
    }
    return <LoginPage />;
  },
  '/profile': () => {
    const { loggedIn } = globalStore.getState();
    if (!loggedIn) {
      throw new UnauthorizedError();
    }
    return <ProfilePage />;
  },
});

function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false });
  router.push('/login');
  userStorage.reset();
}

function handleError(error) {
  globalStore.setState({ error });
}

function login() {
  const form = document.getElementById('login-form');
  const formData = new FormData(form);
  const username = formData.get('username');

  if (!username) return alert('이메일을 입력해 주세요.');

  userStorage.set({ username, email: '', bio: '' });
  globalStore.setState({ loggedIn: true, currentUser: { username, email: '', bio: '' } });
  router.push('/profile');
}

function profileUpdate() {
  const form = document.getElementById('profile-form');
  const formData = new FormData(form);
  const username = formData.get('username');
  const email = formData.get('email');
  const bio = formData.get('bio');

  console.log(username, email, bio);

  userStorage.set({ username, email, bio });
  globalStore.setState({ currentUser: { username, email, bio } });
  alert('프로필이 업데이트되었습니다.');
}

// 초기화 함수
function render() {
  const $root = document.querySelector('#root');

  try {
    const $app = createElement(<App targetPage={router.getTarget()} />);
    renderElement(<App targetPage={router.getTarget()} />, $root);

    // if ($root.hasChildNodes()) {
    //   $root.firstChild.replaceWith($app);
    //   renderElement(<App targetPage={router.getTarget()} />, $root);
    // } else {
    //   $root.appendChild($app);
    //   renderElement(<App targetPage={router.getTarget()} />, $root);
    // }
  } catch (error) {
    if (error instanceof ForbiddenError) {
      router.push('/');
      return;
    }
    if (error instanceof UnauthorizedError) {
      router.push('/login');
      return;
    }

    console.error(error);

    // globalStore.setState({ error });
  }
  registerGlobalEvents();
}

function main() {
  router.subscribe(render);
  globalStore.subscribe(render);
  window.addEventListener('error', handleError);
  window.addEventListener('unhandledrejection', handleError);

  addEvent('click', '[data-link]', (e) => {
    e.preventDefault();
    router.push(e.target.href.replace(window.location.origin, ''));
  });

  addEvent('click', '#logout', (e) => {
    e.preventDefault();
    logout();
  });

  addEvent('submit', '#login-form', (e) => {
    e.preventDefault();
    login();
  });

  addEvent('submit', '#profile-form', (e) => {
    e.preventDefault();
    profileUpdate();
  });

  addEvent('click', '#error-boundary', (e) => {
    e.preventDefault();
    globalStore.setState({ error: null });
  });

  render();
}

main();
