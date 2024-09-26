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
  history.pushState(null, null, path);
  renderPage();
}

function handlePopState() {
  const path = window.location.pathname;
  navigateTo(path);
}

function handleClick(event) {
  event.preventDefault();

  if (event.target.tagName !== 'A') return;

  const href = event.target.getAttribute('href');

  if (href) {
    navigateTo(href);
  }
}
