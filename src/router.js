import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import ProfilePage from './components/ProfilePage';
import { getUser } from './helpers';

const isLogin = () => getUser();

const routes = {
  '/404': ($target) => new ErrorPage($target),
  '/': ($target) => new MainPage($target),
  '/login': ($target) => new LoginPage($target),
  '/profile': ($target) => new ProfilePage($target),
};

let currentRoute = null;

const navigateTo = (path, replace = false) => {
  if (replace) {
    history.replaceState(null, '', path);
  } else {
    history.pushState(null, '', path);
  }

  handleRoute(path);
};

const handleRoute = (path) => {
  if (!routes[path]) {
    navigateTo('/404', true);
    return;
  }

  if (path === '/profile' && !isLogin()) {
    navigateTo('/login', true);
    return;
  }

  currentRoute = routes[path](document.querySelector('#root'));

  console.log('currentRoute', currentRoute);
};

export { handleRoute, navigateTo };
