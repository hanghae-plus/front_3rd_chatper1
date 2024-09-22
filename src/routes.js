import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';

export const routes = {
  '/': () => Home(),
  '/login': () => Login(),
  '/profile': () => Profile(),
  '/404': () => NotFound(),
};
