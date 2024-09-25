import { routes } from './router';
import NotFoundPage from './pages/NotFoundPage';
import { getUserInfoStorage } from './utils/storage';

export function navigate (requestUrl) {
  history.pushState(null, null, requestUrl);
  renderRoute(requestUrl);
};

function renderRoute() {
  const path = window.location.pathname;

  const isLogin = getUserInfoStorage('isLogin');

  if (path === '/profile' && !isLogin) {
    navigate('/login');
    return;
  }

  if (path === '/login' && isLogin) {
    navigate('/');
    return;
  }

  const route = routes[path] || NotFoundPage;

  document.getElementById('root').innerHTML = route();
}

window.addEventListener('popstate', renderRoute);

document.addEventListener('DOMContentLoaded', () => {
  renderRoute();
});
