import ErrorBoundary from './components/common/ErrorBoundary';
import NotFoundPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

import { createRouter } from './utils/routes';
import { getStorage } from './utils/storage';
import Store from './utils/store';

export const store = new Store({
  isLogin: !!getStorage('user'),
  user: getStorage('user'),
});

const App = () => {
  const root = document.querySelector('#root');

  const errorBoundary = new ErrorBoundary();

  const router = createRouter();

  router.addRoute('/', () => new HomePage(root));
  router.addRoute('/login', () => new LoginPage(root));
  router.addRoute('/profile', () => new ProfilePage(root), { isPrivate: true });
  router.addRoute('404', () => new NotFoundPage(root));

  router.init();
  errorBoundary.init();
};

App();
