import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Error from './pages/Error';

const routes = {
  '/': { component: Home, defaultLayout: true },
  '/login': { component: Login, defaultLayout: false },
  '/profile': { component: Profile, defaultLayout: true },
  '/error': { component: Error, defaultLayout: false },
};

export default routes;
