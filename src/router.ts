import Home from './pages/home.js';
import Profile from './pages/profile.js';
import Login from './pages/login.js';
import PageNotFound from './pages/404.js';
import { render } from './main.js';
import Error from './pages/error.jsx';

const routes: { [key: string]: () => JSX.IntrinsicElements } = {
  home: Home,
  profile: Profile,
  login: Login,
  pageNotFound: PageNotFound,
  error: Error,
};

let route = routes.home;

export function router() {
  return {
    push: (path: string) => {
      if (path === '/profile' && localStorage.getItem('user') === null) {
        alert('로그인 해주세요.');
        path = '/login';
      }
      if (path === '/login' && localStorage.getItem('user') !== null) {
        path = '/';
      }
      if (path.toLocaleLowerCase() === '/home') {
        path = '/';
      }

      history.pushState({}, '', path.toLowerCase());

      route = path === '/' ? routes.home : routes[path.toLocaleLowerCase().replace('/', '')] || PageNotFound;
      render();
    },
    getRoute: () => route(),
  };
}

window.addEventListener('popstate', e => {
  router().push(location.pathname);
});

document.addEventListener('DOMContentLoaded', () => {
  router().push(location.pathname);
  document.addEventListener('click', e => {
    const target = e.target;
    if (target instanceof HTMLElement && target.tagName === 'A') {
      e.preventDefault();
      const path = target.getAttribute('href');
      if (path !== null) {
        router().push(path.toLocaleLowerCase());
      }
    }
  });
});
