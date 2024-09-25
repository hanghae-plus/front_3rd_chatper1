import { routes } from './router';
import NotFoundPage from './pages/NotFoundPage';

export function navigate (requestUrl) {
  history.pushState(null, null, requestUrl);
  renderRoute(requestUrl);
};

function renderRoute() {
  const path = window.location.pathname;

  const route = routes[path] || NotFoundPage;

  document.getElementById('root').innerHTML = route();
}

window.addEventListener('popstate', renderRoute);

document.addEventListener('DOMContentLoaded', () => {
  renderRoute();
});
