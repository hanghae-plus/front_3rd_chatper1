import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import { localGetItem } from './utils/storage';

const router = {
  push(path = location.pathname) {
    let dom;
    let listeners;
    const isLogin = !!localGetItem('user');

    switch (path) {
      case '/':
        history.pushState('', '', path);
        dom = HomePage();
        listeners = HomePage.listeners;
        break;

      case '/login':
        history.pushState('', '', isLogin ? '/' : '/login');
        dom = isLogin ? HomePage() : LoginPage();
        listeners = isLogin ? HomePage.listeners : LoginPage.listeners;
        break;

      case '/profile':
        history.pushState('', '', isLogin ? '/profile' : '/login');
        dom = isLogin ? ProfilePage() : LoginPage();
        listeners = isLogin ? ProfilePage.listeners : LoginPage.listeners;
        break;

      default:
        history.pushState('', '', path);
        dom = NotFoundPage();
        break;
    }

    this.render({ dom, listeners });
  },

  render({ dom, listeners }) {
    document.querySelector('#root').innerHTML = dom;

    if (!listeners) return;

    for (const listener of Object.values(listeners)) {
      listener && listener();
    }
  },
};

export default router;
