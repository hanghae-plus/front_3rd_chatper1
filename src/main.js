import { renderLayout } from './utils/layout';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

const routes = [
  { path: '/', view: () => renderLayout(HomePage()) },
  {
    path: '/profile',
    view: (isLoggedIn) =>
      isLoggedIn ? renderLayout(ProfilePage()) : navigate('/login'),
  },
  {
    path: '/login',
    view: (isLoggedIn) => (isLoggedIn ? navigate('/') : LoginPage()),
  },
  { path: '*', view: () => NotFoundPage() },
];

export const navigate = (url) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  window.history.pushState(null, null, url);

  const route =
    routes.find((route) => route.path === url) ||
    routes.find((route) => route.path === '*');

  route.view(isLoggedIn);
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (!(target instanceof HTMLAnchorElement)) return;
    e.preventDefault();
    navigate(target.getAttribute('href'));
  });

  // 초기 페이지 로드
  navigate(window.location.pathname);
});

// URL이 변경될 때마다 navigate를 호출
window.addEventListener('popstate', () => {
  navigate(window.location.pathname);
});
