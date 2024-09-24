import { user } from './utils';

import DefaultView from './layouts/default_view';

import Main from './pages/main';
import Profile from './pages/profile';
import Login from './pages/login';
import Error from './pages/error';

class Router {
  constructor() {
    this.routes = {
      '/': { component: Main, isDefaultView: true },
      '/profile': { component: Profile, isDefaultView: true },
      '/login': { component: Login, isDefaultView: false },
      '/404': { component: Error, isDefaultView: false },
    };

    window.addEventListener('popstate', this.handlePopState.bind(this));

    this.navigateTo(window.location.pathname);
  }

  setHTML(html) {
    document.getElementById('root').innerHTML = html;
  }

  render(route) {
    const { component, isDefaultView } = route;
    const view = isDefaultView ? DefaultView.template(component) : component.template();

    this.setHTML(view);

    DefaultView.activeEvents(this.navigateTo.bind(this));
    component.activeEvents?.(this.navigateTo.bind(this));
  }

  navigateTo(path) {
    const guardPath = this.routeGuard(path);
    history.pushState(null, '', guardPath);
    this.handleRoute(guardPath);
  }

  handlePopState() {
    const guardPath = this.routeGuard(window.location.pathname);
    history.pushState(null, '', guardPath);
    this.handleRoute(guardPath);
  }

  handleRoute(path) {
    const route = this.routes[path];

    if (route === undefined) return this.render(this.routes['/404']);

    this.render(route);
  }

  routeGuard(path) {
    if (path === '/login' && user.isLogin()) {
      return '/';
    }

    if (path === '/profile' && !user.isLogin()) {
      return '/login';
    }

    return path;
  }
}

export default new Router();
