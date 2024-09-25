import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import ProfilePage from './pages/ProfilePage.js';

export const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/profile': ProfilePage,
  '/404': NotFoundPage,
};
