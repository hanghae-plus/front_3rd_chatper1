/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from "./lib";
import { HomePage, LoginPage, NotFoundPage, ProfilePage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { userStorage } from "./storages";
import { addEvent, registerGlobalEvents } from "./utils";
import { App } from "./App";

const router = createRouter({
  '/': () => <HomePage />,
  '/login': () => {
    const loggedIn = userStorage.get('user');
    if (loggedIn) {
      // throw new ForbiddenError();
      window.history.pushState(null, null, '/');
      return <HomePage />;
    } else {
      return <LoginPage />;
    }
  },
  '/profile': () => {
    const loggedIn = userStorage.get('user');
    if (!loggedIn) {
      // throw new UnauthorizedError();
      window.history.pushState(null, null, '/login');
      return <LoginPage />;
    }
    return <ProfilePage />;
  },
  '/404': () => <NotFoundPage />,
});

function logout() {
  router.push('/login');
  userStorage.reset('user');
  userStorage.reset('loggedIn');
  globalStore.setState({ currentUser: null, loggedIn: false });
}

function handleError(error) {
  globalStore.setState({ error });
}
// 초기화 함수
function render() {
  const $root = document.querySelector('#root');

  try {
    renderElement(<App targetPage={router.getTarget()}/>, $root);
    // if ($root.hasChildNodes()) {
    //   $root.firstChild.replaceWith($app);
    // } else {
    //   $root.appendChild($app);
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

  addEvent('submit', '[data-submit]', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formType = form.getAttribute('data-submit');
  
    const formHandlers = {
      'login-form': () => handleLoginForm(formData),
      'profile-form': () => handleProfileForm(formData)
    };
  
    const handleForm = formHandlers[formType];
    if (handleForm) {
      handleForm();
    }
  });
  
  function handleLoginForm(formData) {
    const username = formData.get('username');
    if (username) {
      const currentUser = { username, email: '', bio: '' };
      userStorage.set('user', currentUser);
      userStorage.set('loggedIn', { loggedIn: true });
      globalStore.setState({ currentUser, loggedIn: true });
      router.push('/profile');
    }
  }
  
  function handleProfileForm(formData) {
    const username = formData.get('username');
    const email = formData.get('email');
    const bio = formData.get('bio');
    const currentUser = { username, email, bio };
    userStorage.set('user', currentUser);
    userStorage.set('loggedIn', { loggedIn: true });
    globalStore.setState({ currentUser, loggedIn: true });
    alert('수정 완료');
  }

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