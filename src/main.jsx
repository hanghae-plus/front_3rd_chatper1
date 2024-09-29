/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from '@/lib';
import { HomePage, LoginPage, ProfilePage } from '@/pages';
import { globalStore } from '@/stores';
import { ForbiddenError, UnauthorizedError } from '@/errors';
import { userStorage } from '@/storages';
import { addEvent, registerGlobalEvents } from '@/utils';
import { App } from '@/App';

const router = createRouter({
  '/': HomePage,
  '/login': () => {
    const user = userStorage.get();
    if (user) {
      throw new ForbiddenError();
    }
    return <LoginPage />;
  },
  '/profile': () => {
    const user = userStorage.get();
    if (!user) {
      throw new UnauthorizedError();
    }
    return <ProfilePage />;
  },
});

export function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;

  if (username) {
    userStorage.set({ username, email: '', bio: '' });

    router.push('/');
  } else {
    alert('아이디를 입력해주세요');
  }
}

export function logout(e) {
  e.preventDefault();

  globalStore.setState({ currentUser: null, loggedIn: false });
  userStorage.reset();
  router.push('/login');
}

function handleError(error) {
  globalStore.setState({ error });
}

export function updateUserInfo(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const bio = document.getElementById('bio').value;

  userStorage.set({ username, email, bio });
}

export function goHome(e) {
  e.preventDefault();

  router.push('/');
}

// 초기화 함수
function render() {
  const $root = document.querySelector('#root');
  try {
    const $app = createElement(<App targetPage={router.getTarget()} />);
    if ($root?.hasChildNodes && $root.hasChildNodes()) {
      $root.firstChild.replaceWith($app);
    } else {
      $root?.appendChild($app);
    }
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

  addEvent('click', '#error-boundary', (e) => {
    e.preventDefault();
    globalStore.setState({ error: null });
  });

  render();
}

main();
