import { ROUTES } from './const/ROUTES.js';

export function router() {
  const path = window.location.pathname;

  if (!ROUTES.hasOwnProperty(path)) {
    document.getElementById('root').innerHTML = ROUTES['notFound'];
    return;
  }

  if (localStorage.getItem('user') === null && path !== '/login') {
    document.getElementById('root').innerHTML = ROUTES['/login'];
  } else {
    document.getElementById('root').innerHTML = ROUTES[path];
  }
}

export function navigateTo(url) {
  history.pushState({}, '', url);
  router();
}