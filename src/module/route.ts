import App from '../page/app';
import { RouteType } from '../type';
import store from './store';

class Router {
  private static instance: Router;
  private routes: { [key: string]: RouteType };
  private app;
  constructor() {
    if (Router.instance) return Router.instance;
    Router.instance = this;
    this.routes = {};
    this.app = new App(this);
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  init(routes: { [key: string]: RouteType }) {
    this.app.init();
    this.routes = routes;
  }

  addRoute(routes: { [key: string]: RouteType }) {
    this.routes = routes;
  }

  getRoute(routename: string) {
    return this.routes[routename]
      ? this.routes[routename]
      : this.routes['/404'];
  }

  push(path: string) {
    let nextPath = path;
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const { username, email, bio } = JSON.parse(userInfo!);
      store.setState('userData', { username, email, bio });
    } else {
      store.reset('userData');
    }

    const { username } = store.getState('userData');
    switch (path) {
      case '/profile':
        if (!username) nextPath = '/login';
        break;

      case '/login':
        if (username) nextPath = '/';
        break;

      case '/logout':
        store.reset('userData');
        nextPath = '/login';
        break;

      default:
        break;
    }
    history.pushState(null, '', nextPath);
    this.handleRoute(nextPath);
  }

  handlePopState() {
    this.push(window.location.pathname);
  }

  handleRoute(path: string) {
    this.app.render(this.getRoute(path));
    store.setState('pathname', { pathname: path });
  }
}

const useRouter = () => new Router();

export type { Router };
export { useRouter };
