/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from './lib';
import { HomePage, LoginPage, ProfilePage } from './pages';
import { globalStore } from './stores';
import { ForbiddenError, UnauthorizedError } from './errors';
import { userStorage } from './storages';
import { addEvent, registerGlobalEvents } from './utils';
import App from './App';

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
  router.push('/');
  userStorage.reset();
}

function login(username) {
  globalStore.setState({ currentUser: { username }, loggedIn: true });
  userStorage.set({ username, email: '', bio: '' });
  router.push('/profile');
}

function updateProfile({ username, email, bio }) {
  const { currentUser } = globalStore.getState();
  globalStore.setState({
    currentUser: { ...currentUser, username, email, bio },
  });
  userStorage.set({ ...currentUser, username, email, bio });
  alert('프로필이 업데이트되었습니다.');
}

function handleError(error) {
  globalStore.setState({ error });
}

// 초기화 함수
function render() {
  const $root = document.querySelector('#root');

  try {
    const $app = <App targetPage={router.getTarget()} />;

    // if ($root.hasChildNodes()) {
    //   $root.replaceChild($app, $root.firstChild);
    // } else {
    //   $root.appendChild($app);
    // }

    renderElement($app, $root);
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

    globalStore.setState({ error });
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

  addEvent('submit', '#login-form', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;

    if (username) {
      login(username);
    }
  });

  addEvent('submit', '#profile-form', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;

    updateProfile({ username, email, bio });
  });

  addEvent('click', '#logout', (e) => {
    e.preventDefault();
    logout();
  });

  addEvent('click', '#error-boundary', (e) => {
    e.preventDefault();
    globalStore.setState({ error: null });
  });

  render();
}

main();
