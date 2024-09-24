import DefaultView from './layouts/default_view';

import Navigation from './components/navigation';
import Footer from './components/footer';

import Main from './pages/main';
import Profile from './pages/profile';
import Login from './pages/login';
import Error from './pages/error';

export default class Router {
  constructor() {
    this.routes = {
      '/': { component: Main, isDefaultView: true },
      '/profile': { component: Profile, isDefaultView: true },
      '/login': { component: Login, isDefaultView: false },
    };
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  init() {
    this.navigateTo(window.location.pathname);
  }
  setHTML(html) {
    document.getElementById('root').innerHTML = html;
  }
  makeView(route, currentPath) {
    const { component, isDefaultView } = route;
    const nav = isDefaultView ? Navigation.template(currentPath) : '';
    const footer = isDefaultView ? Footer.template() : '';

    const defaultView = new DefaultView();
    defaultView.setNavigation(nav);
    defaultView.setContent(component.template());
    defaultView.setFooter(footer);
    const view = defaultView.build();

    this.setHTML(view);

    Navigation.bindEvents(this.navigateTo.bind(this));

    component?.bindEvents?.(this.navigateTo.bind(this));
  }

  navigateTo(path) {
    const guardPath = this.routeGuard(path);
    history.pushState(null, '', guardPath);
    this.handleRoute(guardPath);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const route = this.routes[path];

    if (route) {
      this.makeView(route, path);
    } else {
      this.setHTML(Error.template());
    }
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  routeGuard(path) {
    if (path === '/') {
      return '/';
    }

    if (path === '/profile' && this.getUser() === null) {
      console.log(this.getUser());
      return '/login';
    }

    if (path === '/login' && this.getUser()) {
      return '/';
    }

    return path;
  }
}
