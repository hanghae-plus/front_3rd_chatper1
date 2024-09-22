import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import ProfilePage from './components/ProfilePage';

const isLogin = false;
const routes = {
  '/404': ErrorPage,
  '/': MainPage,
  '/login': LoginPage,
  '/profile': ProfilePage,
};

const navigateTo = (path) => {
  history.pushState(null, '', path);
  handleRoute(path);
};

const handleRoute = (path) => {
  if (!routes[path]) {
    navigateTo('/404');
    return;
  }

  if (path === '/profile' && !isLogin) {
    navigateTo('/login');
    return;
  }

  document.querySelector('#root').innerHTML = routes[path]();
};

export { handleRoute, navigateTo };
