import { RouteType } from '../type';
import HomePage from '../page/homePage';
import LoginPage from '../page/loginPage';
import ProfilePage from '../page/profilePage';
import NotFoundPage from '../page/notFoundPage';
import { getStoreState, setStoreState } from './store';
import App from '../page/app';

const routeList = {
  '/': {
    path: '/',
    instance: HomePage,
    element: null,
    layout: true,
  },
  '/login': {
    path: '/login',
    instance: LoginPage,
    element: null,
    layout: false,
  },
  '/profile': {
    path: '/profile',
    instance: ProfilePage,
    element: null,
    layout: true,
  },
  '/404': {
    path: '/404',
    instance: NotFoundPage,
    element: null,
    layout: false,
  },
};

class Router {
  private static _instance: Router;
  public static instance(): Router {
    if (!Router._instance) Router._instance = new Router();
    return Router._instance;
  }
  private routes: { [key: string]: RouteType };

  constructor() {
    Router._instance = this;
    this.routes = routeList;
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  applyRouteGuards(path: string): string {
    const keys = Object.keys(this.routes);
    if (!keys.includes(path)) return '/404';

    const isLoggedIn = getStoreState('userData').username;
    switch (path) {
      case '/profile':
        return isLoggedIn ? '/profile' : '/login';

      case '/login':
        return isLoggedIn ? '/' : '/login';

      default:
        return path;
    }
  }

  checkStorage() {
    const storedData = localStorage.getItem('user');
    const initialData = { username: '', email: '', bio: '' };
    const userData = storedData ? JSON.parse(storedData) : initialData;
    setStoreState('userData', userData);
  }

  push(path: string) {
    const nextPath = this.applyRouteGuards(path);
    this.checkStorage();

    // route element가 없다면 instance로 생성 후, 라우터 이동.
    const { element, instance } = this.routes[nextPath];
    if (!element) this.routes[nextPath].element = new instance('main');

    history.pushState(null, '', nextPath);
    App.render(this.routes[nextPath]);
  }

  handlePopState() {
    this.push(window.location.pathname);
  }
}

const useRouter = () => Router.instance();

export type { Router };
export { useRouter };
