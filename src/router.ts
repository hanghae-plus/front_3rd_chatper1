import Home from './pages/home.js';
import Profile from './pages/profile.js';
import Login from './pages/login.js';
import PageNotFound from './pages/404.js';
import { renderApp } from './main.js';

const routes: { [key: string]: () => JSX.IntrinsicElements } = {
  home: Home,
  profile: Profile,
  login: Login,
  pageNotFound: PageNotFound,
};

let route = routes.home;

export function router() {
  return {
    push: (path: string) => {
      if (['/profile', '/'].includes(path) && localStorage.getItem('user') === null) {
        alert('로그인 해주세요.');
        path = '/login';
      }

      history.pushState({}, '', path.toLowerCase());

      route = path === '/' ? routes.home : routes[path.toLocaleLowerCase().replace('/', '')] || PageNotFound;
      renderApp();
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
