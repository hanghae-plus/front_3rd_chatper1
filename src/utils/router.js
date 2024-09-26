import { ROUTES } from '../constants/routes.js';
import HomePage from '../pages/HomePage.js';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';

const routes = {
  [ROUTES.HOME]: HomePage,
  [ROUTES.LOGIN]: LoginPage,
  [ROUTES.PROFILE]: ProfilePage,
  [ROUTES.NOT_FOUND]: NotFoundPage
};

export function initializeRouter() {
  window.addEventListener('popstate', handlePopState);
  document.addEventListener('click', handleClick);
  navigateTo(window.location.pathname || ROUTES.HOME);
}

function renderPage() {
  const path = window.location.pathname;
  const content = routes[path] || routes[ROUTES.NOT_FOUND];

  document.getElementById('root').innerHTML = content();
}

function navigateTo(path) {
  const targetPath = guardPrivateRoute(path);
  history.pushState(null, null, targetPath);
  renderPage();
}

function handlePopState() {
  const path = window.location.pathname;
  navigateTo(path);
}

function guardPrivateRoute(path) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (path === ROUTES.PROFILE && !isLoggedIn) {
    return ROUTES.LOGIN;
  } else if (path === ROUTES.LOGIN && isLoggedIn) {
    return ROUTES.HOME;
  } else {
    return path;
  }
}

function handleClick(event) {
  event.preventDefault();

  if (event.target.tagName !== 'A') return;

  const href = event.target.getAttribute('href');

  if (href) {
    navigateTo(href);
  }
}
