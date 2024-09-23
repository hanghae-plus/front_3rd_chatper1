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
