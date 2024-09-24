import { store } from './store';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

export const routes = {
  '/': () => HomePage(),
  '/login': () => LoginPage(),
  '/profile': () => ProfilePage(),
  '/404': () => NotFoundPage(),
};

export const protectedRoutes = [
  {
    path: '/profile',
    condition: () => {
      const isLoggedIn = store.getState('isLoggedIn');
      return !isLoggedIn;
    },
    redirect: '/login',
  },
  {
    path: '/login',
    condition: () => {
      const isLoggedIn = store.getState('isLoggedIn');
      return isLoggedIn;
    },
    redirect: '/',
  },
];
